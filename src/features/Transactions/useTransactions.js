import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions.js";

export default function useTransactions(email) {
  const {
    isLoading,
    data: transactions,
    error,
  } = useQuery({
    queryKey: [`transactions`, email], // Add email to the queryKey to ensure it re-fetches when the email changes
    queryFn: () => getTransactions({ email }), // Pass the email when calling getCategories
    enabled: !!email, // Ensure the query is enabled only when email is available
  });

  return { isLoading, transactions, error };
}
