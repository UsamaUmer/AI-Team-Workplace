import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../app/store";

function Topbar() {
  const navigate = useNavigate();

  const currentUser = useAppStore((state) => state.currentUser);
  const logout = useAppStore((state) => state.logout);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div
      style={{
        padding: "10px",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        Welcome, {currentUser?.name} ({currentUser?.role})
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Topbar;
