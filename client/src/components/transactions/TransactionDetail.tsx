import { Transaction } from './types';
import { getStatusColor } from './data';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

export default function TransactionDetail({ 
  transaction, 
  onBack 
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
        <h1 className="text-2xl font-bold text-slate-800">Transaction Detail</h1>
      </div>

      {/* Detail Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Transaction ID</label>
            <p className="text-lg font-semibold text-slate-900">{transaction.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(transaction.status)}`}>
              {transaction.status}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">User</label>
            <p className="text-lg text-slate-900">{transaction.user}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Amount</label>
            <p className="text-lg font-semibold text-slate-900">Rp {transaction.amount.toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Description</label>
            <p className="text-lg text-slate-900">{transaction.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Payment Method</label>
            <p className="text-lg text-slate-900">{transaction.paymentMethod}</p>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">Created At</label>
            <p className="text-lg text-slate-900">{transaction.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
