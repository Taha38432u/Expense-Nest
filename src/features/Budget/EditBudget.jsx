import { useState } from "react";
import { GetUserDetails } from "../Authentication/useDetailsUser";
import useBudgets from ".//useBudgets.js"; // Assuming you have a useBudgets hook to fetch budgets
import Spinner from "../../ui/Spinner";
import BudgetItem from "./BudgetItem.jsx";
import useTransactions from "../Transactions/useTransactions.js";
import { useNavigate } from "react-router-dom";
import useToggleBudgetActive from "./useToggleBudgetActive.js"; // Assuming you have a Spinner component for loading state
import triggerDeleteToast from "../../ui/TriggerDeleteToast.jsx";
import useDeleteBudget from "./useDeleteBudget.js";

function EditBudget() {
  const { email } = GetUserDetails();
  const { budgets, isLoading: isLoadingBudgets } = useBudgets(email);
  const { transactions, isLoading } = useTransactions(email);
  const { toggleBudgetActive, isToggling } = useToggleBudgetActive();
  const [showMore, setShowMore] = useState({}); // State to manage showMore for each Budget
  const navigate = useNavigate();
  const { deleteBudget, isDeleting } = useDeleteBudget();

  if (isLoading || isLoadingBudgets) {
    return <Spinner />;
  }

  // Toggle 'showMore' state for individual budgets
  const toggleDetails = (budgetId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [budgetId]: !prevState[budgetId],
    }));
  };

  // Handle edit action
  const handleEdit = (budgetId) => {
    const { name, totalAmount, startDate, endDate } = budgets.find(
      (budget) => budget.id === +budgetId,
    );

    navigate(`/budget/edit/${budgetId}`, {
      state: {
        name,
        totalAmount,
        startDate,
        endDate,
      },
    });
  };

  // Handle delete action
  const handleDelete = (budgetId) => {
    // Logic for deleting Budget, such as making an API call
    triggerDeleteToast(
      "",
      () => deleteBudget({ id: +budgetId, userEmail: email }),
      isDeleting,
    );
  };

  const handleActivate = (budgetId) => {
    const { active } = budgets.find((budget) => budget.id === +budgetId);
    toggleBudgetActive({
      id: Number(budgetId),
      active: !active,
      userEmail: email,
    });
  };

  // If budgets are loading, show spinner
  if (isLoadingBudgets) return <Spinner />;

  return (
    <div className="mt-16 min-h-screen">
      {/* Display all budgets */}
      {budgets.length === 0 ? (
        <p className="text-white">No budgets found.</p>
      ) : (
        budgets.map((budget) => (
          <BudgetItem
            budget={budget}
            key={budget.id}
            showMore={showMore}
            toggleDetails={toggleDetails}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleActivate={handleActivate}
            transactions={transactions}
            isToggling={isToggling}
          />
        ))
      )}
    </div>
  );
}

export default EditBudget;
