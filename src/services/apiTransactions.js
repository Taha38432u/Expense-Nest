import supabase from "./supabase.js";

export async function getTransactions({ email }) {
  const { data, error } = await supabase
    .from("Transactions")
    .select("*") // Select the desired columns
    .eq("userEmail", email); // Filter categories by user email

  if (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array on error
  }

  return data; // Return the retrieved categories
}

export async function insertTransaction(
  categoryName,
  userEmail,
  description,
  amount,
) {
  console.log(description);
  const { data, error } = await supabase
    .from("Transactions")
    .insert([{ amount, description, categoryName, userEmail }])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function editTransaction(
  categoryName,
  userEmail,
  amount,
  description,
  id,
) {
  const { data, error } = await supabase
    .from("Transactions")
    .update({ categoryName, userEmail, amount, description })
    .eq("id", id) // First condition
    .eq("userEmail", userEmail) // Second condition
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTransaction(userEmail, id) {
  const { data, error } = await supabase
    .from("Transactions")
    .delete()
    .eq("id", id) // First condition
    .eq("userEmail", userEmail); // Second condition

  if (error) throw new Error(error.message);
}
