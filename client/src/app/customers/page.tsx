"use client";

import { useState } from "react";
import { Customer, ViewMode } from "@/components/customers/types";
import CustomerList from "@/components/customers/CustomerList";
import CustomerDetail from "@/components/customers/CustomerDetail";
import CustomerForm from "@/components/customers/CustomerForm";
import DeleteConfirmation from "@/components/customers/DeleteConfirmation";

export default function CustomerPage() {
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleViewDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView("detail");
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
    setSelectedCustomer(null);
    setCurrentView("add");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedCustomer(null);
  };

  const handleSave = () => {
    // Save logic would go here
    setCurrentView("list");
    setSelectedCustomer(null);
  };

  const handleConfirmDelete = () => {
    // Delete logic would go here
    setCurrentView("list");
    setSelectedCustomer(null);
  };

  switch (currentView) {
    case "detail":
      return selectedCustomer ? (
        <CustomerDetail customer={selectedCustomer} onBack={handleBack} />
      ) : null;

    case "add":
      return (
        <CustomerForm isEdit={false} onBack={handleBack} onSave={handleSave} />
      );

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
