"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "@/components/customers/CustomerForm";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";

export default function AddCustomerPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !["admin", "manager"].includes(user.role)) {
      router.push("/customers");
      return;
    }
  }, [user, router]);

  const handleBack = () => {
    router.push("/customers");
  };

  const handleSave = () => {
    setTimeout(() => {
      router.push("/customers");
    }, 1000);
  };

  if (user && !["admin", "manager"].includes(user.role)) {
    return null;
  }

  return (
    <CustomerForm isEdit={false} onBack={handleBack} onSave={handleSave} />
  );
}
