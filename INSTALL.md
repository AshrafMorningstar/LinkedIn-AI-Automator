# 🚀 LinkedIn AI Automator - Installation Guide

## ⚠️ Node.js Required

This application requires **Node.js** to run. Follow these steps to get started:

## 📥 Step 1: Install Node.js

1. **Download Node.js**:
   - Visit: https://nodejs.org/
   - Download the **LTS version** (recommended)
   - Run the installer
   - Accept all default settings

2. **Verify Installation**:
   Open a new terminal/command prompt and run:
   ```bash
   node -v
   ```
   You should see a version number like `v20.x.x`

## 🎯 Step 2: Launch the Application

### Option A: One-Click Start (Recommended)

1. **Double-click** `START.bat`
2. The script will automatically:
   - Install all dependencies
   - Start the development server
   - Open your browser to http://localhost:5173

### Option B: Manual Start

1. Open terminal in this folder
2. Run:
   ```bash
   npm install
   npm run dev
   ```

## 🎨 Step 3: Configure AI Provider

1. Click the **Settings** tab
2. Choose your AI provider:
   - **Mock Mode**: Works immediately (no API key needed)
   - **OpenAI**: Enter your API key from https://platform.openai.com/api-keys
   - **Gemini**: Enter your API key from https://aistudio.google.com/api-keys
   - **DeepSeek**: Enter your API key from https://platform.deepseek.com/api_keys
3. Click **Save Configuration**

## ✨ Step 4: Create Your First Post

1. Go to **Create** tab
2. Enter a topic (e.g., "AI Automation")
3. Click **Generate with AI**
4. Review and edit the content
5. Upload media (optional)
6. Choose:
   - **Save Draft** - Work on it later
   - **Schedule** - Queue for optimal time
   - **Launch Now** - Copy & post to LinkedIn

## 📋 Features Overview

### PostCreator

- ✅ AI content generation
- ✅ Hook randomizer with undo
- ✅ Drag-and-drop media upload
- ✅ Image/Video/PDF support
- ✅ Smart scheduling

### Queue Management

- ✅ Filter by status (All/Drafts/Scheduled)
- ✅ Edit posts before publishing
- ✅ One-click share to LinkedIn
- ✅ Delete unwanted posts

### Settings

- ✅ Multiple AI provider support
- ✅ Secure API key storage
- ✅ Easy provider switching

## 🔧 Troubleshooting

### "npm is not recognized"

- Restart your terminal after installing Node.js
- Or restart your computer

### Port Already in Use

- Close any other Vite/React apps
- Or change the port in `vite.config.ts`

### API Errors

- Verify your API key is correct
- Check your API provider account has credits
- Try Mock mode to test without API keys

## 📚 Additional Resources

- **Full Documentation**: See [README.md](file:///c:/Users/Admin/Desktop/Morningstar/LInk%20Dot/1/README.md)
- **Walkthrough**: See the artifacts folder for detailed walkthrough
- **Legacy Scripts**: Check `legacy/` folder for Python/Node scripts

## 🎉 You're Ready!

Once Node.js is installed, just run `START.bat` and you're good to go!

---

**Need Help?** Check the README.md or review the code in the `src/` folder.
