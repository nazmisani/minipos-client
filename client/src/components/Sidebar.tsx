"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "categories", label: "Categories", icon: "🏷️" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "transactions", label: "Transactions", icon: "💳" },
    { id: "reports", label: "Reports", icon: "📈" },
    { id: "users", label: "Users", icon: "👤" },
    { id: "logs", label: "Logs", icon: "📝" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div
      className={`h-screen bg-slate-900 border-r border-slate-700 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
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
      <div className="p-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg text-left transition-colors ${
              activeItem === item.id
                ? "bg-emerald-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="ml-3 text-sm">{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="absolute bottom-4 left-3 right-3">
        <button className="w-full flex items-center px-3 py-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors">
          <span className="text-lg">🚪</span>
          {!isCollapsed && <span className="ml-3 text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
}
