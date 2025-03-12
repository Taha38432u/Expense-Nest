import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import { useMainNav } from "./MainNavContext.jsx";

function AppLayout() {
  const { isOpen, setOpen } = useMainNav();

  return (
    <div
      className={`grid h-screen duration-300 ${isOpen ? "grid-cols-[15rem_1fr]" : "grid-cols-[3rem_1fr]"} `}
    >
      <Sidebar isOpen={isOpen} setOpen={setOpen} />
      <main className="bg-gray-900 ">
        <div
          className={`mx-auto min-h-screen max-w-7xl px-12 pb-12`}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
