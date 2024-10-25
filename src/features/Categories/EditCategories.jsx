import useCategories from "./useCategories.js";
import Loading from "../../ui/Loading.jsx";
import { GetUserDetails } from "../Authentication/useDetailsUser.js";
import CategoryItem from "./CategoryItem"; // Ensure this is correctly imported

function EditCategories() {
  const { email } = GetUserDetails(); // Get user details
  const { isLoading, categories } = useCategories(email); // Fetch Categories

  if (isLoading) return <Loading />;

  if (!categories || categories.length === 0) {
    return (
      <h1 className="mb-8 mt-16 flex h-screen justify-center text-center text-3xl font-bold text-red-500">
        No Categories Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-white">
        Edit Categories
      </h1>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            categoryName={category.categoryName}
            isEdit={true}
          />
        ))}
      </ul>
    </div>
  );
}

export default EditCategories;
