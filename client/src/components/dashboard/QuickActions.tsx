export default function QuickActions() {
  const actions = [
    {
      title: "Add New Product",
      description: "Add products to your inventory",
      icon: "📦",
      color: "bg-blue-500 hover:bg-blue-600",
      href: "/products/new",
    },
    {
      title: "New Transaction",
      description: "Process a new sale",
      icon: "💳",
      color: "bg-emerald-500 hover:bg-emerald-600",
      href: "/transactions/new",
    },
    {
      title: "View Reports",
      description: "Check sales analytics",
      icon: "📊",
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/reports",
    },
    {
      title: "Manage Staff",
      description: "Add or edit staff members",
      icon: "👥",
      color: "bg-orange-500 hover:bg-orange-600",
      href: "/users",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        <p className="text-slate-600 text-sm">Frequently used shortcuts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-lg transition-colors text-left group`}
            onClick={() => {
              // Untuk development, log href. Nanti bisa diganti dengan router.push
              console.log(`Navigate to: ${action.href}`);
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{action.icon}</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h4 className="font-semibold mb-1">{action.title}</h4>
            <p className="text-sm opacity-90">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
