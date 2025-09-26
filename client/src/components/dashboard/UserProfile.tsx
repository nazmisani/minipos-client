interface User {
  name: string;
  role: string;
}

interface UserProfileProps {
  user: User | null;
}

export default function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  const getRoleConfig = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return {
          color: "bg-gradient-to-r from-red-500 to-red-600",
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          icon: "👑",
        };
      case "manager":
        return {
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
          bgColor: "bg-blue-50",
          textColor: "text-blue-800",
          borderColor: "border-blue-200",
          icon: "💼",
        };
      case "cashier":
        return {
          color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
          bgColor: "bg-emerald-50",
          textColor: "text-emerald-800",
          borderColor: "border-emerald-200",
          icon: "💳",
        };
      default:
        return {
          color: "bg-gradient-to-r from-slate-500 to-slate-600",
          bgColor: "bg-slate-50",
          textColor: "text-slate-800",
          borderColor: "border-slate-200",
          icon: "👤",
        };
    }
  };

  const roleConfig = getRoleConfig(user.role);
  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <div
      className={`${roleConfig.bgColor} ${roleConfig.borderColor} rounded-2xl p-5 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-center space-x-4">
        {/* Avatar with gradient background */}
        <div className="relative">
          <div
            className={`w-16 h-16 ${roleConfig.color} rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-white`}
          >
            <span className="text-white font-bold text-xl">{initials}</span>
          </div>
          {/* Role icon badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm">{roleConfig.icon}</span>
          </div>
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-lg text-slate-900 truncate">
              {user.name}
            </h3>
          </div>

          {/* Role badge with enhanced styling */}
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-semibold ${roleConfig.textColor} ${roleConfig.bgColor} border ${roleConfig.borderColor} shadow-sm`}
            >
              <span className="mr-2">{roleConfig.icon}</span>
              {user.role.charAt(0).toUpperCase() +
                user.role.slice(1).toLowerCase()}
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-xs text-slate-500 mt-1 font-medium">
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
