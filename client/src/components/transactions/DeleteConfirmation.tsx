import { Transaction } from './types';

interface DeleteConfirmationProps {
  transaction: Transaction;
  onBack: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({ 
  transaction, 
  onBack, 
  onConfirm 
}: DeleteConfirmationProps) {
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
        <h1 className="text-2xl font-bold text-slate-800">Delete Transaction</h1>
      </div>

      {/* Confirmation Card */}
      <div className="bg-white rounded-lg border border-red-200 p-6 max-w-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Transaction</h3>
          <p className="text-sm text-gray-500 mb-4">
            Are you sure you want to delete transaction <strong>{transaction.id}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
            <button
              onClick={onBack}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
