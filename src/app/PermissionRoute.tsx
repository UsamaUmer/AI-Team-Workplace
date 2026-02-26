import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useHasPermission } from "../hooks/useHasPermission";
import type { Permission } from "../constants/permissions";

interface PermissionRouteProps {
  permission: Permission;
  children: ReactNode;
}

function PermissionRoute({ permission, children }: PermissionRouteProps) {
  const hasPermission = useHasPermission(permission);

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default PermissionRoute;
