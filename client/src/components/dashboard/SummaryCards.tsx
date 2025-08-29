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
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cards = [
    {
      title: "Total Products",
      value: data.totalProducts.toLocaleString(),
      icon: "📦",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Staff",
      value: data.totalUsers.toLocaleString(),
      icon: "👥",
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Today Transactions",
      value: data.todayTransactions.toLocaleString(),
      icon: "💳",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Today Revenue",
      value: formatCurrency(data.todayRevenue),
      icon: "💰",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {card.value}
              </p>
            </div>
            <div
              className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
