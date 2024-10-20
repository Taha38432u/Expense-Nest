import LinkContainer from "./NavLink.jsx";
import { HiCreditCard } from "react-icons/hi2";
import { useMainNav } from "./MainNavContext.jsx";

function ExpenseSectionNav() {
  const { handleLinkClick, activeLink } = useMainNav();
  return (
    <li>
      <LinkContainer
        to="/expenses"
        onLinkClick={() => handleLinkClick("expenses")}
        activeLink={activeLink}
        compareValue="expenses"
      >
        <HiCreditCard className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span>Expenses</span>
      </LinkContainer>
    </li>
  );
}

export default ExpenseSectionNav;
