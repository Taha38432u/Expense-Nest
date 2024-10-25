import { HiRectangleStack } from "react-icons/hi2";
import Button from "../../ui/Button.jsx";
import { useNavigate } from "react-router-dom"; // Use navigate for programmatic navigation
import triggerDeleteToast from "../../ui/TriggerDeleteToast.jsx";
import useDeleteCategory from "./useDeleteCategory.js";
import { GetUserDetails } from "../Authentication/useDetailsUser.js";

function CategoryItem({ categoryName, isEdit }) {
  const navigate = useNavigate(); // Hook for navigation
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const { email } = GetUserDetails();
  const handleEditClick = () => {
    navigate(`/edit/${categoryName}`);
  };

  const handleDeleteClick = () => {
    triggerDeleteToast(
      categoryName,
      () => handleDelete(categoryName, email),
      isDeleting,
    );
  };

  // Example delete handler (you can replace this with your actual logic)
  const handleDelete = (categoryName, email) => {
    deleteCategory({ categoryName, email });
  };

  return (
    <li className="group relative transform rounded-lg bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-white transition-all group-hover:text-blue-800">
        {categoryName}
      </h2>
      <div className="absolute right-3 top-3 text-blue-900 opacity-30 transition-opacity group-hover:opacity-100">
        <HiRectangleStack className="h-10 w-10" />
      </div>
      {isEdit && (
        <div className="mt-4 flex space-x-2">
          <Button
            content="Edit"
            type="button-edit"
            handleClick={handleEditClick} // Trigger navigation to edit form on click
          />
          <Button
            content="Delete"
            type="button-delete"
            handleClick={handleDeleteClick} // Trigger delete confirmation on click
          />
        </div>
      )}
    </li>
  );
}

export default CategoryItem;
