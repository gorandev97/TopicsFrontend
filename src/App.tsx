// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { TopicPage } from "./pages/TopicPage";
import { ToastContainer } from "react-toastify";
import { UserTopicsPage } from "./pages/UserTopicsPage";
import { ProfilePage } from "./pages/ProfilePage";
import ResetPassword from "./pages/ResetPassword";
import { NotFoundPage } from "./pages/NotFoundPage";
import BackgroundPicture from "./assets/icons/bg.jpg";
import "remixicon/fonts/remixicon.css";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <div
      className="min-h-screen relative bg-cover overflow-x-hidden bg-no-repeat"
      style={{
        backgroundImage: `url(${BackgroundPicture})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <main className="flex-1 min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
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
              <Route
                path="/my-topics"
                element={
                  <ProtectedRoute>
                    <UserTopicsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </Router>
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
