interface UnprotectedRouteProps {
  children: React.ReactNode;
}

// Simple wrapper that doesn't require authentication
// Used when Clerk is not configured
export const UnprotectedRoute = ({ children }: UnprotectedRouteProps) => {
  return <>{children}</>;
};

