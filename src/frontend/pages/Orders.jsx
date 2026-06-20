import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';

export function Orders({ orders = [] }) {
  return (
    <>
      <Card title="Purchase Orders">
        {orders.length === 0 ? (
          <div style={{ color: '#666', padding: '20px', textAlign: 'center' }}>
            No purchase orders found.
          </div>
        ) : (
          <table className="d365-table">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Vendor</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Date</th>
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
        )}
      </Card>

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button className="btn btn-primary">➕ New Purchase Order</button>
        <button className="btn btn-secondary">📥 Import</button>
        <button className="btn btn-secondary">📤 Export</button>
      </div>
    </>
  );
}
