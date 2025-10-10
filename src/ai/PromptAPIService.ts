/// <reference types="chrome"/>
import { LanguageModelSession, AIMode } from '../types/language-model';
import { SystemPrompts } from './SystemPrompts';
import { Logger } from '../utils/logger';

export class PromptAPIService {
    private session: LanguageModelSession | null = null;

    /**
     * Check if the Language Model API is available in the browser
     */
    static async checkAvailability(): Promise<boolean> {
        try {
            if (typeof LanguageModel === 'undefined') {
                Logger.warn('LanguageModel API not available in this browser');
                return false;
            }

            const capabilities = await LanguageModel.capabilities();
            Logger.info('AI Capabilities:', capabilities);

            return capabilities.available === 'readily' || capabilities.available === 'after-download';
        } catch (error) {
            Logger.error('Error checking AI availability:', error);
            return false;
        }
    }

    /**
     * Utility function for exponential backoff during API calls (for robustness)
     */
    private async fetchWithRetry<T>(
        apiCall: () => Promise<T>, 
        maxRetries: number = 5, 
        baseDelay: number = 1000
    ): Promise<T> {
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await apiCall();
            } catch (error) {
                if (i === maxRetries - 1) {
                    throw error;
                }
                const delay = baseDelay * Math.pow(2, i);
                Logger.warn(`Retry attempt ${i + 1} failed, waiting ${delay}ms...`, error);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw new Error('All retry attempts failed');
    }

    /**
     * Create AI session with system prompt based on mode
     */
    private async createSession(mode: AIMode, context?: any): Promise<LanguageModelSession> {
        return this.fetchWithRetry(async () => {
            const systemPrompt = SystemPrompts.getSystemPrompt(mode, context);
            
            Logger.info(`Creating AI session for mode: ${mode}`);
            Logger.debug('System prompt:', systemPrompt);

            const session = await LanguageModel.create({
                systemPrompt,
                temperature: 0.7, // Balanced creativity and consistency
                topK: 40 // Good variety in responses
            });

            Logger.info('AI session created successfully');
            return session;
        });
    }

    /**
     * Generate content using AI with proper session management
     */
    async generateContent(
        prompt: string, 
        mode: AIMode, 
        context?: any
    ): Promise<string> {
        // Check API availability first
        const isAvailable = await PromptAPIService.checkAvailability();
        if (!isAvailable) {
            throw new Error('AI Language Model is not available. Please check Chrome flags and model download.');
        }

        let session: LanguageModelSession | null = null;
        
        try {
            // Create session with mode-specific system prompt
            session = await this.createSession(mode, context);
            
            Logger.info(`Generating content for mode: ${mode}`);
            Logger.debug('User prompt:', prompt);

            // Generate response with retry mechanism
            const response = await this.fetchWithRetry(() => 
                session!.prompt(prompt)
            );

            Logger.info('Content generated successfully');
            Logger.debug('AI response length:', response.length);

            return response;

        } catch (error) {
            Logger.error('Error during AI generation:', error);
            throw new Error(`Generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            
        } finally {
            // Critical: Always destroy session for resource cleanup
            if (session) {
                try {
                    session.destroy();
                    Logger.debug('AI session destroyed successfully');
                } catch (destroyError) {
                    Logger.warn('Error destroying AI session:', destroyError);
                }
            }
        }
    }

    /**
     * Analyze webpage content (View mode)
     */
    async analyzeWebpage(pageHTML: string, pageTitle: string, url: string): Promise<string> {
        const prompt = `Analyze this webpage:

HTML Structure:
${pageHTML}

Page Title: ${pageTitle}
URL: ${url}

Provide a comprehensive analysis following the specified format.`;

        return this.generateContent(prompt, 'view');
    }

    /**
     * Generate chat response with context
     */
    async generateChatResponse(
        userMessage: string,
        chatHistory: Array<{role: string, content: string}>,
        pageContext?: {
            purpose?: string;
            fields?: string;
            documentContent?: string;
        }
    ): Promise<string> {
        const historyContext = chatHistory
            .slice(-10) // Keep last 10 messages for context
            .map(msg => `${msg.role}: ${msg.content}`)
            .join('\n');

        const prompt = `Previous Conversation:
${historyContext}

User Message: ${userMessage}

Generate structured answers for the detected form fields based on the context and user's document (if available).`;

        return this.generateContent(prompt, 'chat', pageContext);
    }

    /**
     * Rewrite content for specific field
     */
    async rewriteContent(
        originalContent: string,
        fieldLabel: string,
        fieldType: string,
        characterLimit?: number
    ): Promise<string> {
        const prompt = `Original Text:
${originalContent}

Rewrite this content for the field "${fieldLabel}" (${fieldType}).`;

        const context = { fieldType, fieldLabel, characterLimit };
        return this.generateContent(prompt, 'rewrite', context);
    }

    /**
     * Clean up any active sessions (safety method)
     */
    destroy(): void {
        if (this.session) {
            try {
                this.session.destroy();
                this.session = null;
                Logger.info('PromptAPIService cleaned up');
            } catch (error) {
                Logger.warn('Error during PromptAPIService cleanup:', error);
            }
        }
    }
}