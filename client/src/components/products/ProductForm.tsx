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

interface Category {
  id: number;
  name: string;
}

interface ProductFormProps {
  product?: Product;
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
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price?.toString() || "",
    categoryId: "",
    stock: product?.stock?.toString() || "",
    description: product?.description || "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
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
                placeholder="Masukkan nama produk"
                required
              />
              <Input
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Masukkan harga produk"
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
                placeholder="Masukkan jumlah stok"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter product description"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
              <Button variant="secondary" type="button" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </CrudLayout>
  );
}
