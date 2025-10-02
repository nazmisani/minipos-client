"use client";

import TransactionList from "@/components/transactions/TransactionList";
import RouteGuard from "@/components/auth/RouteGuard";

function TransactionPageContent() {
  return <TransactionList />;
}

export default function TransactionPage() {
  return (
    <RouteGuard permission="pages.transactions">
      <TransactionPageContent />
    </RouteGuard>
  );
}
