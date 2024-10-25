import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogIn() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("User is successfully logged in");
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Incorrect Email or Password"),
  });

  return { login, isLoading };
}
