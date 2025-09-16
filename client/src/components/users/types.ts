export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export type UserFormData = {
  name: string;
  email: string;
  role: string;
  password?: string;
};

export type UserViewMode = "list" | "detail" | "add" | "edit" | "delete";
