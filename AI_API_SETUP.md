# AI API Setup Guide

This application uses OpenAI's API to provide real AI-powered conversations. Follow these steps to set it up:

## Prerequisites

1. An OpenAI API key (get one at https://platform.openai.com/api-keys)
2. Node.js and npm installed

## Setup Instructions

### Step 1: Create Environment File

Create a `.env` file in the root directory of the project:

```bash
# Create .env file
touch .env
```

### Step 2: Add Your API Key

Add your OpenAI API key to the `.env` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your actual OpenAI API key.

### Step 3: Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## How It Works

- **With API Key**: The app uses OpenAI's GPT-4o-mini model for real AI conversations
- **Without API Key**: The app falls back to contextual responses (still special ability-aware)

## Security Note

⚠️ **Important**: This implementation uses the API key in the frontend for development purposes. 

For production, it's **strongly recommended** to:
1. Create a backend API proxy
2. Store API keys on the server
3. Make API calls through your backend
4. Never expose API keys in client-side code

## Model Configuration

The default model is `gpt-4o-mini` for cost-effectiveness. You can change it in `src/utils/aiAdapter.ts`:

```typescript
model: "gpt-4o-mini", // Can be changed to "gpt-4", "gpt-3.5-turbo", etc.
```

## Troubleshooting

### API Key Not Working

1. Check that your `.env` file is in the root directory
2. Ensure the variable name is exactly `VITE_OPENAI_API_KEY`
3. Restart the development server after adding the key
4. Check the browser console for error messages

### Rate Limits

If you hit rate limits:
- Check your OpenAI account usage
- Consider upgrading your OpenAI plan
- The app will show a rate limit error message

### API Errors

The app will automatically fall back to contextual responses if the API fails, so it will still work without an API key.

## Cost Considerations

- GPT-4o-mini is very cost-effective (~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens)
- Monitor your usage at https://platform.openai.com/usage
- Set usage limits in your OpenAI account settings

