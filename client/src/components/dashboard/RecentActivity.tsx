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
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-slate-600 text-sm">Transaksi terbaru hari ini</p>
        </div>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors">
          Lihat Semua
        </button>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <div className="text-4xl mb-2">📝</div>
            <p>Belum ada transaksi hari ini</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold text-sm">
                    #{transaction.id}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {transaction.customer}
                  </p>
                  <p className="text-sm text-slate-600">
                    oleh {transaction.cashier} • {transaction.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900 text-lg">
                  {formatCurrency(transaction.amount)}
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  Selesai
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
