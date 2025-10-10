# Copilot Instructions for Netherite Chrome Extension

## Project Overview
This is a production-ready Chrome Extension that integrates **Gemini Nano** (Chrome's Built-in AI) to provide intelligent, context-aware form-filling assistance. The extension features a modern glassmorphic UI with a floating toolbar that provides View (page analysis), Chat (conversational AI), and Voice (future feature) modes. Built with TypeScript, Webpack, and Chrome Extension Manifest V3.

## Architecture & Key Components

### Core Technologies
- **TypeScript** with Chrome Extension Manifest V3 architecture  
- **Chrome Built-in AI APIs** - `window.ai.languageModel` (accessed via `LanguageModel`)
- **Webpack** for bundling TypeScript modules into extension scripts
- **Shadow DOM** for isolated overlay UI styling with glassmorphic effects
- **Chrome Storage API** for document and chat history persistence

### Extension Architecture  
The extension follows a multi-script Chrome Extension pattern:
- **Content Script** (`content.ts`) - Injected into web pages, handles floating toolbar, overlay UI, and form field detection
- **Background Script** (`background.ts`) - Service worker for extension lifecycle management  
- **Popup Script** (`popup.ts`) - Extension popup UI for document upload and settings
- **AI Services** (`ai/`) - Modular AI service layer with session management
- **UI Components** (`content/components/`) - Floating toolbar, chat interface, view mode scanner

### Session Management Pattern
Critical pattern for AI model interaction:
```javascript
// Always create session, use it, then destroy it
let session;
try {
    session = await LanguageModel.create();
    const response = await session.prompt(finalPrompt);
    // Handle response
} finally {
    if (session) {
        session.destroy(); // Critical for resource management
    }
}
```

## Development Workflow

### Browser Requirements
- **Chrome Canary** with experimental flags enabled:
  - `chrome://flags/#prompt-api-for-gemini-nano`
  - `chrome://flags/#optimization-guide-on-device-model`
- No local server required - can open HTML directly in browser

### Testing Approach
- Use the built-in demo content in `summaryInput.value` for quick testing
- Test all three task modes to ensure UI state management works correctly
- Verify proper session cleanup by monitoring browser developer tools

### Error Handling Patterns
- **Retry mechanism**: `fetchWithRetry()` with exponential backoff for API robustness
- **Graceful degradation**: Check for `typeof LanguageModel === 'undefined'`
- **User feedback**: Loading states with spinner and descriptive messages

## Code Conventions

### UI State Management
- Use `hidden` class toggling for conditional UI elements
- Dynamic placeholder text based on selected task type
- Button state management during async operations

### Prompt Engineering
Task-specific prompt construction:
- **Summarization**: Include length instruction in prompt (`${desiredLength} summary`)
- **Creative Writing**: Prefix with role instruction (`Act as a creative writer`)
- **General Prompting**: Use user input directly

### Resource Management
- Always call `session.destroy()` in finally blocks
- Handle session creation failures gracefully
- Use loading indicators for user feedback during model operations

## File Structure Notes
- **Single HTML file deployment** - entire application in one file for portability
- **No package.json** - purely browser-based with CDN dependencies
- **Standard MIT license** - open source project under agentic-console organization

## Integration Points
- **Chrome Built-in AI APIs** - Primary dependency on experimental browser features
- **Tailwind CSS CDN** - External styling dependency
- **Google Fonts** - Inter font family for typography consistency

When modifying this codebase, prioritize maintaining the session lifecycle pattern and ensure all async AI operations include proper error handling and user feedback mechanisms.