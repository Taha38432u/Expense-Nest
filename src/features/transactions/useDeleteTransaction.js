import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction as deleteTransactionApi } from "../../services/apiTransactions.js";
import toast from "react-hot-toast";

export default function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const { mutate: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: ({ userEmail, id }) => deleteTransactionApi(userEmail, id),
    onSuccess: () => {
      toast.success(`Transaction deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: [`transactions`],
      });
    },
    onError: () => {
      toast.error(`Transaction cannot be deleted due to an error`);
    },
  });

  return { deleteTransaction, isDeleting };
}
