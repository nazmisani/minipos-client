"use client";

import { useState, useEffect } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
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
    recentTransactions: Array<{
      id: number;
      amount: number;
      cashier: string;
      time: string;
      customer: string;
    }>;
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
    recentTransactions: [],
    userProfile: null,
    loading: true,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulasi API calls - ganti dengan API endpoints real
      const [summaryRes, salesRes, transactionsRes, profileRes] =
        await Promise.all([
          fetch("/api/dashboard/summary"),
          fetch("/api/reports/sales?days=7"),
          fetch("/api/transactions?limit=5"),
          fetch("/api/auth/profile"),
        ]);

      // Untuk development, gunakan mock data
      const mockData = {
        summary: {
          totalProducts: 156,
          totalUsers: 12,
          todayTransactions: 28,
          todayRevenue: 2450000,
        },
        salesData: [
          { date: "2024-08-24", amount: 1800000 },
          { date: "2024-08-25", amount: 2200000 },
          { date: "2024-08-26", amount: 1950000 },
          { date: "2024-08-27", amount: 2800000 },
          { date: "2024-08-28", amount: 2100000 },
          { date: "2024-08-29", amount: 3200000 },
          { date: "2024-08-30", amount: 2450000 },
        ],
        recentTransactions: [
          {
            id: 1,
            amount: 125000,
            cashier: "John Doe",
            time: "14:30",
            customer: "Customer #001",
          },
          {
            id: 2,
            amount: 89000,
            cashier: "Jane Smith",
            time: "14:15",
            customer: "Customer #002",
          },
          {
            id: 3,
            amount: 234000,
            cashier: "Mike Johnson",
            time: "13:45",
            customer: "Customer #003",
          },
          {
            id: 4,
            amount: 156000,
            cashier: "Sarah Wilson",
            time: "13:20",
            customer: "Customer #004",
          },
          {
            id: 5,
            amount: 78000,
            cashier: "David Brown",
            time: "12:55",
            customer: "Customer #005",
          },
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

            {/* Charts Section Skeleton */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Ringkasan Hari Ini
          </h2>
          <SummaryCards data={dashboardData.summary} />
        </div>

        {/* Charts and Activity - Responsive Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/* Sales Chart Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Laporan Penjualan
            </h2>
            <SalesChart data={dashboardData.salesData} />
          </div>

          {/* Recent Activity Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Aktivitas Terbaru
            </h2>
            <RecentActivity transactions={dashboardData.recentTransactions} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Aksi Cepat</h2>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
