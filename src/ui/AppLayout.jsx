import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[15rem_1fr]">
      <Sidebar />
      <main className="overflow-auto bg-gray-900 px-11 pt-11">
        <div className="pb-13 mx-auto min-h-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
