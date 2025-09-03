interface Customer {
  id: number;
  name: string;
  phone: string;
  totalTransactions: number;
  totalSpent: number;
  email: string;
  address: string;
  joinDate: string;
  lastTransaction: string;
}

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
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
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              ID
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Nama
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Nomor Telepon
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Total Transaksi
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Total Belanja
            </th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <td className="py-3 px-4 text-slate-900 font-medium">
                #{customer.id.toString().padStart(3, "0")}
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-col">
                  <span className="text-slate-900 font-medium">
                    {customer.name}
                  </span>
                  <span className="text-slate-500 text-sm">
                    {customer.email}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-slate-700">
                {customer.phone || (
                  <span className="text-slate-400 italic">Tidak ada</span>
                )}
              </td>
              <td className="py-3 px-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                  {customer.totalTransactions}x
                </span>
              </td>
              <td className="py-3 px-4 text-slate-900 font-medium">
                {formatCurrency(customer.totalSpent)}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  {/* View Detail Button */}
                  <button
                    onClick={() => onViewDetail(customer)}
                    className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                    title="Lihat Detail"
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

                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(customer)}
                    className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50 transition-colors"
                    title="Edit Customer"
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

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(customer.id)}
                    className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Hapus Customer"
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {customers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Belum Ada Customer
          </h3>
          <p className="text-slate-500">
            Mulai tambahkan customer pertama Anda untuk melihat data di sini.
          </p>
        </div>
      )}
    </div>
  );
}
