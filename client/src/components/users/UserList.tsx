import { User, UserViewMode } from "./types";
import UserTable from "@/components/users/UserTable";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";

// TODO: Replace with API call

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
          users={[]}
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
