"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProductData {
  name: string;
  sold: number;
  revenue: number;
}

interface ProductChartProps {
  data: ProductData[];
}

export default function ProductChart({ data }: ProductChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-slate-600 text-sm">5 produk terlaris minggu ini</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-slate-600 font-medium">Terjual</span>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: number, name: string) => [
                name === "sold" ? `${value} pcs` : formatCurrency(value),
                name === "sold" ? "Terjual" : "Revenue",
              ]}
              labelFormatter={(label: any) => `Produk: ${label}`}
            />
            <Bar
              dataKey="sold"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="sold"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
