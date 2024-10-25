import MainHeading from "../ui/MainHeading.jsx";
import GetUserOptions from "../features/Filter/GetUserOptions.jsx";

function Filter() {
  return (
    <>
      <MainHeading content={"Filter Transactions"} />
      <GetUserOptions />
    </>
  );
}

export default Filter;
