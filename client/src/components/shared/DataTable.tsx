import { ReactNode } from "react";

interface DataTableProps {
  children: ReactNode;
}

interface TableHeaderProps {
  children: ReactNode;
}

interface TableBodyProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

interface EmptyStateProps {
  message: string;
}

export function DataTable({ children }: DataTableProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full">{children}</table>
    </div>
  );
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-slate-50 border-b border-slate-200">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children, className = "" }: TableCellProps) {
  return (
    <th
      className={`px-6 py-3 text-left text-sm font-medium text-slate-600 ${className}`}
    >
      {children}
    </th>
  );
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody className="divide-y divide-slate-200">{children}</tbody>;
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr
      className={`hover:bg-slate-50 transition-colors ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "" }: TableCellProps) {
  return <td className={`px-6 py-4 text-sm ${className}`}>{children}</td>;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-slate-500">{message}</p>
    </div>
  );
}
