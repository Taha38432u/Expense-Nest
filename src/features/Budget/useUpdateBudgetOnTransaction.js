import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateBudgetWithTransaction as updateBudgetApi } from "../../services/apiBudgets.js";

export default function useUpdateBudgetWithTransaction() {
  const queryClient = useQueryClient();
  const { mutate: updateBudget, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, spentAmount, userEmail }) =>
      updateBudgetApi(id, spentAmount, userEmail),
    onSuccess: () => {
      toast.success(`Budget Updated successfully`);
      queryClient.invalidateQueries({
        queryKey: [`budgets`],
      });
    },
    onError: () => {
      toast.error(`Budget cannot be updated due to an error`);
    },
  });

  return { updateBudget, isUpdating };
}
