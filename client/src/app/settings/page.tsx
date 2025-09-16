"use client";

import { useState } from "react";

type TabType = "general" | "logs" | "users";

// Types for User
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  password?: string;
}

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

// Dummy users data
const dummyUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@minipos.com",
    role: "admin",
    createdAt: "2024-09-01 10:00:00",
  },
  {
    id: 2,
    name: "Staff User",
    email: "staff@minipos.com",
    role: "staff",
    createdAt: "2024-09-05 14:30:00",
  },
  {
    id: 3,
    name: "Manager User",
    email: "manager@minipos.com",
    role: "manager",
    createdAt: "2024-09-03 09:15:00",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // User Management Functions
  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (userData: UserFormData) => {
    if (!selectedUser) return;
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: userData.name,
            email: userData.email,
            role: userData.role,
          }
        : user
    );
    setUsers(updatedUsers);
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "staff":
        return "bg-emerald-100 text-emerald-800";
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
            {/* Users Management Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      User Management
                    </h2>
                    <p className="text-slate-600 mt-1">
                      Kelola pengguna dan hak akses sistem.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Tambah User
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          #{user.id.toString().padStart(3, "0")}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatDateTime(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal(user)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Empty State */}
                {users.length === 0 && (
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">
                      Belum Ada User
                    </h3>
                    <p className="text-slate-500">
                      User yang terdaftar dalam sistem akan muncul di sini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {isAddModalOpen && (
          <UserModal
            title="Tambah User"
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAddUser}
            showPasswordField={true}
          />
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && selectedUser && (
          <UserModal
            title="Edit User"
            user={selectedUser}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            onSave={handleEditUser}
            showPasswordField={false}
          />
        )}
      </div>
    </div>
  );
}

// User Modal Component
interface UserModalProps {
  title: string;
  user?: User;
  onClose: () => void;
  onSave: (userData: UserFormData) => void;
  showPasswordField: boolean;
}

function UserModal({
  title,
  user,
  onClose,
  onSave,
  showPasswordField,
}: UserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "staff",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (showPasswordField && !formData.password) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {showPasswordField && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
