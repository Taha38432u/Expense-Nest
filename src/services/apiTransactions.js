import supabase from "./supabase.js";

export async function getTransactions({ email, page = 1, limit = 20 }) {
  const offset = (page - 1) * limit;

  // Fetch paginated transactions
  const { data, error } = await supabase
    .from("Transactions")
    .select("*")
    .eq("userEmail", email)
    .order("transactionDate", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return { transactions: [], nextPage: null, totalCount: 0 };
  }

  // Fetch total count separately (without pagination)
  const { count } = await supabase
    .from("Transactions")
    .select("*", { count: "exact", head: true }); // Get count only

  const hasMore = count > offset + limit;
  return {
    transactions: data || [],
    nextPage: hasMore ? page + 1 : null,
    totalCount: count || 0, // Get full transaction count
  };
}

export async function insertTransaction(
  categoryName,
  userEmail,
  description,
  amount,
  budgetId,
  transactionDate
) {
  const { data, error } = await supabase
    .from("Transactions")
    .insert([{ amount, description, categoryName, userEmail, budgetId, transactionDate }])
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
  budgetId,
  transactionDate,
) {
  const { data, error } = await supabase
    .from("Transactions")
    .update({
      categoryName,
      userEmail,
      amount,
      description,
      budgetId,
      transactionDate,
    })
    .eq("id", id) // First condition
    .eq("userEmail", userEmail) // Second condition
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTransaction(userEmail, id) {
  const { error } = await supabase
    .from("Transactions")
    .delete()
    .eq("id", id) // First condition
    .eq("userEmail", userEmail); // Second condition

  if (error) throw new Error(error.message);
}
