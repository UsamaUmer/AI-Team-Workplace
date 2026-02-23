import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h2>Dashboard Layout</h2>
      <hr></hr>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
