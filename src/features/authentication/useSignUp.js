import { signUp as signUpApi } from "../../services/apiAuth.js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UseSignUp() {
  const { mutate: signUp, isPending: isAdding } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify your email to complete the registration.",
      );
    },
    onError: (error) => {
      // Check if the error message is about an existing email
      toast.error("Account could not be created due to an error.");
    },
  });

  return { isAdding, signUp };
}

export default UseSignUp;
