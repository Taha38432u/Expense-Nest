import { Outlet } from "react-router-dom";
import MainHeading from "../ui/MainHeading.jsx";

function Categories() {
  return (
    <>
      <MainHeading content={"Categories"} />
      <Outlet />
    </>
  );
}

export default Categories;
