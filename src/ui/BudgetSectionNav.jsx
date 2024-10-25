import LinkContainer from "./NavLink.jsx";
import { HiBanknotes, HiPencilSquare, HiPlusCircle } from "react-icons/hi2";
import { useMainNav } from "./MainNavContext.jsx";

function BudgetSectionNav() {
  const {
    activeLink,
    showBudgets,
    handleSubLinkClick,
    setShowBudgets,
    setActiveLink,
  } = useMainNav();

  return (
    <li>
      <LinkContainer
        // to="/Budget/add"
        onLinkClick={() => {
          setShowBudgets((prev) => !prev);
          setActiveLink("budget");
        }} // Toggle subcategories
        activeLink={activeLink}
        compareValue="budget"
      >
        <HiBanknotes className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span>Budgets</span>
      </LinkContainer>
      {showBudgets && (
        <ul className="ml-8 flex flex-col gap-2">
          <li className={"mt-4"}>
            <LinkContainer
              to="/budget/add"
              onLinkClick={() => handleSubLinkClick("Budget/add")}
              activeLink={activeLink}
              compareValue="budget/add"
            >
              <HiPlusCircle className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Add Budget</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/budget/edit"
              onLinkClick={() => handleSubLinkClick("Budget/edit")}
              activeLink={activeLink}
              compareValue="budget/edit"
            >
              <HiPencilSquare className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Manage Budgets</span>
            </LinkContainer>
          </li>
        </ul>
      )}
    </li>
  );
}

export default BudgetSectionNav;
