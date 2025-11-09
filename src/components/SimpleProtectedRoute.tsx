import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface SimpleProtectedRouteProps {
  children: React.ReactNode;
}

// Simple route protection using localStorage (for when Clerk is not configured)
export const SimpleProtectedRoute = ({ children }: SimpleProtectedRouteProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Show loading while checking
  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

