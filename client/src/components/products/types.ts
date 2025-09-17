import { BaseEntity } from "@/components/shared/types";

export type Product = BaseEntity & {
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  createdAt: string;
};

export type ProductFormData = {
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
};

export type ProductViewMode = "list" | "detail" | "add" | "edit" | "delete";
