import { Navigate } from "react-router-dom";
import { useAppStore } from "../app/store";

import { type ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRoutesProps) {
  const currentUser = useAppStore((state) => {
    return state.currentUser;
  });

  if (!currentUser || currentUser.status !== "ACTIVE") {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
