import { Customer } from "./types";
import { usePermissions } from "@/hooks/usePermissions";
import Protected from "@/components/auth/Protected";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onViewDetail: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
  onViewDetail,
}: CustomerTableProps) {
  const { hasPermission } = usePermissions();

  // Check permissions for conditional rendering
  const canEdit = hasPermission("customers.edit");
  const canDelete = hasPermission("customers.delete");
  const hasAnyActionPermission = canEdit || canDelete; // View detail always available for customers.view role

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Name
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">
              Phone
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">
              Transactions
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Total Spent
            </th>
            {hasAnyActionPermission && (
              <th className="px-6 py-3 text-center text-sm font-medium text-slate-600">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {customers.map((customer) => {
            // Calculate total spent from transactions
            const totalSpent = customer.transactions.reduce(
              (sum, transaction) => sum + transaction.total,
              0
            );

            return (
              <tr key={customer.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                  #{customer.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">
                    {customer.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 text-center">
                  {customer.phone || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 text-center">
                  <span className="font-medium">
                    {customer._count.transactions}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {formatCurrency(totalSpent)}
                </td>
                {hasAnyActionPermission && (
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2 justify-center">
                      {/* View Detail button - always available for customers.view */}
                      <button
                        onClick={() => onViewDetail(customer)}
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

                      <Protected permission="customers.edit" fallback={null}>
                        <button
                          onClick={() => onEdit(customer)}
                          className="inline-flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 rounded-md transition-all duration-200"
                          title="Edit"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </Protected>

                      <Protected permission="customers.delete" fallback={null}>
                        <button
                          onClick={() => onDelete(customer)}
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
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No customer data available</p>
        </div>
      )}
    </div>
  );
}
