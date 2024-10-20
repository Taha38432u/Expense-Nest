import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCategory as insertCategoryApi } from "../../services/apiCategories.js";
import toast from "react-hot-toast";

export default function useNewCategory() {
  const queryClient = useQueryClient();
  const { mutate: insertCategory, isPending: isInserting } = useMutation({
    mutationFn: ({ categoryName, userEmail }) =>
      insertCategoryApi(categoryName, userEmail),
    onSuccess: () => {
      toast.success(`Category inserted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
    },
    onError: () => {
      toast.error(`Category cannot be inserted due to an error`);
    },
  });

  return { insertCategory, isInserting };
}
