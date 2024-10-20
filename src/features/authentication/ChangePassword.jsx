import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUpdateUser from "./useUpdateUser.js"; // Assuming you're using FormRow component for consistent styling

function ChangePassword() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ newPassword }) {
    updateUser({ password: newPassword });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Change Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <FormRow label="New Password" error={errors?.newPassword?.message}>
            <input
              type="password"
              className="input"
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>

          {/* Confirm Password Field */}
          <FormRow
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
          >
            <input
              type="password"
              className="input"
              placeholder="Confirm your new password"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().newPassword || "Passwords must match",
              })}
            />
          </FormRow>

          {/* Submit button */}
          <FormRow>
            <Button
              content="Update Password"
              disabled={isUpdating}
              type="submit"
            />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
