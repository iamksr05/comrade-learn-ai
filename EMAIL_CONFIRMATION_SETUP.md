# Email Confirmation Setup Guide

## Current Email Template

Your Supabase email template looks good! It uses `{{ .ConfirmationURL }}` which is correct.

## What You Need to Configure

### Step 1: Set Redirect URL in Supabase

1. Go to **Supabase Dashboard**
2. **Authentication** → **URL Configuration**
3. Set **Redirect URLs** to include:
   ```
   http://localhost:8080/email-confirmation
   http://localhost:8080/login
   ```
   (Add your production URL when deploying)

### Step 2: Update Email Template Redirect

The email template should redirect to your app's confirmation page. The `{{ .ConfirmationURL }}` automatically includes the redirect, but you need to set it in Supabase settings.

**In Supabase Dashboard:**
1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to: `http://localhost:8080` (or your production URL)
3. Set **Redirect URLs** to include:
   - `http://localhost:8080/email-confirmation`
   - `http://localhost:8080/login`
   - `http://localhost:8080/**` (for development)

### Step 3: Verify Email Confirmation Flow

1. **User signs up** → Gets confirmation email
2. **User clicks link in email** → Redirected to `/email-confirmation?token=...&type=signup`
3. **App verifies token** → Confirms email
4. **User redirected to login** → Can now sign in

## How It Works

### Email Confirmation Page
- New page at `/email-confirmation`
- Handles the token from the email link
- Verifies the email confirmation
- Shows success/error messages
- Redirects to login on success

### Auth Context
- Listens for auth state changes
- Handles email confirmation events
- Automatically loads user profile after confirmation

## Testing

### Test the Flow

1. **Sign up** with a new email
2. **Check email** for confirmation link
3. **Click link** → Should go to `/email-confirmation`
4. **See confirmation** → Should show success message
5. **Auto-redirect** → Should go to `/login`
6. **Sign in** → Should work now

### Debug Steps

1. **Check browser console** (F12)
   - Look for "Email confirmation detected"
   - Check for any errors

2. **Check Supabase logs**
   - Go to **Logs** → **Auth Logs**
   - Look for confirmation events

3. **Verify redirect URL**
   - Make sure redirect URL in Supabase matches your app URL
   - Check that `/email-confirmation` route exists

## Common Issues

### Issue 1: Redirect URL Mismatch
**Error:** "Invalid redirect URL"
**Solution:** 
- Check Supabase → Authentication → URL Configuration
- Make sure redirect URLs include your app URL
- Add `http://localhost:8080/email-confirmation` for development

### Issue 2: Token Expired
**Error:** "Token has expired"
**Solution:**
- Tokens expire after a certain time (default 24 hours)
- Request a new confirmation email
- Or disable email confirmation for testing

### Issue 3: Not Redirecting
**Error:** Stays on confirmation page
**Solution:**
- Check browser console for errors
- Verify the token is valid
- Check if session is being established

## Disable Email Confirmation (For Testing)

If you want to test without email confirmation:

1. Go to **Supabase Dashboard**
2. **Authentication** → **Providers** → **Email**
3. **Disable "Confirm email"** (temporarily)
4. Users can sign in immediately after signup

**Remember to re-enable it for production!**

## Production Setup

When deploying to production:

1. **Update Site URL** in Supabase:
   - Set to your production URL (e.g., `https://yourapp.com`)

2. **Update Redirect URLs**:
   - Add `https://yourapp.com/email-confirmation`
   - Add `https://yourapp.com/login`

3. **Update Email Template**:
   - The template will automatically use the correct URLs
   - Test the confirmation flow in production

## Summary

✅ Email template is correct
✅ Email confirmation page created
✅ Route added to App.tsx
✅ Auth context handles confirmation
⏳ Need to configure redirect URLs in Supabase

**Next Steps:**
1. Set redirect URLs in Supabase Dashboard
2. Test the email confirmation flow
3. Check browser console for any errors

