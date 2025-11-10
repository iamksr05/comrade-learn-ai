import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRef, useEffect } from "react";

interface SimpleProtectedRouteProps {
  children: React.ReactNode;
}

// Route protection using Supabase authentication
export const SimpleProtectedRoute = ({ children }: SimpleProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const hasRedirectedRef = useRef(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reset redirect flag when location changes (browser back/forward)
  useEffect(() => {
    hasRedirectedRef.current = false;
  }, [location.pathname]);

  // Only show loading spinner if we're actually waiting for auth AND it's taking too long
  // This prevents the spinner from showing during normal navigation
  useEffect(() => {
    if (loading) {
      // Only show loading if it takes more than 100ms (normal navigation is instant)
      loadingTimeoutRef.current = setTimeout(() => {
        // The loading state will be handled by the condition below
      }, 100);
    } else {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    }

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [loading]);

  // Only show loading if:
  // 1. We're actually loading AND
  // 2. We don't have a user (not just profile loading)
  // This ensures we don't show loading during normal navigation when auth is already established
  const shouldShowLoading = loading && !user;

  if (shouldShowLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  // Use replace: false to preserve browser history for back button
  if (!user && !hasRedirectedRef.current) {
    hasRedirectedRef.current = true;
    // Store the attempted location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace={false} />;
  }

  // Prevent rendering children if redirecting
  if (!user) {
    return null;
  }

  return <>{children}</>;
};

