import { useState, useEffect } from "react";
import { Product } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Input,
  Button,
} from "@/components/shared";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
}

interface ProductFormProps {
  product?: unknown; // Allow flexible product structure
  isEdit: boolean;
  onBack: () => void;
  onSave: () => void;
}

export default function ProductForm({
  product,
  isEdit,
  onBack,
  onSave,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => {
    const productObj = product as Record<string, unknown>;
    const category = productObj?.category as Record<string, unknown>;
    return {
      name: String(productObj?.name || ""),
      price: String(productObj?.price || ""),
      categoryId: String(productObj?.categoryId || category?.id || ""),
      stock: String(productObj?.stock || ""),
    };
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Update form data when product prop changes (for edit mode)
  useEffect(() => {
    if (product && isEdit) {
      const productObj = product as Record<string, unknown>;
      const category = productObj?.category as Record<string, unknown>;
      setFormData({
        name: String(productObj?.name || ""),
        price: String(productObj?.price || ""),
        categoryId: String(productObj?.categoryId || category?.id || ""),
        stock: String(productObj?.stock || ""),
      });
    }
  }, [product, isEdit]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get("/categories");
      setCategories(data.data);
    } catch (error) {
      console.log("Categories API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return false;
    }

    if (!formData.categoryId) {
      toast.error("Category is required");
      return false;
    }

    // Validate price > 0
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be greater than 0");
      return false;
    }

    // Validate stock >= 0
    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      toast.error("Stock must be 0 or greater");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
      };

      const productObj = product as Record<string, unknown>;
      if (isEdit && productObj?.id) {
        // Update existing product (if needed later)
        await apiClient.put(`/products/${productObj.id}`, requestData);
        toast.success("Product updated successfully!");
      } else {
        // Create new product
        await apiClient.post("/products", requestData);
        toast.success("Product created successfully!");
      }

      // Call the onSave callback to trigger parent component actions (like navigation)
      onSave();
    } catch (error: unknown) {
      console.error("API Error:", error);
      const errorMessage =
        error instanceof Error &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to save product. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <CrudLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton onClick={onBack} />
          </div>
          <PageHeader
            title={isEdit ? "Edit Product" : "Add Product"}
            subtitle="Manage product inventory data."
          />
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Product Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
              <Input
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category *
                </label>
                {loading ? (
                  <div className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500">
                    Loading categories...
                  </div>
                ) : (
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <Input
                label="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="Enter stock quantity"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Saving..."
                  : isEdit
                  ? "Update"
                  : "Save"}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CrudLayout>
  );
}
