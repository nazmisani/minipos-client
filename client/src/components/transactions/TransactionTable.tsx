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
import { useAuth } from "@/contexts/authContext";
import { usePermissions } from "@/hooks/usePermissions";
import Protected from "@/components/auth/Protected";

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
  const { user } = useAuth();
  const { hasPermission } = usePermissions();

  // Check permissions for conditional rendering
  const canViewDetail = hasPermission("transactions.viewDetail");
  const canDelete = hasPermission("transactions.delete");
  const hasAnyActionPermission = canViewDetail || canDelete;

  if (transactions.length === 0) {
    return <EmptyState message="No transactions yet." />;
  }

  return (
    <DataTable>
      <TableHeader>
        <TableHeaderCell>ID</TableHeaderCell>
        <TableHeaderCell>User</TableHeaderCell>
        <TableHeaderCell>Customer</TableHeaderCell>
        <TableHeaderCell>Total</TableHeaderCell>
        <TableHeaderCell>Date</TableHeaderCell>
        {hasAnyActionPermission && <TableHeaderCell>Actions</TableHeaderCell>}
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">#{transaction.id}</TableCell>
            <TableCell>{transaction.user.name}</TableCell>
            <TableCell>{transaction.customer?.name || "-"}</TableCell>
            <TableCell>
              <span className="font-semibold text-emerald-600">
                Rp {transaction.total.toLocaleString("en-US")}
              </span>
            </TableCell>
            <TableCell className="text-slate-500">
              {transaction.createdAt}
            </TableCell>
            {hasAnyActionPermission && (
              <TableCell>
                <div className="flex gap-2">
                  <Protected
                    permission="transactions.viewDetail"
                    fallback={null}
                  >
                    <button
                      onClick={() => onViewDetail(transaction)}
                      className="inline-flex items-center justify-center w-8 h-8 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 rounded-md transition-all duration-200"
                      title="View Detail"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </Protected>

                  <Protected permission="transactions.delete" fallback={null}>
                    <button
                      onClick={() => onDelete(transaction)}
                      className="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-md transition-all duration-200"
                      title="Delete"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </Protected>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </DataTable>
  );
}
