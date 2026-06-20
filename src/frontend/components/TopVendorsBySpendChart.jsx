import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function TopVendorsBySpendChart({ orders = [] }) {
  // Calculate spending by vendor
  const vendorSpend = {};
  orders.forEach((order) => {
    if (!vendorSpend[order.vendor]) {
      vendorSpend[order.vendor] = 0;
    }
    vendorSpend[order.vendor] += order.totalAmount;
  });

  // Convert to array and sort by spend (descending)
  const data = Object.entries(vendorSpend)
    .map(([vendor, spend]) => ({
      vendor: vendor.length > 20 ? vendor.substring(0, 17) + '...' : vendor,
      spend: parseFloat(spend.toFixed(2)),
    }))
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 5); // Top 5 vendors

  if (data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
        No orders yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="vendor"
          angle={-45}
          textAnchor="end"
          height={100}
          interval={0}
          tick={{ fontSize: 12 }}
        />
        <YAxis label={{ value: 'Amount (€)', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          formatter={(value) => `€${value.toFixed(2)}`}
          labelFormatter={(label) => `Vendor: ${label}`}
        />
        <Legend />
        <Bar dataKey="spend" fill="#0078d4" name="Total Spend" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
