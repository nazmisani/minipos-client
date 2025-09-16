import { User, UserViewMode } from "./types";
import UserTable from "@/components/users/UserTable";

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

interface UserListProps {
  onViewModeChange: (mode: UserViewMode) => void;
  onSelectUser: (user: User) => void;
}

export default function UserList({
  onViewModeChange,
  onSelectUser,
}: UserListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              User Management
            </h1>
            <p className="text-slate-600 mt-2">
              Kelola pengguna dan hak akses sistem.
            </p>
          </div>
          <button
            onClick={() => onViewModeChange("add")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Tambah User
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari user..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <UserTable
            users={dummyUsers}
            onViewDetail={(user: User) => {
              onSelectUser(user);
              onViewModeChange("detail");
            }}
            onEdit={(user: User) => {
              onSelectUser(user);
              onViewModeChange("edit");
            }}
            onDelete={(user: User) => {
              onSelectUser(user);
              onViewModeChange("delete");
            }}
          />
        </div>
      </div>
    </div>
  );
}
