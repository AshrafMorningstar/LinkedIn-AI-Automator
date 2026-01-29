# LinkedIn AI Automator 🚀

A powerful web application for generating viral LinkedIn content using AI, scheduling posts automatically, and managing your content pipeline.

## ✨ Features

- **AI-Powered Content Generation**: Use OpenAI, Google Gemini, or DeepSeek to create viral posts
- **Smart Scheduling**: AI analyzes optimal posting times
- **Media Support**: Upload images, videos, and PDFs with drag-and-drop
- **Draft Management**: Save posts as drafts and edit before scheduling
- **Hook Randomizer**: Generate multiple variations with undo functionality
- **Queue Management**: View, edit, and manage all scheduled posts
- **LocalStorage Persistence**: Never lose your drafts or settings

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Download from [nodejs.org](https://nodejs.org/))

### Installation

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to `http://localhost:5173`

## ⚙️ Configuration

1. Click the **Settings** tab
2. Choose your AI provider (Mock mode works without API keys)
3. Enter your API keys:
   - **OpenAI**: Get from [platform.openai.com](https://platform.openai.com/api-keys)
   - **Gemini**: Get from [aistudio.google.com](https://aistudio.google.com/api-keys)
   - **DeepSeek**: Get from [platform.deepseek.com](https://platform.deepseek.com/api_keys)

## 📖 Usage

### Creating a Post

1. **Enter Topic**: e.g., "AI Automation", "Remote Work"
2. **Generate with AI**: Click to create viral content
3. **Shuffle Hook**: Try different variations
4. **Upload Media** (Optional): Drag & drop images/videos/PDFs
5. **Schedule or Save**: Choose to schedule or save as draft

### Managing Queue

- **Filter**: View all posts, drafts, or scheduled
- **Edit**: Modify any post before it goes live
- **Share**: Copy content and open LinkedIn
- **Delete**: Remove unwanted posts

## 🎨 Technology Stack

- **React 18** + **TypeScript**
- **Vite** for blazing-fast development
- **Vanilla CSS** with premium dark theme
- **LocalStorage** for data persistence
- **Multiple AI Providers** (OpenAI, Gemini, DeepSeek)

## 📁 Project Structure

```
src/
├── components/
│   ├── PostCreator.tsx    # Main content creation UI
│   ├── Queue.tsx          # Post management
│   └── Settings.tsx       # Configuration
├── services/
│   ├── ai/                # AI provider implementations
│   │   ├── openai.ts
│   │   ├── gemini.ts
│   │   ├── deepseek.ts
│   │   └── mock.ts
│   └── storage.ts         # LocalStorage wrapper
├── types.ts               # TypeScript definitions
└── App.tsx                # Main application
```

## 🔒 Privacy & Safety

- **Client-Side Only**: All data stored locally in your browser
- **No Backend**: Your API keys never leave your machine
- **Official APIs**: Uses legitimate LinkedIn and AI APIs
- **No Scraping**: Complies with LinkedIn's Terms of Service

## 🛠️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📝 Legacy Scripts

The original Python/Node.js scripts are in the `legacy/` folder for reference.

## 🤝 Contributing

This is a personal automation tool. Feel free to fork and customize!

## ⚠️ Disclaimer

This tool helps you create and schedule content but does not automatically post to LinkedIn without your action. Always review content before posting and comply with LinkedIn's Terms of Service.
