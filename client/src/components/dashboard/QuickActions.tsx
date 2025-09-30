"use client";

import { useRouter } from "next/navigation";

interface QuickActionsProps {
  userRole?: string;
}

export default function QuickActions({
  userRole = "cashier",
}: QuickActionsProps) {
  const router = useRouter();
  // Base actions available to all roles
  const baseActions = [
    {
      title: "Add Product",
      description: "Add product to inventory",
      icon: "📦",
      color: "bg-blue-500 hover:bg-blue-600",
      href: "/products?new=true", // Trigger add mode dengan query parameter
      roles: ["admin", "manager"],
    },
    {
      title: "New Transaction",
      description: "Process new sale",
      icon: "💳",
      color: "bg-emerald-500 hover:bg-emerald-600",
      href: "/transactions/add", // Direct navigation to add transaction page
      roles: ["admin", "manager", "cashier"],
    },
    {
      title: "Manage Staff",
      description: "Add or edit team members",
      icon: "👥",
      color: "bg-orange-500 hover:bg-orange-600",
      href: "/settings?tab=users", // Langsung ke users tab di settings
      roles: ["admin"],
    },
  ];

  // Alternative actions for non-admin users
  const alternativeActions = [
    {
      title: "View Products",
      description: "Browse product catalog",
      icon: "🏪",
      color: "bg-indigo-500 hover:bg-indigo-600",
      href: "/products",
      roles: ["cashier", "manager", "admin"],
    },
    {
      title: "Customer Service",
      description: "Handle customer inquiries",
      icon: "🎯",
      color: "bg-teal-500 hover:bg-teal-600",
      href: "/customers",
      roles: ["cashier", "manager", "admin"],
    },
    {
      title: "Inventory Check",
      description: "Check stock levels",
      icon: "📋",
      color: "bg-cyan-500 hover:bg-cyan-600",
      href: "/inventory",
      roles: ["manager", "cashier", "admin"],
    },
    {
      title: "Transaction History",
      description: "View past transactions",
      icon: "📜",
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/transactions",
      roles: ["admin", "manager", "cashier"],
    },
  ];

  // Filter actions based on user role
  const getActionsForRole = (role: string) => {
    let filteredActions = baseActions.filter((action) =>
      action.roles.includes(role.toLowerCase())
    );

    // If less than 4 actions, add alternatives
    if (filteredActions.length < 4) {
      const additionalActions = alternativeActions.filter((action) =>
        action.roles.includes(role.toLowerCase())
      );

      filteredActions = [...filteredActions, ...additionalActions].slice(0, 4);
    }

    return filteredActions;
  };

  const actions = getActionsForRole(userRole);

  // Role-specific descriptions
  const getRoleDescription = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "Full access to all system features";
      case "manager":
        return "Manage operations and daily activities";
      case "cashier":
        return "Process transactions and customer service";
      default:
        return "Quick access to main features";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-600 text-sm">
            {getRoleDescription(userRole)}
          </p>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full font-medium">
            {userRole.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-6 rounded-xl transition-all duration-300 text-left group hover:scale-105 hover:shadow-xl`}
            onClick={() => {
              router.push(action.href);
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{action.icon}</span>
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">{action.title}</h4>
            <p className="text-sm opacity-90 leading-relaxed">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
