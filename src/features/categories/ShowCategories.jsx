import useCategories from "./useCategories.js";
import Loading from "../../ui/Loading.jsx";
import { GetUserDetails } from "../authentication/useDetailsUser.js";
import CategoryItem from "./CategoryItem"; // Ensure this is correctly imported

function ShowCategories() {
  const { email } = GetUserDetails(); // Get user details
  const { isLoading, categories } = useCategories(email); // Fetch categories

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-white">
        All Categories
      </h1>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            categoryName={category.categoryName}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShowCategories;
