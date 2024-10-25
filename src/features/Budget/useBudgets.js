import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../../services/apiBudgets.js";

export default function useBudgets(email) {
  const {
    isLoading,
    data: budgets,
    error,
  } = useQuery({
    queryKey: [`budgets`, email], // Add email to the queryKey to ensure it refetches when the email changes
    queryFn: () => getBudgets({ email }), // Pass the email when calling getCategories
    enabled: !!email, // Ensure the query is enabled only when email is available
  });

  return { isLoading, budgets, error };
}
