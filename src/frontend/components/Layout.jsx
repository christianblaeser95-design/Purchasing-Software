import '../styles.css';

export function Layout({ activeMenu, onMenuChange, children, title }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'purchasing', label: '🛒 Purchasing' },
    { id: 'orders', label: '📋 Orders' },
    { id: 'vendors', label: '🏢 Vendors' },
    { id: 'items', label: '📦 Items' },
  ];

  return (
    <div className="d365-container">
      {/* Sidebar Navigation */}
      <aside className="d365-sidebar">
        <div className="d365-sidebar-header">
          Purchasing Software
        </div>
        <nav>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`d365-sidebar-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => onMenuChange(item.id)}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="d365-main">
        {/* Header */}
        <header className="d365-header">
          <h1 className="d365-header-title">{title || 'Einkäufer-Bestellverwaltung'}</h1>
          <div className="d365-header-actions">
            <button className="btn btn-secondary">Help</button>
          </div>
        </header>

        {/* Content Area */}
        <main className="d365-content">
          {children}
        </main>
      </div>
    </div>
  );
}
