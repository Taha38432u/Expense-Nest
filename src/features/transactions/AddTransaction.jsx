import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../authentication/useUser.js";
import useCategories from "../categories/useCategories.js";
import Loading from "../../ui/Loading.jsx";
import useNewTransaction from "./useInsertTransaction.js"; // Adjust the import path as necessary

function AddTransaction() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { isLoading, categories } = useCategories(email); // Fetch categories
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { insertTransaction, isInserting } = useNewTransaction(); // Insert transaction logic

  if (isLoading) return <Loading />;

  async function onSubmit({ categoryName, amount, description }) {
    // Insert the transaction
    insertTransaction({
      categoryName,
      amount: Number(amount),
      description,
      userEmail: email,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Select input for Category */}
          <FormRow label="Category" error={errors?.categoryId?.message}>
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
