"use client";

import { Customer } from "./types";

interface CustomerDetailProps {
  customer: Customer;
  onBack: () => void;
}

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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
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
              Back to Customer
            </button>
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Detail Customer
            </h1>
            <p className="text-slate-600 mt-2">
              Complete information and customer transaction history
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="bg-emerald-600 text-white p-6">
                <h2 className="text-xl font-semibold">{customer.name}</h2>
                <p className="text-emerald-100 mt-1">ID: #{customer.id}</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Phone
                  </label>
                  <p className="text-slate-900 mt-1">
                    {customer.phone || "Not available"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Total Transaksi
                  </label>
                  <p className="font-medium">
                    {customer._count.transactions} transaksi
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">
                    Total Pengeluaran
                  </label>
                  <p className="font-medium text-green-600">
                    {formatCurrency(
                      customer.transactions.reduce((sum, t) => sum + t.total, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-4 space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <p className="text-xl font-bold text-blue-600">
                      {customer._count.transactions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Spending</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(
                        customer.transactions.reduce(
                          (sum, t) => sum + t.total,
                          0
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Transaction History</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {customer.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm font-medium">
                              #{transaction.id}
                            </span>
                            <span className="text-sm text-gray-500">
                              {formatDate(transaction.createdAt)}
                            </span>
                          </div>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(transaction.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {customer.transactions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No transaction history yet</p>
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
