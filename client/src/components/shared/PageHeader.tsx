import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
          {title}
        </h1>
        <p className="text-slate-600 mt-2">{subtitle}</p>
      </div>
      {action && action}
    </div>
  );
}
