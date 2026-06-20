import { Card } from '../components/Card';

const mockVendors = [
  { id: 1, name: 'Tech Solutions GmbH', contact: 'sales@techsol.de', city: 'Berlin', phone: '+49 30 123456' },
  { id: 2, name: 'Office Supplies Ltd', contact: 'info@officesupplies.de', city: 'Munich', phone: '+49 89 234567' },
  { id: 3, name: 'Hardware Express', contact: 'support@hardwareexpress.de', city: 'Frankfurt', phone: '+49 69 345678' },
];

export function Vendors() {
  return (
    <>
      <Card title="Vendors (Master Data)">
        <table className="d365-table">
          <thead>
            <tr>
              <th>Vendor Code</th>
              <th>Name</th>
              <th>Contact</th>
              <th>City</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockVendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>
                  <strong>V-{String(vendor.id).padStart(3, '0')}</strong>
                </td>
                <td>{vendor.name}</td>
                <td>{vendor.contact}</td>
                <td>{vendor.city}</td>
                <td>{vendor.phone}</td>
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
        <button className="btn btn-primary">➕ New Vendor</button>
        <button className="btn btn-secondary">📥 Import Vendors</button>
      </div>
    </>
  );
}
