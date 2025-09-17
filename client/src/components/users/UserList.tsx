import { User, UserViewMode } from "./types";
import UserTable from "@/components/users/UserTable";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";

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
    <CrudLayout>
      <PageHeader
        title="User Management"
        subtitle="Kelola pengguna dan hak akses sistem."
        action={
          <Button onClick={() => onViewModeChange("add")}>Tambah User</Button>
        }
      />

      <SearchBar placeholder="Cari user..." />

      <Card>
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
      </Card>
    </CrudLayout>
  );
}
