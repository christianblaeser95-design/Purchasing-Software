import { Card } from '../components/Card';

export function Purchasing() {
  return (
    <>
      <Card title="Purchasing Module">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div
            style={{
              padding: '24px',
              border: '1px solid var(--d365-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📋</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Purchase Orders</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Create and manage orders</div>
          </div>

          <div
            style={{
              padding: '24px',
              border: '1px solid var(--d365-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏢</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Vendors</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Manage vendor master data</div>
          </div>

          <div
            style={{
              padding: '24px',
              border: '1px solid var(--d365-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Items</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Manage item catalog</div>
          </div>

          <div
            style={{
              padding: '24px',
              border: '1px solid var(--d365-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Reports</div>
            <div style={{ fontSize: '12px', color: '#666' }}>View purchasing analytics</div>
          </div>

          <div
            style={{
              padding: '24px',
              border: '1px solid var(--d365-border)',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚙️</div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Settings</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Configure module options</div>
          </div>
        </div>
      </Card>

      <Card title="Quick Actions" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary">➕ New Purchase Order</button>
          <button className="btn btn-secondary">📊 View Open Orders</button>
          <button className="btn btn-secondary">📤 Export Data</button>
        </div>
      </Card>
    </>
  );
}
