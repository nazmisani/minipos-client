"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !["admin", "manager"].includes(user.role)) {
      router.push("/products");
      return;
    }
  }, [user, router]);

  const handleBack = () => {
    router.push("/products");
  };

  const handleSave = () => {
    toast.success("Redirecting to products page...");
    setTimeout(() => {
      router.push("/products");
    }, 1000);
  };

  if (user && !["admin", "manager"].includes(user.role)) {
    return null;
  }

  return <ProductForm isEdit={false} onBack={handleBack} onSave={handleSave} />;
}
