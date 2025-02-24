import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-[16rem] mt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
