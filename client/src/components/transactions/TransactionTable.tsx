import { Transaction } from "./types";
import {
  DataTable,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
  EmptyState,
} from "@/components/shared";

interface TransactionTableProps {
  transactions: Transaction[];
  onViewDetail: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export default function TransactionTable({
  transactions,
  onViewDetail,
  onDelete,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return <EmptyState message="Belum ada transaksi." />;
  }

  return (
    <DataTable>
      <TableHeader>
        <TableHeaderCell>ID</TableHeaderCell>
        <TableHeaderCell>User</TableHeaderCell>
        <TableHeaderCell>Customer</TableHeaderCell>
        <TableHeaderCell>Total</TableHeaderCell>
        <TableHeaderCell>Tanggal</TableHeaderCell>
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">#{transaction.id}</TableCell>
            <TableCell>{transaction.user.name}</TableCell>
            <TableCell>{transaction.customer?.name || "-"}</TableCell>
            <TableCell>
              <span className="font-semibold text-emerald-600">
                Rp {transaction.total.toLocaleString("id-ID")}
              </span>
            </TableCell>
            <TableCell className="text-slate-500">
              {transaction.createdAt}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => onViewDetail(transaction)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => onDelete(transaction)}
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
