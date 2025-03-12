import { Outlet } from "react-router-dom";
import MainHeading from "../ui/MainHeading.jsx";

function Expense() {
  return (
    <div className="min-h-screen">
      <MainHeading content={"Transactions"} />
      <Outlet />
    </div>
  );
}

export default Expense;
