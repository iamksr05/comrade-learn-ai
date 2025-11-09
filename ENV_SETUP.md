# Environment Variables Setup for Clerk

## Important: Vite Environment Variables

Since this is a **React/Vite** application (NOT Next.js), environment variables must be prefixed with `VITE_` to be accessible in the client.

## Your Clerk Keys

You provided:
- Publishable Key: `pk_test_cHJvcGVyLW1hcm1vc2V0LTMwLmNsZXJrLmFjY291bnRzLmRldiQ`
- Secret Key: `sk_test_81cnIHVuBHQU58qYE6YKeI0dpfJHEhg2njgrVRPoYJ`

## Setup Instructions

### Step 1: Create/Update `.env` file

Create or update the `.env` file in the project root with:

```bash
# Clerk Authentication (Vite requires VITE_ prefix)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_cHJvcGVyLW1hcm1vc2V0LTMwLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_81cnIHVuBHQU58qYE6YKeI0dpfJHEhg2njgrVRPoYJ
```

### Step 2: Restart Development Server

After updating `.env` file:
1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev` again
3. The app will now use Clerk authentication

## Important Notes

### ⚠️ Variable Name Difference

- **Next.js** uses: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- **Vite/React** uses: `VITE_CLERK_PUBLISHABLE_KEY`

You MUST use `VITE_CLERK_PUBLISHABLE_KEY` for this React/Vite app!

### 🔒 Security

- `VITE_CLERK_PUBLISHABLE_KEY` - Safe to expose in client (it's public)
- `CLERK_SECRET_KEY` - Server-side only (not used in this client app, but good to have)

### ✅ Verification

After adding the keys and restarting:
1. Open browser console (F12)
2. Check for Clerk warnings/errors
3. The Welcome page should show Clerk sign-in/sign-up buttons
4. Clicking them should open Clerk's authentication modal

## Troubleshooting

### Issue: Keys not working
- Make sure variable name is `VITE_CLERK_PUBLISHABLE_KEY` (not `NEXT_PUBLIC_...`)
- Restart dev server after updating `.env`
- Check browser console for errors

### Issue: Still showing simple login
- Clear browser cache
- Restart dev server
- Verify `.env` file has correct variable name

## Next Steps

1. Add the keys to `.env` file (with correct `VITE_` prefix)
2. Restart dev server
3. Test authentication flow
4. Configure Clerk Dashboard redirect URLs:
   - Go to Clerk Dashboard → Settings → Paths
   - Add: `http://localhost:8080`
   - Add redirect URLs: `http://localhost:8080/dashboard`

