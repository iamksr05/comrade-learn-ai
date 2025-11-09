# Comrade Learn AI

An AI-powered learning platform with accessibility features for users with different special abilities.

## Features

- 🤖 **Real AI Conversations**: Powered by OpenAI GPT-4o-mini
- 🎯 **Special Ability-Aware Responses**: Customized AI responses for ADHD, Dyslexia, Vision, and Hearing special abilities
- 👋 **Sign Language Support**: Sign language input and output for deaf/hard of hearing users
- 🎨 **Adaptive Theming**: UI adapts based on user's special ability preferences
- 📚 **Learning Companion**: Personalized AI tutor for programming and technology

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up AI API (Optional but Recommended)

Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from: https://platform.openai.com/api-keys

**Note**: Without an API key, the app will use fallback responses (still special ability-aware but less intelligent).

See [AI_API_SETUP.md](./AI_API_SETUP.md) for detailed setup instructions.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4b6488c3-eef0-47c5-857d-f8dc99f6686e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4b6488c3-eef0-47c5-857d-f8dc99f6686e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
