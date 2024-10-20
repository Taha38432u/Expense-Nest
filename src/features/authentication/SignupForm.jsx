import FormRow from "../../ui/FormRow.jsx";
import Button from "../../ui/Button.jsx";
import { useForm } from "react-hook-form";
import useSignUp from "./useSignUp.js";

function SignupForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: {
      fullName: "Taha Rasheed", // Default full name
      email: "rasheedtaha111@gmail.com", // Default email
      password: "Attackontitan", // Default password
      passwordConfirm: "Attackontitan", // Default password confirmation
    },
  });
  const { errors } = formState;

  const { signUp, isAdding } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password });
  }

  function onError(error) {}

  return (
    <div className="flex min-h-screen items-center justify-center p-12">
      <div className="w-full max-w-3xl rounded-lg bg-gray-800 p-8 shadow-lg">
        <p className="mb-8 text-center text-lg font-semibold text-gray-100">
          Please Sign up for an account
        </p>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <FormRow label="Full Name" error={errors?.fullName?.message}>
            <input
              className={"input"}
              placeholder="Enter your name"
              type="text"
              id="fullName"
              {...register(`fullName`, {
                required: "This field is required",
              })}
            />
          </FormRow>

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

          <FormRow
            label={" Confirm Password"}
            error={errors?.confirmPassword?.message}
          >
            <input
              className="input"
              placeholder="Confirm your password"
              type="password"
              id="confirmPassword"
              {...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
              })}
            />
          </FormRow>

          <FormRow label="Sign Up">
            <Button content={"Sign Up"} disabled={isAdding} />
          </FormRow>

          <FormRow label="Alreay a user?">
            <Button content={"Log in"} type="link" to="/login" />
          </FormRow>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
