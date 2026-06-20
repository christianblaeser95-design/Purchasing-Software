import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = {
  open: '#ff6b6b',
  confirmed: '#ffd93d',
  shipped: '#6bcf7f',
  received: '#4ecdc4',
};

export function OrdersByStatusChart({ orders = [] }) {
  const statusCounts = {
    open: orders.filter((o) => o.status === 'open').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    received: orders.filter((o) => o.status === 'received').length,
  };

  const data = [
    { name: 'Open', value: statusCounts.open, fill: COLORS.open },
    { name: 'Confirmed', value: statusCounts.confirmed, fill: COLORS.confirmed },
    { name: 'Shipped', value: statusCounts.shipped, fill: COLORS.shipped },
    { name: 'Received', value: statusCounts.received, fill: COLORS.received },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        No orders yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} orders`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
