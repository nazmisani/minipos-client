export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalTransactions: number;
  totalSpent: number;
  joinDate: string;
  lastTransaction: string;
};

export type ViewMode = "list" | "detail" | "add" | "edit" | "delete";
