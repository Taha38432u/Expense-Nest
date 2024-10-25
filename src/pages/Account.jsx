import { Outlet } from "react-router-dom";
import useUser from "../features/Authentication/useUser.js";
import MainHeading from "../ui/MainHeading.jsx";

function Account() {
  const { user } = useUser();
  const { fullName } = user.user_metadata;
  return (
    <>
      <MainHeading content={"Account"} />
      <h2 className="mt-4 text-center text-xl font-semibold">
        Hello, {fullName}
      </h2>
      <Outlet />
    </>
  );
}

export default Account;
