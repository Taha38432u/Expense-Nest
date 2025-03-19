import { useEffect, useRef, useState } from "react";
import useTransactions from "./useTransactions.js";
import Spinner from "../../ui/Spinner.jsx";
import { GetUserDetails } from "../Authentication/useDetailsUser.js";
import TransactionItem from "./TransactionItem";
import Button from "../../ui/Button.jsx";

function EditTransaction() {
  const { email } = GetUserDetails();
  const {
    transactions,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
  } = useTransactions(email);

  const [sortOrder, setSortOrder] = useState("asc");
  const observerRef = useRef(null);

  // Sort transactions dynamically
  const sortedTransactions = [...transactions].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.transactionDate) - new Date(b.transactionDate)
      : new Date(b.transactionDate) - new Date(a.transactionDate),
  );

  // Automatically fetch the next page when scrolling near the bottom
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(); // Load next page when near bottom
        }
      },
      {
        rootMargin: "300px", // Start loading when 300px from bottom
        threshold: 0.1,
      },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <Spinner />;

  if (!transactions || transactions.length === 0) {
    return (
      <h1 className="mb-8 mt-16 flex h-screen justify-center text-center text-3xl font-bold text-red-500">
        No Transactions Found
      </h1>
    );
  }

  return (
    <div className="">
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
      <div className="mt-6 flex items-center justify-center">
        <h2 className="text-lg font-bold text-white">Showing</h2>
        <p className="ml-2 text-lg text-gray-300">
          <span className="font-semibold text-white">
            {transactions.length}
          </span>
          <span className="mx-1 text-gray-400">of</span>
          <span className="font-semibold text-white">{totalCount}</span>{" "}
          Transactions
        </p>
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

      {/* Invisible div to trigger infinite scroll earlier */}
      <div ref={observerRef} className="h-10 w-full" />

      {isFetchingNextPage && <Spinner />}
    </div>
  );
}

export default EditTransaction;
