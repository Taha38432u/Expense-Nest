import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../Authentication/useUser.js";
import useEditCategory from "./useEditCategory.js";
import { useNavigate, useParams } from "react-router-dom"; // Adjust the import path as necessary

function AddCategory() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { editCategory, isUpdating } = useEditCategory();
  const navigate = useNavigate();

  const { category: oldCategoryName } = useParams();

  async function onSubmit({ newCategoryName }) {
    editCategory({ newCategoryName, userEmail: email, oldCategoryName });
  }

  return (
    <div className="flex h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Edit Category
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input for category name */}
          <FormRow label="Category Name" error={errors?.categoryName?.message}>
            <input
              type="text"
              className="input"
              placeholder="Enter category name"
              {...register("newCategoryName", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Category name must be at least 3 characters",
                },
              })}
            />
          </FormRow>

          {/* Submit button */}
          <FormRow>
            <Button
              content="Edit Category"
              type="submit"
              disabled={isUpdating}
            />
          </FormRow>
        </form>
        <Button
          content="Cancel"
          type="button-primary-red"
          handleClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}

export default AddCategory;
