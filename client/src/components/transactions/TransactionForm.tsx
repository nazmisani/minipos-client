import { Transaction } from "./types";

interface TransactionFormProps {
  transaction?: Transaction;
  isEdit: boolean;
  onBack: () => void;
  onSave: () => void;
}

export default function TransactionForm({
  transaction,
  isEdit,
  onBack,
  onSave,
}: TransactionFormProps) {
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
          {isEdit ? "Edit Transaction" : "Add Transaction"}
        </h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                User
              </label>
              <input
                type="text"
                defaultValue={transaction?.user || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter user name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Amount
              </label>
              <input
                type="number"
                defaultValue={transaction?.amount || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Status
              </label>
              <select
                defaultValue={transaction?.status || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Payment Method
              </label>
              <select
                defaultValue={transaction?.paymentMethod || ""}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select payment method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Description
              </label>
              <textarea
                defaultValue={transaction?.description || ""}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter description"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isEdit ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
