// Custom Delete Confirmation Toast
function CustomDeleteToast({ message, onConfirm, onCancel, disabled }) {
  return (
    <div className="w-full max-w-sm rounded-lg bg-gray-700 p-4">
      <p className="mb-4 text-gray-100">{message}</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none"
          disabled={disabled}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default CustomDeleteToast;
