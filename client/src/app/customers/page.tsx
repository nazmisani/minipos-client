"use client";

import { useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerModal from "@/components/customers/CustomerModal";
import CustomerDetail from "@/components/customers/CustomerDetail";

// Dummy data for customers
const dummyCustomers = [
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

export default function CustomersPage() {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<
    (typeof dummyCustomers)[0] | null
  >(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: (typeof dummyCustomers)[0]) => {
    setSelectedCustomer(customer);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customerId: number) => {
    // Placeholder for delete functionality
    console.log("Delete customer:", customerId);
  };

  const handleViewDetail = (customer: (typeof dummyCustomers)[0]) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleModalSave = (customerData: any) => {
    // Placeholder for save functionality
    console.log("Save customer:", customerData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
            Customer Management
          </h1>
          <p className="text-slate-600">
            Kelola data customer dan lihat riwayat transaksi mereka.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAddCustomer}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Tambah Customer Baru</span>
            </button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Daftar Customer
          </h2>
          <CustomerTable
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            onViewDetail={handleViewDetail}
          />
        </div>

        {/* Customer Modal */}
        <CustomerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModalSave}
          customer={selectedCustomer}
          mode={modalMode}
        />

        {/* Customer Detail Panel */}
        <CustomerDetail
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          customer={selectedCustomer}
        />
      </div>
    </div>
  );
}
