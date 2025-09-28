import { User } from "./types";
import {
  DataTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
  Button,
} from "@/components/shared";

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
    // API sudah memberikan format yang siap pakai seperti "26 Agustus 2025"
    return dateString;
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "cashier":
        return "bg-green-100 text-green-800";
      case "staff":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (users.length === 0) {
    return <EmptyState message="Tidak ada data user" />;
  }

  return (
    <DataTable>
      <TableHeader>
        <TableHeaderCell>Nama</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Role</TableHeaderCell>
        <TableHeaderCell>Created At</TableHeaderCell>
        <TableHeaderCell>Aksi</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {user.name}
                </div>
                <div className="text-sm text-slate-500">
                  #{user.id.toString().padStart(3, "0")}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-slate-900">{user.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  user.role
                )}`}
              >
                {user.role.toUpperCase()}
              </span>
            </TableCell>
            <TableCell className="text-slate-500">
              {formatDateTime(user.createdAt)}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => onViewDetail(user)}
                >
                  View
                </Button>
                <Button size="sm" variant="info" onClick={() => onEdit(user)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(user)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
}
