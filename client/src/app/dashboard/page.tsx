"use client";

import { useState, useEffect } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import ProductChart from "@/components/dashboard/ProductChart";
import QuickActions from "@/components/dashboard/QuickActions";
import UserProfile from "@/components/dashboard/UserProfile";
import CashierHelpers from "@/components/dashboard/CashierHelpers";
import RouteGuard from "@/components/auth/RouteGuard";
import apiClient from "@/service/apiClient";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalUsers: 0,
    todayTransactions: 0,
    todayRevenue: 0,
  });

  const [userProfile, setUserProfile] = useState<{
    name: string;
    role: string;
  } | null>(null);

  async function fetchTotalProducts() {
    try {
      const { data } = await apiClient.get("/products/total");

      setSummary((prev) => ({
        ...prev,
        totalProducts: data?.data?.totalProducts || 0,
      }));

      setIsLoading(false);
    } catch (error) {
      console.log("API Error:", error);
      setIsLoading(false);
    }
  }

  async function fetchTotalStaff() {
    try {
      const { data } = await apiClient.get("/users/total");

      setSummary((prev) => ({
        ...prev,
        totalUsers: data?.data?.totalUsers || 0,
      }));

      setIsLoading(false);
    } catch (error) {
      console.log("API Error:", error);
      setIsLoading(false);
    }
  }

  async function fetchUserProfile() {
    try {
      const { data } = await apiClient.get("/auth/profile");
      setUserProfile({
        name: data.user.name || "Unknown User",
        role: data.user.role || "User",
      });
    } catch (error) {
      console.log(error);
      // Set fallback data for demo purposes
      setUserProfile({
        name: "John Doe",
        role: "admin",
      });
    }
  }

  async function fetchTodayTrans() {
    try {
      const { data } = await apiClient.get("/transactions/today");

      setSummary((prev) => ({
        ...prev,
        todayTransactions: data?.data?.summary?.totalCount || 0,
      }));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTodayRev() {
    try {
      const { data } = await apiClient.get("/transactions/today");

      setSummary((prev) => ({
        ...prev,
        todayRevenue: data?.data?.summary?.totalAmount || 0,
      }));

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
    fetchTodayTrans();
    fetchTodayRev();
    fetchTotalProducts();
    fetchTotalStaff();
  }, []);

  if (isLoading) {
    return (
      <RouteGuard>
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

              {/* Content Section Skeleton */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div className="h-7 bg-slate-200 rounded-lg w-48 mb-2 sm:mb-0"></div>
                  <div className="h-4 bg-slate-200 rounded w-64"></div>
                </div>

                {/* Generic Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-200 rounded-xl h-96"></div>
                  <div className="bg-slate-200 rounded-xl h-96"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="text-slate-600 mt-2">
                Welcome back! Here&apos;s a summary of your store today.
              </p>
            </div>
            <UserProfile user={userProfile} />
          </div>

          {/* Summary Cards */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Today&apos;s Summary
            </h2>
            <SummaryCards data={summary} />
          </div>

          {/* Conditional Content Based on Role */}
          {userProfile?.role?.toLowerCase() === "cashier" ? (
            // Cashier-specific content
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2 sm:mb-0">
                  Work Overview
                </h2>
                <p className="text-sm text-slate-500">
                  Recent transactions and inventory alerts
                </p>
              </div>

              <CashierHelpers />
            </div>
          ) : (
            // Admin & Manager analytics content
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2 sm:mb-0">
                  Analytics Overview
                </h2>
                <p className="text-sm text-slate-500">
                  Real-time insights and performance metrics
                </p>
              </div>

              {/* Charts Grid - Responsive Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart Container */}
                <div className="w-full">
                  <SalesChart />
                </div>

                {/* Product Chart Container */}
                <div className="w-full">
                  <ProductChart />
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Quick Actions
            </h2>
            <QuickActions userRole={userProfile?.role || "cashier"} />
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
