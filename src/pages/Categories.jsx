import { Outlet } from "react-router-dom";

function Categories() {
  return (
    <>
      <h1 className="text-center text-6xl font-semibold text-gray-100">
        Categories
      </h1>
      <Outlet />
    </>
  );
}

export default Categories;
