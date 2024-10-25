import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MainNavProvider } from "./ui/MainNavContext.jsx";

// Layouts and Pages
import AppLayout from "./ui/AppLayout.jsx";
import Categories from "./pages/Categories.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expense from "./pages/Expense.jsx";
import Budget from "./pages/Budget.jsx";
import Filter from "./pages/Filter.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

// Features
import AddCategory from "./features/categories/AddCategory.jsx";
import EditCategories from "./features/categories/EditCategories.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import ChangeUserName from "./features/authentication/ChangeUserName.jsx";
import ChangePassword from "./features/authentication/ChangePassword.jsx";
import ShowCategories from "./features/categories/ShowCategories.jsx";
import EditCategoryForm from "./features/categories/EditCategoryForm.jsx";
import AddTransaction from "./features/transactions/AddTransaction.jsx";
import EditTransaction from "./features/transactions/editTransaction.jsx";
import ShowTransactions from "./features/transactions/showTransactions.jsx";
import EditTransactionForm from "./features/transactions/EditTransactionForm.jsx";
import AddBudget from "./features/budget/AddBudget.jsx";
import EditBudget from "./features/budget/EditBudget.jsx";
import EditBudgetForm from "./features/budget/EditBudgetForm.jsx";

// Custom context providers

// QueryClient setup
const queryClient = new QueryClient({
  queries: {
    staleTime: 0, // Set stale time for data freshness
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Wrap entire app in MainNavProvider */}
      <MainNavProvider>
        {/* React Query DevTools for development, hidden in production */}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

        {/* BrowserRouter for managing app routes */}
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="categories" />} />

              {/* Categories and its nested routes */}
              <Route path="categories" element={<Categories />}>
                <Route path="add" element={<AddCategory />} />
                <Route path="edit" element={<EditCategories />} />
                <Route path="show" element={<ShowCategories />} />
              </Route>
              <Route path="edit/:category" element={<EditCategoryForm />} />

              {/* Other main routes */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transactions" element={<Expense />}>
                <Route path={"add"} element={<AddTransaction />} />
                <Route path={"edit"} element={<EditTransaction />} />
                <Route
                  path={"edit/:transactionId"}
                  element={<EditTransactionForm />}
                />
                <Route path={"show"} element={<ShowTransactions />} />
              </Route>

              <Route path="budget" element={<Budget />}>
                <Route path="add" element={<AddBudget />} />
                <Route path="edit" element={<EditBudget />} />
                <Route path={"edit/:budgetId"} element={<EditBudgetForm />} />
              </Route>
              <Route path="filter" element={<Filter />} />

              {/* Account and nested routes for changing username and password */}
              <Route path="account" element={<Account />}>
                <Route path="change-username" element={<ChangeUserName />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Route>

            {/* Public routes: Login and Signup */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>

        {/* React Hot Toast notifications */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: `8px` }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: `16px`,
              padding: `16px 24px`,
              maxWidth: `500px`,
              backgroundColor: `#f3f4f6`,
              color: "#4b5563",
            },
          }}
        />
      </MainNavProvider>
    </QueryClientProvider>
  );
}

export default App;
