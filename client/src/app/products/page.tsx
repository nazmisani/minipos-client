"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import apiClient from "@/service/apiClient";
import { Product, ProductViewMode } from "@/components/products/types";
import ProductForm from "@/components/products/ProductForm";
import { useAuth } from "@/contexts/authContext";

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

interface CategoryData {
  id: number;
  name: string;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = useState<ProductViewMode>("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const newParam = searchParams.get("new");
    if (newParam === "true") {
      setCurrentView("add");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get("/products");
      setProducts(data.data);
    } catch (error) {
      console.log("Products API Error:", error);
      setError("Gagal memuat data products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await apiClient.get("/categories");
      setCategories(data.data);
    } catch (error) {
      console.log("Categories API Error:", error);
    }
  };

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

  // View management handlers
  const handleAdd = () => {
    setSelectedProduct(null);
    setCurrentView("add");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedProduct(null);
  };

  const handleSave = () => {
    // Save logic would go here
    setCurrentView("list");
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get categories from API with fallback to product categories
  const availableCategories = [
    "All",
    ...categories.map((category) => category.name),
  ];

  // If categories API failed, fallback to categories from products
  const fallbackCategories =
    categories.length === 0
      ? [
          "All",
          ...Array.from(
            new Set(products.map((product) => product.category.name))
          ),
        ]
      : availableCategories;

  // View switching logic
  if (currentView === "add") {
    return (
      <ProductForm isEdit={false} onBack={handleBack} onSave={handleSave} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-600 mt-1">Manage your product inventory</p>
          </div>
          {user?.role === "admin" || user?.role === "manager" ? (
            <button
              onClick={handleAdd}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Product</span>
            </button>
          ) : null}
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-slate-700">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {fallbackCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  // Loading state
                  [...Array(5)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="h-4 w-8 bg-slate-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-32 bg-slate-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-12 bg-slate-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-16 bg-slate-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="h-8 w-8 bg-slate-200 rounded"></div>
                          <div className="h-8 w-8 bg-slate-200 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : error ? (
                  // Error state
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-red-400 mb-2">
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        Error Loading Products
                      </h3>
                      <p className="text-slate-500 mb-4">{error}</p>
                      <button
                        onClick={fetchProducts}
                        className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Try Again
                      </button>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  // Empty state
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-slate-400 mb-2">
                        <svg
                          className="w-12 h-12 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        No Products Found
                      </h3>
                      <p className="text-slate-500">
                        {searchTerm || selectedCategory !== "All"
                          ? "Try adjusting your search or filter"
                          : "No products available"}
                      </p>
                    </td>
                  </tr>
                ) : (
                  // Actual data
                  filteredProducts.map((product, index) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product.category.name}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            {/* Edit Button */}
                            <button
                              className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                              title="Edit"
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
                            </button>
                            {/* Delete Button */}
                            <button
                              className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                              title="Delete"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {filteredProducts.length} of {products.length} products
                {(searchTerm || selectedCategory !== "All") && " (filtered)"}
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                  Previous
                </button>
                <span className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">
                  1
                </span>
                <button className="px-3 py-1 border border-slate-300 rounded text-sm text-slate-600 hover:bg-slate-100 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
