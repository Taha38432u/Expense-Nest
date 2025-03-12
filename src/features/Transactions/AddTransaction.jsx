import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../Authentication/useUser.js";
import useCategories from "../Categories/useCategories.js";
import useNewTransaction from "./useInsertTransaction.js";
import useBudgets from "../Budget/useBudgets.js"; // Assuming this is your custom hook
import Spinner from "../../ui/Spinner.jsx";
import useUpdateBudgetWithTransaction from "../Budget/useUpdateBudgetOnTransaction.js"; // Adjust the import path as necessary

function AddTransaction() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { isLoading: isLoadingCategories, categories } = useCategories(email); // Fetch Categories
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { insertTransaction, isInserting } = useNewTransaction(); // Insert transaction logic
  const { budgets, isLoading: isLoadingBudgets } = useBudgets(email);
  const { updateBudget } = useUpdateBudgetWithTransaction();

  if (isLoadingCategories || isLoadingBudgets) return <Spinner />;

  const currentDate = new Date();

  const activeBudgets = budgets.filter((budget) => {
    const startDate = new Date(budget.startDate); // Assuming the Budget has a startDate field
    const endDate = new Date(budget.endDate); // Assuming the Budget has an endDate field

    // Check if the Budget is active, and the current date falls within the start and end dates
    return (
      budget.active === true &&
      currentDate >= startDate &&
      currentDate <= endDate
    );
  });
  // Assuming isActive is a boolean indicating the Budget's status

  async function onSubmit({ categoryName, amount, description, budgetId }) {
    if (budgetId === "none") {
      await insertTransaction({
        categoryName,
        userEmail: email,
        description,
        amount: Number(amount),
        budgetId: null, // Include the selected budgetId
      });
      return;
    }
    // Find the Budget using find instead of Filter
    const selectedBudget = budgets.find(
      (budget) => budget.id === Number(budgetId),
    );

    const spentAmount = selectedBudget.spentAmount + Number(amount);

    // Insert the transaction, including the budgetId
    await insertTransaction({
      categoryName,
      userEmail: email,
      description,
      amount: Number(amount),
      budgetId: Number(budgetId), // Include the selected budgetId
    });

    // Update the Budget with the new spent amount
    await updateBudget({
      id: budgetId,
      spentAmount,
      userEmail: email,
    });
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Select input for Category */}
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

          {/* Input for Transaction Amount */}
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

          {/* Input for Transaction Description */}
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
                required: "Please select a Budget",
              })}
            >
              <option value="none">None</option>
              {activeBudgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name} (Limit: ${budget.totalAmount})
                </option>
              ))}
            </select>
          </FormRow>

          {/* Submit button */}
          <FormRow>
            <Button
              content="Add Transaction"
              type="submit"
              disabled={isInserting}
            />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
