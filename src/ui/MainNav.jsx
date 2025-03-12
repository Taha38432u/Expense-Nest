import HomeSectionNav from "./HomeSectionNav.jsx";
import ExpenseSectionNav from "./ExpenseSectionNav.jsx";
import CategoriesSectionNav from "./CategoriesSectionNav.jsx";
import FilterSectionNav from "./FilterSectionNav.jsx";
import AccountSectionNav from "./AccountSectionNav.jsx";
import BudgetSectionNav from "./BudgetSectionNav.jsx";

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <HomeSectionNav />
        <ExpenseSectionNav />
        <CategoriesSectionNav />
        <BudgetSectionNav />
        <FilterSectionNav />
        <AccountSectionNav />
      </ul>
    </nav>
  );
}

export default MainNav;
