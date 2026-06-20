import { useState } from 'react';
import '../styles.css';

export function Layout({ children }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'purchasing', label: '🛒 Purchasing', icon: '🛒' },
    { id: 'orders', label: '📋 Orders', icon: '📋' },
    { id: 'vendors', label: '🏢 Vendors', icon: '🏢' },
    { id: 'items', label: '📦 Items', icon: '📦' },
    { id: 'accounts', label: '👤 My Account', icon: '👤' },
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
              onClick={() => setActiveMenu(item.id)}
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
          <h1 className="d365-header-title">Einkäufer-Bestellverwaltung</h1>
          <div className="d365-header-actions">
            <button className="btn btn-secondary">Help</button>
            <button className="btn btn-secondary">Logout</button>
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
