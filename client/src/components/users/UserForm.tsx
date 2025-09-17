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

interface UserFormProps {
  mode: "add" | "edit";
  user?: User;
  onViewModeChange: (mode: UserViewMode) => void;
}

const roleOptions = [
  { value: "staff", label: "Staff" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

export default function UserForm({
  mode,
  user,
  onViewModeChange,
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "staff",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (mode === "add" && !formData.password) return;

    // TODO: Implement actual save logic here
    console.log("Saving user:", formData);

    // Navigate back to list
    onViewModeChange("list");
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
              label="Kembali ke User Management"
            />
          </div>
          <PageHeader
            title={mode === "edit" ? "Edit User" : "Tambah User"}
            subtitle={
              mode === "edit"
                ? "Ubah informasi user yang dipilih"
                : "Tambahkan user baru ke dalam sistem"
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
              <Button type="submit">
                {mode === "edit" ? "Simpan Perubahan" : "Tambah User"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onViewModeChange("list")}
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
