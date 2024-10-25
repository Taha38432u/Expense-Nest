import MainHeading from "../ui/MainHeading.jsx";
import { Outlet } from "react-router-dom";
import GetUserOptions from "../features/filter/GetUserOptions.jsx";

function Filter() {
  return (
    <>
      <MainHeading content={"Filter Transactions"} />
      <GetUserOptions />
    </>
  );
}

export default Filter;
