"use client";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalTransactions: number;
  totalSpent: number;
  joinDate: string;
  lastTransaction: string;
}

interface CustomerDetailProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

// Dummy transaction data for selected customer
const dummyTransactions = [
  {
    id: 1,
    date: "2024-08-30",
    time: "14:30",
    items: ["Kopi Americano", "Roti Bakar"],
    total: 35000,
    paymentMethod: "Cash",
  },
  {
    id: 2,
    date: "2024-08-29",
    time: "10:15",
    items: ["Nasi Goreng", "Jus Jeruk"],
    total: 45000,
    paymentMethod: "QRIS",
  },
  {
    id: 3,
    date: "2024-08-28",
    time: "16:45",
    items: ["Ayam Bakar", "Es Teh"],
    total: 50000,
    paymentMethod: "Card",
  },
  {
    id: 4,
    date: "2024-08-27",
    time: "12:20",
    items: ["Kopi Latte", "Sandwich"],
    total: 40000,
    paymentMethod: "Cash",
  },
  {
    id: 5,
    date: "2024-08-25",
    time: "09:30",
    items: ["Cappuccino", "Croissant", "Salad"],
    total: 65000,
    paymentMethod: "QRIS",
  },
];

export default function CustomerDetail({
  isOpen,
  onClose,
  customer,
}: CustomerDetailProps) {
  if (!isOpen || !customer) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-white h-full w-full max-w-2xl shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Detail Customer
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              Informasi Customer
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ID Customer
                </label>
                <p className="text-slate-900">
                  #{customer.id.toString().padStart(3, "0")}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <p className="text-slate-900 font-medium">{customer.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <p className="text-slate-900">{customer.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nomor Telepon
                </label>
                <p className="text-slate-900">
                  {customer.phone || (
                    <span className="text-slate-400 italic">Tidak ada</span>
                  )}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Alamat
                </label>
                <p className="text-slate-900">{customer.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tanggal Bergabung
                </label>
                <p className="text-slate-900">
                  {formatDate(customer.joinDate)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Transaksi Terakhir
                </label>
                <p className="text-slate-900">
                  {formatDate(customer.lastTransaction)}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium mb-1">
                    Total Transaksi
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {customer.totalTransactions}
                  </p>
                </div>
                <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium mb-1">
                    Total Belanja
                  </p>
                  <p className="text-2xl font-bold text-emerald-900">
                    {formatCurrency(customer.totalSpent)}
                  </p>
                </div>
                <div className="bg-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h4 className="text-lg font-semibold text-slate-900">
                Riwayat Transaksi
              </h4>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dummyTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-slate-900">
                          #{transaction.id.toString().padStart(4, "0")}
                        </span>
                        <span className="text-sm text-slate-500">
                          {formatDate(transaction.date)} • {transaction.time}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.paymentMethod === "Cash"
                              ? "bg-green-100 text-green-800"
                              : transaction.paymentMethod === "QRIS"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {transaction.paymentMethod}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {transaction.items.join(", ")}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-slate-900">
                        {formatCurrency(transaction.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="mt-6 text-center">
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Lihat Semua Transaksi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
