import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function OrdersBarChart({ data }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-lg font-black text-slate-900 mb-4">Orders Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            stroke="#64748b"
            style={{ fontSize: '12px', fontWeight: '600' }}
          />
          <YAxis 
            stroke="#64748b"
            style={{ fontSize: '12px', fontWeight: '600' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '600'
            }}
          />
          <Bar 
            dataKey="orders" 
            fill="#4f46e5"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
