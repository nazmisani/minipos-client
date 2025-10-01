import { useState } from "react";
import { User, UserViewMode } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Button,
} from "@/components/shared";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";

interface DeleteConfirmationProps {
  user: User;
  onViewModeChange: (mode: UserViewMode) => void;
  onRefreshNeeded?: () => void;
}

export default function DeleteConfirmation({
  user,
  onViewModeChange,
  onRefreshNeeded,
}: DeleteConfirmationProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await apiClient.delete(`/users/${user.id}`);
      toast.success("User berhasil dihapus!");
      if (onRefreshNeeded) onRefreshNeeded();
      onViewModeChange("list");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Gagal menghapus user!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <CrudLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton
              onClick={() => onViewModeChange("list")}
              label="Kembali ke User Management"
            />
          </div>
          <PageHeader
            title="Hapus User"
            subtitle="Konfirmasi penghapusan data user dari sistem"
          />
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3">
              Apakah Anda yakin ingin menghapus user ini?
            </h2>
            <p className="text-slate-600">
              Anda akan menghapus user <strong>{user.name}</strong>. Tindakan
              ini tidak dapat dibatalkan.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Nama:</span>
                <span className="font-medium text-slate-900">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Email:</span>
                <span className="font-medium text-slate-900">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Role:</span>
                <span className="font-medium text-slate-900">
                  {user.role.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => onViewModeChange("list")}
              disabled={loading}
            >
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={loading}>
              {loading ? "Menghapus..." : "Ya, Hapus User"}
            </Button>
          </div>
        </Card>
      </div>
    </CrudLayout>
  );
}
