import LinkContainer from "./NavLink.jsx";
import { HiFunnel } from "react-icons/hi2";
import { useMainNav } from "./MainNavContext.jsx";

function FilterSectionNav() {
  const { handleLinkClick, activeLink, isOpen } = useMainNav();
  return (
    <li>
      <LinkContainer
        to="/filter"
        onLinkClick={() => handleLinkClick("filter")}
        activeLink={activeLink}
        compareValue="filter"
      >
        <HiFunnel className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span className={`${!isOpen && "hidden"}`}>Filter</span>
      </LinkContainer>
    </li>
  );
}

export default FilterSectionNav;
