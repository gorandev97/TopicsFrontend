// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Login component
import ProtectedRoute from "./components/routing/ProtectedRoute"; // ProtectedRoute component
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { TopicPage } from "./pages/TopicPage";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-blue-200 min-h-screen relative">
      <QueryClientProvider client={queryClient}>
        <Router>
          <main className="flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/topic/:id"
                element={
                  <ProtectedRoute>
                    <TopicPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
