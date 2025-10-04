import { Product, ProductViewMode } from "./types";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";
import ProductTable from "@/components/products/ProductTable";

// TODO: Replace with API call
const dummyProducts: Product[] = [];

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
        subtitle="Manage product data and inventory."
        action={
          <Button onClick={() => onViewModeChange("add")}>Add Product</Button>
        }
      />

      <SearchBar placeholder="Search product..." />

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
