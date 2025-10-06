"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import apiClient from "@/service/apiClient";
import { Product, ProductViewMode } from "@/components/products/types";
import { useAuth } from "@/contexts/authContext";
import { toast } from "react-toastify";
import Protected from "@/components/auth/Protected";
import RouteGuard from "@/components/auth/RouteGuard";
import { usePermissions } from "@/hooks/usePermissions";

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

function ProductPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { hasPermission } = usePermissions();
  const [_currentView, setCurrentView] = useState<ProductViewMode>("list");
  const [_selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 10;

  // Check if user has any action permissions
  const canEdit = hasPermission("products.update");
  const canDelete = hasPermission("products.delete");
  const hasAnyActionPermission = canEdit || canDelete;
  const [_pendingDelete, setPendingDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user: _user } = useAuth();

  // Professional toast utility with elegant styling
  const showProfessionalToast = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    const config = {
      success: {
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        borderColor: "border-green-200",
        progressColor: "bg-green-500",
        icon: (
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        ),
      },
      error: {
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        borderColor: "border-red-200",
        progressColor: "bg-red-500",
        icon: (
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ),
      },
    };

    const { iconBg, iconColor, borderColor, progressColor, icon } =
      config[type];

    toast(
      <div className="flex items-center space-x-3 p-3">
        <div className="flex-shrink-0">
          <div
            className={`w-9 h-9 ${iconBg} rounded-full flex items-center justify-center shadow-sm`}
          >
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-tight">
            {title}
          </p>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
            {message}
          </p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: type === "error" ? 5000 : 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: `bg-white ${borderColor} shadow-xl rounded-lg border-l-4`,
        progressClassName: progressColor,
      }
    );
  };

  useEffect(() => {
    const newParam = searchParams.get("new");
    if (newParam === "true") {
      setCurrentView("add");
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
    // Initial load - check if there are filters
    const hasActiveFilters = searchTerm || selectedCategory !== "All";
    if (hasActiveFilters) {
      fetchAllProducts();
    } else {
      fetchProducts(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When filters change, refetch data
  useEffect(() => {
    const hasActiveFilters = searchTerm || selectedCategory !== "All";
    if (hasActiveFilters) {
      // Fetch all products when filtering
      fetchAllProducts();
    } else {
      // Use pagination when no filters
      fetchProducts(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get("/products");
      setProducts(data.data);
      setTotalPages(1);
      setTotalItems(data.data.length);
      setCurrentPage(1);
    } catch (error) {
      console.log("Products API Error:", error);
      setError("Failed to load products data");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (page: number = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching products for page:", page);
      const { data } = await apiClient.get(
        `/products?page=${page}&limit=${limit}`
      );
      console.log("API Response:", data);

      // Handle different API response formats
      if (data.data && Array.isArray(data.data)) {
        setProducts(data.data);

        // Check if pagination object exists
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages || 1);
          setTotalItems(data.pagination.totalCount || data.data.length);
          setCurrentPage(data.pagination.currentPage || page);
        } else {
          // Fallback if no pagination object
          setTotalPages(
            data.totalPages ||
              Math.ceil((data.total || data.data.length) / limit)
          );
          setTotalItems(data.total || data.data.length);
          setCurrentPage(page);
        }
      } else if (Array.isArray(data)) {
        // Fallback if API returns array directly
        setProducts(data);
        setTotalPages(Math.ceil(data.length / limit));
        setTotalItems(data.length);
        setCurrentPage(1);
      } else {
        console.error("Unexpected API response format:", data);
        setError("Invalid API response format");
      }

      console.log(
        "Updated state - totalPages:",
        totalPages,
        "totalItems:",
        totalItems,
        "currentPage:",
        page
      );
    } catch (error) {
      console.log("Products API Error:", error);
      setError("Failed to load products data");
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
    router.push("/products/add");
  };

  const handleEdit = (productId: number) => {
    router.push(`/products/${productId}/edit`);
  };

  const _handleBack = () => {
    setCurrentView("list");
    setSelectedProduct(null);
  };

  const _handleSave = () => {
    // Refresh the product list after successful save
    fetchProducts(currentPage);
    setCurrentView("list");
    setSelectedProduct(null);
  };

  const handlePageChange = (page: number) => {
    console.log("Page change to:", page);
    console.log(
      "Current state - currentPage:",
      currentPage,
      "totalPages:",
      totalPages
    );
    fetchProducts(page);
  };

  const handleDelete = (productId: number, productName: string) => {
    // Show elegant professional confirmation
    setPendingDelete({ id: productId, name: productName });

    toast(
      ({ closeToast }) => (
        <div className="relative bg-gradient-to-br from-white via-white to-red-50 p-6 rounded-xl shadow-2xl border border-red-100 w-96 mx-auto transform transition-all duration-300 ease-out scale-100 opacity-100">
          {/* Elegant decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-t-xl"></div>

          {/* Header with icon and title */}
          <div className="flex items-start space-x-4 mb-5">
            <div className="flex-shrink-0 mt-0.5">
              <div className="relative w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-md">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
                <svg
                  className="relative w-6 h-6 text-red-600"
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
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                Delete Product
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                This action is permanent and cannot be undone
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-800 leading-relaxed mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-red-700">
                  &quot;{productName}&quot;
                </span>{" "}
                from the system? This action will permanently remove:
              </p>
              <ul className="ml-4 text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                  Product data and information
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                  Stock history and transactions
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => {
                closeToast();
                setPendingDelete(null);
              }}
              className="w-full sm:w-auto sm:min-w-[120px] inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out whitespace-nowrap"
            >
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
            <button
              onClick={() => {
                closeToast();
                confirmDelete(productId, productName);
              }}
              disabled={isDeleting}
              className={`w-full sm:w-auto sm:min-w-[140px] inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out whitespace-nowrap ${
                isDeleting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 border border-red-600 hover:from-red-700 hover:to-red-800 hover:shadow-xl focus:ring-red-500 transform hover:scale-105"
              }`}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
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
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        className:
          "!bg-transparent !p-0 !border-0 !shadow-none !rounded-none backdrop-blur-sm",
        style: {
          background: "rgba(0, 0, 0, 0.1)",
          boxShadow: "none",
          border: "none",
          backdropFilter: "blur(4px)",
        },
        closeButton: false,
        toastId: `delete-confirmation-${productId}`,
      }
    );
  };

  const confirmDelete = async (productId: number, productName: string) => {
    setIsDeleting(true);

    try {
      await apiClient.delete(`/products/${productId}`);

      showProfessionalToast(
        "success",
        "Successfully Deleted!",
        `Product "${productName}" has been removed from the system`
      );

      fetchProducts(currentPage); // Refresh the product list
      setPendingDelete(null);
    } catch (error: unknown) {
      console.error("Delete product error:", error);
      const errorMessage =
        error instanceof Error &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to delete product";

      showProfessionalToast("error", "Delete Failed", errorMessage);

      setPendingDelete(null);
    } finally {
      setIsDeleting(false);
    }
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-600 mt-1">Manage your product inventory</p>
          </div>
          <div className="flex items-center space-x-3">
            <Protected permission="categories.manage" fallback={null}>
              <button
                onClick={() => router.push("/categories")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span>Manage Category</span>
              </button>
            </Protected>

            <Protected permission="products.create" fallback={null}>
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
            </Protected>
          </div>
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
                  {hasAnyActionPermission && (
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  )}
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
                      {hasAnyActionPermission && (
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="h-8 w-8 bg-slate-200 rounded"></div>
                            <div className="h-8 w-8 bg-slate-200 rounded"></div>
                          </div>
                        </td>
                      )}
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
                        onClick={() => fetchProducts(currentPage)}
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
                        {hasAnyActionPermission && (
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              {/* Edit Button */}
                              <Protected
                                permission="products.update"
                                fallback={null}
                              >
                                <button
                                  onClick={() => handleEdit(product.id)}
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
                              </Protected>

                              {/* Delete Button */}
                              <Protected
                                permission="products.delete"
                                fallback={null}
                              >
                                <button
                                  className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                                  title="Delete"
                                  onClick={() =>
                                    handleDelete(product.id, product.name)
                                  }
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
                              </Protected>
                            </div>
                          </td>
                        )}
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
                {searchTerm || selectedCategory !== "All"
                  ? `Showing ${filteredProducts.length} of ${products.length} products (filtered)`
                  : `Showing ${products.length} of ${totalItems} products`}
              </p>
              {/* Only show pagination when no filters are active */}
              {!searchTerm && selectedCategory === "All" && totalPages > 1 && (
                <div className="flex items-center space-x-1">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 shadow-sm"
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {/* First Page */}
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-all duration-200 shadow-sm"
                        >
                          1
                        </button>
                        {currentPage > 4 && (
                          <span className="px-2 py-2 text-gray-400">...</span>
                        )}
                      </>
                    )}

                    {/* Previous Page */}
                    {currentPage > 1 && (
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-all duration-200 shadow-sm"
                      >
                        {currentPage - 1}
                      </button>
                    )}

                    {/* Current Page */}
                    <button className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white border border-emerald-600 shadow-md">
                      {currentPage}
                    </button>

                    {/* Next Page */}
                    {currentPage < totalPages && (
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-all duration-200 shadow-sm"
                      >
                        {currentPage + 1}
                      </button>
                    )}

                    {/* Last Page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="px-2 py-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="px-3 py-2 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 transition-all duration-200 shadow-sm"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 shadow-sm"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <RouteGuard permission="pages.products">
      <ProductPageContent />
    </RouteGuard>
  );
}
