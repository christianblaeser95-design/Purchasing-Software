import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Vendors } from './pages/Vendors';
import { Items } from './pages/Items';
import { Purchasing } from './pages/Purchasing';
import './styles.css';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [orders] = useState([
    {
      id: 'PO-2024-001',
      vendor: 'Tech Solutions GmbH',
      item: 'Laptops Dell',
      quantity: 5,
      unitPrice: 800,
      totalAmount: 4000,
      orderDate: '2024-06-15',
      status: 'confirmed',
    },
    {
      id: 'PO-2024-002',
      vendor: 'Office Supplies Ltd',
      item: 'Printer Paper A4',
      quantity: 50,
      unitPrice: 4.5,
      totalAmount: 225,
      orderDate: '2024-06-18',
      status: 'open',
    },
  ]);

  const pageTitles = {
    dashboard: 'Dashboard',
    purchasing: 'Purchasing Module',
    orders: 'Purchase Orders',
    vendors: 'Vendors',
    items: 'Items',
  };

  const renderPage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard orders={orders} />;
      case 'purchasing':
        return <Purchasing />;
      case 'orders':
        return <Orders orders={orders} />;
      case 'vendors':
        return <Vendors />;
      case 'items':
        return <Items />;
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <Layout activeMenu={activeMenu} onMenuChange={setActiveMenu} title={pageTitles[activeMenu]}>
      {renderPage()}
    </Layout>
  );
}