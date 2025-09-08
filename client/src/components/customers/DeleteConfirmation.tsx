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
    <div className="p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Kembali
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Hapus Customer</h1>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
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
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Hapus Customer?
            </h2>
            <p className="text-gray-600">
              Anda akan menghapus customer <strong>{customer.name}</strong>.
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nama:</span>
                <span className="font-medium">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Transaksi:</span>
                <span className="font-medium">
                  {customer.totalTransactions}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Hapus Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
