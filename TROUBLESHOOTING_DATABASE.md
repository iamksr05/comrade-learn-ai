# Troubleshooting Database Error When Saving New User

## Problem
Getting a database error when trying to save a new user during signup.

## Common Causes

### 1. RLS Policy Blocking Profile Creation
The Row Level Security policy might be blocking the profile creation even though a trigger should handle it.

### 2. Trigger Not Working
The database trigger might not be set up correctly or might have errors.

### 3. Missing Permissions
The trigger function might not have the right permissions to insert into user_profiles.

## Solution: Run the Fix SQL

### Step 1: Run FIX_DATABASE_ERROR.sql

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Click **SQL Editor** → **New query**

2. **Run the Fix SQL**
   - Open `FIX_DATABASE_ERROR.sql` from your project
   - Copy all content
   - Paste into SQL Editor
   - Click **Run**

3. **Verify it worked**
   - Check for "Success" message
   - The trigger should be recreated with better error handling

### Step 2: Test Again

1. Try signing up a new user
2. Check browser console for any errors
3. Check Supabase logs for database errors

## What the Fix Does

1. **Drops and recreates the trigger function**
   - Uses `SECURITY DEFINER` to bypass RLS
   - Sets `search_path` to ensure proper schema access
   - Better error handling with exception blocks

2. **Uses ON CONFLICT**
   - Handles cases where profile might already exist
   - Updates instead of failing

3. **Grants proper permissions**
   - Ensures the function has access to insert into user_profiles
   - Grants necessary schema permissions

4. **Better error handling**
   - Logs errors but doesn't fail user creation
   - More resilient to edge cases

## Alternative: Check Your Setup

### Verify Trigger Exists
Run this SQL to check if the trigger exists:
```sql
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';
```

### Verify Function Exists
Run this SQL to check if the function exists:
```sql
SELECT proname, prosrc 
FROM pg_proc 
WHERE proname = 'handle_new_user';
```

### Check RLS Policies
Run this SQL to see RLS policies:
```sql
SELECT * FROM pg_policies 
WHERE tablename = 'user_profiles';
```

## If Still Getting Errors

### Check Browser Console
Look for specific error messages in the browser console (F12).

### Check Supabase Logs
1. Go to Supabase Dashboard
2. Click **Logs** → **Postgres Logs**
3. Look for errors related to `user_profiles` or `handle_new_user`

### Common Error Messages

**"new row violates row-level security policy"**
- Run `FIX_DATABASE_ERROR.sql`
- Verify trigger is created
- Check RLS policies

**"function handle_new_user() does not exist"**
- Run `FIX_DATABASE_ERROR.sql`
- Verify function was created

**"permission denied for table user_profiles"**
- Run `FIX_DATABASE_ERROR.sql`
- Check permissions in the SQL fix

## Manual Profile Creation (Temporary Fix)

If the trigger still doesn't work, you can manually create profiles for existing users:

```sql
-- This will create profiles for users that don't have one
INSERT INTO public.user_profiles (id, email, name, disability, settings)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', 'User') as name,
  COALESCE(raw_user_meta_data->>'disability', 'none') as disability,
  '{
    "notifications": true,
    "systemUpdates": false,
    "highContrast": false,
    "textToSpeech": false,
    "largerFont": false
  }'::jsonb as settings
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.user_profiles)
ON CONFLICT (id) DO NOTHING;
```

## Summary

1. Run `FIX_DATABASE_ERROR.sql` in Supabase SQL Editor
2. Verify trigger was created successfully
3. Try signing up again
4. Check browser console and Supabase logs for errors
5. If still failing, check the specific error message and fix accordingly

The fix ensures the trigger has proper permissions and error handling to create user profiles automatically.

