import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { formattedAmount } from "../Filter/GetUserOptions";

function BudgetSummary({
  budget,
  mostFrequentCategory,
  totalAmount,
  categoryCounts,
}) {
  return (
    <div className="mt-4 transform rounded-lg bg-gray-900 p-6 shadow-lg transition-transform">
      <h2 className="mb-4 text-2xl font-bold text-indigo-400">
        Budget Summary
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <FaClipboardList className="mr-2 text-indigo-300" />
          <p>
            <strong className="text-indigo-300">Budget Name:</strong>{" "}
            {budget.name}
          </p>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-indigo-300" />
          <p>
            <strong className="text-indigo-300">Total Budget:</strong>{" "}
            {formattedAmount(budget.totalAmount)}
          </p>
        </div>
        <div className="flex items-center">
          <FaMoneyBillWave className="mr-2 text-indigo-300" />
          <p>
            <strong className="text-indigo-300">Total Spent (Filtered):</strong>{" "}
            {formattedAmount(budget.spentAmount)}
          </p>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-300" />
          <p>
            <strong className="text-indigo-300">Start Date:</strong>{" "}
            {new Date(budget.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-indigo-300" />
          <p>
            <strong className="text-indigo-300">End Date:</strong>{" "}
            {new Date(budget.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center">
          <span
            className={`h-2 w-2 rounded-full ${budget.active ? "bg-green-400" : "bg-red-400"} mr-2`}
          />
          <p>
            <strong className="text-indigo-300">Status:</strong>{" "}
            {budget.active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 text-lg font-semibold text-indigo-400">
          Summary Details
        </h3>
        <div className="rounded bg-gray-900">
          <p className="mb-3 flex items-center">
            <FaClipboardList className="mr-2 text-indigo-300" />
            <strong className="mr-1 text-indigo-300">
              Most Frequent Category:
            </strong>{" "}
            {mostFrequentCategory || "N/A"}
          </p>
          <p className="mb-3 flex items-center">
            <FaMoneyBillWave className="mr-2 text-indigo-300" />
            <strong className="mr-1 text-indigo-300">
              Total Filtered Amount:
            </strong>{" "}
            {formattedAmount(totalAmount)}
          </p>
          <div className="mt-2">
            <strong className="text-lg text-indigo-300">
              Category Breakdown:
            </strong>
            <ul className="mt-2 space-y-1">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <li key={category} className="text-md font-semibold text-white">
                  {category}: {count} transaction{count > 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSummary;
