export type Transaction = {
  id: number;
  total: number;
  createdAt: string;
};

export type Customer = {
  id: number;
  name: string;
  phone: string;
  transactions: Transaction[];
  _count: {
    transactions: number;
  };
};

export type ViewMode = "list" | "detail" | "add" | "edit" | "delete";
