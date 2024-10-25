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
        <span>Categories</span>
      </LinkContainer>

      {/* Subcategories, shown only when Categories is clicked */}
      {showCategories && (
        <ul className="ml-8 flex flex-col gap-2">
          <li className="mt-4">
            <LinkContainer
              to="/categories/add"
              onLinkClick={() => handleSubLinkClick("Categories/add")}
              activeLink={activeLink}
              compareValue="categories/add"
            >
              <HiPlusCircle className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Add Category</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/categories/edit"
              onLinkClick={() => handleSubLinkClick("Categories/edit")}
              activeLink={activeLink}
              compareValue="categories/edit"
            >
              <HiPencilSquare className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Edit Category</span>
            </LinkContainer>
          </li>

          <li>
            <LinkContainer
              to="/categories/show"
              onLinkClick={() => handleSubLinkClick("Categories/show")}
              activeLink={activeLink}
              compareValue="categories/show"
            >
              <HiRectangleStack className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span>Show All Categories</span>
            </LinkContainer>
          </li>
        </ul>
      )}
    </li>
  );
}

export default CategoriesSectionNav;
