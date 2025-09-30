"use client";

import { useRouter } from "next/navigation";
import TransactionForm from "@/components/transactions/TransactionForm";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddTransactionPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !["admin", "manager", "cashier"].includes(user.role)) {
      router.push("/transactions");
      return;
    }
  }, [user, router]);

  const handleBack = () => {
    router.push("/transactions");
  };

  const handleSave = () => {
    toast.success("Redirecting to transactions page...");
    setTimeout(() => {
      router.push("/transactions");
    }, 1000);
  };

  if (user && !["admin", "manager", "cashier"].includes(user.role)) {
    return null;
  }

  return (
    <TransactionForm isEdit={false} onBack={handleBack} onSave={handleSave} />
  );
}
