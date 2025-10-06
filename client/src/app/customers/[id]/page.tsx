"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Customer } from "@/components/customers/types";
import apiClient from "@/service/apiClient";
import RouteGuard from "@/components/auth/RouteGuard";

function CustomerDetailPageContent() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerId) return;

      try {
        setLoading(true);
        const { data } = await apiClient.get(`/customers/${customerId}`);
        setCustomer(data.data);
      } catch (error: unknown) {
        console.error("Error fetching customer:", error);
        const errorMessage = error instanceof Error && 'response' in error && 
          typeof error.response === 'object' && error.response !== null &&
          'data' in error.response && typeof error.response.data === 'object' &&
          error.response.data !== null && 'message' in error.response.data
            ? String(error.response.data.message)
            : "Failed to load customer data";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleBack = () => {
    router.push("/customers");
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <svg
                className="animate-spin w-6 h-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-slate-600">
                Loading customer details...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBack}
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
              Kembali ke Customer
            </button>
          </div>

          <div className="bg-white rounded-lg border border-red-200 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Customer Not Found
            </h3>
            <p className="text-slate-500 mb-4">
              {error || "Customer dengan ID tersebut tidak ditemukan."}
            </p>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Back to Customer List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total spent from transactions
  const totalSpent =
    customer.transactions?.reduce(
      (sum, transaction) => sum + transaction.total,
      0
    ) || 0;

  // Get latest transaction date
  const latestTransaction =
    customer.transactions && customer.transactions.length > 0
      ? customer.transactions[0].createdAt
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBack}
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
              Kembali ke Customer
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
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-emerald-600"
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
                <h2 className="text-xl font-bold text-slate-900">
                  {customer.name}
                </h2>
                {customer.phone && (
                  <p className="text-slate-600 mt-1">{customer.phone}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      Total Transaksi
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      {customer._count?.transactions || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      Total Belanja
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                      {formatCurrency(totalSpent)}
                    </span>
                  </div>
                </div>

                {latestTransaction && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">
                        Transaksi Terakhir
                      </span>
                      <span className="text-sm text-slate-600">
                        {formatDate(latestTransaction)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Riwayat Transaksi
              </h3>

              {!customer.transactions || customer.transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-400"
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
                  <h4 className="text-lg font-medium text-slate-900 mb-2">
                    No transactions yet
                  </h4>
                  <p className="text-slate-500">
                    Customer ini belum melakukan transaksi apapun.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {customer.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-slate-900">
                            Transaksi #{transaction.id}
                          </h4>
                          <p className="text-sm text-slate-500 mt-1">
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-emerald-600">
                            {formatCurrency(transaction.total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerDetailPage() {
  return (
    <RouteGuard permission="customers.view">
      <CustomerDetailPageContent />
    </RouteGuard>
  );
}
