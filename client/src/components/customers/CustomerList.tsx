"use client";

import { Customer } from "./types";
import CustomerTable from "./CustomerTable";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";
import { useState, useEffect } from "react";
import apiClient from "@/service/apiClient";

interface CustomerListProps {
  onViewDetail: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onAdd: () => void;
}

export default function CustomerList({
  onViewDetail,
  onEdit,
  onDelete,
  onAdd,
}: CustomerListProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get("/customers");
      setCustomers(data.data);
    } catch (error) {
      console.log("Customers API Error:", error);
      setError("Gagal memuat data customers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CrudLayout>
      <PageHeader
        title="Customer Management"
        subtitle="Kelola data customer dan lihat riwayat transaksi mereka."
        action={<Button onClick={onAdd}>Tambah Customer</Button>}
      />

      <SearchBar placeholder="Cari customer..." />

      <Card>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading customers...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-400 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Error Loading Customers
            </h3>
            <p className="text-slate-500 mb-4">{error}</p>
            <button
              onClick={fetchCustomers}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <CustomerTable
            customers={customers}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetail={onViewDetail}
          />
        )}
      </Card>
    </CrudLayout>
  );
}
