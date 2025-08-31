import { Transaction } from "./types";

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

export default function TransactionDetail({
  transaction,
  onBack,
}: TransactionDetailProps) {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 text-slate-600 hover:text-slate-800"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-slate-800">
          Transaction Detail
        </h1>
      </div>

      {/* Detail Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Transaction ID
            </label>
            <p className="text-lg font-semibold text-slate-900">
              {transaction.id}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              User
            </label>
            <p className="text-lg text-slate-900">{transaction.user.name}</p>
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
            <p className="text-lg font-semibold text-slate-900">
              Rp {transaction.total.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Created At
            </label>
            <p className="text-lg text-slate-900">{transaction.createdAt}</p>
          </div>
        </div>
        {/* Transaction Details */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Details
          </label>
          <table className="w-full border text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Product ID</th>
                <th className="border px-2 py-1">Quantity</th>
                <th className="border px-2 py-1">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {transaction.details.map((d) => (
                <tr key={d.id}>
                  <td className="border px-2 py-1">{d.id}</td>
                  <td className="border px-2 py-1">{d.productId}</td>
                  <td className="border px-2 py-1">{d.quantity}</td>
                  <td className="border px-2 py-1">
                    Rp {d.subTotal.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
