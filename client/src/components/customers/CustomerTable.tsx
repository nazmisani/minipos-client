import { Customer } from "./types";

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
              Nama
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Transaksi
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Total Belanja
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-600">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {customer.name}
                  </div>
                  <div className="text-sm text-slate-500">{customer.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {customer.phone || "-"}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {customer.totalTransactions}
              </td>
              <td className="px-6 py-4 text-sm text-slate-900">
                {formatCurrency(customer.totalSpent)}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetail(customer)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(customer)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">Tidak ada data customer</p>
        </div>
      )}
    </div>
  );
}
