import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import { useForm } from "react-hook-form";
import useLogIn from "./useLogIn.js";

function SignupForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { login, isLoading } = useLogIn();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  function onError(error) {}

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <p className="mb-8 text-center text-lg font-semibold text-gray-100">
          Please Log in your account
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow label="Email" error={errors?.email?.message}>
            <input
              className={"input"}
              placeholder="Enter your email"
              type="email"
              id="email"
              {...register(`email`, {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
          </FormRow>

          <FormRow label={"Password"} error={errors?.password?.message}>
            <input
              className="input"
              placeholder="Enter your password"
              type="password"
              id="password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
          </FormRow>

          <FormRow label="Log in">
            <Button content={"Log in"} disabled={isLoading} />
          </FormRow>

          <FormRow label="Register?">
            <Button content={"Sign Up"} type="link" to="/signup" />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
