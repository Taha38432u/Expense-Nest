import useUser from "./useUser.js";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUpdateUser from "./useUpdateUser.js"; // Assuming you're using FormRow component for consistent styling

function ChangeUserName() {
  const { user } = useUser();
  const { fullName, email } = user.user_metadata;

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ newFullName }) {
    updateUser({ fullName: newFullName });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Update Username
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Show current full name */}
          <FormRow label="Current Full Name">
            <input
              type="text"
              className="input cursor-not-allowed bg-gray-600"
              value={fullName}
              disabled
            />
          </FormRow>

          {/* Show current email */}
          <FormRow label="Email">
            <input
              type="email"
              className="input cursor-not-allowed bg-gray-600"
              value={email}
              disabled
            />
          </FormRow>

          {/* Input for new full name */}
          <FormRow label="New Full Name" error={errors?.newFullName?.message}>
            <input
              type="text"
              className="input"
              placeholder="Enter new full name"
              {...register("newFullName", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Full name must be at least 3 characters",
                },
              })}
            />
          </FormRow>

          {/* Submit button */}
          <FormRow>
            <Button
              content="Update Full Name"
              type="submit"
              disabled={isUpdating}
            />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default ChangeUserName;
