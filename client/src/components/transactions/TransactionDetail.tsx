import { Transaction } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  DataTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/shared";

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

export default function TransactionDetail({
  transaction,
  onBack,
}: TransactionDetailProps) {
  return (
    <CrudLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton onClick={onBack} />
          </div>
          <PageHeader
            title="Detail Transaksi"
            subtitle={`Informasi lengkap transaksi #${transaction.id}`}
          />
        </div>

        <div className="space-y-6">
          {/* Transaction Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Informasi Transaksi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Transaction ID
                </label>
                <p className="text-lg font-semibold text-slate-900">
                  #{transaction.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  User
                </label>
                <p className="text-lg text-slate-900">
                  {transaction.user.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Customer
                </label>
                <p className="text-lg text-slate-900">
                  {transaction.customer?.name || "-"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Total
                </label>
                <p className="text-lg font-semibold text-emerald-600">
                  Rp {transaction.total.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Tanggal Dibuat
                </label>
                <p className="text-lg text-slate-900">
                  {transaction.createdAt}
                </p>
              </div>
            </div>
          </Card>

          {/* Transaction Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Detail Item
            </h3>
            <DataTable>
              <TableHeader>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Product ID</TableHeaderCell>
                <TableHeaderCell>Quantity</TableHeaderCell>
                <TableHeaderCell>Subtotal</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {transaction.details.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell className="font-medium">{detail.id}</TableCell>
                    <TableCell>{detail.productId}</TableCell>
                    <TableCell>{detail.quantity}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-emerald-600">
                        Rp {detail.subTotal.toLocaleString("id-ID")}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </DataTable>
          </Card>
        </div>
      </div>
    </CrudLayout>
  );
}
