interface UnprotectedRouteProps {
  children: React.ReactNode;
}

// Simple wrapper that doesn't require authentication
// Unprotected route component
export const UnprotectedRoute = ({ children }: UnprotectedRouteProps) => {
  return <>{children}</>;
};

