# Quick Start Guide - Supabase Setup

## Step 1: Create Supabase Project (5 minutes)

1. **Go to Supabase**
   - Visit [https://supabase.com](https://supabase.com)
   - Sign up or log in

2. **Create New Project**
   - Click "New Project"
   - Fill in:
     - **Name**: `comrade-learn-ai` (or any name)
     - **Database Password**: Create a strong password (save it!)
     - **Region**: Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

## Step 2: Get Your Credentials (2 minutes)

1. **In your Supabase project dashboard:**
   - Go to **Settings** (gear icon) → **API**
   - Copy these two values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)

## Step 3: Set Environment Variables (2 minutes)

1. **Create `.env` file in project root**
   ```bash
   # In your terminal, run:
   touch .env
   ```

2. **Add your credentials to `.env`:**
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   
   Replace with your actual values from Step 2.

3. **Verify `.env` is in `.gitignore`**
   - Check that `.env` is listed in `.gitignore`
   - Never commit `.env` to git!

## Step 4: Create Database Tables (3 minutes)

1. **In Supabase dashboard:**
   - Go to **SQL Editor** (left sidebar)
   - Click **New query**

2. **Run the schema:**
   - Open `SUPABASE_SCHEMA.sql` in your project
   - Copy the entire file content
   - Paste into SQL Editor
   - Click **Run** (or press Cmd/Ctrl + Enter)

3. **Verify tables created:**
   - Go to **Table Editor** (left sidebar)
   - You should see:
     - `user_profiles`
     - `user_courses`

## Step 5: Enable Email Authentication (1 minute)

1. **In Supabase dashboard:**
   - Go to **Authentication** → **Providers**
   - Find **Email** provider
   - Make sure it's **Enabled**
   - (Optional) Configure email templates

## Step 6: Test Your Setup (5 minutes)

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Test the flow:**
   - Go to your app (usually `http://localhost:5173`)
   - Click "Get Started"
   - Try signing up with a test email
   - Check Supabase dashboard:
     - **Authentication** → **Users** (should see new user)
     - **Table Editor** → **user_profiles** (should see profile)

## Troubleshooting

### ❌ "Invalid API key" error
- Check `.env` file exists and has correct variable names
- Verify you copied the full anon key
- Restart dev server: `npm run dev`

### ❌ "Relation does not exist" error
- Make sure you ran the SQL schema
- Check tables exist in Table Editor
- Try running the SQL again

### ❌ "Email provider not enabled" error
- Go to Authentication → Providers
- Enable Email provider

### ❌ Can't sign up
- Check browser console for errors
- Verify Supabase project is active
- Check email is enabled in providers

## Next Steps After Setup

1. ✅ Test user registration
2. ✅ Test user login
3. ✅ Test profile updates
4. ✅ Test course creation
5. ✅ Verify data in Supabase dashboard

## Need Help?

- Check `SUPABASE_SETUP.md` for detailed instructions
- Check `SUPABASE_INTEGRATION_SUMMARY.md` for technical details
- Supabase docs: https://supabase.com/docs

## Ready to Deploy?

When deploying to production:
1. Add environment variables to your hosting platform
2. Use the same Supabase project or create a production one
3. Update environment variables in your deployment settings

