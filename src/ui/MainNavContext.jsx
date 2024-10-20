import { createContext, useContext, useState } from "react";

// Create the MainNav context
const MainNavContext = createContext();

// Custom hook to use the MainNav context
export const useMainNav = () => useContext(MainNavContext);

export function MainNavProvider({ children }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setShowCategories(false);
    setShowAccount(false);
  };

  const handleSubLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <MainNavContext.Provider
      value={{
        showCategories,
        setShowCategories,
        showAccount,
        setShowAccount,
        activeLink,
        setActiveLink,
        handleLinkClick,
        handleSubLinkClick,
      }}
    >
      {children}
    </MainNavContext.Provider>
  );
}
