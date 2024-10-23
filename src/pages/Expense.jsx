import { Outlet } from "react-router-dom";
import MainHeading from "../ui/MainHeading.jsx";

function Expense() {
  return (
    <>
      <MainHeading content={"Transactions"} />
      <Outlet />
    </>
  );
}

export default Expense;
