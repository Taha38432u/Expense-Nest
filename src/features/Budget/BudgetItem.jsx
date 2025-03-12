import { useState, useEffect, useMemo } from "react";
import TransactionFilter from "./TransactionFilter";
import TransactionList from "./TransactionList";
import BudgetSummary from "./BudgetSummary";
import ActionButtons from "./ActionButtons";
import {  formattedAmount } from "../Filter/GetUserOptions";

function BudgetItem({
  budget,
  showMore,
  toggleDetails,
  handleEdit,
  handleDelete,
  handleActivate,
  transactions,
  isToggling,
}) {
  const budgetTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      const startDate = new Date(budget.startDate);
      const endDate = new Date(budget.endDate);

      // Check if the transaction belongs to the Budget and falls between the start and end date
      return (
        transaction.budgetId === budget.id &&
        transactionDate >= startDate &&
        transactionDate <= endDate
      );
    });
  }, [transactions, budget.id, budget.startDate, budget.endDate]);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    selectedCategories: [],
  });

  const [filteredTransactions, setFilteredTransactions] =
    useState(budgetTransactions);

  // Apply filters only when filters or budgetTransactions change
  useEffect(() => {
    applyFilters();
  }, [filters, budgetTransactions]);

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

  const applyFilters = () => {
    const { startDate, endDate, minAmount, maxAmount, selectedCategories } =
      filters;

    const filtered = budgetTransactions.filter((transaction) => {
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

    setFilteredTransactions(filtered);
  };

  // Memoize the summary calculations to avoid unnecessary recomputations
  const { mostFrequentCategory, totalAmount, categoryCounts } = useMemo(() => {
    const categoryCounts = {};
    let totalAmount = 0;

    filteredTransactions.forEach((transaction) => {
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
  }, [filteredTransactions]);

  return (
    <div
      key={budget.id}
      className="mb-4 rounded-lg bg-gray-800 p-4 text-white shadow-md"
    >
      <div className="flex flex-col">
        <div>
          <h3 className="text-xl font-semibold">{budget.name}</h3>
          <p className="text-sm text-gray-400">
            Used:{" "}
            <span
              className={`${budget.spentAmount > budget.totalAmount ? "text-red-500" : ""}`}
            >
              {formattedAmount(budget.spentAmount)}{" "}
            </span>
            / ${formattedAmount(budget.totalAmount)}
          </p>
          {budget.spentAmount > budget.totalAmount ? (
            <p className={"text-sm text-red-500"}>
              Warning: You have exceeded your budget!
            </p>
          ) : (
            ""
          )}
          <p className="text-sm text-gray-400">
            {new Date(budget.startDate).toLocaleDateString()} -{" "}
            {new Date(budget.endDate).toLocaleDateString()}
          </p>
          <p
            className={`text-sm ${budget.active ? "text-green-500" : "text-red-500"}`}
          >
            {budget.active ? "Active" : "Inactive"}
          </p>
        </div>
        <ActionButtons
          budgetId={budget.id}
          showMore={showMore[budget.id]}
          toggleDetails={toggleDetails}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleActivate={handleActivate}
          disabled={isToggling}
        />
      </div>

      {showMore[budget.id] && (
        <>
          <BudgetSummary
            budget={budget}
            mostFrequentCategory={mostFrequentCategory}
            totalAmount={totalAmount}
            categoryCounts={categoryCounts}
          />
          <TransactionFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleCategoryChange={handleCategoryChange}
            categories={Array.from(
              new Set(
                budgetTransactions.map(
                  (transaction) => transaction.categoryName,
                ),
              ),
            )}
          />
          <TransactionList transactions={filteredTransactions} />
        </>
      )}
    </div>
  );
}

export default BudgetItem;
