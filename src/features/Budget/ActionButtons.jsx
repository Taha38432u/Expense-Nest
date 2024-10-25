import useToggleBudgetActive from "./useToggleBudgetActive.js";

function ActionButtons({
  budgetId,
  showMore,
  toggleDetails,
  handleEdit,
  handleDelete,
  handleActivate,
  disabled,
}) {
  const { isToggling } = useToggleBudgetActive();
  return (
    <div className="flex space-x-2">
      <button
        className="rounded bg-blue-500 px-3 py-1 font-bold transition duration-300 hover:bg-blue-600"
        onClick={() => toggleDetails(budgetId)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
      <button
        className="rounded bg-yellow-500 px-3 py-1 font-bold transition duration-300 hover:bg-yellow-600"
        onClick={() => handleEdit(budgetId)}
      >
        Edit
      </button>
      <button
        className="rounded bg-red-500 px-3 py-1 font-bold transition duration-300 hover:bg-red-600"
        onClick={() => handleDelete(budgetId)}
      >
        Delete
      </button>
      <button
        className="rounded bg-green-500 px-3 py-1 font-bold transition duration-300 hover:bg-green-600"
        disabled={disabled}
        onClick={() => handleActivate(budgetId)}
      >
        Toggle Active
      </button>
    </div>
  );
}

export default ActionButtons;
