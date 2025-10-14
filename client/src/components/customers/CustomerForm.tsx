"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Customer } from "./types";
import apiClient from "@/service/apiClient";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message?: string;
}

interface AxiosErrorWithUserMessage extends AxiosError<ApiErrorResponse> {
  userMessage?: string;
}

interface CustomerFormProps {
  customer?: Customer;
  isEdit: boolean;
  onBack: () => void;
  onSave: () => void;
}

export default function CustomerForm({
  customer,
  isEdit,
  onBack,
  onSave,
}: CustomerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    phone: customer?.phone || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Customer name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const customerData = {
        name: formData.name.trim(),
        phone: formData.phone.trim() || null,
      };

      if (isEdit && customer) {
        await apiClient.put(`/customers/${customer.id}`, customerData);
        toast.success("Customer successfully updated");
      } else {
        await apiClient.post("/customers", customerData);
        toast.success("Customer successfully added");
      }

      onSave();
    } catch (error: unknown) {
      console.error("=== ERROR SAVING CUSTOMER ===");
      console.error("Full error:", error);

      const axiosError = error as AxiosErrorWithUserMessage;

      if (axiosError.response) {
        console.error("Status:", axiosError.response.status);
        console.error("Data:", axiosError.response.data);
      }
      console.error("==============================");

      // Get error message with priority
      let errorMessage = `Failed to ${isEdit ? "update" : "add"} customer`;

      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (axiosError.userMessage) {
        errorMessage = axiosError.userMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
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
              Back to Customer
            </button>
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
              {isEdit ? "Edit Customer" : "Add Customer"}
            </h1>
            <p className="text-slate-600 mt-2">
              {isEdit
                ? "Update the selected customer information"
                : "Add a new customer to the system"}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter customer name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter phone number (optional)"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isSubmitting || !formData.name.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isEdit ? "Saving..." : "Adding..."}
                  </div>
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Add Customer"
                )}
              </button>
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
