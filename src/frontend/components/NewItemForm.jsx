import { useState } from 'react';

const mockVendors = [
  { id: 1, name: 'Tech Solutions GmbH' },
  { id: 2, name: 'Office Supplies Ltd' },
  { id: 3, name: 'Hardware Express' },
];

export function NewItemForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    vendor: '',
    unitPrice: '',
    unit: 'Stück',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'unitPrice' ? parseFloat(value) || 0 : value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      setError('Item code is required');
      return;
    }

    if (!formData.name.trim()) {
      setError('Item name is required');
      return;
    }

    if (!formData.vendor) {
      setError('Please select a vendor');
      return;
    }

    if (formData.unitPrice <= 0) {
      setError('Unit price must be greater than 0');
      return;
    }

    const vendor = mockVendors.find((v) => v.id === parseInt(formData.vendor));

    const newItem = {
      id: Math.floor(Math.random() * 10000),
      code: formData.code,
      name: formData.name,
      vendor: vendor.name,
      unitPrice: formData.unitPrice,
      unit: formData.unit,
    };

    onSubmit(newItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="d365-alert alert-danger" style={{ marginBottom: '16px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Item Code *</label>
        <input
          type="text"
          className="form-control"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g., LAPTOP-001"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Item Description *</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Laptops Dell XPS 15"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Vendor *</label>
        <select className="form-control" name="vendor" value={formData.vendor} onChange={handleChange}>
          <option value="">-- Select Vendor --</option>
          {mockVendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
        <div className="form-group">
          <label className="form-label">Unit Price *</label>
          <input
            type="number"
            className="form-control"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            placeholder="e.g., 800.00"
            step="0.01"
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Unit *</label>
          <select className="form-control" name="unit" value={formData.unit} onChange={handleChange}>
            <option value="Stück">Stück</option>
            <option value="kg">kg</option>
            <option value="Liter">Liter</option>
            <option value="Rolle">Rolle</option>
            <option value="Karton">Karton</option>
            <option value="Ream">Ream</option>
            <option value="Paar">Paar</option>
            <option value="Box">Box</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create Item
        </button>
      </div>
    </form>
  );
}
