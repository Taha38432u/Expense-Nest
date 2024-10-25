import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toggleBudgetActive as toggleBudgetActiveApi } from "../../services/apiBudgets.js";

export default function useToggleBudgetActive() {
  const queryClient = useQueryClient();

  const { mutate: toggleBudgetActive, isPending: isToggling } = useMutation({
    mutationFn: ({ id, active, userEmail }) =>
      toggleBudgetActiveApi(id, active, userEmail),
    onSuccess: () => {
      toast.success(`Budget active state toggled successfully`);
      queryClient.invalidateQueries({
        queryKey: [`budgets`],
      });
    },
    onError: () => {
      toast.error(`Failed to toggle budget active state`);
    },
  });

  return { toggleBudgetActive, isToggling };
}
