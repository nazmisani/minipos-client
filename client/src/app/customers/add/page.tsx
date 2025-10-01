"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "@/components/customers/CustomerForm";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import RouteGuard from "@/components/auth/RouteGuard";

function AddCustomerPageContent() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/customers");
  };

  const handleSave = () => {
    setTimeout(() => {
      router.push("/customers");
    }, 1000);
  };

  return (
    <CustomerForm isEdit={false} onBack={handleBack} onSave={handleSave} />
  );
}

export default function AddCustomerPage() {
  return (
    <RouteGuard permission="customers.create">
      <AddCustomerPageContent />
    </RouteGuard>
  );
}
