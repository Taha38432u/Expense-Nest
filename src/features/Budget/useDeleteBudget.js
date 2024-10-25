import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget as deleteBudgetApi } from "../../services/apiBudgets.js";
import toast from "react-hot-toast";

export default function useDeleteBudget() {
  const queryClient = useQueryClient();
  const { mutate: deleteBudget, isPending: isDeleting } = useMutation({
    mutationFn: ({ id, userEmail }) => deleteBudgetApi(id, userEmail),
    onSuccess: () => {
      toast.success(`Budget Deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`budgets`],
      });
    },
    onError: () => {
      toast.error(`Budget cannot be deleted due to an error`);
    },
  });

  return { deleteBudget, isDeleting };
}
