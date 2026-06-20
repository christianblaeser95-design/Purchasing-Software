import { useState } from 'react';

export function EditVendorForm({ vendor, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: vendor.name,
    contact: vendor.contact,
    city: vendor.city,
    phone: vendor.phone,
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

    const updatedVendor = {
      ...vendor,
      name: formData.name,
      contact: formData.contact,
      city: formData.city,
      phone: formData.phone,
    };

    onSubmit(updatedVendor);
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
        />
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
