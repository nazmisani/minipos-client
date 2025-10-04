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
              Delete Customer
            </h1>
            <p className="text-slate-600 mt-2">
              Confirm deletion of customer data from system
            </p>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
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
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Are you sure you want to delete this customer?
            </h2>
            <p className="text-gray-600">
              You are about to delete customer <strong>{customer.name}</strong>.
              This action cannot be undone.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Transactions:</span>
                <span className="font-medium">
                  {customer._count.transactions}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onBack}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Yes, Delete Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
