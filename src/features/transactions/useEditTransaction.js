import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTransaction as editTransactionApi } from "../../services/apiTransactions.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditTransaction() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: editTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({ categoryName, userEmail, amount, description, id }) =>
      editTransactionApi(categoryName, userEmail, amount, description, id),
    onSuccess: () => {
      toast.success(`Transaction updated successfully`);
      queryClient.invalidateQueries({
        queryKey: [`transactions`],
      });
      navigate(-1);
    },
    onError: () => {
      toast.error(`Transaction cannot be updated due to an error`);
    },
  });

  return { editTransaction, isUpdating };
}
