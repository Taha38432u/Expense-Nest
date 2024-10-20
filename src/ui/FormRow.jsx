function FormRow({ label, error, children }) {
  return (
    <div className={"mb-6"}>
      {label && (
        <label className={"mb-4 block font-semibold text-gray-100"}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={"text-sm text-red-600"}>{error}</span>}
    </div>
  );
}

export default FormRow;
