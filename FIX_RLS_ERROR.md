# Fix for RLS Policy Error

## Problem
When trying to sign up/login, you get this error:
```
new row violates row-level security policy for table "user_profiles"
```

## Cause
The Row Level Security (RLS) policy is blocking the profile creation because when a user signs up, the session might not be immediately available, so `auth.uid()` doesn't match the user ID being inserted.

## Solution
We'll use a database trigger that automatically creates the user profile when a new user signs up. This trigger runs with elevated privileges and can bypass RLS.

## How to Fix

### Option 1: Run the Fix SQL (Recommended)

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Click **SQL Editor** → **New query**

2. **Run the Fix SQL**
   - Open `RLS_FIX.sql` from your project
   - Copy all content
   - Paste into SQL Editor
   - Click **Run**

3. **Verify it worked**
   - You should see "Success" message
   - The trigger should be created

### Option 2: Update the Schema File

The `SUPABASE_SCHEMA.sql` file has been updated to include the trigger. If you haven't run the schema yet:
1. Run the updated `SUPABASE_SCHEMA.sql` file
2. It will create the trigger automatically

If you already ran the schema:
1. Run `RLS_FIX.sql` to add the trigger
2. Or re-run the updated `SUPABASE_SCHEMA.sql` (it's safe to run multiple times)

## What the Fix Does

1. **Creates a trigger function** (`handle_new_user`)
   - Automatically runs when a new user is created in `auth.users`
   - Creates the profile in `user_profiles` table
   - Uses `SECURITY DEFINER` to bypass RLS
   - Reads name and disability from user metadata

2. **Creates a trigger** (`on_auth_user_created`)
   - Listens for new user creation in `auth.users`
   - Automatically calls the trigger function
   - Runs after user insertion

3. **Updates AuthContext**
   - Now passes name and disability in user metadata
   - Uses `upsert` to update profile if it already exists
   - More resilient to timing issues

## After Running the Fix

1. **Try signing up again**
   - The profile should be created automatically
   - No more RLS errors

2. **If you still get errors**
   - Check that the trigger was created successfully
   - Verify the SQL ran without errors
   - Check browser console for detailed error messages

## Testing

1. Sign up a new user
2. Check Supabase dashboard:
   - **Authentication** → **Users** (should see new user)
   - **Table Editor** → **user_profiles** (should see profile)
3. Try logging in
4. Should work without errors!

## Why This Works

- **Database trigger** runs on the server side with elevated privileges
- **SECURITY DEFINER** allows the function to bypass RLS
- **Automatic creation** happens immediately when user is created
- **More reliable** than client-side profile creation
- **Follows Supabase best practices** for user profile management

## Alternative Solution (Not Recommended)

If you don't want to use a trigger, you could:
- Disable RLS (NOT SECURE - don't do this)
- Modify RLS policies (more complex, less secure)
- Use a service role key (not recommended for client-side)

The trigger approach is the recommended and most secure solution.

