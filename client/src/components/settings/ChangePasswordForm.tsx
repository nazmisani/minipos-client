import { useState } from "react";
import { Card, Input, Button } from "@/components/shared";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (
    field: "currentPassword" | "newPassword" | "confirmPassword"
  ) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePasswords = () => {
    // Check all fields filled
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return false;
    }

    // Check minimum length
    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return false;
    }

    // Check password not same as current
    if (formData.currentPassword === formData.newPassword) {
      toast.error("New password must be different from current password");
      return false;
    }

    // Check passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return false;
    }

    // Check password strength (matching backend requirements)
    const hasUpperCase = /[A-Z]/.test(formData.newPassword);
    const hasLowerCase = /[a-z]/.test(formData.newPassword);
    const hasNumber = /\d/.test(formData.newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      toast.error(
        "Password must contain at least one uppercase letter, lowercase letter, and number"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    setLoading(true);
    try {
      await apiClient.put("/auth/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword, // ✅ Add this field!
      });

      toast.success("Password changed successfully!");

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      console.error("=== ERROR CHANGING PASSWORD ===");
      console.error("Full error:", error);

      if (error instanceof Error && "response" in error) {
        const axiosError = error as any;
        console.error("Status:", axiosError.response?.status);
        console.error("Data:", axiosError.response?.data);
      }
      console.error("==============================");

      // Get error message with better fallback handling
      let errorMessage = "Failed to change password";

      if (error instanceof Error && "response" in error) {
        const axiosError = error as any;

        // Backend error message
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        }
        // Interceptor user message
        else if (axiosError.userMessage) {
          errorMessage = axiosError.userMessage;
        }
        // Status-based message
        else if (axiosError.response?.status === 400) {
          errorMessage = "Invalid password data. Please check all fields.";
        } else if (axiosError.response?.status === 401) {
          errorMessage = "Current password is incorrect.";
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Password Security
            </h3>
            <p className="text-sm text-slate-600">
              Update your password to keep your account secure. Choose a strong
              password for better protection.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          {/* Current Password Field */}
          <div className="relative">
            <Input
              label="Current Password"
              type={showPasswords.currentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter your current password"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("currentPassword")}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPasswords.currentPassword ? (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* New Password Field */}
          <div className="relative">
            <Input
              label="New Password"
              type={showPasswords.newPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter your new password"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPasswords.newPassword ? (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showPasswords.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your new password"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPasswords.confirmPassword ? (
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Password Requirements Info Box */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Password Requirements:
                </p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li
                    className={`flex items-center space-x-2 ${
                      formData.newPassword.length >= 6
                        ? "line-through opacity-60"
                        : ""
                    }`}
                  >
                    <span>•</span>
                    <span>At least 6 characters long</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      /[A-Z]/.test(formData.newPassword)
                        ? "line-through opacity-60"
                        : ""
                    }`}
                  >
                    <span>•</span>
                    <span>At least one uppercase letter (A-Z)</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      /[a-z]/.test(formData.newPassword)
                        ? "line-through opacity-60"
                        : ""
                    }`}
                  >
                    <span>•</span>
                    <span>At least one lowercase letter (a-z)</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      /\d/.test(formData.newPassword)
                        ? "line-through opacity-60"
                        : ""
                    }`}
                  >
                    <span>•</span>
                    <span>At least one number (0-9)</span>
                  </li>
                  <li
                    className={`flex items-center space-x-2 ${
                      formData.newPassword &&
                      formData.currentPassword !== formData.newPassword
                        ? "line-through opacity-60"
                        : ""
                    }`}
                  >
                    <span>•</span>
                    <span>Different from current password</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-slate-600">Password strength:</span>
                <div className="flex space-x-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.newPassword.length >= 6
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.newPassword.length >= 8 &&
                      /[A-Z]/.test(formData.newPassword)
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full ${
                      formData.newPassword.length >= 8 &&
                      /[A-Z]/.test(formData.newPassword) &&
                      /[0-9]/.test(formData.newPassword)
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  {formData.newPassword.length >= 8 &&
                  /[A-Z]/.test(formData.newPassword) &&
                  /[0-9]/.test(formData.newPassword)
                    ? "Strong"
                    : formData.newPassword.length >= 6
                    ? "Medium"
                    : "Weak"}
                </span>
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Use at least 6 characters with uppercase letters and numbers for
                better security.
              </div>
            </div>
          )}

          {/* Password Match Indicator */}
          {formData.confirmPassword && (
            <div className="mt-2">
              <div
                className={`flex items-center space-x-2 text-sm ${
                  formData.newPassword === formData.confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formData.newPassword === formData.confirmPassword ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Passwords match</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Passwords do not match</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Your password will be updated immediately after confirmation
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
                disabled={loading}
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
              <Button
                type="submit"
                disabled={
                  loading ||
                  formData.newPassword !== formData.confirmPassword ||
                  !formData.currentPassword ||
                  !formData.newPassword ||
                  !formData.confirmPassword
                }
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}
