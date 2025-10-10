# Quick Testing Guide - Netherite Extension

## 🎯 Pre-Testing Checklist

### Chrome Setup Requirements
1. **Use Chrome Canary** (not regular Chrome)
2. **Enable Required Flags**:
   - Navigate to `chrome://flags/`
   - Enable: `#prompt-api-for-gemini-nano`
   - Enable: `#optimization-guide-on-device-model`
   - Restart Chrome Canary

### Extension Installation
1. Open Chrome Canary
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `dist/` folder from your project directory

## 🧪 Testing Steps

### 1. Basic Extension Loading
- ✅ Extension should appear in Chrome extensions list
- ✅ No error messages in console
- ✅ Extension icon visible in toolbar

### 2. Floating Toolbar Test
1. Navigate to any webpage (try Google search)
2. Press **Alt+N** to activate toolbar
3. ✅ Glassmorphic floating toolbar appears
4. ✅ Three buttons visible: View, Chat, Voice
5. ✅ Toolbar can be dragged around the screen

### 3. View Mode Test
1. With toolbar visible, click **View** button
2. ✅ Blue scanning line appears across screen
3. ✅ Analysis panel opens after scan (2 seconds)
4. ✅ Panel shows either AI analysis OR fallback message
5. ✅ Form fields detected and listed (if any on page)

### 4. Chat Mode Test
1. Click **Chat** button in toolbar
2. ✅ Chat panel slides in from right
3. ✅ Can type messages in input field
4. ✅ Either AI responses OR helpful error messages

### 5. Error Handling Test
If you see "AI not available" messages:
- This is EXPECTED behavior if Gemini Nano isn't ready
- Extension should still work with fallback analysis
- ✅ No crashes, graceful degradation

## 🔧 Troubleshooting

### If toolbar doesn't appear (Alt+N):
1. Check browser console for errors (F12)
2. Verify extension is enabled in `chrome://extensions/`
3. Try refreshing the webpage

### If AI features don't work:
1. Ensure Chrome flags are enabled (see setup above)
2. Wait for Gemini Nano model download (can take time)
3. Extension should show fallback messages

### Common Issues Fixed:
- ❌ "LanguageModel.capabilities is not a function" → ✅ FIXED
- ❌ CSS loading errors → ✅ FIXED
- ❌ Missing glassmorphic effects → ✅ FIXED

## 🎉 Success Indicators

### Extension is working correctly if:
- [x] Loads without console errors
- [x] Toolbar appears with Alt+N
- [x] View mode shows analysis (AI or fallback)
- [x] Chat mode opens panel
- [x] UI has glassmorphic design
- [x] All interactions are smooth

### AI Integration Status:
- **Working**: AI responses in View/Chat modes
- **Limited**: Fallback messages but no crashes
- **Broken**: Console errors or extension crashes

## 📊 Test Pages to Try:

1. **Google Search** - Basic content analysis
2. **Form-heavy sites** (contact forms, registration)
3. **News articles** - Text analysis
4. **E-commerce sites** - Mixed content

## 🐛 Report Issues

If you encounter problems, check the browser console (F12) and look for:
- Red error messages
- Failed network requests
- Extension-specific logs starting with `[Netherite]`

The extension is now designed to work gracefully even if AI features aren't fully available!