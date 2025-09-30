"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Customer, ViewMode } from "@/components/customers/types";
import CustomerList from "@/components/customers/CustomerList";
import CustomerForm from "@/components/customers/CustomerForm";
import DeleteConfirmation from "@/components/customers/DeleteConfirmation";

export default function CustomerPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleViewDetail = (customer: Customer) => {
    router.push(`/customers/${customer.id}`);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView("edit");
  };

  const handleDelete = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView("delete");
  };

  const handleAdd = () => {
    router.push("/customers/add");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedCustomer(null);
  };

  const handleSave = () => {
    setCurrentView("list");
    setSelectedCustomer(null);
  };

  const handleConfirmDelete = () => {
    setCurrentView("list");
    setSelectedCustomer(null);
  };

  switch (currentView) {
    case "edit":
      return selectedCustomer ? (
        <CustomerForm
          customer={selectedCustomer}
          isEdit={true}
          onBack={handleBack}
          onSave={handleSave}
        />
      ) : null;

    case "delete":
      return selectedCustomer ? (
        <DeleteConfirmation
          customer={selectedCustomer}
          onBack={handleBack}
          onConfirm={handleConfirmDelete}
        />
      ) : null;

    default:
      return (
        <CustomerList
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      );
  }
}
