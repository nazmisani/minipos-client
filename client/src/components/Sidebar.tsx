"use client";

import Link from "next/link";
import { useState } from "react";

// Icons components (simplified)
const DashboardIcon = () => (
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
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
    />
  </svg>
);

const ProductsIcon = () => (
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
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const CategoriesIcon = () => (
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
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const CustomersIcon = () => (
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>
);

const TransactionsIcon = () => (
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
      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    />
  </svg>
);

const ReportsIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const UsersIcon = () => (
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>
);

const LogsIcon = () => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const SettingsIcon = () => (
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
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon />,
      href: "/dashboard",
      description: "Ringkasan penjualan & transaksi terbaru",
    },
    {
      id: "products",
      label: "Products",
      icon: <ProductsIcon />,
      href: "/products",
      description: "Kelola produk: tambah, edit, hapus",
    },
    {
      id: "categories",
      label: "Categories",
      icon: <CategoriesIcon />,
      href: "/categories",
      description: "Kelola kategori produk",
    },
    {
      id: "customers",
      label: "Customers",
      icon: <CustomersIcon />,
      href: "/customers",
      description: "Data customer & riwayat transaksi",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <TransactionsIcon />,
      href: "/transactions",
      description: "Input transaksi kasir & daftar transaksi",
    },
    {
      id: "reports",
      label: "Reports",
      icon: <ReportsIcon />,
      href: "/reports",
      description: "Laporan penjualan & produk terlaris",
    },
    {
      id: "users",
      label: "Users / Staff",
      icon: <UsersIcon />,
      href: "/users",
      description: "Kelola user: admin, manager, cashier",
    },
    {
      id: "logs",
      label: "Logs / Audit Trail",
      icon: <LogsIcon />,
      href: "/logs",
      description: "Aktivitas user & audit trail",
    },
  ];

  const bottomMenuItems = [
    {
      id: "settings",
      label: "Settings / Profile",
      icon: <SettingsIcon />,
      href: "/settings",
      description: "Edit profil & pengaturan toko",
    },
    {
      id: "logout",
      label: "Logout",
      icon: <LogoutIcon />,
      href: "/logout",
      description: "Keluar dari sistem",
      isLogout: true,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-screen w-72 
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700/50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold flex items-center justify-center text-sm shadow-lg">
              POS
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">MiniPOS</h1>
              <p className="text-emerald-400 text-xs font-medium">ERP System</p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveItem(item.id)}
                className={`
                  group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    activeItem === item.id
                      ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }
                `}
              >
                <span
                  className={`
                  mr-3 transition-colors duration-200
                  ${
                    activeItem === item.id
                      ? "text-emerald-400"
                      : "text-slate-400 group-hover:text-slate-300"
                  }
                `}
                >
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{item.label}</div>
                  <div
                    className={`
                    text-xs truncate mt-0.5 transition-colors duration-200
                    ${
                      activeItem === item.id
                        ? "text-emerald-300/80"
                        : "text-slate-500 group-hover:text-slate-400"
                    }
                  `}
                  >
                    {item.description}
                  </div>
                </div>

                {activeItem === item.id && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 p-3 space-y-1">
          {bottomMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`
                group flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  item.isLogout
                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    : activeItem === item.id
                    ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }
              `}
            >
              <span
                className={`
                mr-3 transition-colors duration-200
                ${
                  item.isLogout
                    ? "text-red-400 group-hover:text-red-300"
                    : activeItem === item.id
                    ? "text-emerald-400"
                    : "text-slate-400 group-hover:text-slate-300"
                }
              `}
              >
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{item.label}</div>
                <div
                  className={`
                  text-xs truncate mt-0.5 transition-colors duration-200
                  ${
                    item.isLogout
                      ? "text-red-300/70 group-hover:text-red-200/70"
                      : activeItem === item.id
                      ? "text-emerald-300/80"
                      : "text-slate-500 group-hover:text-slate-400"
                  }
                `}
                >
                  {item.description}
                </div>
              </div>

              {activeItem === item.id && !item.isLogout && (
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
              )}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
