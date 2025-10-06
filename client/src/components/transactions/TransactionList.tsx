import { Transaction } from "./types";
import TransactionTable from "./TransactionTable";
import {
  CrudLayout,
  PageHeader,
  SearchBar,
  Button,
  Card,
} from "@/components/shared";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/authContext";
import { usePermissions } from "@/hooks/usePermissions";
import Protected from "@/components/auth/Protected";

type TransactionListProps = Record<string, never>;

export default function TransactionList({}: TransactionListProps) {
  const router = useRouter();
  const { user: _user } = useAuth();
  const { hasPermission } = usePermissions();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check permissions for conditional rendering
  const canCreate = hasPermission("transactions.create");
  const canDelete = hasPermission("transactions.delete");
  const hasAnyActionPermission = canDelete; // Only delete action is available in table
  const [pendingDelete, setPendingDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleViewDetail = (transaction: Transaction) => {
    router.push(`/transactions/${transaction.id}`);
  };

  const handleDelete = (transactionId: number, transactionName: string) => {
    // Show elegant professional confirmation
    setPendingDelete({ id: transactionId, name: transactionName });

    toast(
      ({ closeToast }) => (
        <div className="relative bg-gradient-to-br from-white via-white to-red-50 p-6 rounded-xl shadow-2xl border border-red-100 w-96 mx-auto transform transition-all duration-300 ease-out scale-100 opacity-100">
          {/* Elegant decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-t-xl"></div>

          {/* Header with icon and title */}
          <div className="flex items-start space-x-4 mb-5">
            <div className="flex-shrink-0 mt-0.5">
              <div className="relative w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-md">
                <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
                <svg
                  className="relative w-6 h-6 text-red-600"
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
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                Delete Transaction
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                This action is permanent and cannot be undone
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-800 leading-relaxed mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-red-700">
                  &quot;Transaction #{transactionName}&quot;
                </span>{" "}
                from the system? This action will permanently remove:
              </p>
              <ul className="ml-4 text-sm text-gray-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                  Transaction data and information
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                  Associated transaction details and history
                </li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-3 space-y-reverse sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => {
                closeToast();
                setPendingDelete(null);
              }}
              className="w-full sm:w-auto sm:min-w-[120px] inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out whitespace-nowrap"
            >
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </button>
            <button
              onClick={() => {
                closeToast();
                confirmDelete(transactionId, transactionName);
              }}
              disabled={isDeleting}
              className={`w-full sm:w-auto sm:min-w-[140px] inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out whitespace-nowrap ${
                isDeleting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 border border-red-600 hover:from-red-700 hover:to-red-800 hover:shadow-xl focus:ring-red-500 transform hover:scale-105"
              }`}
            >
              {isDeleting ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
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
                  Delete Transaction
                </>
              )}
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        className:
          "!bg-transparent !p-0 !border-0 !shadow-none !rounded-none backdrop-blur-sm",
        style: {
          background: "rgba(0, 0, 0, 0.1)",
          boxShadow: "none",
          border: "none",
          backdropFilter: "blur(4px)",
        },
        closeButton: false,
        toastId: `delete-confirmation-${transactionId}`,
      }
    );
  };

  const confirmDelete = async (
    transactionId: number,
    transactionName: string
  ) => {
    setIsDeleting(true);

    try {
      await apiClient.delete(`/transactions/${transactionId}`);

      toast.success("Transaction deleted successfully!");

      fetchTransactions(); // Refresh the transaction list
      setPendingDelete(null);
    } catch (error: unknown) {
      console.error("Delete transaction error:", error);
      const errorMessage = error instanceof Error && 'response' in error && 
        typeof error.response === 'object' && error.response !== null &&
        'data' in error.response && typeof error.response.data === 'object' &&
        error.response.data !== null && 'message' in error.response.data
          ? String(error.response.data.message)
          : "Failed to delete transaction";

      toast.error(errorMessage);

      setPendingDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    handleDelete(transaction.id, transaction.id.toString());
  };

  const handleAdd = () => {
    router.push("/transactions/add");
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await apiClient.get("/transactions");
      setTransactions(data.data);
    } catch (error) {
      console.log("Transactions API Error:", error);
      setError("Failed to load transactions data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CrudLayout>
      <PageHeader
        title="Transaction Management"
        subtitle="Manage all transactions and sales history."
        action={
          <Protected permission="transactions.create" fallback={null}>
            <Button onClick={handleAdd}>Add Transaction</Button>
          </Protected>
        }
      />

      <SearchBar placeholder="Search transactions..." />

      <Card>
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="text-red-400 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Error Loading Transactions
            </h3>
            <p className="text-slate-500 mb-4">{error}</p>
            <button
              onClick={fetchTransactions}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <TransactionTable
            transactions={transactions}
            onViewDetail={handleViewDetail}
            onDelete={handleDeleteTransaction}
          />
        )}
      </Card>
    </CrudLayout>
  );
}
