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
            title="Transaction Detail"
            subtitle={`Complete information for transaction #${transaction.id}`}
          />
        </div>

        <div className="space-y-6">
          {/* Transaction Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Transaction Information
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
                <div>
                  <p className="text-lg text-slate-900">
                    {transaction.user.name}
                  </p>
                  <p className="text-sm text-slate-500 capitalize">
                    {transaction.user.role}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Customer
                </label>
                {transaction.customer ? (
                  <div>
                    <p className="text-lg text-slate-900">
                      {transaction.customer.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {transaction.customer.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg text-slate-900">-</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Total
                </label>
                <p className="text-lg font-semibold text-emerald-600">
                  Rp {transaction.total.toLocaleString("en-US")}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Date Created
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
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Quantity</TableHeaderCell>
                <TableHeaderCell>Subtotal</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {transaction.details.map((detail) => (
                  <TableRow key={detail.id}>
                    <TableCell className="font-medium">{detail.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">
                          {detail.product.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          ID: {detail.productId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      Rp {detail.product.price.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell>{detail.quantity}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-emerald-600">
                        Rp {detail.subTotal.toLocaleString("en-US")}
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
