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

// TODO: Replace with API call
const dummyCustomers: Customer[] = [];

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
