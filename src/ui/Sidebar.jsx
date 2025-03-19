import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import { FaAngleLeft } from "react-icons/fa";

function Sidebar({ isOpen, setOpen }) {
  return (
    <div className="relative flex flex-col items-center gap-12 bg-gray-800 px-9 py-7 lg:px-14">
      <Logo isOpen={isOpen} />
      <FaAngleLeft
        className={`absolute -right-4 top-8 cursor-pointer rounded-full border text-2xl text-blue-800 duration-300 ${
          !isOpen && "rotate-180"
        }`}
        onClick={() => setOpen(!isOpen)}
      />
      <MainNav />
    </div>
  );
}

export default Sidebar;
