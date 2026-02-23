import { useAppStore } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "../../hooks/useHasPermission";

function DashboardPage() {
  const navigate = useNavigate();
  const logout = useAppStore((state) => state.logout);
  const currentUser = useAppStore((state) => state.currentUser);

  const canCreateUser = useHasPermission('VIEW_DASHBOARD');
//   const canCreateUser = useHasPermission('VIEW_USERS');
//   const canCreateUser = useHasPermission('DELETE_PROJECT');

  function handleLogout() {
    logout();
    navigate("/login");
    // console.log(currentUser);
    // console.log(canCreateUser);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* {currentUser?.name}  could also write below logic*/}
      <p>Welcome, {currentUser && currentUser.name}</p> 
      {canCreateUser ? 1 : 2}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
