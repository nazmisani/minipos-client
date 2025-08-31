"use client";

import Link from "next/link";
import { useState } from "react";

// Dummy data products
const dummyProducts = [
  {
    id: 1,
    name: "Laptop ASUS VivoBook",
    price: 8500000,
    stock: 15,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Mouse Wireless Logitech",
    price: 250000,
    stock: 45,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Keyboard Mechanical",
    price: 750000,
    stock: 22,
    category: "Electronics",
  },
  {
    id: 4,
    name: "Monitor LED 24 inch",
    price: 2200000,
    stock: 8,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Smartphone Samsung Galaxy",
    price: 4500000,
    stock: 12,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Headphone Sony WH-1000XM4",
    price: 3200000,
    stock: 6,
    category: "Electronics",
  },
  {
    id: 7,
    name: "Tablet iPad Air",
    price: 7500000,
    stock: 9,
    category: "Electronics",
  },
  {
    id: 8,
    name: "Charger USB-C",
    price: 150000,
    stock: 35,
    category: "Accessories",
  },
  {
    id: 9,
    name: "Power Bank 20000mAh",
    price: 400000,
    stock: 18,
    category: "Accessories",
  },
  {
    id: 10,
    name: "Speaker Bluetooth JBL",
    price: 1200000,
    stock: 14,
    category: "Electronics",
  },
];

const categories = ["All", "Electronics", "Accessories", "Computer", "Mobile"];

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Products</h1>
            <p className="text-slate-600 mt-1">Manage your product inventory</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
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
                {categories.map((category) => (
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
                {dummyProducts.map((product, index) => {
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
                        {product.category}
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
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing {dummyProducts.length} products
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
