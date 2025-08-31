import { getStatusColor, transactions } from "./data";
import { Transaction } from "./types";

interface TransactionListProps {
  onViewDetail: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  onAdd: () => void;
}

export default function TransactionList({
  onViewDetail,
  onEdit,
  onDelete,
  onAdd,
}: TransactionListProps) {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Transactions</h1>
        <button
          onClick={onAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Transaction
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="w-48">
          <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  {transaction.user}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900">
                  Rp {transaction.amount.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {transaction.createdAt}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetail(transaction)}
                      className="text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(transaction)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
