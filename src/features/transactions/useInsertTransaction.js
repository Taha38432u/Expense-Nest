import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { insertTransaction as insertTransactionApi } from "../../services/apiTransactions.js";

export default function useNewTransaction() {
  const queryClient = useQueryClient();
  const { mutate: insertTransaction, isPending: isInserting } = useMutation({
    mutationFn: ({ amount, description, categoryName, userEmail }) =>
      insertTransactionApi(categoryName, userEmail, description, amount),
    onSuccess: () => {
      toast.success(`Transaction inserted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`transactions`],
      });
    },
    onError: () => {
      toast.error(`Transaction cannot be inserted due to an error`);
    },
  });

  return { insertTransaction, isInserting };
}
