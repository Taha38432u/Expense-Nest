import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

function Sidebar() {
  return (
    <div className="flex flex-col items-center gap-12 bg-gray-800 px-16 py-7">
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;
