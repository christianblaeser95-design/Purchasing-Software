import { useState } from 'react';

const mockVendors = [
  { id: 1, name: 'Tech Solutions GmbH' },
  { id: 2, name: 'Office Supplies Ltd' },
  { id: 3, name: 'Hardware Express' },
];

export function EditItemForm({ item, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    code: item.code,
    name: item.name,
    vendor: item.vendor,
    unitPrice: item.unitPrice,
    unit: item.unit,
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

    if (!formData.vendor.trim()) {
      setError('Vendor is required');
      return;
    }

    if (formData.unitPrice <= 0) {
      setError('Unit price must be greater than 0');
      return;
    }

    const updatedItem = {
      ...item,
      code: formData.code,
      name: formData.name,
      vendor: formData.vendor,
      unitPrice: formData.unitPrice,
      unit: formData.unit,
    };

    onSubmit(updatedItem);
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
        />
      </div>

      <div className="form-group">
        <label className="form-label">Vendor *</label>
        <input
          type="text"
          className="form-control"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
        />
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
          Save Changes
        </button>
      </div>
    </form>
  );
}
