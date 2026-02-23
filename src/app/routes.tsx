import LoginPage from "../modules/auth/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import DashboardPage from "../modules/dashboard/DashboardPage";
import AuthLayout from "../components/layout/AuthLayout";

import { useAppStore } from "./store";

import { Routes, Route, Navigate } from "react-router-dom";

export default function AppRoutes() {
  const currentUser = useAppStore((state) => {return state.currentUser});

  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthLayout />
          )
        }
      >
        <Route index element={<LoginPage />} />
      </Route>

      {/* PROTECTED ROUTE */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}