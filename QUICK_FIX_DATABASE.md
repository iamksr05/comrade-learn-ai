# Quick Fix for Database Error

## The Problem
You're getting a database error when trying to save a new user during signup.

## The Solution
Run the improved trigger SQL that has better permissions and error handling.

## Quick Steps

### 1. Run FIX_DATABASE_ERROR.sql in Supabase

1. Open Supabase → SQL Editor → New query
2. Copy ALL content from `FIX_DATABASE_ERROR.sql`
3. Paste and Run
4. You should see "Success" message

### 2. What This Does

- ✅ Recreates the trigger function with proper permissions
- ✅ Uses `SECURITY DEFINER` to bypass RLS
- ✅ Sets `search_path = public` (important for permissions)
- ✅ Better error handling
- ✅ Grants necessary permissions

### 3. Test Again

Try signing up a new user - it should work now!

## Why This Works

The trigger function now:
- Has proper security permissions (`SECURITY DEFINER`)
- Sets the correct search path
- Has exception handling to prevent failures
- Grants proper table permissions

## If It Still Doesn't Work

1. **Check Supabase Logs**
   - Go to Dashboard → Logs → Postgres Logs
   - Look for errors related to `handle_new_user` or `user_profiles`

2. **Verify Trigger Exists**
   Run this in SQL Editor:
   ```sql
   SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```
   Should return one row.

3. **Check Function**
   Run this in SQL Editor:
   ```sql
   SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';
   ```
   Should return one row.

4. **Test the Trigger Manually**
   Create a test user in Supabase Auth and see if the profile is created automatically.

## Summary

Just run `FIX_DATABASE_ERROR.sql` in Supabase SQL Editor and try again! 🎯

