# Netherite - AI Form Assistant Chrome Extension

🚀 **Production-ready Chrome Extension** that integrates **Gemini Nano** (Chrome's Built-in AI) to provide intelligent, context-aware form-filling assistance. Features a modern glassmorphic UI with a floating toolbar that provides View (page analysis), Chat (conversational AI), and Voice (future feature) modes.

![Netherite Demo](https://img.shields.io/badge/Status-Production%20Ready-green) ![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![AI](https://img.shields.io/badge/AI-Gemini%20Nano-purple)

## ✨ Key Features

### 🤖 AI-Powered Intelligence
- **Gemini Nano Integration**: Uses Chrome's built-in AI (no API keys required)
- **Smart Form Detection**: Automatically identifies and analyzes form fields
- **Context-Aware Filling**: Understands field context and provides relevant suggestions
- **Document Reference**: Upload documents and reference them in chat with `@doc`

### 🎨 Modern UI/UX
- **Glassmorphic Design**: Beautiful translucent interface with blur effects
- **Floating Toolbar**: Draggable toolbar that doesn't interfere with websites
- **Three Modes**: View (page analysis), Chat (AI conversation), Voice (planned)
- **Keyboard Shortcuts**: Press `Alt+N` to activate anywhere

### 🔧 Technical Excellence
- **TypeScript**: Fully typed codebase with strict type checking
- **Webpack 5**: Modern bundling with development and production modes
- **Shadow DOM**: Complete style isolation prevents CSS conflicts
- **Chrome Storage**: Persistent document and chat history
- **Session Management**: Proper AI model lifecycle with resource cleanup

## 🚀 Quick Start

### Prerequisites
You need **Chrome Canary** with experimental AI features enabled:

1. **Download Chrome Canary**: https://www.google.com/chrome/canary/
2. **Enable AI flags** in Chrome Canary:
   ```
   chrome://flags/#prompt-api-for-gemini-nano → Enabled
   chrome://flags/#optimization-guide-on-device-model → Enabled BypassPerfRequirement
   ```
3. **Restart Chrome Canary**
4. **Wait for AI model download** (happens automatically, may take 10-15 minutes)

### Installation

#### Option 1: Development Build
```bash
# Clone the repository
git clone https://github.com/your-org/netherite-test.git
cd netherite-test

# Install dependencies
npm install

# Build the extension
npm run build

# Load in Chrome Canary
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the 'dist' folder
```

#### Option 2: Development Mode (with hot reload)
```bash
# Start development build with file watching
npm run dev

# Load the 'dist' folder in Chrome as above
# Webpack will rebuild automatically when you make changes
```

### First Usage

1. **Activate**: Press `Alt+N` on any webpage or click the extension icon
2. **View Mode**: Click "View" to analyze the current page for forms
3. **Chat Mode**: Click "Chat" to start an AI conversation
4. **Upload Documents**: Use the popup to upload reference documents
5. **Reference Documents**: In chat, type `@doc` to reference uploaded content

## 📖 Usage Guide

### View Mode - Page Analysis
```
1. Press Alt+N to open toolbar
2. Click "View" button
3. Watch the scanning animation analyze the page
4. Review detected form fields and AI suggestions
5. Click suggestions to auto-fill fields
```

### Chat Mode - AI Conversation
```
1. Press Alt+N to open toolbar  
2. Click "Chat" button
3. Type questions or requests like:
   - "Fill out this contact form with my info"
   - "Help me complete this job application"
   - "@doc summarize the uploaded resume"
4. AI provides intelligent responses and actions
```

### Document Upload & Reference
```
1. Click the Netherite extension icon (popup)
2. Upload documents (PDF, TXT, etc.)
3. In chat mode, type "@doc" followed by your query
4. AI will reference uploaded document content
```

## 🏗️ Architecture

### Extension Structure
```
src/
├── ai/                    # AI service layer
│   ├── AIServiceFactory.ts    # Factory for AI services
│   ├── PromptAPIService.ts    # Gemini Nano integration
│   └── SystemPrompts.ts       # AI prompt templates
├── background/            # Service worker
│   └── background.ts          # Extension lifecycle management
├── content/              # Content scripts
│   ├── content.ts            # Main content script coordinator
│   ├── FieldInjector.ts      # Form field injection logic
│   ├── FormFieldDetector.ts  # Form detection algorithms
│   └── components/           # UI components
│       ├── ChatPanel.ts         # Chat interface
│       ├── FloatingToolbar.ts   # Main toolbar
│       └── ViewModeScanner.ts   # Page analysis
├── popup/                # Extension popup
│   └── popup.ts              # Document upload interface
├── types/                # TypeScript definitions
│   └── language-model.d.ts    # AI API types
└── utils/                # Shared utilities
    ├── constants.ts          # App constants
    ├── logger.ts            # Logging system
    ├── storage.ts           # Chrome storage wrapper
    └── ThemeManager.ts      # UI theme management
```

### Key Design Patterns

#### AI Session Management
```typescript
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

#### Shadow DOM Isolation
```typescript
// Create isolated styling context
const shadowRoot = element.attachShadow({ mode: 'closed' });
shadowRoot.innerHTML = `
    <style>
        /* Styles won't affect or be affected by page CSS */
    </style>
    <div class="component">Content</div>
`;
```

## 🛠️ Development

### Build Scripts
```bash
npm run build     # Production build
npm run dev       # Development build with watching
npm run clean     # Clean build artifacts
npm run type-check # TypeScript checking only
```

### Project Configuration

#### TypeScript (`tsconfig.json`)
- Strict type checking enabled
- Chrome Extension API types included
- Module resolution for modern imports

#### Webpack (`webpack.config.js`)
- Multi-entry bundling (content, background, popup)
- CSS extraction and optimization
- Asset copying and manifest processing
- Development vs production optimization

### Code Quality Standards

#### Error Handling
```typescript
// Use retry mechanisms for AI operations
const response = await fetchWithRetry(async () => {
    return await session.prompt(prompt);
}, 3, 1000);

// Always handle graceful degradation
if (typeof LanguageModel === 'undefined') {
    showFallbackUI();
    return;
}
```

#### Logging Pattern
```typescript
import { Logger } from '../utils/logger';

// Structured logging throughout
Logger.info('Operation started', { context: 'additional data' });
Logger.field('inject', fieldLabel, success); // Field-specific logging
Logger.chromeAPI('tabs', 'query', params);   // Chrome API calls
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Alt+N activates toolbar on any website
- [ ] View mode detects and displays form fields correctly
- [ ] Chat mode responds to queries appropriately  
- [ ] Document upload and @doc reference works
- [ ] Form field injection fills fields accurately
- [ ] UI remains styled correctly across different websites
- [ ] Extension works after page navigation/refresh

### Browser Requirements Testing
- [ ] Chrome Canary with flags enabled
- [ ] AI model downloaded and functional
- [ ] Extension permissions granted
- [ ] No console errors during operation

## 📋 Troubleshooting

### Common Issues

#### "AI not available" Error
```
Solution: 
1. Ensure using Chrome Canary (not regular Chrome)
2. Check flags are enabled: chrome://flags/#prompt-api-for-gemini-nano
3. Wait for AI model download (check chrome://components/)
4. Restart Chrome Canary after enabling flags
```

#### Extension Not Loading
```
Solution:
1. Run 'npm run build' to ensure latest build
2. Check chrome://extensions/ for error messages
3. Reload extension after code changes
4. Check browser console for JavaScript errors
```

#### Toolbar Not Appearing
```
Solution:
1. Try Alt+N keyboard shortcut
2. Check if content script injected (browser DevTools)
3. Verify website allows extension injection
4. Check for JavaScript errors in console
```

#### Form Fields Not Detected
```
Solution:
1. Ensure page has finished loading
2. Try refreshing page after extension install
3. Check if fields are in iframes (not currently supported)
4. Verify fields have proper labels or attributes
```

## 🔒 Privacy & Security

### Data Handling
- **Local Processing**: All AI processing happens locally in Chrome
- **No External APIs**: No data sent to external servers
- **Chrome Storage Only**: Documents stored locally in Chrome storage
- **No Tracking**: Extension doesn't collect or transmit user data

### Permissions Explained
- `storage`: For saving documents and chat history locally
- `activeTab`: To interact with current webpage only
- `scripting`: To inject content scripts for form detection
- `<all_urls>`: To work on any website (content scripts only)

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes following code style guidelines
4. Test thoroughly with manual checklist
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open Pull Request

### Code Style
- Use TypeScript strict mode
- Follow existing logging patterns
- Add JSDoc comments for public methods
- Maintain Shadow DOM isolation
- Handle errors gracefully with user feedback

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Chrome Team**: For Gemini Nano and Built-in AI APIs
- **Webpack Team**: For excellent bundling capabilities  
- **TypeScript Team**: For robust type system
- **Open Source Community**: For inspiration and tools

---

**Ready to revolutionize form filling with AI?** 🚀 Install Netherite and press `Alt+N` to get started!