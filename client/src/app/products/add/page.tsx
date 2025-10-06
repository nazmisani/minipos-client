"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { toast } from "react-toastify";
import RouteGuard from "@/components/auth/RouteGuard";

function AddProductPageContent() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/products");
  };

  const handleSave = () => {
    toast.success("Redirecting to products page...");
    setTimeout(() => {
      router.push("/products");
    }, 1000);
  };

  return <ProductForm isEdit={false} onBack={handleBack} onSave={handleSave} />;
}

export default function AddProductPage() {
  return (
    <RouteGuard permission="products.create">
      <AddProductPageContent />
    </RouteGuard>
  );
}
