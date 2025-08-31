"use client";

import { useState } from "react";
import { Transaction, ViewMode } from "@/components/transactions/types";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionDetail from "@/components/transactions/TransactionDetail";
import TransactionForm from "@/components/transactions/TransactionForm";
import DeleteConfirmation from "@/components/transactions/DeleteConfirmation";

export default function TransactionPage() {
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleViewDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentView("detail");
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentView("edit");
  };

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentView("delete");
  };

  const handleAdd = () => {
    setSelectedTransaction(null);
    setCurrentView("add");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedTransaction(null);
  };

  const handleSave = () => {
    // Save logic would go here
    setCurrentView("list");
    setSelectedTransaction(null);
  };

  const handleConfirmDelete = () => {
    // Delete logic would go here
    setCurrentView("list");
    setSelectedTransaction(null);
  };

  // Render different views based on current state
  switch (currentView) {
    case "detail":
      return selectedTransaction ? (
        <TransactionDetail
          transaction={selectedTransaction}
          onBack={handleBack}
        />
      ) : null;

    case "add":
      return (
        <TransactionForm
          isEdit={false}
          onBack={handleBack}
          onSave={handleSave}
        />
      );

    case "edit":
      return selectedTransaction ? (
        <TransactionForm
          transaction={selectedTransaction}
          isEdit={true}
          onBack={handleBack}
          onSave={handleSave}
        />
      ) : null;

    case "delete":
      return selectedTransaction ? (
        <DeleteConfirmation
          transaction={selectedTransaction}
          onBack={handleBack}
          onConfirm={handleConfirmDelete}
        />
      ) : null;

    default:
      return (
        <TransactionList
          onViewDetail={handleViewDetail}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      );
  }
}
