import LinkContainer from "./NavLink.jsx";
import {
  HiCreditCard,
  HiPencilSquare,
  HiPlusCircle,
  HiRectangleStack,
} from "react-icons/hi2";
import { useMainNav } from "./MainNavContext.jsx";

function ExpenseSectionNav() {
  const {
    activeLink,
    showTransactions,
    handleSubLinkClick,
    setShowTransactions,
    setActiveLink,
  } = useMainNav();

  return (
    <li>
      <LinkContainer
        // to="/transactions/add"
        onLinkClick={() => {
          setShowTransactions((prev) => !prev);
          setActiveLink("transactions");
        }} // Toggle subcategories
        activeLink={activeLink}
        compareValue="transactions"
      >
        <HiCreditCard className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span>Transactions</span>
      </LinkContainer>
      {showTransactions && (
        <ul className="ml-8 flex flex-col gap-2">
          <li className={"mt-4"}>
            <LinkContainer
              to="/transactions/add"
              onLinkClick={() => handleSubLinkClick("transactions/add")}
              activeLink={activeLink}
              compareValue="transactions/add"
            >
              <HiPlusCircle className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Add Transaction</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/transactions/edit"
              onLinkClick={() => handleSubLinkClick("transactions/edit")}
              activeLink={activeLink}
              compareValue="transactions/edit"
            >
              <HiPencilSquare className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Edit Transaction</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/transactions/show"
              onLinkClick={() => handleSubLinkClick("transactions/show")}
              activeLink={activeLink}
              compareValue="transactions/show"
            >
              <HiRectangleStack className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Show Transactions</span>
            </LinkContainer>
          </li>
        </ul>
      )}
    </li>
  );
}

export default ExpenseSectionNav;
