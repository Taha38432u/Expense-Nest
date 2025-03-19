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
import AddCategory from "./features/Categories/AddCategory.jsx";
import EditCategories from "./features/Categories/EditCategories.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import ChangeUserName from "./features/Authentication/ChangeUserName.jsx";
import ChangePassword from "./features/Authentication/ChangePassword.jsx";
import ShowCategories from "./features/Categories/ShowCategories.jsx";
import EditCategoryForm from "./features/Categories/EditCategoryForm.jsx";
import AddTransaction from "./features/Transactions/AddTransaction.jsx";
import EditTransaction from "./features/Transactions/editTransaction.jsx";
import ShowTransactions from "./features/Transactions/showTransactions.jsx";
import EditTransactionForm from "./features/Transactions/EditTransactionForm.jsx";
import AddBudget from "./features/Budget/AddBudget.jsx";
import EditBudget from "./features/Budget/EditBudget.jsx";
import EditBudgetForm from "./features/Budget/EditBudgetForm.jsx";

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
              <Route index element={<Navigate replace to="dashboard" />} />

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
              duration: 1000,
            },
            error: {
              duration: 1000,
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
