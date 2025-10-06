import { useState, useEffect } from "react";
import { Transaction } from "./types";
import {
  CrudLayout,
  BackButton,
  PageHeader,
  Card,
  Button,
} from "@/components/shared";
import apiClient from "@/service/apiClient";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  stock?: number; // Make optional to match API response
}

interface Customer {
  id: number;
  name: string;
  phone: string;
}

interface TransactionItem {
  productId: number;
  quantity: number;
  price: number;
  subTotal: number;
  product: Product;
}

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
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    transaction?.customerId || null
  );
  const [transactionItems, setTransactionItems] = useState<TransactionItem[]>(
    []
  );
  const [selectedProductId, setSelectedProductId] = useState<number>(-1);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    fetchData();
  }, []);

  // Load existing transaction data for edit mode
  useEffect(() => {
    if (transaction && isEdit) {
      setSelectedCustomerId(transaction.customerId || null);
      const items: TransactionItem[] = transaction.details.map((detail) => ({
        productId: detail.productId,
        quantity: detail.quantity,
        price: detail.product.price,
        subTotal: detail.subTotal,
        product: detail.product,
      }));
      setTransactionItems(items);
    }
  }, [transaction, isEdit]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsResponse, customersResponse] = await Promise.all([
        apiClient.get("/products"),
        apiClient.get("/customers"),
      ]);

      setProducts(productsResponse.data.data);
      setCustomers(customersResponse.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    if (selectedProductId === -1 || quantity <= 0) {
      toast.error("Please select a product and valid quantity");
      return;
    }

    const selectedProduct = products.find((p) => p.id === selectedProductId);
    if (!selectedProduct) {
      toast.error("Product not found");
      return;
    }

    if (
      selectedProduct.stock !== undefined &&
      quantity > selectedProduct.stock
    ) {
      toast.error(`Insufficient stock. Available: ${selectedProduct.stock}`);
      return;
    }

    // Check if product already exists in items
    const existingItemIndex = transactionItems.findIndex(
      (item) => item.productId === selectedProductId
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...transactionItems];
      updatedItems[existingItemIndex].quantity += quantity;
      updatedItems[existingItemIndex].subTotal =
        updatedItems[existingItemIndex].quantity * selectedProduct.price;
      setTransactionItems(updatedItems);
    } else {
      // Add new item
      const newItem: TransactionItem = {
        productId: selectedProductId,
        quantity,
        price: selectedProduct.price,
        subTotal: quantity * selectedProduct.price,
        product: selectedProduct,
      };
      setTransactionItems([...transactionItems, newItem]);
    }

    // Reset form
    setSelectedProductId(-1);
    setQuantity(1);
  };

  const removeItem = (productId: number) => {
    setTransactionItems((items) =>
      items.filter((item) => item.productId !== productId)
    );
  };

  const updateItemQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (product.stock !== undefined && newQuantity > product.stock) {
      toast.error(`Insufficient stock. Available: ${product.stock}`);
      return;
    }

    setTransactionItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * item.price,
            }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return transactionItems.reduce((total, item) => total + item.subTotal, 0);
  };

  const validateForm = () => {
    if (transactionItems.length === 0) {
      toast.error("Please add at least one product to the transaction");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const transactionData = {
        customerId: selectedCustomerId,
        details: transactionItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      if (isEdit && transaction) {
        await apiClient.put(`/transactions/${transaction.id}`, transactionData);
        toast.success("Transaction updated successfully!");
      } else {
        await apiClient.post("/transactions", transactionData);
        toast.success("Transaction created successfully!");
      }

      onSave();
    } catch (error: unknown) {
      console.error("Transaction operation error:", error);
      const errorMessage =
        error instanceof Error &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : `Failed to ${isEdit ? "update" : "create"} transaction`;
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <CrudLayout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </CrudLayout>
    );
  }

  return (
    <CrudLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton onClick={onBack} />
          </div>
          <PageHeader
            title={isEdit ? "Edit Transaction" : "Add Transaction"}
            subtitle="Manage sales transaction data."
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer (Optional)
                </label>
                <select
                  value={selectedCustomerId || ""}
                  onChange={(e) =>
                    setSelectedCustomerId(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  disabled={isSubmitting}
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} - {customer.phone}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Product Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  disabled={isSubmitting}
                >
                  <option value={-1}>Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ${product.price}{" "}
                      {product.stock !== undefined
                        ? `(Stock: ${product.stock})`
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addItem}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Item
                </button>
              </div>
            </div>
          </Card>

          {/* Transaction Items */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Transaction Items
            </h3>
            {transactionItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items added yet. Add products above to create the
                transaction.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactionItems.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {item.product.name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItemQuantity(
                                item.productId,
                                Number(e.target.value)
                              )
                            }
                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            disabled={isSubmitting}
                          />
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          ${item.subTotal.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            disabled={isSubmitting}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {transactionItems.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-emerald-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Form Actions */}
          <Card className="p-6">
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting || transactionItems.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                  ? "Update Transaction"
                  : "Create Transaction"}
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </CrudLayout>
  );
}
