"use client";

import { useState, useEffect } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import ProductChart from "@/components/dashboard/ProductChart";
import QuickActions from "@/components/dashboard/QuickActions";
import UserProfile from "@/components/dashboard/UserProfile";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<{
    summary: {
      totalProducts: number;
      totalUsers: number;
      todayTransactions: number;
      todayRevenue: number;
    };
    salesData: Array<{ date: string; amount: number }>;
    productData: Array<{ name: string; sold: number; revenue: number }>;
    userProfile: {
      name: string;
      role: string;
      lastLogin: string;
    } | null;
    loading: boolean;
  }>({
    summary: {
      totalProducts: 0,
      totalUsers: 0,
      todayTransactions: 0,
      todayRevenue: 0,
    },
    salesData: [],
    productData: [],
    userProfile: null,
    loading: true,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulasi API calls untuk dashboard baru
      const [summaryRes, salesRes, productsRes, profileRes] = await Promise.all(
        [
          fetch("/api/dashboard/summary"),
          fetch("/api/reports/sales?days=7"),
          fetch("/api/reports/products/top?limit=5"),
          fetch("/api/auth/profile"),
        ]
      );

      // Dummy data sesuai dengan API schema
      const mockData = {
        summary: {
          totalProducts: 156,
          totalUsers: 12,
          todayTransactions: 28,
          todayRevenue: 2450000,
        },
        // Data untuk /reports/sales (7 hari terakhir)
        salesData: [
          { date: "2024-08-24", amount: 1800000 },
          { date: "2024-08-25", amount: 2200000 },
          { date: "2024-08-26", amount: 1950000 },
          { date: "2024-08-27", amount: 2800000 },
          { date: "2024-08-28", amount: 2100000 },
          { date: "2024-08-29", amount: 3200000 },
          { date: "2024-08-30", amount: 2450000 },
        ],
        // Data untuk /reports/products/top (5 produk terlaris)
        productData: [
          { name: "Kopi Americano", sold: 45, revenue: 450000 },
          { name: "Nasi Goreng", sold: 32, revenue: 480000 },
          { name: "Ayam Bakar", sold: 28, revenue: 560000 },
          { name: "Jus Jeruk", sold: 25, revenue: 200000 },
          { name: "Roti Bakar", sold: 22, revenue: 220000 },
        ],
        userProfile: {
          name: "Admin User",
          role: "Administrator",
          lastLogin: "2024-08-30 09:00:00",
        },
      };

      setDashboardData({
        ...mockData,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setDashboardData((prev) => ({ ...prev, loading: false }));
    }
  };

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-slate-200 rounded-lg w-64 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-96"></div>
            </div>

            {/* Summary Cards Skeleton */}
            <div className="mb-10">
              <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-slate-200 rounded-xl h-32"></div>
                ))}
              </div>
            </div>

            {/* Charts Section Skeleton - 2 kolom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="h-6 bg-slate-200 rounded w-40 mb-4"></div>
                <div className="h-80 bg-slate-200 rounded-xl"></div>
              </div>
              <div>
                <div className="h-6 bg-slate-200 rounded w-36 mb-4"></div>
                <div className="h-80 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Selamat datang kembali! Berikut ringkasan toko Anda hari ini.
            </p>
          </div>
          <UserProfile user={dashboardData.userProfile} />
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Ringkasan Hari Ini
          </h2>
          <SummaryCards data={dashboardData.summary} />
        </div>

        {/* Charts Grid - 2x2 Layout */}
        {/* Charts Section - 2 kolom (desktop) atau 1 kolom (mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart - Laporan Penjualan */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Laporan Penjualan
            </h2>
            <SalesChart data={dashboardData.salesData} />
          </div>

          {/* Product Chart - Produk Terlaris */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Produk Terlaris
            </h2>
            <ProductChart data={dashboardData.productData} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Aksi Cepat
          </h2>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
