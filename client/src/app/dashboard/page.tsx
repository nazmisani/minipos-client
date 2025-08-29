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
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-slate-200 rounded-lg"></div>
            <div className="h-80 bg-slate-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <UserProfile user={dashboardData.userProfile} />
        </div>

        {/* Summary Cards */}
        <SummaryCards data={dashboardData.summary} />

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SalesChart data={dashboardData.salesData} />
          <RecentActivity transactions={dashboardData.recentTransactions} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}
