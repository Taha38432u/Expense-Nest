import { createContext, useContext, useState } from "react";

// Create the MainNav context
const MainNavContext = createContext();

// Custom hook to use the MainNav context
// eslint-disable-next-line react-refresh/only-export-components
export const useMainNav = () => useContext(MainNavContext);

export function MainNavProvider({ children }) {
  const [showCategories, setShowCategories] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showBudgets, setShowBudgets] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setShowCategories(false);
    setShowAccount(false);
    setShowTransactions(false);
    setShowBudgets(false);
  };

  const handleSubLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <MainNavContext.Provider
      value={{
        showTransactions,
        setShowTransactions,
        showCategories,
        setShowCategories,
        showAccount,
        setShowAccount,
        showBudgets,
        setShowBudgets,
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
