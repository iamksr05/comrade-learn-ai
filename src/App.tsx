import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
