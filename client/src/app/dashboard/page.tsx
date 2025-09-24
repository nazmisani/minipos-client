"use client";

import { useState, useEffect } from "react";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import ProductChart from "@/components/dashboard/ProductChart";
import QuickActions from "@/components/dashboard/QuickActions";
import UserProfile from "@/components/dashboard/UserProfile";
import apiClient from "@/service/apiClient";
import Cookies from "js-cookie";

export default function DashboardPage() {
  // Loading state - simple boolean
  const [isLoading, setIsLoading] = useState(true);

  // Summary data - simple flat object
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalUsers: 0,
    todayTransactions: 0,
    todayRevenue: 0,
  });

  const [salesData, setSalesData] = useState<
    Array<{ date: string; amount: number }>
  >([]);

  const [productData, setProductData] = useState<
    Array<{ name: string; sold: number; revenue: number }>
  >([]);

  const [userProfile, setUserProfile] = useState<{
    name: string;
    role: string;
    lastLogin: string;
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
      console.log("Attempting to fetch user profile...");
      const { data } = await apiClient.get("/auth/profile");

      console.log("User Profile API Response:", data);

      if (data?.data) {
        setUserProfile({
          name: data.data.name || "Unknown User",
          role: data.data.role || "User",
          lastLogin: data.data.lastLogin || new Date().toISOString(),
        });
        console.log("User profile set successfully");
      } else {
        console.log("No user data in API response, using fallback");
        setUserProfile({
          name: "Demo User",
          role: "Administrator",
          lastLogin: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.log("User Profile API Error:", error);
      console.log("Setting fallback user profile data");
      setUserProfile({
        name: "Demo User",
        role: "Administrator",
        lastLogin: new Date().toISOString(),
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
    setUserProfile({
      name: "Demo User",
      role: "Administrator",
      lastLogin: new Date().toISOString(),
    });

    fetchTodayTrans();
    fetchTodayRev();
    fetchTotalProducts();
    fetchTotalStaff();
  }, []);

  if (isLoading) {
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

            {/* Charts Section Skeleton - 2 columns */}
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
              Welcome back! Here's a summary of your store today.
            </p>
          </div>
          <UserProfile user={userProfile} />
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Today's Summary
          </h2>
          <SummaryCards data={summary} />
        </div>

        {/* Charts Grid - 2x2 Layout */}
        {/* Charts Section - 2 columns (desktop) or 1 column (mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Chart - Sales Report */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Sales Report
            </h2>
            <SalesChart data={salesData} />
          </div>

          {/* Product Chart - Best Selling Products */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Best Selling Products
            </h2>
            <ProductChart data={productData} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Quick Actions
          </h2>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
