import useCategories from "../Categories/useCategories.js";
import useBudgets from "../Budget/useBudgets.js";
import useTransactions from "../Transactions/useTransactions.js";
import useUser from "../Authentication/useUser.js";
import { formattedAmount } from "../Filter/GetUserOptions";

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
    <div className="min-h-screen space-y-10 bg-gray-900 text-gray-100">
      <h1 className="mb-4 text-center text-2xl font-extrabold text-blue-400 md:text-4xl">
        Welcome, {fullName}
      </h1>

      {/* User Info Section */}
      <Section title="User Information">
        <Card
          icon={<FaUserCircle size={38} />}
          label="User"
          value={fullName}
          bgColor="bg-blue-700"
        />
      </Section>

      {/* Transaction Summary Section */}
      <Section title="Transaction Summary">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<FaMoneyCheckAlt size={38} />}
            label="Total Transactions"
            value={totalTransactions}
            bgColor="bg-green-600"
          />
          <Card
            icon={<MdCategory size={38} />}
            label="Total Categories"
            value={totalCategories}
            bgColor="bg-purple-600"
          />
          <Card
            icon={<FaWallet size={38} />}
            label="Total Budgets"
            value={totalBudgets}
            bgColor="bg-yellow-600"
          />
        </div>
      </Section>

      {/* Financial Overview Section */}
      <Section title="Financial Overview">
        <Card
          icon={<MdAttachMoney size={38} />}
          label="Total Budget Amount"
          value={formattedAmount(totalAmount)}
          bgColor="bg-teal-600"
        />
      </Section>

      {/* Transactions per Category Section */}
      <Section title="Transactions per Category">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transactionsPerCategory.map(({ name, count }) => (
            <Card
              key={name}
              icon={<MdLeaderboard size={38} />}
              label={`${name}`}
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
    <section className="space-y-4 px-2">
      <h2 className="mb-2 text-xl font-bold text-blue-200 md:text-2xl">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// Card Component for each metric
function Card({ icon, label, value, bgColor }) {
  return (
    <div
      className={`${bgColor} transform rounded-lg p-4 text-gray-100 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl md:p-6`}
    >
      <div className="flex flex-col items-start">
        <div className="text-white">{icon}</div>
        <div className="flex flex-col items-start gap-2">
          <h3 className="text-md font-semibold md:text-lg">{label}</h3>
          <p className="text-lg font-bold md:text-3xl">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
