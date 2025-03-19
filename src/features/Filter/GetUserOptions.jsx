import { useState, useEffect, useCallback } from "react";
import useTransactions from "../Transactions/useTransactions.js";
import Spinner from "../../ui/Spinner";
import TransactionItem from "../Transactions/TransactionItem.jsx";
import { GetUserDetails } from "../Authentication/useDetailsUser";

export function formattedAmount(amount) {
  // Format amount in PKR
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0, // Remove decimals (₨1,234 instead of ₨1,234.00)
  }).format(amount);
}

function GetUserOptions() {
  const { email } = GetUserDetails();
  const { transactions, isLoading } = useTransactions(email);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    selectedCategories: [],
  });

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryName) => {
    setFilters((prevFilters) => {
      const isSelected = prevFilters.selectedCategories.includes(categoryName);
      return {
        ...prevFilters,
        selectedCategories: isSelected
          ? prevFilters.selectedCategories.filter((cat) => cat !== categoryName)
          : [...prevFilters.selectedCategories, categoryName],
      };
    });
  };

  const applyFilters = useCallback(() => {
    const { startDate, endDate, minAmount, maxAmount, selectedCategories } =
      filters;

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      const isWithinDateRange =
        (!startDate || transactionDate >= new Date(startDate)) &&
        (!endDate || transactionDate <= new Date(endDate));
      const isWithinAmountRange =
        (!minAmount || transaction.amount >= parseFloat(minAmount)) &&
        (!maxAmount || transaction.amount <= parseFloat(maxAmount));
      const isCategorySelected =
        selectedCategories.length === 0 ||
        selectedCategories.includes(transaction.categoryName);

      return isWithinDateRange && isWithinAmountRange && isCategorySelected;
    });

    // setFilteredTransactions(filtered);
    return filtered;
  }, [filters, transactions]);

  const calculateSummary = () => {
    const categoryCounts = {};
    let totalAmount = 0;

    filteredTransactions?.forEach((transaction) => {
      totalAmount += transaction.amount;
      if (categoryCounts[transaction.categoryName]) {
        categoryCounts[transaction.categoryName]++;
      } else {
        categoryCounts[transaction.categoryName] = 1;
      }
    });

    const mostFrequentCategory =
      Object.keys(categoryCounts).length > 0
        ? Object.keys(categoryCounts).reduce((a, b) =>
            categoryCounts[a] > categoryCounts[b] ? a : b,
          )
        : null;

    return { mostFrequentCategory, totalAmount, categoryCounts };
  };

  useEffect(() => {
    if (!isLoading) {
      const newFilteredTransactions = applyFilters();

      // Avoid unnecessary state updates
      setFilteredTransactions((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(newFilteredTransactions)) {
          return newFilteredTransactions;
        }
        return prev;
      });
    }
  }, [applyFilters, isLoading]);
  // ✅ Dependencies are now only filters and transactions

  if (isLoading) return <Spinner />;

  const { mostFrequentCategory, totalAmount, categoryCounts } =
    calculateSummary();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <h1 className="mb-8 mt-8 text-center text-2xl font-bold text-indigo-300 md:text-4xl">
        Manage Your Transactions
      </h1>

      {/* First Section: Filter Options */}
      <div className="mb-8 rounded-lg bg-gray-800 p-6 text-white shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
          Filter Transactions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full rounded bg-gray-700 p-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-400">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full rounded bg-gray-700 p-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Min Amount
            </label>
            <input
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
              className="w-full rounded bg-gray-700 p-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Max Amount
            </label>
            <input
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
              className="w-full rounded bg-gray-700 p-2 focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-indigo-300">
            Categories
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from(
              new Set(
                transactions.map((transaction) => transaction.categoryName),
              ),
            ).map((categoryName) => (
              <label key={categoryName} className="flex items-center">
                <input
                  type="checkbox"
                  value={categoryName}
                  checked={filters.selectedCategories.includes(categoryName)}
                  onChange={() => handleCategoryChange(categoryName)}
                  className="mr-2 h-4 w-4 rounded bg-gray-600 text-indigo-300 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-400">{categoryName}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Second Section: Filtered Results */}
      <div className="rounded-lg bg-gray-800 p-6 text-white shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-indigo-300">
          Filtered Results
        </h2>

        {/* Most Frequent Category */}
        <p className="mb-2">
          <strong>Most Frequent Category:</strong>{" "}
          {mostFrequentCategory || "N/A"}
        </p>

        {/* Total Amount */}
        <p className="mb-2">
          <strong>Total Filtered Amount:</strong> {formattedAmount(totalAmount)}
        </p>

        {/* Category Counts */}
        <div className="mt-4">
          <h3 className="mb-2 text-lg font-semibold text-indigo-300">
            Category Breakdown
          </h3>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <p key={category} className="text-md">
              <span className="font-extrabold text-slate-950">
                {" "}
                {category}:{" "}
              </span>{" "}
              {count}
            </p>
          ))}
        </div>

        {/* List of Filtered Transactions */}
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-semibold text-indigo-300">
            Filtered Transactions
          </h3>
          <ul className="grid grid-cols-1 gap-4">
            {filteredTransactions?.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                id={transaction.id}
                userEmail={transaction.userEmail}
                amount={transaction.amount}
                categoryName={transaction.categoryName}
                description={transaction.description}
                transactionDate={transaction.transactionDate}
                isEdit={false}
                filtered={true}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GetUserOptions;
