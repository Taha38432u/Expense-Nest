import { HiRectangleStack } from "react-icons/hi2";
import Button from "../../ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import triggerDeleteToast from "../../ui/TriggerDeleteToast.jsx";
import { GetUserDetails } from "../Authentication/useDetailsUser.js";
import useDeleteTransaction from "./useDeleteTransaction.js";
import useBudgets from "../Budget/useBudgets.js";
import useUpdateBudgetWithTransaction from "../Budget/useUpdateBudgetOnTransaction.js";

function TransactionItem({
  id,
  amount,
  categoryName,
  description,
  transactionDate,
  isEdit,
  filtered = false,
  budgetId,
}) {
  const navigate = useNavigate();
  const { deleteTransaction, isDeleting } = useDeleteTransaction();
  const { email: userEmail } = GetUserDetails();
  const { budgets } = useBudgets(userEmail);
  const { updateBudget } = useUpdateBudgetWithTransaction();

  // Format amount in PKR
  const formattedAmount = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0, // Remove decimals (₨1,234 instead of ₨1,234.00)
  }).format(amount);

  // Format date into a readable format
  const formattedDate = new Date(transactionDate).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleEditClick = () => {
    navigate(`/transactions/edit/${id}`, {
      state: {
        amount,
        categoryName,
        description,
        transactionDate,
        budgetId,
      },
    });
  };

  const handleDeleteClick = () => {
    if (budgetId !== null) {
      const selectedBudget = budgets.find((budget) => budget.id === budgetId);
      if (!selectedBudget) return;

      const updateBudgetSpentAmount = async () => {
        const updatedSpentAmount = selectedBudget.spentAmount - amount;
        await updateBudget({
          id: budgetId,
          spentAmount: updatedSpentAmount,
          userEmail,
        });
      };

      triggerDeleteToast(
        "",
        async () => {
          await deleteTransaction({ userEmail, id });
          await updateBudgetSpentAmount();
        },
        isDeleting,
        "transaction",
      );
    }

    triggerDeleteToast(
      "",
      async () => {
        await deleteTransaction({ userEmail, id });
        // await updateBudgetSpentAmount();
      },
      isDeleting,
      "transaction",
    );
  };

  return (
    <li
      className={`group relative transform rounded-lg ${
        !filtered ? "bg-gray-800" : "bg-gray-900"
      } p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
    >
      <div>
        <p className="text-lg font-semibold text-white">{formattedAmount}</p>
        <p className="text-md text-gray-400">{categoryName}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-500">Date: {formattedDate}</p>
      </div>

      <div className="absolute right-3 top-3 text-blue-900 opacity-30 transition-opacity group-hover:opacity-100">
        <HiRectangleStack className="h-10 w-10" />
      </div>

      {isEdit && (
        <div className="mt-4 flex items-center justify-start gap-2">
          <Button
            content="Edit"
            type="button-edit"
            handleClick={handleEditClick}
          />
          <Button
            content="Delete"
            type="button-delete"
            handleClick={handleDeleteClick}
          />
        </div>
      )}
    </li>
  );
}

export default TransactionItem;
