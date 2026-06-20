import { useState, useEffect } from 'react';

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

export function EditOrderForm({ order, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    quantity: order.quantity,
    status: order.status,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
    setError('');
  };

  const selectedItem = mockItems.find((i) => i.name === order.item);
  const totalAmount = selectedItem ? selectedItem.price * formData.quantity : order.totalAmount;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    const updatedOrder = {
      ...order,
      quantity: formData.quantity,
      totalAmount: totalAmount,
      status: formData.status,
    };

    onSubmit(updatedOrder);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="d365-alert alert-danger" style={{ marginBottom: '16px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Order No.</label>
        <input type="text" className="form-control" value={order.id} disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Vendor</label>
        <input type="text" className="form-control" value={order.vendor} disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Item</label>
        <input type="text" className="form-control" value={order.item} disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Unit Price</label>
        <input type="text" className="form-control" value={`€${order.unitPrice.toFixed(2)}`} disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Quantity *</label>
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

      <div className="form-group">
        <label className="form-label">Status</label>
        <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
          <option value="open">🔴 Open</option>
          <option value="confirmed">🟠 Confirmed</option>
          <option value="shipped">🔵 Shipped</option>
          <option value="received">🟢 Received</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </form>
  );
}
