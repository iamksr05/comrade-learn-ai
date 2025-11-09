# Clerk Authentication Setup for React/Vite

This application uses **Clerk** for authentication with **React** and **Vite** (not Next.js).

## Installation

Clerk React SDK has been installed:
```bash
npm install @clerk/clerk-react
```

## Environment Variables Setup

1. **Get your Clerk API keys:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Navigate to **API Keys** page
   - Copy your **Publishable Key** and **Secret Key**

2. **Create `.env` file in the project root:**
   ```bash
   # .env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
   CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   ```

3. **Important Notes:**
   - For Vite, environment variables must be prefixed with `VITE_` to be accessible in the client
   - The `CLERK_SECRET_KEY` is for server-side use only (if you add API routes later)
   - Never commit `.env` files to git (already in `.gitignore`)

## Current Implementation

### 1. App.tsx
- Wrapped with `<ClerkProvider>` to provide authentication context
- Uses `VITE_CLERK_PUBLISHABLE_KEY` from environment variables

### 2. Protected Routes
- Created `ProtectedRoute` component for route protection
- Use it to wrap routes that require authentication

## Usage Examples

### Protect a Route
```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Use Authentication in Components
```tsx
import { useAuth, useUser } from "@clerk/clerk-react";

function MyComponent() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  return <div>Hello, {user?.firstName}!</div>;
}
```

### Sign In/Sign Up Buttons
```tsx
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

function AuthButtons() {
  return (
    <>
      <SignInButton />
      <SignUpButton />
      <UserButton />
    </>
  );
}
```

### Sign Out
```tsx
import { useClerk } from "@clerk/clerk-react";

function SignOutButton() {
  const { signOut } = useClerk();
  
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

## Next Steps

1. **Add your Clerk keys to `.env` file**
2. **Update pages to use Clerk authentication:**
   - Replace localStorage-based auth with Clerk
   - Use `useAuth()` and `useUser()` hooks
   - Add `ProtectedRoute` wrapper for protected pages
   - Use Clerk components for sign in/sign up

3. **Configure Clerk Dashboard:**
   - Set up redirect URLs
   - Configure authentication methods
   - Customize email templates

## Important Notes

- **This is React/Vite, NOT Next.js**
- Use `@clerk/clerk-react` (not `@clerk/nextjs`)
- Environment variables must use `VITE_` prefix
- No middleware needed (React Router handles routing)
- Use `ClerkProvider` in App.tsx (not layout.tsx)

## Resources

- [Clerk React Documentation](https://clerk.com/docs/references/react/overview)
- [Clerk Quickstart for React](https://clerk.com/docs/quickstarts/react)

