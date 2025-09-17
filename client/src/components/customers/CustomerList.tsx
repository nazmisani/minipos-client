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
    <CrudLayout>
      <PageHeader
        title="Customer Management"
        subtitle="Kelola data customer dan lihat riwayat transaksi mereka."
        action={<Button onClick={onAdd}>Tambah Customer</Button>}
      />

      <SearchBar placeholder="Cari customer..." />

      <Card>
        <CustomerTable
          customers={dummyCustomers}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetail={onViewDetail}
        />
      </Card>
    </CrudLayout>
  );
}
