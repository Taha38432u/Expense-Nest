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
    isOpen,
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
        <span className={`${!isOpen && "hidden"}`}>Budgets</span>
      </LinkContainer>
      {showBudgets && (
        <ul className="ml-8 flex flex-col gap-2 border-l-2 border-gray-500 pl-3">
          <li className={"mt-4"}>
            <LinkContainer
              to="/budget/add"
              onLinkClick={() => handleSubLinkClick("budget/add")}
              activeLink={activeLink}
              compareValue="budget/add"
            >
              <HiPlusCircle className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Add Budget</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/budget/edit"
              onLinkClick={() => handleSubLinkClick("budget/edit")}
              activeLink={activeLink}
              compareValue="budget/edit"
            >
              <HiPencilSquare className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Manage Budgets</span>
            </LinkContainer>
          </li>
        </ul>
      )}
    </li>
  );
}

export default BudgetSectionNav;
