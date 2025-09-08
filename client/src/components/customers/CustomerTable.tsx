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
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Nama
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Phone
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Transaksi
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Total Belanja
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium text-gray-900">
                    {customer.name}
                  </div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-900">
                {customer.phone || "-"}
              </td>
              <td className="py-3 px-4 text-gray-900">
                {customer.totalTransactions}
              </td>
              <td className="py-3 px-4 text-gray-900">
                {formatCurrency(customer.totalSpent)}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewDetail(customer)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => onEdit(customer)}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(customer)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Tidak ada data customer</p>
        </div>
      )}
    </div>
  );
}
