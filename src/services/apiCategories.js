import supabase from "./supabase.js";

export async function getCategories({ email }) {
  // Query Categories for the user based on their email
  const { data, error } = await supabase
    .from("Categories")
    .select("id, userEmail, categoryName") // Select the desired columns
    .eq("userEmail", email); // Filter Categories by user email

  if (error) {
    return []; // Return an empty array on error
  }

  return data; // Return the retrieved Categories
}

export async function insertCategory(categoryName, userEmail) {
  const { data, error } = await supabase
    .from("Categories")
    .insert([{ categoryName, userEmail }])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function editCategory(
  newCategoryName,
  oldCategoryName,
  userEmail,
) {
  const { data, error } = await supabase
    .from("Categories")
    .update({ categoryName: newCategoryName })
    .eq("categoryName", oldCategoryName) // First condition
    .eq("userEmail", userEmail) // Second condition
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCategory(categoryName, userEmail) {
  const { error } = await supabase
    .from("Categories")
    .delete()
    .eq("categoryName", categoryName)
    .eq("userEmail", userEmail);

  if (error) throw new Error(error.message);
}
