# Supabase Setup Guide

This guide will help you set up Supabase for the Comrade Learn AI application.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in your project details:
   - Name: `comrade-learn-ai` (or any name you prefer)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 4: Create Database Tables

1. In your Supabase project, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `SUPABASE_SCHEMA.sql`
4. Click "Run" to execute the SQL
5. Verify that the tables were created by going to **Table Editor**

You should see two tables:
- `user_profiles` - Stores user profile information
- `user_courses` - Stores user-generated courses

## Step 5: Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. (Optional) Configure email templates under **Authentication** → **Email Templates**

## Step 6: Test the Connection

1. Start your development server: `npm run dev`
2. Try signing up a new user
3. Check your Supabase dashboard to see if the user was created in:
   - **Authentication** → **Users**
   - **Table Editor** → **user_profiles**

## Troubleshooting

### Issue: "Invalid API key" error
- Make sure your `.env` file is in the root directory
- Verify that the environment variables are correctly named (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- Restart your development server after adding environment variables

### Issue: "Relation does not exist" error
- Make sure you've run the SQL schema file in the Supabase SQL Editor
- Check that the tables `user_profiles` and `user_courses` exist in the Table Editor

### Issue: RLS (Row Level Security) errors
- The schema includes RLS policies that ensure users can only access their own data
- If you're getting permission errors, check that the RLS policies were created correctly
- You can verify this in **Authentication** → **Policies**

## Database Schema

### user_profiles
- `id` (UUID, Primary Key) - References auth.users(id)
- `email` (Text) - User's email address
- `name` (Text) - User's full name
- `disability` (Text) - User's special ability (adhd, dyslexia, hearing, vision, none)
- `settings` (JSONB) - User's application settings
- `created_at` (Timestamp) - When the profile was created
- `updated_at` (Timestamp) - When the profile was last updated

### user_courses
- `id` (UUID, Primary Key) - Unique course record ID
- `user_id` (UUID, Foreign Key) - References auth.users(id)
- `course_id` (Text) - Unique course identifier
- `course_data` (JSONB) - Full course object
- `progress` (Integer) - Course progress (0-100)
- `created_at` (Timestamp) - When the course was created
- `updated_at` (Timestamp) - When the course was last updated

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- The `anon` key is safe to use in client-side code (it's restricted by RLS policies)
- Never commit your `.env` file to version control

## Next Steps

After setting up Supabase:
1. Update your components to use the new authentication system
2. Test user registration and login
3. Test course creation and storage
4. Deploy your application with environment variables configured

