"use client";

import { Customer } from "./types";

interface DeleteConfirmationProps {
  customer: Customer;
  onBack: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({
  customer,
  onBack,
  onConfirm,
}: DeleteConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
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
              Hapus Customer
            </h1>
            <p className="text-slate-600">
              Konfirmasi penghapusan customer dari sistem
            </p>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h2 className="text-xl font-semibold">Peringatan Penghapusan</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Anda akan menghapus customer berikut dari sistem:
              </p>

              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-500">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Nama:</span>
                    <span className="text-gray-900">{customer.name}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Telepon:
                      </span>
                      <span className="text-gray-900">{customer.phone}</span>
                    </div>
                  )}
                  {customer.email && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">Email:</span>
                      <span className="text-gray-900">{customer.email}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Total Transaksi:
                    </span>
                    <span className="text-gray-900">
                      {customer.totalTransactions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      Total Pengeluaran:
                    </span>
                    <span className="text-gray-900">
                      Rp {customer.totalSpent.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-red-800">Perhatian!</h4>
                    <p className="text-red-700 text-sm mt-1">
                      Tindakan ini tidak dapat dibatalkan. Semua data customer
                      dan riwayat transaksi akan terhapus permanen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                Hapus Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
