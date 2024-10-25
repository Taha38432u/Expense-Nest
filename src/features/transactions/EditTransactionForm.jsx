import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useLocation to get state
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../authentication/useUser.js";
import useCategories from "../categories/useCategories.js";
import Loading from "../../ui/Loading.jsx";
import useEditTransaction from "./useEditTransaction.js";
import useBudgets from "../budget/useBudgets.js";
import useUpdateBudgetWithTransaction from "../budget/useUpdateBudgetOnTransaction.js";

function EditTransaction() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { isLoading, categories } = useCategories(email);
  const { editTransaction, isUpdating } = useEditTransaction();
  const { budgets, isLoading: isLoadingBudgets } = useBudgets(email);
  const { updateBudget } = useUpdateBudgetWithTransaction();
  const navigate = useNavigate();

  const { transactionId } = useParams(); // Get transactionId from the route
  const { state } = useLocation(); // Access state passed from TransactionItem
  const oldBudgetId = +state?.budgetId;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoryName: state?.categoryName || "", // Prefill category name
      amount: state?.amount || "", // Prefill amount
      description: state?.description || "", // Prefill description
    },
  });

  const { errors } = formState;

  if (isLoading || isLoadingBudgets) return <Loading />;
  const activeBudgets = budgets.filter((budget) => budget.active === true);

  async function onSubmit({ categoryName, amount, description, budgetId }) {
    let selectedBudget;
    if (budgetId !== "null") {
      selectedBudget = budgets.find((budget) => budget.id === Number(budgetId));
    } else {
      selectedBudget = {};
    }

    if (+budgetId !== oldBudgetId) {
      const newAmount = Number(amount);
      const oldBudget = budgets.find(
        (budget) => budget.id === Number(oldBudgetId),
      );

      if (!oldBudget && budgetId === "null") {
        await editTransaction({
          categoryName,
          userEmail: email,
          amount: newAmount,
          description,
          id: transactionId,
          budgetId: null,
        });
        return;
      }

      const originalAmount = +state.amount;

      if (oldBudget) {
        const updatedSpentAmount = oldBudget.spentAmount - originalAmount;
        await updateBudget({
          id: oldBudgetId,
          spentAmount: updatedSpentAmount,
          userEmail: email,
        });
      }

      const selectedBudgetSpentAmount = selectedBudget.spentAmount + newAmount;

      if (budgetId !== "null")
        await updateBudget({
          id: Number(budgetId),
          spentAmount: selectedBudgetSpentAmount,
          userEmail: email,
        });

      await editTransaction({
        categoryName,
        userEmail: email,
        amount: newAmount,
        description,
        id: transactionId, // Use the transactionId to update the existing one
        budgetId: budgetId === "null" ? null : Number(budgetId),
      });
      return;
    }

    const originalAmount = state?.amount || 0; // The original amount from state
    const newAmount = Number(amount); // The new amount from the form

    // Calculate the spent amount difference
    let spentAmountDifference = newAmount - originalAmount; // This can be negative if the new amount is lower

    // Adjust the spentAmount based on the difference
    const updatedSpentAmount =
      selectedBudget.spentAmount + spentAmountDifference;

    // Update the transaction
    await editTransaction({
      categoryName,
      userEmail: email,
      amount: newAmount,
      description,
      id: transactionId, // Use the transactionId to update the existing one
      budgetId: Number(budgetId),
    });

    // Update the budget's spentAmount with the adjusted amount
    await updateBudget({
      id: Number(budgetId),
      spentAmount: updatedSpentAmount,
      userEmail: email,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8 pb-16">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Category */}
          <FormRow label="Category" error={errors?.categoryName?.message}>
            <select
              className="input"
              {...register("categoryName", {
                required: "Please select a category",
              })}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option
                  key={category.categoryName}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </FormRow>

          {/* Amount */}
          <FormRow label="Amount" error={errors?.amount?.message}>
            <input
              type="number"
              className="input"
              placeholder="Enter transaction amount"
              {...register("amount", {
                required: "Transaction amount is required",
                min: {
                  value: 1,
                  message: "Amount must be greater than 0",
                },
              })}
            />
          </FormRow>

          {/* Description */}
          <FormRow label="Description" error={errors?.description?.message}>
            <input
              type="text"
              className="input"
              placeholder="Enter a description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Description must be at least 3 characters",
                },
              })}
            />
          </FormRow>

          {/* Select input for Budget */}
          <FormRow label="Budget" error={errors?.budgetId?.message}>
            <select
              className="input"
              {...register("budgetId", {
                required: "Please select a budget",
              })}
            >
              <option value="null">None</option>
              {activeBudgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name} (Limit: ${budget.totalAmount})
                </option>
              ))}
            </select>
          </FormRow>

          {/* Submit Button */}
          <FormRow>
            <Button
              content="Update Transaction"
              type="submit"
              disabled={isUpdating}
            />
          </FormRow>
        </form>
        <Button
          content="Go Back"
          type="button-primary-red"
          handleClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}

export default EditTransaction;
