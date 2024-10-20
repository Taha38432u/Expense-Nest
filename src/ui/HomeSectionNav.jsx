import LinkContainer from "./NavLink.jsx";
import { HiHome } from "react-icons/hi2";
import { useMainNav } from "./MainNavContext.jsx";

function HomeSectionNav() {
  const { handleLinkClick, activeLink } = useMainNav();
  return (
    <li>
      <LinkContainer
        to="/dashboard"
        onLinkClick={() => handleLinkClick("dashboard")}
        activeLink={activeLink}
        compareValue="dashboard"
      >
        <HiHome className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span>Home</span>
      </LinkContainer>
    </li>
  );
}

export default HomeSectionNav;
