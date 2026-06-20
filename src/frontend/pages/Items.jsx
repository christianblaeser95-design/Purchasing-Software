import { Card } from '../components/Card';

export function Items({ items = [], onNewItem }) {
  return (
    <>
      <Card title="Items (Catalog)">
        <table className="d365-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Unit Price</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.code}</strong>
                </td>
                <td>{item.name}</td>
                <td>{item.vendor}</td>
                <td>€{item.unitPrice.toFixed(2)}</td>
                <td>{item.unit}</td>
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

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <button className="btn btn-primary" onClick={onNewItem}>
          ➕ New Item
        </button>
        <button className="btn btn-secondary">📥 Import Items</button>
      </div>
    </>
  );
}
