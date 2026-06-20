import { useState } from 'react';

const mockVendors = [
  { id: 1, name: 'Tech Solutions GmbH' },
  { id: 2, name: 'Office Supplies Ltd' },
  { id: 3, name: 'Hardware Express' },
];

const mockItems = [
  { id: 1, code: 'LAPTOP-001', name: 'Laptops Dell', price: 800 },
  { id: 2, code: 'PAPER-A4', name: 'Printer Paper A4', price: 4.5 },
  { id: 3, code: 'MONITOR-27', name: 'Monitor 27" 4K', price: 450 },
  { id: 4, code: 'MOUSE-WIRELESS', name: 'Wireless Mouse', price: 25 },
];

export function NewOrderForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    vendor: '',
    item: '',
    quantity: 1,
  });

  const [error, setError] = useState('');

  const selectedItem = mockItems.find((i) => i.id === parseInt(formData.item));
  const totalAmount = selectedItem ? selectedItem.price * formData.quantity : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.vendor) {
      setError('Please select a vendor');
      return;
    }

    if (!formData.item) {
      setError('Please select an item');
      return;
    }

    if (formData.quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    const vendor = mockVendors.find((v) => v.id === parseInt(formData.vendor));
    const item = mockItems.find((i) => i.id === parseInt(formData.item));

    const newOrder = {
      id: `PO-2024-${Math.floor(Math.random() * 10000)}`,
      vendor: vendor.name,
      item: item.name,
      quantity: formData.quantity,
      unitPrice: item.price,
      totalAmount: totalAmount,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'open',
    };

    onSubmit(newOrder);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="d365-alert alert-danger" style={{ marginBottom: '16px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Vendor</label>
        <select className="form-control" name="vendor" value={formData.vendor} onChange={handleChange}>
          <option value="">-- Select Vendor --</option>
          {mockVendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Item</label>
        <select className="form-control" name="item" value={formData.item} onChange={handleChange}>
          <option value="">-- Select Item --</option>
          {mockItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} (€{item.price.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Total Amount</label>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#f3f3f3',
            borderRadius: '4px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0078d4',
          }}
        >
          €{totalAmount.toFixed(2)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create Order
        </button>
      </div>
    </form>
  );
}
