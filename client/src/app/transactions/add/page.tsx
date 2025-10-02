"use client";

import { useRouter } from "next/navigation";
import TransactionForm from "@/components/transactions/TransactionForm";
import { toast } from "react-toastify";
import RouteGuard from "@/components/auth/RouteGuard";

function AddTransactionPageContent() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/transactions");
  };

  const handleSave = () => {
    toast.success("Redirecting to transactions page...");
    setTimeout(() => {
      router.push("/transactions");
    }, 1000);
  };

  return (
    <TransactionForm isEdit={false} onBack={handleBack} onSave={handleSave} />
  );
}

export default function AddTransactionPage() {
  return (
    <RouteGuard permission="transactions.create">
      <AddTransactionPageContent />
    </RouteGuard>
  );
}
