"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/service/apiClient";
import { useAuth } from "@/contexts/authContext";
import { toast } from "react-toastify";

interface CategoryData {
  id: number;
  name: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(
    null
  );
  const [pendingDelete, setPendingDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get("/categories");
      setCategories(data.data);
    } catch (error) {
      console.log("Categories API Error:", error);
      setError("Gagal memuat data categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setShowForm(true);
    setCategoryName("");
  };

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category);
    setShowForm(true);
    setCategoryName(category.name);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCategoryName("");
    setEditingCategory(null);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingCategory) {
        // Edit mode
        await apiClient.put(`/categories/${editingCategory.id}`, {
          name: categoryName.trim(),
        });
        toast.success("Category updated successfully!");
      } else {
        // Create mode
        await apiClient.post("/categories", {
          name: categoryName.trim(),
        });
        toast.success("Category created successfully!");
      }

      setShowForm(false);
      setCategoryName("");
      setEditingCategory(null);
      fetchCategories(); // Refresh the list
    } catch (error: any) {
      console.error("Category operation error:", error);
      const errorMessage =
        error.response?.data?.message ||
        `Failed to ${editingCategory ? "update" : "create"} category`;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/products");
  };

  const handleDelete = (categoryId: number, categoryName: string) => {
    // Show elegant professional confirmation
    setPendingDelete({ id: categoryId, name: categoryName });

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
                Delete Category
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
                  "{categoryName}"
                </span>{" "}
                from the system? This action will permanently remove:
              </p>
              <ul className="ml-4 text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                  Category data and information
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                  Associated products may be affected
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
                confirmDelete(categoryId, categoryName);
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
                  Delete Category
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
        toastId: `delete-confirmation-${categoryId}`,
      }
    );
  };

  const confirmDelete = async (categoryId: number, categoryName: string) => {
    setIsDeleting(true);

    try {
      await apiClient.delete(`/categories/${categoryId}`);

      toast.success("Category deleted successfully!");

      fetchCategories(); // Refresh the category list
      setPendingDelete(null);
    } catch (error: any) {
      console.error("Delete category error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete category";

      toast.error(errorMessage);

      setPendingDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
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
              <h1 className="text-3xl font-bold text-slate-900">Categories</h1>
              <p className="text-slate-600 mt-1">Manage product categories</p>
            </div>
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
              <span>Add Category</span>
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
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-slate-500">
              {loading
                ? "Loading..."
                : `${filteredCategories.length} of ${categories.length} categories`}
            </div>
          </div>
        </div>

        {/* Category Form (Create/Edit) */}
        {showForm && (
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            <form
              onSubmit={handleSubmitCategory}
              className="flex flex-col md:flex-row gap-4 items-end"
            >
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  disabled={isSubmitting}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !categoryName.trim()}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting
                    ? editingCategory
                      ? "Updating..."
                      : "Saving..."
                    : editingCategory
                    ? "Update"
                    : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    No.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                    Category Name
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
                    <td colSpan={3} className="px-6 py-12 text-center">
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
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        Failed to Load Categories
                      </h3>
                      <p className="text-slate-500 mb-4">{error}</p>
                      <button
                        onClick={fetchCategories}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Try Again
                      </button>
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  // Empty state
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                      <div className="text-slate-400 mb-4">
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
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        No categories found
                      </h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm
                          ? `No categories match "${searchTerm}"`
                          : "Get started by creating your first category"}
                      </p>
                      {user?.role === "admin" || user?.role === "manager" ? (
                        <button
                          onClick={handleAdd}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Add Category
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ) : (
                  // Actual data
                  filteredCategories.map((category, index) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {/* Edit Button */}
                          {user && ["admin", "manager"].includes(user.role) && (
                            <button
                              onClick={() => handleEdit(category)}
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
                          )}
                          {/* Delete Button */}
                          {user && ["admin", "manager"].includes(user.role) && (
                            <button
                              onClick={() =>
                                handleDelete(category.id, category.name)
                              }
                              disabled={
                                isDeleting || pendingDelete?.id === category.id
                              }
                              className={`p-1 rounded transition-colors ${
                                isDeleting || pendingDelete?.id === category.id
                                  ? "text-gray-400 cursor-not-allowed"
                                  : "text-red-600 hover:text-red-800"
                              }`}
                              title="Delete"
                            >
                              {pendingDelete?.id === category.id &&
                              isDeleting ? (
                                <svg
                                  className="animate-spin w-4 h-4"
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
                              ) : (
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
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
