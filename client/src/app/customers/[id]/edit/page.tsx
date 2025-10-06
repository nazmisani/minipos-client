"use client";

import { useRouter, useParams } from "next/navigation";
import CustomerForm from "@/components/customers/CustomerForm";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Customer } from "@/components/customers/types";
import apiClient from "@/service/apiClient";
import RouteGuard from "@/components/auth/RouteGuard";

function EditCustomerPageContent() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const customerId = params.id as string;

  useEffect(() => {
    if (user && !["admin", "manager"].includes(user.role)) {
      router.push("/customers");
      return;
    }
  }, [user, router]);

  useEffect(() => {
    if (customerId && user && ["admin", "manager"].includes(user.role)) {
      fetchCustomer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, user]);

  const fetchCustomer = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(`/customers/${customerId}`);
      setCustomer(response.data.data);
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

  const handleBack = () => {
    router.push("/customers");
  };

  const handleSave = () => {
    // Delay navigation to show success toast
    setTimeout(() => {
      router.push("/customers");
    }, 1000);
  };

  if (user && !["admin", "manager"].includes(user.role)) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
        <div className="max-w-3xl mx-auto">
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
              <span className="text-slate-600">Loading customer data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
        <div className="max-w-3xl mx-auto">
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

  return (
    <CustomerForm
      customer={customer}
      isEdit={true}
      onBack={handleBack}
      onSave={handleSave}
    />
  );
}

export default function EditCustomerPage() {
  return (
    <RouteGuard permission="customers.edit">
      <EditCustomerPageContent />
    </RouteGuard>
  );
}
