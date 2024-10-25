import MainHeading from "../ui/MainHeading.jsx";
import { Outlet } from "react-router-dom";

function Budget() {
  return (
    <>
      <MainHeading content={"Budget"} />
      <Outlet />
    </>
  );
}

export default Budget;
