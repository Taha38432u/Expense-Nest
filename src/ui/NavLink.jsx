import { Link } from "react-router-dom";

function LinkContainer({
  to,
  children,
  onLinkClick,
  activeLink,
  compareValue,
}) {
  return (
    <Link
      to={to}
      onClick={onLinkClick}
      className={`flex items-center gap-3 rounded-md px-3 py-3 text-md font-bold transition-all duration-300 ${
        activeLink === compareValue
          ? "bg-gray-900/50 text-gray-200"
          : "text-gray-100 hover:bg-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}

export default LinkContainer;
