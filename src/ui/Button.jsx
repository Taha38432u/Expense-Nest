import { NavLink } from "react-router-dom";

function Button({
  content,
  type = "button-primary",
  to,
  disabled,
  handleClick = () => {}, // Change default value to an empty function
}) {
  if (type === "link") {
    return (
      <NavLink
        to={to}
        className={
          "block w-full rounded-lg bg-blue-500 px-4 py-2 text-center font-semibold text-white shadow-md duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        }
      >
        {content}
      </NavLink>
    );
  }

  if (type === "button-edit") {
    return (
      <button
        disabled={disabled}
        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-blue-500"
        onClick={handleClick}
      >
        {content} {/* Updated to show dynamic content */}
      </button>
    );
  }

  if (type === "button-delete") {
    return (
      <button
        disabled={disabled}
        className="rounded bg-red-600 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-red-500"
        onClick={handleClick}
      >
        {content} {/* Updated to show dynamic content */}
      </button>
    );
  }

  return (
    <button
      disabled={disabled} // Conditionally add disabled attribute
      className={`w-full rounded-lg px-4 py-2 font-semibold text-white shadow-md duration-200 ${
        disabled
          ? "cursor-not-allowed bg-gray-400" // Disabled styles for button
          : ` ${type === "button-primary-red" ? "focus:ring-opacity-75` bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400" : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"}`
      }`}
      onClick={handleClick} // Ensure onClick is assigned here as well
    >
      {content}
    </button>
  );
}

export default Button;
