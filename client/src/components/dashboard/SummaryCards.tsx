interface SummaryData {
  totalProducts: number;
  totalUsers: number;
  todayTransactions: number;
  todayRevenue: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    // Format currency in a more compact way for large numbers
    if (amount >= 1000000) {
      const millions = amount / 1000000;
      return `Rp ${millions.toFixed(1).replace('.0', '')}M`;
    } else if (amount >= 1000) {
      const thousands = amount / 1000;
      return `Rp ${thousands.toFixed(0)}K`;
    } else {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    }
  };

  const cards = [
    {
      title: "Total Produk",
      value: data.totalProducts.toLocaleString(),
      icon: "📦",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Staff",
      value: data.totalUsers.toLocaleString(),
      icon: "👥",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Transaksi Hari Ini",
      value: data.todayTransactions.toLocaleString(),
      icon: "💳",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Pendapatan Hari Ini",
      value: formatCurrency(data.todayRevenue),
      icon: "💰",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} ${card.borderColor} rounded-xl p-6 border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-3">
              <p className="text-slate-600 text-sm font-semibold mb-2">
                {card.title}
              </p>
              <p className="text-xl lg:text-2xl font-bold text-slate-900 break-words leading-tight">
                {card.value}
              </p>
            </div>
            <div
              className={`${card.color} w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center text-white text-xl lg:text-2xl shadow-lg flex-shrink-0`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
