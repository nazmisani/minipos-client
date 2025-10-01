import { useState } from "react";
import { User, UserFormData, UserViewMode } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Input,
  Select,
  Button,
} from "@/components/shared";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";

interface UserFormProps {
  mode: "add" | "edit";
  user?: User;
  onViewModeChange: (mode: UserViewMode) => void;
  onRefreshNeeded?: () => void;
}

const roleOptions = [
  { value: "cashier", label: "Cashier" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

export default function UserForm({
  mode,
  user,
  onViewModeChange,
  onRefreshNeeded,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "cashier",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (mode === "add" && !formData.password) return;

    setLoading(true);
    try {
      if (mode === "add") {
        await apiClient.post("/users", {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        });
        toast.success("User berhasil ditambahkan!");
      } else {
        // TODO: Implement edit functionality
        await apiClient.put(`/users/${user?.id}`, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
        toast.success("User berhasil diupdate!");
      }

      // Refresh data and navigate back to list
      if (onRefreshNeeded) onRefreshNeeded();
      onViewModeChange("list");
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(
        mode === "add" ? "Gagal menambahkan user!" : "Gagal mengupdate user!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <CrudLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton
              onClick={() => onViewModeChange("list")}
              label="Back to User Management"
            />
          </div>
          <PageHeader
            title={mode === "edit" ? "Edit User" : "Add User"}
            subtitle={
              mode === "edit"
                ? "Edit selected user information"
                : "Add new user to the system"
            }
          />
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nama User"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="user@email.com"
                required
              />

              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                options={roleOptions}
              />

              {mode === "add" && (
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Processing..."
                  : mode === "edit"
                  ? "Save Changes"
                  : "Add User"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onViewModeChange("list")}
                disabled={loading}
              >
                Batal
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CrudLayout>
  );
}
