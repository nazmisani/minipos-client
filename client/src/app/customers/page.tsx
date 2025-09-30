"use client";

import { useRouter } from "next/navigation";
import { Customer } from "@/components/customers/types";
import CustomerList from "@/components/customers/CustomerList";

export default function CustomerPage() {
  const router = useRouter();

  const handleViewDetail = (customer: Customer) => {
    router.push(`/customers/${customer.id}`);
  };

  const handleEdit = (customer: Customer) => {
    router.push(`/customers/${customer.id}/edit`);
  };

  const handleAdd = () => {
    router.push("/customers/add");
  };

  return (
    <CustomerList
      onViewDetail={handleViewDetail}
      onEdit={handleEdit}
      onAdd={handleAdd}
    />
  );
}
