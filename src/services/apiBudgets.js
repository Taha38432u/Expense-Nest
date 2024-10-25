import supabase from "./supabase.js";

export async function getBudgets({ email }) {
  const { data, error } = await supabase
    .from("Budget")
    .select("*") // Select the desired columns
    .eq("userEmail", email); // Filter Categories by user email

  if (error) {
    console.error("Error fetching Categories:", error);
    return []; // Return an empty array on error
  }

  return data; // Return the retrieved Categories
}

export async function insertBudget(
  name,
  totalAmount,
  startDate,
  endDate,
  userEmail,
) {
  const { data, error } = await supabase
    .from("Budget")
    .insert([{ name, totalAmount, startDate, endDate, userEmail }])
    .select();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function updateBudgetWithTransaction(id, spentAmount, userEmail) {
  const { data, error } = await supabase
    .from("Budget")
    .update({ spentAmount })
    .eq("id", id) // First condition
    .eq("userEmail", userEmail) // Second condition
    .select();

  if (error) {
    console.error(error.message);
    return []; // Return an empty array on error
  }
  return data;
}

export async function updateBudget(
  id,
  name,
  totalAmount,
  startDate,
  endDate,
  userEmail,
) {
  const { data, error } = await supabase
    .from("Budget")
    .update({ name, totalAmount, startDate, endDate })
    .eq("id", id) // First condition
    .eq("userEmail", userEmail) // Second condition
    .select();

  if (error) {
    console.error(error.message);
    return []; // Return an empty array on error
  }
  return data;
}

export async function toggleBudgetActive(id, active, userEmail) {
  const { data, error } = await supabase
    .from("Budget")
    .update({ active }) // Only update the `active` field
    .eq("id", id)
    .eq("userEmail", userEmail)
    .select();

  if (error) {
    console.error(error.message);
    return []; // Return an empty array on error
  }
  return data;
}

export async function deleteBudget(id, userEmail) {
  const { data, error } = await supabase
    .from("Budget")
    .delete()
    .eq("id", id)
    .eq("userEmail", userEmail);

  if (error) {
    console.error(error.message);
  }
}
