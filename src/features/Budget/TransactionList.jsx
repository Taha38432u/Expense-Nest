import TransactionItem from "../Transactions/TransactionItem.jsx";

function TransactionList({ transactions }) {
  return (
    <div className="mt-6">
      <h4 className="mb-4 text-lg font-semibold text-indigo-300">
        Budget Transactions
      </h4>
      {transactions.length > 0 ? (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              userEmail={transaction.userEmail}
              amount={transaction.amount}
              categoryName={transaction.categoryName}
              description={transaction.description}
              transactionDate={transaction.transactionDate}
              isEdit={false}
              filtered={true}
            />
          ))}
        </ul>
      ) : (
        <p>No transactions found for the selected filters.</p>
      )}
    </div>
  );
}

export default TransactionList;
