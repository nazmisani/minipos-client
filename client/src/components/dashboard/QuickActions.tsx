export default function QuickActions() {
  const actions = [
    {
      title: "Tambah Produk",
      description: "Tambahkan produk ke inventori",
      icon: "📦",
      color: "bg-blue-500 hover:bg-blue-600",
      href: "/products/new",
    },
    {
      title: "Transaksi Baru",
      description: "Proses penjualan baru",
      icon: "💳",
      color: "bg-emerald-500 hover:bg-emerald-600",
      href: "/transactions/new",
    },
    {
      title: "Lihat Laporan",
      description: "Cek analitik penjualan",
      icon: "📊",
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/reports",
    },
    {
      title: "Kelola Staff",
      description: "Tambah atau edit anggota tim",
      icon: "👥",
      color: "bg-orange-500 hover:bg-orange-600",
      href: "/users",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
      <div className="mb-6">
        <p className="text-slate-600 text-sm">Akses cepat ke fitur utama</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-6 rounded-xl transition-all duration-300 text-left group hover:scale-105 hover:shadow-xl`}
            onClick={() => {
              // Untuk development, log href. Nanti bisa diganti dengan router.push
              console.log(`Navigate to: ${action.href}`);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{action.icon}</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
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
            <h4 className="font-bold text-lg mb-2">{action.title}</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
