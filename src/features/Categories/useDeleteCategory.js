import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategories.js";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export default function useDeleteCategory() {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: ({ categoryName, email: userEmail }) =>
      deleteCategoryApi(categoryName, userEmail),
    onSuccess: () => {
      toast.success(`Category deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
      // navigate(-1);
    },
    onError: () => {
      toast.error(`Category cannot be deleted due to an error`);
    },
  });

  return { deleteCategory, isUpdating: isDeleting };
}
