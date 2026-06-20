import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Card } from './components/Card';
import { StatusBadge } from './components/StatusBadge';
import './styles.css';

export default function App() {
  const [backendStatus, setBackendStatus] = useState('Loading...');
  const [orders, setOrders] = useState([
    {
      id: 'PO-2024-001',
      vendor: 'Tech Solutions GmbH',
      item: 'Laptops Dell',
      quantity: 5,
      unitPrice: 800,
      totalAmount: 4000,
      orderDate: '2024-06-15',
      status: 'confirmed',
    },
    {
      id: 'PO-2024-002',
      vendor: 'Office Supplies Ltd',
      item: 'Printer Paper A4',
      quantity: 50,
      unitPrice: 4.5,
      totalAmount: 225,
      orderDate: '2024-06-18',
      status: 'open',
    },
  ]);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status))
      .catch(() => setBackendStatus('Backend nicht erreichbar'));
  }, []);

  return (
    <Layout>
      {/* Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card title="Total Orders">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0078d4' }}>
            {orders.length}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>This Month</div>
        </Card>

        <Card title="Pending Orders">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffb900' }}>
            {orders.filter((o) => o.status === 'open').length}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Awaiting Confirmation</div>
        </Card>

        <Card title="Total Spend">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#107c10' }}>
            €{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>This Period</div>
        </Card>

        <Card title="System Status">
          <div style={{ fontSize: '12px', color: '#666' }}>{backendStatus}</div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card title="Recent Purchase Orders">
        <table className="d365-table">
          <thead>
            <tr>
              <th>Order No.</th>
              <th>Vendor</th>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
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
                <td>€{order.unitPrice.toFixed(2)}</td>
                <td>
                  <strong>€{order.totalAmount.toFixed(2)}</strong>
                </td>
                <td>{order.orderDate}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>
                  <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '4px 8px' }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button className="btn btn-primary">➕ New Purchase Order</button>
        <button className="btn btn-secondary">📊 View Reports</button>
        <button className="btn btn-secondary">⚙️ Settings</button>
      </div>
    </Layout>
  );
}