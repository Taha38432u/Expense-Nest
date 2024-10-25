import useUser from "./useUser.js";

export function GetUserDetails() {
  const { user } = useUser();
  const { fullName, email } = user.user_metadata;

  return { fullName, email };
}
