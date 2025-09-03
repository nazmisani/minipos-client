"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

// Optimized Icons - Only what we need
const DashboardIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const ProductsIcon = () => (
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
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const TransactionsIcon = () => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const CustomersIcon = () => (
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
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const SettingsIcon = () => (
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
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const LogoutIcon = () => (
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
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 z3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      id: "products",
      label: "Products",
      icon: <ProductsIcon />,
      path: "/products",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <TransactionsIcon />,
      path: "/transactions",
    },
    {
      id: "customers",
      label: "Customers",
      icon: <CustomersIcon />,
      path: "/customers",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div
      className={`h-screen bg-slate-900 border-r border-slate-700 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              POS
            </div>
            <div>
              <h1 className="text-white font-bold">MiniPOS</h1>
              <p className="text-emerald-400 text-xs">ERP System</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-white p-1 rounded"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="ml-3 text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="flex-shrink-0 p-3 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 group"
        >
          <span className="flex-shrink-0 group-hover:scale-110 transition-transform">
            <LogoutIcon />
          </span>
          {!isCollapsed && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}
