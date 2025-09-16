import { User } from "./types";

interface UserTableProps {
  users: User[];
  onViewDetail: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({
  users,
  onViewDetail,
  onEdit,
  onDelete,
}: UserTableProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Nama
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
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    #{user.id.toString().padStart(3, "0")}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">{user.email}</td>
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
                    onClick={() => onViewDetail(user)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user)}
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

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">Tidak ada data user</p>
        </div>
      )}
    </div>
  );
}
