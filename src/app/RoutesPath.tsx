import LoginPage from "../modules/auth/LoginPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

function RoutesPath() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout></DashboardLayout>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <DashboardLayout></DashboardLayout>
    </div>
  );
}

export default RoutesPath;
