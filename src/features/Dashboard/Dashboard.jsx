import useCategories from "../Categories/useCategories.js";
import useBudgets from "../Budget/useBudgets.js";
import useTransactions from "../Transactions/useTransactions.js";
import useUser from "../Authentication/useUser.js";

// Import icons
import { FaUserCircle, FaMoneyCheckAlt, FaWallet } from "react-icons/fa";
import { MdCategory, MdAttachMoney, MdLeaderboard } from "react-icons/md";
import Loading from "../../ui/Loading.jsx";

function DashboardComponent() {
  const { user } = useUser();
  const { fullName, email } = user?.user_metadata || {};
  const { categories, isLoading: isLoadingCategories } = useCategories(email);
  const { budgets, isLoading: isLoadingBudgets } = useBudgets(email);
  const { transactions, isLoading: isLoadingTransactions } =
    useTransactions(email);

  // Show loading indicator if any data is still loading
  if (isLoadingCategories || isLoadingBudgets || isLoadingTransactions) {
    return <Loading />;
  }

  // Calculate totals
  const totalCategories = categories?.length || 0;
  const totalBudgets = budgets?.length || 0;
  const totalTransactions = transactions?.length || 0;
  const totalAmount = budgets.reduce(
    (acc, budget) => acc + budget.totalAmount,
    0,
  );
  const transactionsPerCategory = categories.map((category) => ({
    name: category.categoryName,
    count: transactions.filter((t) => t.categoryName === category.categoryName)
      .length,
  }));

  return (
    <div className="min-h-screen space-y-10 bg-gray-900 p-10 text-gray-100">
      <h1 className="mb-4 text-center text-4xl font-extrabold text-blue-400">
        Welcome, {fullName}
      </h1>

      {/* User Info Section */}
      <Section title="User Information">
        <Card
          icon={<FaUserCircle size={48} />}
          label="User"
          value={fullName}
          bgColor="bg-blue-700"
        />
      </Section>

      {/* Transaction Summary Section */}
      <Section title="Transaction Summary">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<FaMoneyCheckAlt size={48} />}
            label="Total Transactions"
            value={totalTransactions}
            bgColor="bg-green-600"
          />
          <Card
            icon={<MdCategory size={48} />}
            label="Total Categories"
            value={totalCategories}
            bgColor="bg-purple-600"
          />
          <Card
            icon={<FaWallet size={48} />}
            label="Total Budgets"
            value={totalBudgets}
            bgColor="bg-yellow-600"
          />
        </div>
      </Section>

      {/* Financial Overview Section */}
      <Section title="Financial Overview">
        <Card
          icon={<MdAttachMoney size={48} />}
          label="Total Budget Amount"
          value={`$${totalAmount.toLocaleString()}`}
          bgColor="bg-teal-600"
        />
      </Section>

      {/* Transactions per Category Section */}
      <Section title="Transactions per Category">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactionsPerCategory.map(({ name, count }) => (
            <Card
              key={name}
              icon={<MdLeaderboard size={48} />}
              label={`Transactions in ${name}`}
              value={count}
              bgColor="bg-red-600"
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

// Section Component to group related cards with headings and spacing
function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="mb-2 text-2xl font-bold text-blue-200">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// Card Component for each metric
function Card({ icon, label, value, bgColor }) {
  return (
    <div
      className={`${bgColor} transform rounded-lg p-6 text-gray-100 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-white">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{label}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
