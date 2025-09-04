"use client";

import { Customer } from "./types";

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
}

// Dummy transaction data
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
    items: ["Cappuccino", "Croissant"],
    total: 42000,
    paymentMethod: "QRIS",
  },
  {
    id: 3,
    date: "2024-08-28",
    time: "16:45",
    items: ["Espresso", "Muffin Blueberry"],
    total: 28000,
    paymentMethod: "Debit",
  },
];

export default function CustomerDetail({
  customer,
  onBack,
}: CustomerDetailProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-md transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              Detail Customer
            </h1>
            <p className="text-slate-600">
              Informasi lengkap dan riwayat transaksi customer
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{customer.name}</h2>
                    <p className="text-emerald-100">
                      Customer ID: #{customer.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="text-gray-900 font-medium">
                    {customer.phone || "Tidak ada"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900 font-medium">
                    {customer.email || "Tidak ada"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Alamat
                  </label>
                  <p className="text-gray-900 font-medium">
                    {customer.address || "Tidak ada"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Bergabung
                  </label>
                  <p className="text-gray-900 font-medium">
                    {formatDate(customer.joinDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Transaksi Terakhir
                  </label>
                  <p className="text-gray-900 font-medium">
                    {formatDate(customer.lastTransaction)}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Transaksi
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {customer.totalTransactions}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Pengeluaran
                    </p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(customer.totalSpent)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-600"
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
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Riwayat Transaksi
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dummyTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              #{transaction.id}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(transaction.date)} •{" "}
                              {transaction.time}
                            </span>
                          </div>
                          <div className="mb-2">
                            <p className="text-sm text-gray-600">
                              Items: {transaction.items.join(", ")}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-emerald-600">
                              {formatCurrency(transaction.total)}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {transaction.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {dummyTransactions.length === 0 && (
                  <div className="text-center py-12">
                    <svg
                      className="w-12 h-12 text-gray-300 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">
                      Belum ada riwayat transaksi
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
