import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiCategories.js";

export default function useCategories(email) {
  const {
    isLoading,
    data: categories,
    error,
  } = useQuery({
    queryKey: [`categories`, email], // Add email to the queryKey to ensure it refetches when the email changes
    queryFn: () => getCategories({ email }), // Pass the email when calling getCategories
    enabled: !!email, // Ensure the query is enabled only when email is available
  });

  return { isLoading, categories, error };
}
