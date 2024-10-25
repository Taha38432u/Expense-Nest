import { useState } from "react";

function TransactionFilter({
  filters,
  handleFilterChange,
  handleCategoryChange,
  categories,
}) {
  return (
    <div className="mt-6 rounded bg-gray-900 p-4">
      <h4 className="mb-2 text-lg font-semibold text-indigo-300">
        Filter Transactions
      </h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm text-gray-400">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full rounded bg-gray-600 p-2 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-400">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full rounded bg-gray-600 p-2 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-400">Min Amount</label>
          <input
            type="number"
            name="minAmount"
            value={filters.minAmount}
            onChange={handleFilterChange}
            className="w-full rounded bg-gray-600 p-2 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-400">Max Amount</label>
          <input
            type="number"
            name="maxAmount"
            value={filters.maxAmount}
            onChange={handleFilterChange}
            className="w-full rounded bg-gray-600 p-2 focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 text-sm font-semibold text-indigo-300">
          Categories
        </h4>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((categoryName) => (
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
  );
}

export default TransactionFilter;
