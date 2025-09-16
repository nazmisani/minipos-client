import { User, UserViewMode } from "./types";

interface UserDetailProps {
  user: User;
  onViewModeChange: (mode: UserViewMode) => void;
}

export default function UserDetail({
  user,
  onViewModeChange,
}: UserDetailProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onViewModeChange("list")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Kembali ke User Management
            </button>
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              Detail User
            </h1>
            <p className="text-slate-600 mt-2">Informasi lengkap user sistem</p>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Informasi User
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                ID User
              </label>
              <p className="text-slate-900 font-medium">
                #{user.id.toString().padStart(3, "0")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Nama
              </label>
              <p className="text-slate-900 font-medium">{user.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <p className="text-slate-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Role
              </label>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role.toUpperCase()}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Tanggal Bergabung
              </label>
              <p className="text-slate-900">{formatDateTime(user.createdAt)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Status
              </label>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Activity Log Placeholder */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Log Aktivitas
          </h2>

          <div className="text-center py-8">
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
              Log aktivitas user akan ditampilkan di sini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
