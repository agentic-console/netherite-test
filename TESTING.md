# Netherite Extension - Testing & Deployment Guide

## 🧪 Pre-Deployment Testing Checklist

### Browser Setup Verification
- [ ] **Chrome Canary installed** and set as default for testing
- [ ] **AI Flags enabled** in chrome://flags/:
  - [ ] `prompt-api-for-gemini-nano` → Enabled
  - [ ] `optimization-guide-on-device-model` → Enabled BypassPerfRequirement
- [ ] **Chrome restarted** after flag changes
- [ ] **AI Model downloaded** (check chrome://components/ for "Optimization Guide On Device Model")

### Extension Loading
- [ ] **Build successful**: `npm run build` completes without errors
- [ ] **Extension loaded**: Load `dist` folder in chrome://extensions/
- [ ] **No loading errors** in chrome://extensions/
- [ ] **Extension icon visible** in Chrome toolbar
- [ ] **Permissions granted** when requested

### Core Functionality Tests

#### 1. Activation Tests
- [ ] **Alt+N shortcut** activates floating toolbar
- [ ] **Extension icon click** activates toolbar (if popup disabled)
- [ ] **Toolbar appears** with glassmorphic styling
- [ ] **Toolbar is draggable** and maintains position
- [ ] **Three buttons visible**: View, Chat, Voice (disabled)

#### 2. View Mode Tests
Test on a page with forms (like a contact form, signup page, etc.):
- [ ] **View button click** starts scanning animation
- [ ] **Form fields detected** and displayed in results panel
- [ ] **Field labels** are correctly identified
- [ ] **Field types** are properly categorized (text, email, select, etc.)
- [ ] **AI suggestions** are relevant and helpful
- [ ] **Results panel** is styled correctly and readable

#### 3. Chat Mode Tests
- [ ] **Chat button** opens conversational interface
- [ ] **Input field** accepts text and shows placeholder
- [ ] **Send button** submits messages
- [ ] **AI responses** are generated and displayed
- [ ] **Chat history** persists between sessions
- [ ] **Loading states** show spinner during AI processing
- [ ] **Error handling** gracefully handles AI unavailability

#### 4. Document Upload Tests
- [ ] **Popup opens** when clicking extension icon
- [ ] **File selection** works for various file types
- [ ] **Upload progress** shows during file processing
- [ ] **Document list** displays uploaded files
- [ ] **@doc reference** works in chat mode
- [ ] **Document content** is properly included in AI responses

#### 5. Form Field Injection Tests
Test on various websites with different form types:
- [ ] **Text inputs** accept injected content
- [ ] **Email fields** validate injected emails
- [ ] **Select dropdowns** select appropriate options
- [ ] **Checkboxes** check/uncheck based on AI suggestions
- [ ] **Radio buttons** select correct options
- [ ] **Textarea fields** accept longer content
- [ ] **Date fields** accept properly formatted dates
- [ ] **Number fields** accept numeric values
- [ ] **Field validation** triggers after injection
- [ ] **Success highlighting** shows for injected fields

### Cross-Website Compatibility
Test on various websites to ensure compatibility:
- [ ] **Google Forms** (forms.google.com)
- [ ] **TypeForm** (typeform.com)
- [ ] **Contact forms** on business websites
- [ ] **E-commerce checkout** forms
- [ ] **Social media signup** forms
- [ ] **Job application** portals

### UI/UX Quality Tests
- [ ] **Glassmorphic effects** render correctly
- [ ] **Toolbar doesn't interfere** with website content
- [ ] **Text is readable** on various backgrounds
- [ ] **Animations are smooth** and not jarring
- [ ] **Mobile responsive** (if applicable)
- [ ] **Dark/light themes** work on different websites
- [ ] **No CSS conflicts** with host website styles

### Performance Tests
- [ ] **Fast activation** (< 500ms for toolbar to appear)
- [ ] **Responsive AI** (< 3 seconds for simple queries)
- [ ] **Memory usage** reasonable (check Chrome Task Manager)
- [ ] **No memory leaks** during extended use
- [ ] **Page load impact** minimal (< 100ms additional load time)

### Error Handling Tests
- [ ] **AI unavailable** gracefully handled with user message
- [ ] **Network errors** don't crash the extension
- [ ] **Invalid form fields** are skipped appropriately
- [ ] **Large documents** are processed or limited appropriately
- [ ] **Malformed web pages** don't break detection
- [ ] **JavaScript errors** are logged and handled

## 🚀 Deployment Steps

### 1. Final Build Preparation
```bash
# Ensure clean environment
npm run clean
npm install

# Run final production build
npm run build

# Verify build output
ls -la dist/
```

### 2. Extension Package Creation
```bash
# Create distribution package
cd dist
zip -r ../netherite-extension-v1.0.0.zip *
cd ..

# Verify package contents
unzip -l netherite-extension-v1.0.0.zip
```

### 3. Chrome Web Store Preparation

#### Store Assets Needed:
- [ ] **Screenshots** (1280x800 or 640x400)
- [ ] **Promotional images** (440x280)  
- [ ] **Store icon** (128x128 PNG)
- [ ] **Category selection** (Productivity)
- [ ] **Privacy policy URL** (if collecting data)

#### Store Listing Content:
- [ ] **Extension name**: "Netherite - AI Form Assistant"
- [ ] **Short description**: "Intelligent form filling with Gemini Nano AI"
- [ ] **Detailed description**: Use README content
- [ ] **Keywords**: AI, forms, automation, productivity, Gemini
- [ ] **Version**: 1.0.0

### 4. Testing in Production Environment

#### Final Verification:
- [ ] **Install from package** (not development build)
- [ ] **Test all functionality** on fresh Chrome profile
- [ ] **Verify permissions** are minimal and necessary
- [ ] **Check console** for any production-only issues
- [ ] **Performance check** in production mode

### 5. Submission Checklist

#### Chrome Web Store:
- [ ] **Developer account** set up and verified
- [ ] **Package uploaded** and validated
- [ ] **Store listing** complete with all assets
- [ ] **Privacy practices** declared accurately
- [ ] **Testing completed** on multiple machines
- [ ] **Review guidelines** compliance verified

## 🔧 Development Environment Maintenance

### Regular Updates
- [ ] **Dependencies updated** monthly
- [ ] **Security patches** applied promptly
- [ ] **Chrome API changes** monitored and adapted
- [ ] **Gemini Nano updates** tested for compatibility
- [ ] **User feedback** incorporated into updates

### Monitoring & Support
- [ ] **Error tracking** system in place
- [ ] **User support** channel established
- [ ] **Update notification** system ready
- [ ] **Rollback plan** prepared for critical issues

## 🐛 Troubleshooting Common Issues

### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### AI Not Working
1. Verify Chrome Canary usage
2. Check chrome://flags/ settings
3. Wait for model download (chrome://components/)
4. Test with `await ai.languageModel.capabilities()` in console

### Extension Not Loading
1. Check for TypeScript compilation errors
2. Verify manifest.json validity
3. Check permissions in chrome://extensions/
4. Look for console errors in extension pages

### Performance Issues
1. Check memory usage in Chrome Task Manager
2. Profile with Chrome DevTools Performance tab
3. Verify proper session cleanup in AI service
4. Monitor for memory leaks with heap snapshots

---

**Ready for Production!** ✅ 

After completing this checklist, your Netherite extension will be ready for deployment to the Chrome Web Store.