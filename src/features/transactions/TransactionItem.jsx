import { HiRectangleStack } from "react-icons/hi2";
import Button from "../../ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import triggerDeleteToast from "../../ui/TriggerDeleteToast.jsx";
import { GetUserDetails } from "../authentication/useDetailsUser.js";
import useDeleteTransaction from "./useDeleteTransaction.js"; // Import useNavigate

function TransactionItem({
  id,
  amount,
  categoryName,
  description,
  transactionDate,
  isEdit,
}) {
  const navigate = useNavigate(); // Hook for navigation
  const { deleteTransaction, isDeleting } = useDeleteTransaction();
  const { email: userEmail } = GetUserDetails();

  // Format the date into a readable format
  const formattedDate = new Date(transactionDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEditClick = () => {
    // Navigate to the edit page, passing the transaction id via route
    navigate(`/transactions/edit/${id}`, {
      state: {
        amount,
        categoryName,
        description,
        transactionDate,
      },
    });
  };

  const handleDeleteClick = () => {
    triggerDeleteToast(
      "",
      () => deleteTransaction({ userEmail, id }),
      isDeleting,
      "transaction",
    );
  };

  return (
    <li className="group relative transform rounded-lg bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div>
        <p className="text-lg font-semibold text-white">${amount}</p>
        <p className="text-md text-gray-400">{categoryName}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-500">Date: {formattedDate}</p>
      </div>

      <div className="absolute right-3 top-3 text-blue-900 opacity-30 transition-opacity group-hover:opacity-100">
        <HiRectangleStack className="h-10 w-10" />
      </div>

      {isEdit && (
        <div className="mt-4 flex space-x-2">
          <Button
            content="Edit"
            type="button-edit"
            handleClick={handleEditClick} // Navigate to edit page
          />
          <Button
            content="Delete"
            type="button-delete"
            handleClick={handleDeleteClick} // Delete functionality
          />
        </div>
      )}
    </li>
  );
}

export default TransactionItem;
