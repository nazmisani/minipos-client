"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "@/service/apiClient";

interface ProductData {
  name: string;
  quantity: number;
  subTotal: number;
}

export default function ProductChart({ data }: { data?: ProductData[] }) {
  const [productData, setProductData] = useState<ProductData[]>(data || []);
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await apiClient.get("reports/products/top");

      // Transform API response to match ProductData interface
      const transformedData =
        data?.data?.map((item: unknown) => {
          const itemObj = item as Record<string, unknown>;
          const product = itemObj.product as Record<string, unknown>;
          const sum = itemObj._sum as Record<string, unknown>;
          return {
            name: String(product?.name || ""),
            quantity: Number(sum?.quantity || 0),
            subTotal: Number(sum?.subTotal || 0),
          };
        }) || [];

      setProductData(transformedData);
    } catch (error) {
      console.log("Product Data API Error:", error);
      setError("Failed to load product data");
      setProductData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!data) {
      fetchProductData();
    }
  }, [data]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-slate-600 text-sm">Loading product data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">
            <svg
              className="w-8 h-8 mx-auto"
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
          <p className="text-slate-600 text-sm mb-2">{error}</p>
          <button
            onClick={fetchProductData}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            Top Products
          </h3>
          <p className="text-slate-500 text-sm">
            Best performing products by sales
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-lg">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-blue-700 font-semibold">Units</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={productData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.6}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={{ stroke: "#cbd5e1" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number, name: string) => [
                name === "quantity" ? `${value} units` : formatCurrency(value),
                name === "quantity" ? "Sold" : "Revenue",
              ]}
              labelFormatter={(label: unknown) => `Product: ${String(label)}`}
              labelStyle={{ color: "#334155", fontWeight: 500 }}
            />
            <Bar
              dataKey="quantity"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              name="quantity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
