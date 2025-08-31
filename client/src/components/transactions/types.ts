export type Transaction = {
  id: string;
  user: string;
  amount: number;
  status: string;
  createdAt: string;
  description: string;
  paymentMethod: string;
};

export type ViewMode = "list" | "detail" | "add" | "edit" | "delete";
