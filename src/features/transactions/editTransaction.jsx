import useTransactions from "./useTransactions.js";
import Spinner from "../../ui/Spinner.jsx";
import { GetUserDetails } from "../authentication/useDetailsUser.js";
import TransactionItem from "./TransactionItem"; // Make sure this is correctly imported

function EditTransaction() {
  const { email } = GetUserDetails();
  const { transactions, isLoading } = useTransactions(email);

  if (isLoading) return <Spinner />;

  if (!transactions || transactions.length === 0) {
    return (
      <h1 className="mb-8 mt-16 flex h-screen justify-center text-center text-3xl font-bold text-red-500">
        No Transactions Found
      </h1>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-white">
        Edit Transactions
      </h1>
      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            userEmail={transaction.userEmail}
            amount={transaction.amount}
            categoryName={transaction.categoryName}
            description={transaction.description}
            transactionDate={transaction.transactionDate}
            isEdit={true} // If you want to enable edit functionality in the item
          />
        ))}
      </ul>
    </div>
  );
}

export default EditTransaction;
