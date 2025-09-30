"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/components/transactions/types";
import TransactionList from "@/components/transactions/TransactionList";

export default function TransactionPage() {
  const router = useRouter();

  const handleViewDetail = (transaction: Transaction) => {
    router.push(`/transactions/${transaction.id}`);
  };

  const handleDelete = (transaction: Transaction) => {
    // For now, just show alert. You can implement delete logic later
    alert(
      `Delete transaction ${transaction.id} - This feature will be implemented later`
    );
  };

  const handleAdd = () => {
    router.push("/transactions/add");
  };

  return (
    <TransactionList
      onViewDetail={handleViewDetail}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}
