export const transactions = [
  {
    id: "TRX001",
    user: "John Doe",
    amount: 150000,
    status: "Completed",
    createdAt: "2025-08-30 14:30",
    description: "Coffee and Pastry",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX002",
    user: "Jane Smith",
    amount: 75000,
    status: "Pending",
    createdAt: "2025-08-30 13:15",
    description: "Lunch Set",
    paymentMethod: "Cash",
  },
  {
    id: "TRX003",
    user: "Mike Johnson",
    amount: 220000,
    status: "Completed",
    createdAt: "2025-08-30 12:45",
    description: "Dinner for Two",
    paymentMethod: "Debit Card",
  },
  {
    id: "TRX004",
    user: "Sarah Wilson",
    amount: 95000,
    status: "Failed",
    createdAt: "2025-08-30 11:20",
    description: "Breakfast Special",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX005",
    user: "David Brown",
    amount: 180000,
    status: "Completed",
    createdAt: "2025-08-30 10:55",
    description: "Business Lunch",
    paymentMethod: "Cash",
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
