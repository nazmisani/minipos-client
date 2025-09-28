export type User = {
  id: number;
  name: string;
  role: string;
};

export type Customer = {
  id: number;
  name: string;
  phone: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type TransactionDetail = {
  id: number;
  quantity: number;
  subTotal: number;
  transactionId: number;
  productId: number;
  product: Product;
};

export type Transaction = {
  id: number;
  total: number;
  createdAt: string;
  userId: number;
  customerId?: number | null;
  user: User;
  customer?: Customer | null;
  details: TransactionDetail[];
};

export type ViewMode = "list" | "detail" | "add" | "delete";
