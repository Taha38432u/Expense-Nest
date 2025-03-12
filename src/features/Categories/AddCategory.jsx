import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import FormRow from "../../ui/FormRow.jsx";
import useUser from "../Authentication/useUser.js";
import useCategories from "./useCategories.js";
import Loading from "../../ui/Loading.jsx";
import useNewCategory from "./useInsertCategory.js"; // Adjust the import path as necessary

function AddCategory() {
  const { user } = useUser();
  const { email } = user.user_metadata;
  const { isLoading, categories } = useCategories(email);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { insertCategory, isInserting } = useNewCategory();
  if (isLoading) return <Loading />;

  async function onSubmit({ categoryName }) {
    insertCategory({ categoryName, userEmail: email });

    /* const { data, error } = await supabase
      .from("Categories")
      .insert([{ categoryName, userEmail: email }])
      .select();*/
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-xl rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-100">
          Add Category
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input for category name */}
          <FormRow label="Category Name" error={errors?.categoryName?.message}>
            <input
              type="text"
              className="input"
              placeholder="Enter category name"
              {...register("categoryName", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Category name must be at least 3 characters",
                },
                validate: {
                  checkExists: (value) => {
                    // Check if the category already exists
                    const categoryExists = categories.some(
                      (category) =>
                        category.categoryName.toLowerCase() ===
                        value.toLowerCase(),
                    );
                    return (
                      !categoryExists || "This category name already exists"
                    );
                  },
                },
              })}
            />
          </FormRow>

          {/* Submit button */}
          <FormRow>
            <Button
              content="Add Category"
              type="submit"
              disabled={isInserting}
            />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
