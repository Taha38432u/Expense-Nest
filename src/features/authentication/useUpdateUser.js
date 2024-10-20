import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth.js";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success(`User Details  successfully edited`);
      queryClient.invalidateQueries({
        queryKey: [`user`],
      });
    },
    onError: () => {
      toast.error(`User details cannot be edited due to an error`);
    },
  });
  return { updateUser, isUpdating };
}
