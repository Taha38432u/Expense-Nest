import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../Authentication/useUser.js";
import useNewBudget from "./useInsertBudget.js";
import { formatDate } from "../../utils/formatDate.js";
import { useLocation, useParams } from "react-router-dom";
import useUpdateBudget from "./useUpdateBudget.js";

function EditBudgetForm() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { updateBudget, isUpdating } = useUpdateBudget();
  const { budgetId } = useParams();
  const { state } = useLocation();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      budgetName: state.name,
      startDate: state.startDate,
      endDate: state.endDate,
      budgetAmount: state.totalAmount,
    },
  });
  const { errors } = formState;

  async function onSubmit({ budgetName, startDate, endDate, budgetAmount }) {
    // Convert startDate and endDate to Date objects
    const formattedStartDate = formatDate(new Date(startDate));
    const formattedEndDate = formatDate(new Date(endDate));

    // Insert the Budget with formatted dates
    updateBudget({
      id: Number(budgetId),
      name: budgetName,
      totalAmount: budgetAmount,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      userEmail: email,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-32">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Edit Budget
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input for Budget Name */}
          <FormRow label="Budget Name" error={errors?.budgetName?.message}>
            <input
              type="text"
              className="input"
              placeholder="Enter budget name"
              {...register("budgetName", {
                required: "Budget name is required",
                minLength: {
                  value: 3,
                  message: "Budget name must be at least 3 characters long",
                },
              })}
            />
          </FormRow>

          {/* Input for Start Date */}
          <FormRow label="Start Date" error={errors?.startDate?.message}>
            <input
              type="date"
              className="input"
              {...register("startDate", {
                required: "Start date is required",
              })}
            />
          </FormRow>

          {/* Input for End Date */}
          <FormRow label="End Date" error={errors?.endDate?.message}>
            <input
              type="date"
              className="input"
              {...register("endDate", {
                required: "End date is required",
              })}
            />
          </FormRow>

          {/* Input for Budget Amount */}
          <FormRow label="Budget Amount" error={errors?.budgetAmount?.message}>
            <input
              type="number"
              className="input"
              placeholder="Enter budget amount"
              {...register("budgetAmount", {
                required: "Budget amount is required",
                min: {
                  value: 1,
                  message: "Amount must be greater than 0",
                },
              })}
            />
          </FormRow>

          {/* Submit button */}
          <FormRow>
            <Button
              content="Update Budget"
              type="submit"
              disabled={isUpdating}
            />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default EditBudgetForm;
