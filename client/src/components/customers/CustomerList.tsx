"use client";

import { Customer } from "./types";
import CustomerTable from "./CustomerTable";

interface CustomerListProps {
  onViewDetail: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onAdd: () => void;
}

// Dummy data
const dummyCustomers: Customer[] = [
  {
    id: 1,
    name: "Ahmad Rizki",
    phone: "+62 812-3456-7890",
    totalTransactions: 15,
    totalSpent: 1250000,
    email: "ahmad.rizki@email.com",
    address: "Jl. Sudirman No. 123, Jakarta",
    joinDate: "2024-01-15",
    lastTransaction: "2024-08-29",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    phone: "+62 821-9876-5432",
    totalTransactions: 8,
    totalSpent: 680000,
    email: "siti.nurhaliza@email.com",
    address: "Jl. Thamrin No. 456, Jakarta",
    joinDate: "2024-02-20",
    lastTransaction: "2024-08-28",
  },
  {
    id: 3,
    name: "Budi Santoso",
    phone: "+62 813-5555-4444",
    totalTransactions: 23,
    totalSpent: 2100000,
    email: "budi.santoso@email.com",
    address: "Jl. Gatot Subroto No. 789, Jakarta",
    joinDate: "2023-12-10",
    lastTransaction: "2024-08-30",
  },
  {
    id: 4,
    name: "Maya Sari",
    phone: "+62 856-1111-2222",
    totalTransactions: 12,
    totalSpent: 950000,
    email: "maya.sari@email.com",
    address: "Jl. Kuningan No. 321, Jakarta",
    joinDate: "2024-03-05",
    lastTransaction: "2024-08-27",
  },
  {
    id: 5,
    name: "Deni Pratama",
    phone: "",
    totalTransactions: 5,
    totalSpent: 420000,
    email: "deni.pratama@email.com",
    address: "Jl. Senayan No. 654, Jakarta",
    joinDate: "2024-04-12",
    lastTransaction: "2024-08-25",
  },
];

export default function CustomerList({
  onViewDetail,
  onEdit,
  onDelete,
  onAdd,
}: CustomerListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Customers
            </h1>
            <p className="text-slate-600 mt-2">
              Kelola data customer dan lihat riwayat transaksi mereka.
            </p>
          </div>
          <button
            onClick={onAdd}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tambah Customer
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari customer..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <CustomerTable
            customers={dummyCustomers}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetail={onViewDetail}
          />
        </div>
      </div>
    </div>
  );
}
