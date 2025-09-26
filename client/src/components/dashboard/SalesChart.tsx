"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "@/service/apiClient";

interface SalesData {
  date: string;
  amount: number;
}

export default function SalesChart() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await apiClient.get("/reports/sales");

      const transformedData =
        data?.data?.map((item: any) => ({
          date: item.date,
          amount: item.totalSales,
        })) || [];

      setSalesData(transformedData);
    } catch (error) {
      console.log("Sales Data API Error:", error);
      setError("Failed to load sales data");
      setSalesData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
    });
  };

  const chartData = salesData.map((item) => ({
    ...item,
    displayDate: formatDate(item.date),
  }));

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-2"></div>
          <p className="text-slate-600 text-sm">Loading sales data...</p>
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
            onClick={fetchSalesData}
            className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition-colors"
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
            Sales Revenue
          </h3>
          <p className="text-slate-500 text-sm">Revenue for the last 7 days</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-lg">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-700 font-semibold">
            Revenue
          </span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.6}
            />
            <XAxis
              dataKey="displayDate"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={{ stroke: "#cbd5e1" }}
              tickFormatter={(value: any) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              labelFormatter={(label: any) => `Date: ${label}`}
              labelStyle={{ color: "#334155", fontWeight: 500 }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
              activeDot={{
                r: 7,
                fill: "#059669",
                stroke: "#10b981",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
