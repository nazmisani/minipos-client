import { Product, ProductViewMode } from "./types";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";
import ProductTable from "@/components/products/ProductTable";

// Dummy products data
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Kopi Arabica",
    price: 25000,
    category: "Minuman",
    stock: 100,
    description: "Kopi premium dari Aceh",
    createdAt: "2024-09-01 10:00:00",
  },
  {
    id: 2,
    name: "Nasi Gudeg",
    price: 15000,
    category: "Makanan",
    stock: 50,
    description: "Gudeg khas Yogyakarta",
    createdAt: "2024-09-02 11:30:00",
  },
];

interface ProductListProps {
  onViewModeChange: (mode: ProductViewMode) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductList({
  onViewModeChange,
  onSelectProduct,
}: ProductListProps) {
  return (
    <CrudLayout>
      <PageHeader
        title="Product Management"
        subtitle="Kelola data produk dan inventory."
        action={
          <Button onClick={() => onViewModeChange("add")}>
            Tambah Product
          </Button>
        }
      />

      <SearchBar placeholder="Cari product..." />

      <Card>
        <ProductTable
          products={dummyProducts}
          onViewDetail={(product: Product) => {
            onSelectProduct(product);
            onViewModeChange("detail");
          }}
          onEdit={(product: Product) => {
            onSelectProduct(product);
            onViewModeChange("edit");
          }}
          onDelete={(product: Product) => {
            onSelectProduct(product);
            onViewModeChange("delete");
          }}
        />
      </Card>
    </CrudLayout>
  );
}
