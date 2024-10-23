import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useLocation to get state
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../authentication/useUser.js";
import useCategories from "../categories/useCategories.js";
import Loading from "../../ui/Loading.jsx";
import useEditTransaction from "./useEditTransaction.js";

function EditTransaction() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { isLoading, categories } = useCategories(email);
  const { editTransaction, isUpdating } = useEditTransaction();
  const navigate = useNavigate();

  const { transactionId } = useParams(); // Get transactionId from the route
  const { state } = useLocation(); // Access state passed from TransactionItem

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoryName: state?.categoryName || "", // Prefill category name
      amount: state?.amount || "", // Prefill amount
      description: state?.description || "", // Prefill description
    },
  });

  const { errors } = formState;

  if (isLoading) return <Loading />;

  async function onSubmit({ categoryName, amount, description }) {
    // Insert the updated transaction
    editTransaction({
      categoryName,
      userEmail: email,
      amount: Number(amount),
      description,
      id: transactionId, // Use the transactionId to update the existing one
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
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
