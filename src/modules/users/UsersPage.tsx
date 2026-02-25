import UsersTable from "./components/UsersTable";
import { useEffect } from "react";

import { useHasPermission } from "../../hooks/useHasPermission";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const navigate = useNavigate();
  const canViewUsers = useHasPermission("VIEW_USERS");

  useEffect(() => {
    if (!canViewUsers) {
      navigate("/dashboard");
    }
  }, [canViewUsers, navigate]);

  if (!canViewUsers) return null;
  
  return (
    <div>
      <h2>Users</h2>
      <UsersTable></UsersTable>
    </div>
  );
}

export default UsersPage;
