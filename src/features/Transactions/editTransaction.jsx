import useTransactions from "./useTransactions.js";
import Spinner from "../../ui/Spinner.jsx";
import { GetUserDetails } from "../Authentication/useDetailsUser.js";
import TransactionItem from "./TransactionItem"; // Make sure this is correctly imported
import Button from "../../ui/Button.jsx";
import { useState, useEffect } from "react";

function EditTransaction() {
  const { email } = GetUserDetails();
  const { transactions, isLoading } = useTransactions(email);

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortedTransactions, setSortedTransactions] = useState([]);

  useEffect(() => {
    if (!transactions) return;

    const sorted = [...transactions].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.transactionDate) - new Date(b.transactionDate)
        : new Date(b.transactionDate) - new Date(a.transactionDate);
    });

    setSortedTransactions(sorted);
  }, [transactions, sortOrder]);

  if (isLoading) return <Spinner />;

  if (!transactions || transactions.length === 0) {
    return (
      <h1 className="mb-8 mt-16 flex h-screen justify-center text-center text-3xl font-bold text-red-500">
        No Transactions Found
      </h1>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 mt-8 text-center text-2xl font-bold text-white sm:text-3xl">
        Edit Transactions
      </h1>
      <h2 className="text-xl font-bold text-white">Sort By</h2>

      <div className="mt-3 flex flex-col items-center justify-center gap-4 md:flex-row">
        <Button
          content="Oldest First"
          className={`rounded-md px-4 py-2 text-white ${
            sortOrder === "asc"
              ? "bg-slate-500"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={sortOrder === "asc"}
          handleClick={() => setSortOrder("asc")}
        />
        <Button
          content="Newest First"
          className={`rounded-md px-4 py-2 text-white ${
            sortOrder === "desc"
              ? "bg-slate-500"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
          handleClick={() => setSortOrder("desc")}
          disabled={sortOrder === "desc"}
        />
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {sortedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            userEmail={transaction.userEmail}
            amount={transaction.amount}
            categoryName={transaction.categoryName}
            description={transaction.description}
            transactionDate={transaction.transactionDate}
            budgetId={transaction.budgetId}
            isEdit={true}
          />
        ))}
      </ul>
    </div>
  );
}

export default EditTransaction;
