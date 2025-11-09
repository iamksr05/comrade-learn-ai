-- Fix for RLS Policy Error
-- Run this SQL in your Supabase SQL Editor to fix the "new row violates row-level security policy" error

-- Step 1: Create function to automatically create user profile when a new user signs up
-- This function runs with SECURITY DEFINER, so it can bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name, disability, settings)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'disability', 'none'),
    '{
      "notifications": true,
      "systemUpdates": false,
      "highContrast": false,
      "textToSpeech": false,
      "largerFont": false
    }'::jsonb
  )
  ON CONFLICT (id) DO UPDATE SET
    email = COALESCE(EXCLUDED.email, user_profiles.email),
    name = COALESCE(NULLIF(EXCLUDED.name, 'User'), user_profiles.name),
    disability = COALESCE(NULLIF(EXCLUDED.disability, 'none'), user_profiles.disability),
    updated_at = TIMEZONE('utc'::text, NOW());
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Error creating user profile: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Step 2: Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 3: Also allow the trigger function to update profiles (for existing users)
-- This ensures the trigger can handle both new signups and profile updates

-- Step 4: Grant necessary permissions (if needed)
-- The function uses SECURITY DEFINER, so it should already have the right permissions

-- Verify the trigger was created
SELECT tgname, tgrelid::regclass 
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

