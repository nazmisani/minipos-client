"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import apiClient from "@/service/apiClient";
import { User, UserViewMode } from "@/components/users/types";
import UserList from "@/components/users/UserList";
import UserForm from "@/components/users/UserForm";
import DeleteConfirmation from "@/components/users/DeleteConfirmation";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import Protected from "@/components/auth/Protected";
import RouteGuard from "@/components/auth/RouteGuard";

type TabType = "general" | "logs" | "users";

interface LogData {
  id: number;
  action: string;
  entity: string;
  createdAt: string;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

function SettingsPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [userViewMode, setUserViewMode] = useState<UserViewMode>("list");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userRefreshKey, setUserRefreshKey] = useState(0);

  // Logs state
  const [logs, setLogs] = useState<LogData[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState<string | null>(null);

  // Auto-switch to specified tab from query parameters
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "users" || tab === "logs" || tab === "general") {
      setActiveTab(tab as TabType);
    }
  }, [searchParams]);

  // Fetch logs when logs tab is active
  useEffect(() => {
    if (activeTab === "logs") {
      fetchLogs();
    }
  }, [activeTab]);

  const fetchLogs = async () => {
    try {
      setLogsLoading(true);
      setLogsError(null);
      const { data } = await apiClient.get("/logs");

      setLogs(data.data);
    } catch (error) {
      console.log("Logs API Error:", error);
      setLogsError("Failed to load logs data");
    } finally {
      setLogsLoading(false);
    }
  };

  const refreshUserList = () => {
    setUserRefreshKey((prev) => prev + 1);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const getActionBadgeColor = (action: string) => {
    if (action.includes("CREATE")) {
      return "bg-emerald-100 text-emerald-800";
    } else if (action.includes("UPDATE")) {
      return "bg-blue-100 text-blue-800";
    } else if (action.includes("DELETE")) {
      return "bg-red-100 text-red-800";
    } else {
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
            Manage system settings and monitor user activity.
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
              <Protected permission="settings.users">
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
              </Protected>
              <Protected permission="settings.logs">
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
              </Protected>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                General Settings
              </h1>
              <p className="text-slate-600 mt-1">
                Manage your account security and system preferences
              </p>
            </div>

            {/* Change Password Section */}
            <ChangePasswordForm />

            {/* Additional Settings Cards can be added here */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center py-8">
                <div className="text-slate-400 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
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
                  More Settings Coming Soon
                </h3>
                <p className="text-slate-500 text-sm">
                  Additional system preferences and configurations will be
                  available here.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <Protected permission="settings.logs">
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
                      {/* Loading State */}
                      {logsLoading && (
                        <>
                          {[...Array(5)].map((_, index) => (
                            <tr key={index} className="animate-pulse">
                              <td className="px-6 py-4">
                                <div className="h-4 w-12 bg-slate-200 rounded"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-6 w-20 bg-slate-200 rounded-full"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 w-16 bg-slate-200 rounded"></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="h-4 w-28 bg-slate-200 rounded"></div>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}

                      {/* Actual Data */}
                      {!logsLoading &&
                        logs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                              #{log.id.toString().padStart(3, "0")}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-900">
                              <div>
                                <div className="font-medium">
                                  {log.user.name}
                                </div>
                                <div className="text-xs text-slate-500 capitalize">
                                  {log.user.role}
                                </div>
                              </div>
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
                            <td className="px-6 py-4 text-sm text-slate-900 capitalize">
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

                {/* Error State */}
                {logsError && (
                  <div className="text-center py-12">
                    <div className="text-red-400 mb-4">
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
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      Error Loading Logs
                    </h3>
                    <p className="text-slate-500 mb-4">{logsError}</p>
                    <button
                      onClick={fetchLogs}
                      className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Empty State (jika tidak ada data) */}
                {!logsLoading && !logsError && logs.length === 0 && (
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
                      No Activity Log Yet
                    </h3>
                    <p className="text-slate-500">
                      Log aktivitas pengguna akan muncul di sini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Protected>
        )}

        <Protected permission="settings.users">
          {activeTab === "users" && (
            <div className="space-y-6">
              {(() => {
                switch (userViewMode) {
                  case "list":
                    return (
                      <UserList
                        key={userRefreshKey}
                        onViewModeChange={setUserViewMode}
                        onSelectUser={setSelectedUser}
                        onRefreshNeeded={refreshUserList}
                      />
                    );
                  case "add":
                    return (
                      <UserForm
                        mode="add"
                        onViewModeChange={setUserViewMode}
                        onRefreshNeeded={refreshUserList}
                      />
                    );
                  case "edit":
                    return selectedUser ? (
                      <UserForm
                        mode="edit"
                        user={selectedUser}
                        onViewModeChange={setUserViewMode}
                        onRefreshNeeded={refreshUserList}
                      />
                    ) : (
                      <UserList
                        key={userRefreshKey}
                        onViewModeChange={setUserViewMode}
                        onSelectUser={setSelectedUser}
                        onRefreshNeeded={refreshUserList}
                      />
                    );
                  case "delete":
                    return selectedUser ? (
                      <DeleteConfirmation
                        user={selectedUser}
                        onViewModeChange={setUserViewMode}
                        onRefreshNeeded={refreshUserList}
                      />
                    ) : (
                      <UserList
                        key={userRefreshKey}
                        onViewModeChange={setUserViewMode}
                        onSelectUser={setSelectedUser}
                        onRefreshNeeded={refreshUserList}
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
        </Protected>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <RouteGuard permission="pages.settings">
      <SettingsPageContent />
    </RouteGuard>
  );
}
