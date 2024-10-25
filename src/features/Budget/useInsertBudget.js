import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { insertBudget as insertBudgetApi } from "../../services/apiBudgets.js";

export default function useNewBudget() {
  const queryClient = useQueryClient();
  const { mutate: insertBudget, isPending: isInserting } = useMutation({
    mutationFn: ({ name, totalAmount, startDate, endDate, userEmail }) =>
      insertBudgetApi(name, totalAmount, startDate, endDate, userEmail),
    onSuccess: () => {
      toast.success(`Budget created successfully`);
      queryClient.invalidateQueries({
        queryKey: [`budgets`],
      });
    },
    onError: () => {
      toast.error(`Budget cannot be created due to an error`);
    },
  });

  return { insertBudget, isInserting };
}
