interface User {
  name: string;
  role: string;
  lastLogin: string;
}

interface UserProfileProps {
  user: User | null;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "administrator":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "cashier":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{user.name}</h3>
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                user.role
              )}`}
            >
              {user.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Last login: {formatDate(user.lastLogin)}
          </p>
        </div>
      </div>
    </div>
  );
}
