import { Product } from "./types";
import {
  DataTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
  Button,
} from "@/components/shared";

interface ProductTableProps {
  products: Product[];
  onViewDetail: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  onViewDetail,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (products.length === 0) {
    return <EmptyState message="Tidak ada data product" />;
  }

  return (
    <DataTable>
      <TableHeader>
        <TableHeaderCell>Produk</TableHeaderCell>
        <TableHeaderCell>Kategori</TableHeaderCell>
        <TableHeaderCell>Harga</TableHeaderCell>
        <TableHeaderCell>Stok</TableHeaderCell>
        <TableHeaderCell>Created At</TableHeaderCell>
        <TableHeaderCell>Aksi</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {product.name}
                </div>
                <div className="text-sm text-slate-500">
                  #{product.id.toString().padStart(3, "0")}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-slate-900">{product.category}</TableCell>
            <TableCell className="text-slate-900 font-medium">
              {formatCurrency(product.price)}
            </TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.stock > 10
                    ? "bg-green-100 text-green-800"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock}
              </span>
            </TableCell>
            <TableCell className="text-slate-500">
              {formatDateTime(product.createdAt)}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => onViewDetail(product)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(product)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
}
