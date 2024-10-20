import { Outlet } from "react-router-dom";
import useUser from "../features/authentication/useUser.js";

function Account() {
  const { user } = useUser();
  const { fullName } = user.user_metadata;
  return (
    <>
      <h1 className="text-center text-6xl font-bold">Account</h1>
      <h2 className="mt-4 text-center text-xl font-semibold">
        Hello, {fullName}
      </h2>
      <Outlet />
    </>
  );
}

export default Account;
