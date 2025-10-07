"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Transaction } from "@/components/transactions/types";
import TransactionDetail from "@/components/transactions/TransactionDetail";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";
import RouteGuard from "@/components/auth/RouteGuard";

function TransactionDetailPageContent() {
  const router = useRouter();
  const params = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transactionId = params.id as string;

  useEffect(() => {
    if (transactionId) {
      fetchTransaction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  const fetchTransaction = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get(`/transactions/${transactionId}`);
      setTransaction(data.data);
    } catch (error: unknown) {
      console.error("Error fetching transaction:", error);
      const errorMessage =
        error instanceof Error &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to load transaction";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/transactions");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Transaction Not Found
            </h3>
            <p className="text-slate-500 mb-4">
              {error || "The requested transaction could not be found."}
            </p>
            <button
              onClick={handleBack}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Back to Transactions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <TransactionDetail transaction={transaction} onBack={handleBack} />;
}

export default function TransactionDetailPage() {
  return (
    <RouteGuard permission="transactions.viewDetail">
      <TransactionDetailPageContent />
    </RouteGuard>
  );
}
