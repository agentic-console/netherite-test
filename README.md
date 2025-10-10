# Netherite Chrome Extension

A modern AI-powered Chrome Extension that integrates with Gemini Nano to provide intelligent form-filling assistance with a beautiful glassmorphic UI.

## 🚀 Quick Start

### Prerequisites
- **Chrome Canary** (version 128+) 
- Node.js (16+)
- npm or yarn

### Required Chrome Flags
Enable these experimental flags in Chrome Canary:

1. Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
2. Set to **Enabled**
3. Navigate to `chrome://flags/#optimization-guide-on-device-model` 
4. Set to **Enabled BypassPerfRequirement**
5. Restart Chrome Canary

### Model Download
1. Go to `chrome://components/`
2. Find "Optimization Guide On Device Model"
3. Click **Check for update** to download Gemini Nano

## 📦 Installation & Build

```bash
# Install dependencies
npm install

# Development build (with source maps)
npm run dev

# Development with watch mode
npm run watch

# Production build
npm run build

# Clean build artifacts
npm run clean
```

## 🔧 Loading in Chrome

1. Open Chrome Canary
2. Navigate to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `dist/` folder from your project
6. The extension should now appear in your extensions list

## 🎯 Usage

### Activation
- Press **Alt+N** on any webpage to show the floating toolbar
- Or click the Netherite extension icon

### Features
- **👁️ View Mode**: Analyze page structure and detect form fields
- **💬 Chat Mode**: AI-powered conversational assistant
- **📄 Document Upload**: Reference documents with `@doc` in chat
- **🤖 Auto-Fill**: Intelligent form field completion

### Workflow Example
1. Navigate to any form (job application, contact form, etc.)
2. Press **Alt+N** to activate
3. Click **View** to analyze the page
4. Upload a document (resume, CV) via the popup
5. Click **Chat** and type: "@doc Help me fill this form"
6. Review AI-generated responses
7. Click **Apply** to auto-fill the form

## 🛠️ Development

### Project Structure
```
src/
├── ai/                     # AI service layer
│   ├── PromptAPIService.ts
│   ├── AIServiceFactory.ts
│   └── SystemPrompts.ts
├── content/                # Content script
│   ├── content.ts
│   ├── FormFieldDetector.ts
│   └── components/
│       ├── FloatingToolbar.ts
│       ├── ViewModeScanner.ts
│       └── ChatPanel.ts
├── background/             # Service worker
│   └── background.ts
├── popup/                  # Extension popup
│   └── popup.ts
├── utils/                  # Utilities
│   ├── logger.ts
│   ├── storage.ts
│   ├── constants.ts
│   └── ThemeManager.ts
└── types/                  # TypeScript types
    └── language-model.d.ts
```

### Key Components

#### AI Service Layer
- **Session Management**: Proper create-use-destroy pattern for Gemini Nano
- **System Prompts**: Context-aware prompts for different modes
- **Error Handling**: Retry mechanism with exponential backoff

#### UI Components  
- **Glassmorphic Design**: Modern blur effects with dark mode support
- **Shadow DOM**: Isolated styling to prevent conflicts
- **Responsive**: Works on desktop and mobile viewports

#### Form Intelligence
- **Field Detection**: Automatic form field identification
- **Smart Labeling**: Finds labels through multiple strategies
- **Context Awareness**: Understands form purpose and requirements

## 🐛 Troubleshooting

### AI Not Available
- Verify Chrome Canary flags are enabled
- Check model download at `chrome://components/`
- Restart Chrome after enabling flags

### Extension Not Loading
- Ensure you're loading the `dist/` folder, not `src/`
- Check console for build errors with `npm run dev`
- Verify manifest.json syntax

### Toolbar Not Appearing
- Try pressing Alt+N again
- Check if page allows content scripts
- Look for console errors in DevTools

### Build Issues
- Clear cache: `npm run clean && npm install`
- Check Node.js version (requires 16+)
- Verify all dependencies installed

## 📊 Performance Notes

- **Memory Usage**: Sessions are destroyed after each use
- **Resource Cleanup**: Proper Shadow DOM and event listener cleanup
- **Lazy Loading**: Components created only when needed
- **Debouncing**: Prevents rapid-fire API calls

## 🧪 Testing

Test on various websites:
- ✅ LinkedIn job applications
- ✅ University admission forms  
- ✅ Contact forms
- ✅ Google Forms
- ✅ Government applications

### Edge Cases Tested
- Single-page applications (React, Vue, Angular)
- Pages with complex CSS
- Forms in iframes
- Dynamically loaded content

## 🔐 Privacy & Security

- **Local Processing**: All AI runs locally via Gemini Nano
- **No External APIs**: No data sent to external servers
- **Storage Isolation**: Uses Chrome's secure storage APIs
- **Shadow DOM**: UI isolation prevents page interference

## 🚧 Known Limitations

- **File Support**: Currently only .txt files (PDF/Word coming soon)
- **Voice Mode**: Not yet implemented
- **Complex Forms**: Some advanced form types may need manual handling
- **Browser Support**: Chrome Canary only (experimental APIs)

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes with proper TypeScript types
4. Test thoroughly on various websites
5. Submit pull request with detailed description

## 📞 Support

- Check existing issues on GitHub
- Test with Chrome DevTools console open
- Include Chrome version and error messages in reports
- Verify AI flags are properly enabled

---

**Made with ❤️ by the Agentic Console team**