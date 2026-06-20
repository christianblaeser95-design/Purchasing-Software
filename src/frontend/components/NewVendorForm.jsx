import { useState } from 'react';

export function NewVendorForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    city: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError('Vendor name is required');
      return;
    }

    if (!formData.contact.trim()) {
      setError('Contact email is required');
      return;
    }

    const newVendor = {
      id: Math.floor(Math.random() * 10000),
      name: formData.name,
      contact: formData.contact,
      city: formData.city || 'N/A',
      phone: formData.phone || 'N/A',
    };

    onSubmit(newVendor);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="d365-alert alert-danger" style={{ marginBottom: '16px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Vendor Name *</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Tech Solutions GmbH"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Contact Email *</label>
        <input
          type="email"
          className="form-control"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="e.g., sales@vendor.de"
        />
      </div>

      <div className="form-group">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g., Berlin"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g., +49 30 123456"
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create Vendor
        </button>
      </div>
    </form>
  );
}
