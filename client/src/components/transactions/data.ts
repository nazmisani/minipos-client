import { Transaction } from "./types";

export const transactions: Transaction[] = [
  {
    id: 1,
    total: 150000,
    createdAt: "2025-08-30 14:30",
    userId: 1,
    customerId: 1,
    user: { id: 1, name: "John Doe" },
    customer: { id: 1, name: "PT. Sukses Makmur" },
    details: [
      { id: 1, quantity: 2, subTotal: 100000, transactionId: 1, productId: 1 },
      { id: 2, quantity: 1, subTotal: 50000, transactionId: 1, productId: 2 },
    ],
  },
  {
    id: 2,
    total: 75000,
    createdAt: "2025-08-30 13:15",
    userId: 2,
    customerId: null,
    user: { id: 2, name: "Jane Smith" },
    customer: null,
    details: [
      { id: 3, quantity: 3, subTotal: 75000, transactionId: 2, productId: 3 },
    ],
  },
  {
    id: 3,
    total: 220000,
    createdAt: "2025-08-30 12:45",
    userId: 3,
    customerId: 2,
    user: { id: 3, name: "Mike Johnson" },
    customer: { id: 2, name: "CV. Maju Jaya" },
    details: [
      { id: 4, quantity: 2, subTotal: 120000, transactionId: 3, productId: 4 },
      { id: 5, quantity: 1, subTotal: 100000, transactionId: 3, productId: 5 },
    ],
  },
];
