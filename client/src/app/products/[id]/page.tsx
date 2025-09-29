"use client";

import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productId = params.id as string;

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get(`/products/${productId}`);
      setProduct(data.data);
    } catch (error: any) {
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

  const handleEdit = () => {
    router.push(`/products/${productId}/edit`);
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockStatus = (stock: number) => {
    if (stock > 20)
      return { color: "bg-green-100 text-green-800", text: "In Stock" };
    if (stock > 0)
      return { color: "bg-yellow-100 text-yellow-800", text: "Low Stock" };
    return { color: "bg-red-100 text-red-800", text: "Out of Stock" };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
              title="Back to Products"
            >
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Product Details
              </h1>
              <p className="text-slate-600 mt-1">View product information</p>
            </div>
          </div>
          {user && ["admin", "manager"].includes(user.role) && (
            <button
              onClick={handleEdit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit Product</span>
            </button>
          )}
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Product Name
              </label>
              <p className="text-lg font-semibold text-slate-900">
                {product.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Category
              </label>
              <p className="text-lg text-slate-900">{product.category.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Price
              </label>
              <p className="text-lg font-semibold text-emerald-600">
                {formatCurrency(product.price)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Stock
              </label>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-semibold text-slate-900">
                  {product.stock}
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                >
                  {stockStatus.text}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Created By
              </label>
              <p className="text-lg text-slate-900">{product.createdBy.name}</p>
              <p className="text-sm text-slate-500">
                {product.createdBy.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Created At
              </label>
              <p className="text-lg text-slate-900">
                {new Date(product.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
