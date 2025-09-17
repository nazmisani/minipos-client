import { ReactNode } from "react";

interface CrudLayoutProps {
  children: ReactNode;
}

export default function CrudLayout({ children }: CrudLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
