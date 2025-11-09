-- Fix for Database Error Saving New User
-- Run this SQL in your Supabase SQL Editor

-- Step 1: Drop existing trigger if it exists (to recreate it properly)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 1.5: Fix the update_updated_at_column function (fixes Supabase warning)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$;

-- Step 2: Drop existing function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 3: Recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert into user_profiles table
  -- Use ON CONFLICT to handle cases where profile might already exist
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

-- Step 4: Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 5: Grant necessary permissions to the function
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON public.user_profiles TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;

-- Step 6: Verify the trigger was created
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_auth_user_created';

-- Expected output: Should show the trigger on auth.users table

