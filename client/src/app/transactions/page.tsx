"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Transaction, ViewMode } from "@/components/transactions/types";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionDetail from "@/components/transactions/TransactionDetail";
import TransactionForm from "@/components/transactions/TransactionForm";
import DeleteConfirmation from "@/components/transactions/DeleteConfirmation";

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<ViewMode>("list");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Check if there's a "new" query parameter to trigger add mode
  useEffect(() => {
    const newParam = searchParams.get("new");
    if (newParam === "true") {
      setCurrentView("add");
    }
  }, [searchParams]);

  const handleViewDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentView("detail");
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
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      );
  }
}
