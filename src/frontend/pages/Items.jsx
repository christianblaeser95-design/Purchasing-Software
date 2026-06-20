import { Card } from '../components/Card';

const mockItems = [
  { id: 1, code: 'LAPTOP-001', name: 'Laptops Dell', vendor: 'Tech Solutions GmbH', unitPrice: 800, unit: 'Stück' },
  { id: 2, code: 'PAPER-A4', name: 'Printer Paper A4', vendor: 'Office Supplies Ltd', unitPrice: 4.5, unit: 'Ream' },
  { id: 3, code: 'MONITOR-27', name: 'Monitor 27" 4K', vendor: 'Tech Solutions GmbH', unitPrice: 450, unit: 'Stück' },
  { id: 4, code: 'MOUSE-WIRELESS', name: 'Wireless Mouse', vendor: 'Hardware Express', unitPrice: 25, unit: 'Stück' },
];

export function Items() {
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
            {mockItems.map((item) => (
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
        <button className="btn btn-primary">➕ New Item</button>
        <button className="btn btn-secondary">📥 Import Items</button>
      </div>
    </>
  );
}
