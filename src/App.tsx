import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SimpleProtectedRoute } from "@/components/SimpleProtectedRoute";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Hub from "./pages/Hub";
import CourseGenerator from "./pages/CourseGenerator";
import LearningModule from "./pages/LearningModule";
import AICompanion from "./pages/AICompanion";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Create QueryClient outside component to prevent recreation on re-renders
// This ensures proper cache management during browser navigation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/onboarding" 
                  element={
                    <SimpleProtectedRoute>
                      <Onboarding />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <SimpleProtectedRoute>
                      <Dashboard />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/hub" 
                  element={
                    <SimpleProtectedRoute>
                      <Hub />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/course-generator" 
                  element={
                    <SimpleProtectedRoute>
                      <CourseGenerator />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/learning/:id" 
                  element={
                    <SimpleProtectedRoute>
                      <LearningModule />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/ai-companion" 
                  element={
                    <SimpleProtectedRoute>
                      <AICompanion />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <SimpleProtectedRoute>
                      <Settings />
                    </SimpleProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <SimpleProtectedRoute>
                      <Profile />
                    </SimpleProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
