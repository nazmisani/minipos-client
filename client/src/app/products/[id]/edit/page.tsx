"use client";

import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RouteGuard from "@/components/auth/RouteGuard";
import apiClient from "@/service/apiClient";

interface ProductData {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  categoryId: number;
  createdById: number;
  category: {
    id: number;
    name: string;
  };
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params.id as string;

  useEffect(() => {
    if (user && !["admin", "manager"].includes(user.role)) {
      router.push("/products");
      return;
    }
  }, [user, router]);

  useEffect(() => {
    if (productId && user && ["admin", "manager"].includes(user.role)) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, user]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get(`/products/${productId}`);
      setProduct(data.data);
    } catch (error: unknown) {
      console.error("Failed to fetch product:", error);
      setError("Failed to load product data");
      toast.error("Failed to load product data");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/products");
  };

  const handleSave = () => {
    toast.success("Product updated successfully!");
    setTimeout(() => {
      router.push("/products");
    }, 1000);
  };

  if (user && !["admin", "manager"].includes(user.role)) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Product Not Found
          </h3>
          <p className="text-slate-600 mb-4">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <button
            onClick={handleBack}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <RouteGuard permission="products.edit">
      <ProductForm
        product={product}
        isEdit={true}
        onBack={handleBack}
        onSave={handleSave}
      />
    </RouteGuard>
  );
}
