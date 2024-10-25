function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 p-12">
      <div className="max-w-lg rounded-lg bg-gray-800 p-8 text-center shadow-md">
        <h1 className="mb-4 text-2xl font-semibold text-red-600">
          Something went wrong 🧐
        </h1>
        <p className="mb-6 text-gray-100">Go back to home page</p>
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          onClick={resetErrorBoundary}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
