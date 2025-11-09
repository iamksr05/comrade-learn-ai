import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SimpleProtectedRouteProps {
  children: React.ReactNode;
}

// Route protection using Supabase authentication
export const SimpleProtectedRoute = ({ children }: SimpleProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
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
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

