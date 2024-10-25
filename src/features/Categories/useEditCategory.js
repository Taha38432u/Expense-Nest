import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategory as editCategoryApi } from "../../services/apiCategories.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditCategory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editCategory, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCategoryName, userEmail, oldCategoryName }) =>
      editCategoryApi(newCategoryName, oldCategoryName, userEmail),
    onSuccess: () => {
      toast.success(`Category inserted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`categories`],
      });
      navigate(-1);
    },
    onError: () => {
      toast.error(`Category cannot be inserted due to an error`);
    },
  });

  return { editCategory, isUpdating };
}
