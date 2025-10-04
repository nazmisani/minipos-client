"use client";

import { useState, useEffect } from "react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: Partial<Customer>) => void;
  customer: Customer | null;
  mode: "add" | "edit";
}

export default function CustomerModal({
  isOpen,
  onClose,
  onSave,
  customer,
  mode,
}: CustomerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && customer) {
        setFormData({
          name: customer.name || "",
          phone: customer.phone || "",
          email: customer.email || "",
          address: customer.address || "",
        });
      } else {
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, customer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Customer name is required";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {mode === "add" ? "Add New Customer" : "Edit Customer"}
              </h3>
              <p className="text-emerald-100 text-sm mt-1">
                {mode === "add"
                  ? "Enter new customer information"
                  : "Update customer information"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-200 hover:text-white hover:bg-emerald-600 p-2 rounded-lg transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700"
              >
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                  errors.name
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Enter customer full name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-slate-400 transition-all"
                placeholder="+62 812-3456-7890"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="customer@email.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-slate-700"
              >
                Alamat
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none hover:border-slate-400 transition-all"
                placeholder="Alamat lengkap customer"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 bg-slate-50 p-6 border-t border-slate-200">
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                {mode === "add" ? "Tambah Customer" : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
