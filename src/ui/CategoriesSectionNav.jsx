import LinkContainer from "./NavLink.jsx";
import {
  HiPencilSquare,
  HiPlusCircle,
  HiRectangleStack,
  HiSquares2X2,
} from "react-icons/hi2";
import { useMainNav } from "./MainNavContext.jsx";

function CategoriesSectionNav() {
  const {
    handleSubLinkClick,
    activeLink,
    showCategories,
    setShowCategories,
    setActiveLink,
    isOpen,
  } = useMainNav();

  return (
    <li>
      <LinkContainer
        // to="/Categories"
        onLinkClick={() => {
          setShowCategories((prev) => !prev);
          setActiveLink("categories");
        }} // Toggle subcategories
        activeLink={activeLink}
        compareValue="categories"
      >
        <HiSquares2X2 className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span className={`${!isOpen && "hidden"}`}>Categories</span>
      </LinkContainer>

      {/* Subcategories, shown only when Categories is clicked */}
      {showCategories && (
        <ul className="ml-4 flex flex-col gap-2 border-l-2 border-gray-500">
          <li className="mt-4">
            <LinkContainer
              to="/categories/add"
              onLinkClick={() => handleSubLinkClick("categories/add")}
              activeLink={activeLink}
              compareValue="categories/add"
            >
              <HiPlusCircle className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Add Category</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/categories/edit"
              onLinkClick={() => handleSubLinkClick("categories/edit")}
              activeLink={activeLink}
              compareValue="categories/edit"
            >
              <HiPencilSquare className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Edit Category</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/categories/show"
              onLinkClick={() => handleSubLinkClick("categories/show")}
              activeLink={activeLink}
              compareValue="categories/show"
            >
              <HiRectangleStack className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>
                Show All Categories
              </span>
            </LinkContainer>
          </li>
        </ul>
      )}
    </li>
  );
}

export default CategoriesSectionNav;
