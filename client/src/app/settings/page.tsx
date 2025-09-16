"use client";

import { useState } from "react";
import { User, UserFormData, UserViewMode } from "@/components/users/types";
import UserList from "@/components/users/UserList";
import UserDetail from "@/components/users/UserDetail";
import UserForm from "@/components/users/UserForm";
import DeleteConfirmation from "@/components/users/DeleteConfirmation";

type TabType = "general" | "logs" | "users";

// Dummy log data
const dummyLogs = [
  {
    id: 1,
    user: "Admin User",
    action: "CREATE",
    entity: "Customer",
    createdAt: "2024-09-11 14:30:25",
  },
  {
    id: 2,
    user: "Staff User",
    action: "UPDATE",
    entity: "Product",
    createdAt: "2024-09-11 13:15:10",
  },
  {
    id: 3,
    user: "Admin User",
    action: "DELETE",
    entity: "Transaction",
    createdAt: "2024-09-11 12:45:33",
  },
  {
    id: 4,
    user: "Staff User",
    action: "CREATE",
    entity: "Customer",
    createdAt: "2024-09-11 11:20:15",
  },
  {
    id: 5,
    user: "Manager User",
    action: "UPDATE",
    entity: "Settings",
    createdAt: "2024-09-11 10:30:40",
  },
  {
    id: 6,
    user: "Admin User",
    action: "CREATE",
    entity: "Product",
    createdAt: "2024-09-11 09:15:22",
  },
  {
    id: 7,
    user: "Staff User",
    action: "DELETE",
    entity: "Customer",
    createdAt: "2024-09-11 08:45:11",
  },
  {
    id: 8,
    user: "Manager User",
    action: "UPDATE",
    entity: "Transaction",
    createdAt: "2024-09-10 16:30:55",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [userViewMode, setUserViewMode] = useState<UserViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-emerald-100 text-emerald-800";
      case "UPDATE":
        return "bg-blue-100 text-blue-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Settings
          </h1>
          <p className="text-slate-600 mt-2">
            Kelola pengaturan sistem dan pantau aktivitas pengguna.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("general")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "general"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "users"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("logs")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "logs"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Logs
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* General Settings Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                General Settings
              </h2>
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  General Settings
                </h3>
                <p className="text-slate-500">
                  Pengaturan umum sistem akan ditampilkan di sini.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="space-y-6">
            {/* Activity Logs Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">
                  Activity Logs
                </h2>
                <p className="text-slate-600 mt-1">
                  Riwayat aktivitas pengguna dalam sistem.
                </p>
              </div>

              {/* Table Container with horizontal scroll */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Entity
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {dummyLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          #{log.id.toString().padStart(3, "0")}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {log.user}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(
                              log.action
                            )}`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {log.entity}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatDateTime(log.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State (jika tidak ada data) */}
              {dummyLogs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Belum Ada Log Aktivitas
                  </h3>
                  <p className="text-slate-500">
                    Log aktivitas pengguna akan muncul di sini.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            {(() => {
              switch (userViewMode) {
                case "list":
                  return (
                    <UserList
                      onViewModeChange={setUserViewMode}
                      onSelectUser={setSelectedUser}
                    />
                  );
                case "detail":
                  return selectedUser ? (
                    <UserDetail
                      user={selectedUser}
                      onViewModeChange={setUserViewMode}
                    />
                  ) : (
                    <UserList
                      onViewModeChange={setUserViewMode}
                      onSelectUser={setSelectedUser}
                    />
                  );
                case "add":
                  return (
                    <UserForm mode="add" onViewModeChange={setUserViewMode} />
                  );
                case "edit":
                  return selectedUser ? (
                    <UserForm
                      mode="edit"
                      user={selectedUser}
                      onViewModeChange={setUserViewMode}
                    />
                  ) : (
                    <UserList
                      onViewModeChange={setUserViewMode}
                      onSelectUser={setSelectedUser}
                    />
                  );
                case "delete":
                  return selectedUser ? (
                    <DeleteConfirmation
                      user={selectedUser}
                      onViewModeChange={setUserViewMode}
                    />
                  ) : (
                    <UserList
                      onViewModeChange={setUserViewMode}
                      onSelectUser={setSelectedUser}
                    />
                  );
                default:
                  return (
                    <UserList
                      onViewModeChange={setUserViewMode}
                      onSelectUser={setSelectedUser}
                    />
                  );
              }
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
