import { Product } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Input,
  Button,
} from "@/components/shared";

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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Product Name"
                type="text"
                defaultValue={product?.name || ""}
                placeholder="Masukkan nama produk"
              />
              <Input
                label="Price"
                type="number"
                defaultValue={product?.price?.toString() || ""}
                placeholder="Masukkan harga produk"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Category"
                type="text"
                defaultValue={product?.category || ""}
                placeholder="Masukkan kategori produk"
              />
              <Input
                label="Stock"
                type="number"
                defaultValue={product?.stock?.toString() || ""}
                placeholder="Masukkan jumlah stok"
              />
            </div>

            <Input
              label="Description (Optional)"
              type="text"
              defaultValue={product?.description || ""}
              placeholder="Enter product description"
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" onClick={onSave}>
                {isEdit ? "Update" : "Save"}
              </Button>
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
