import { User, UserViewMode } from "./types";
import UserTable from "@/components/users/UserTable";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";
import { useState, useEffect } from "react";
import apiClient from "@/service/apiClient";
import Protected from "@/components/auth/Protected";

interface UserListProps {
  onViewModeChange: (mode: UserViewMode) => void;
  onSelectUser: (user: User) => void;
  onRefreshNeeded?: () => void;
}

export default function UserList({
  onViewModeChange,
  onSelectUser,
  onRefreshNeeded,
}: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get("/users");
      setUsers(data.users);
    } catch (error) {
      console.log("Users API Error:", error);
      setError("Failed to load users data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CrudLayout>
      <PageHeader
        title="User Management"
        subtitle="Manage users and system access rights."
        action={
          <Protected permission="users.create">
            <Button onClick={() => onViewModeChange("add")}>Add User</Button>
          </Protected>
        }
      />

      <SearchBar placeholder="Search users..." />

      <Card>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading users...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-400 mb-4">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Error Loading Users
            </h3>
            <p className="text-slate-500 mb-4">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={(user: User) => {
              onSelectUser(user);
              onViewModeChange("edit");
            }}
            onDelete={(user: User) => {
              onSelectUser(user);
              onViewModeChange("delete");
            }}
          />
        )}
      </Card>
    </CrudLayout>
  );
}
