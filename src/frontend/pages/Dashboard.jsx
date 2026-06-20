import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';

export function Dashboard({ orders = [] }) {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'open').length;
  const totalSpend = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <>
      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <Card title="Total Orders">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0078d4' }}>{totalOrders}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>This Month</div>
        </Card>

        <Card title="Pending Orders">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffb900' }}>{pendingOrders}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Awaiting Confirmation</div>
        </Card>

        <Card title="Total Spend">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#107c10' }}>
            €{totalSpend.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>This Period</div>
        </Card>

        <Card title="System Status">
          <div style={{ fontSize: '12px', color: '#666' }}>✅ All Systems Operational</div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card title="Recent Purchase Orders">
        {orders.length === 0 ? (
          <div style={{ color: '#666', padding: '20px', textAlign: 'center' }}>
            No orders yet. Start by creating a new purchase order.
          </div>
        ) : (
          <table className="d365-table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Vendor</th>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>
                  <td>{order.vendor}</td>
                  <td>{order.item}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <strong>€{order.totalAmount.toFixed(2)}</strong>
                  </td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button className="btn btn-secondary">📊 View Reports</button>
      </div>
    </>
  );
}
