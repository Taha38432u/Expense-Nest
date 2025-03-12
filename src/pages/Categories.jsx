import { Outlet } from "react-router-dom";
import MainHeading from "../ui/MainHeading.jsx";

function Categories() {
  return (
    <div className="min-h-screen">
      <MainHeading content={"Categories"} />
      <Outlet />
    </div>
  );
}

export default Categories;
