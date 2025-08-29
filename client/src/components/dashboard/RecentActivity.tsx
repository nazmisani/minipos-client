interface Transaction {
  id: number;
  amount: number;
  cashier: string;
  time: string;
  customer: string;
}

interface RecentActivityProps {
  transactions: Transaction[];
}

export default function RecentActivity({ transactions }: RecentActivityProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
          <p className="text-slate-600 text-sm">Latest transactions today</p>
        </div>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold text-sm">
                  #{transaction.id}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  {transaction.customer}
                </p>
                <p className="text-sm text-slate-600">
                  by {transaction.cashier} • {transaction.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-900">
                {formatCurrency(transaction.amount)}
              </p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>

      {transactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500">No recent transactions</p>
        </div>
      )}
    </div>
  );
}
