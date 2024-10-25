import { FaLeaf } from "react-icons/fa"; // Importing a leaf icon

function Logo() {
  return (
    <div className="flex items-center space-x-3">
      {/* Icon */}
      <FaLeaf className="h-10 w-10 text-green-500" />

      {/* Text */}
      <span className="text-3xl font-bold tracking-wide text-gray-100">
        Expense <span className="text-green-400">Nest</span>
      </span>
    </div>
  );
}

export default Logo;
