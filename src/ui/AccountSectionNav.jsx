import LinkContainer from "./NavLink.jsx";
import { HiLockClosed, HiUserCircle, HiUsers } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import { useMainNav } from "./MainNavContext.jsx";
import { useLogout } from "../features/Authentication/useLogout.js";

function AccountSectionNav() {
  const {
    handleSubLinkClick,
    activeLink,
    showAccount,
    setShowAccount,
    setActiveLink,
    isOpen,
  } = useMainNav();
  const { isLoading, logout } = useLogout();
  return (
    <li>
      <LinkContainer
        // to="/account/change-username"
        onLinkClick={() => {
          setShowAccount((prev) => !prev);
          setActiveLink("account");
        }} // Corrected
        activeLink={activeLink}
        compareValue="account"
      >
        <HiUsers className="h-6 w-6 text-gray-400 transition-all duration-300" />
        <span className={`${!isOpen && "hidden"}`}>Account</span>
      </LinkContainer>

      {showAccount && (
        <ul className="ml-8 flex flex-col gap-2 border-l-2 border-gray-500 pl-3">
          <li className="mt-4">
            <LinkContainer
              to="/account/change-username"
              onLinkClick={() => handleSubLinkClick("account/change-username")}
              activeLink={activeLink}
              compareValue="account/change-username"
            >
              <HiUserCircle className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Change Username</span>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer
              to="/account/change-password"
              onLinkClick={() => handleSubLinkClick("account/change-password")}
              activeLink={activeLink}
              compareValue="account/change-password"
            >
              <HiLockClosed className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Change Password</span>
            </LinkContainer>
          </li>
          <li>
            <button
              onClick={logout}
              className={`flex items-center gap-3 rounded-md px-6 py-3 text-lg font-bold transition-all duration-300 ${
                isLoading
                  ? "bg-gray-500 text-gray-300"
                  : "text-gray-100 hover:bg-gray-700"
              }`}
              disabled={isLoading}
            >
              <HiLogout className="h-6 w-6 text-gray-400 transition-all duration-300" />
              <span className={`${!isOpen && "hidden"}`}>Log Out</span>
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}

export default AccountSectionNav;
