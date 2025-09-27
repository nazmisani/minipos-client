"use client";

import { useState, useEffect } from "react";
import apiClient from "@/service/apiClient";

interface Transaction {
  id: number;
  total: number;
  createdAt: string;
}

interface Product {
  id: number;
  name: string;
  stock: number;
}

export default function CashierHelpers() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Fetch recent transactions
  const fetchTransactions = async () => {
    try {
      setIsLoadingTransactions(true);
      const { data } = await apiClient.get("/transactions");

      // Get last 5 transactions
      const recentTransactions = data?.data?.slice(0, 5) || [];
      setTransactions(recentTransactions);
    } catch (error) {
      console.log("Failed to fetch transactions:", error);
      setTransactions([]);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  // Fetch products and filter low stock
  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const { data } = await apiClient.get("/products");

      // Filter products with stock <= 5
      const lowStock =
        data?.data?.filter((product: Product) => product.stock <= 10) || [];
      setLowStockProducts(lowStock);
    } catch (error) {
      console.log("Failed to fetch products:", error);
      setLowStockProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">📊</span>
          <h3 className="text-lg font-semibold text-slate-800">
            Recent Transactions
          </h3>
        </div>

        {isLoadingTransactions ? (
          <div className="animate-pulse space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-slate-200 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            {transactions.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-600 font-medium">
                      ID
                    </th>
                    <th className="text-left py-2 text-slate-600 font-medium">
                      Total
                    </th>
                    <th className="text-left py-2 text-slate-600 font-medium">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-slate-100"
                    >
                      <td className="py-2 text-slate-800">#{transaction.id}</td>
                      <td className="py-2 text-emerald-600 font-medium">
                        {formatCurrency(transaction.total)}
                      </td>
                      <td className="py-2 text-slate-500 text-xs">
                        {transaction.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-slate-500 text-sm py-4">
                No recent transactions
              </p>
            )}
          </div>
        )}
      </div>

      {/* Low Stock Products */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">⚠️</span>
          <h3 className="text-lg font-semibold text-slate-800">
            Low Stock Alert
          </h3>
        </div>

        {isLoadingProducts ? (
          <div className="animate-pulse space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 bg-slate-200 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden">
            {lowStockProducts.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 text-slate-600 font-medium">
                      Product Name
                    </th>
                    <th className="text-left py-2 text-slate-600 font-medium">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-100">
                      <td className="py-2 text-slate-800">{product.name}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.stock === 0
                              ? "bg-red-100 text-red-700"
                              : product.stock <= 2
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-slate-500 text-sm py-4">
                All products have sufficient stock
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
