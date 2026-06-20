import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Modal } from './components/Modal';
import { NewOrderForm } from './components/NewOrderForm';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Vendors } from './pages/Vendors';
import { Items } from './pages/Items';
import { Purchasing } from './pages/Purchasing';
import './styles.css';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [orders, setOrders] = useState([
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

  const handleNewOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setShowNewOrderModal(false);
  };

  const renderPage = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard orders={orders} onNewOrder={() => setShowNewOrderModal(true)} />;
      case 'purchasing':
        return <Purchasing />;
      case 'orders':
        return <Orders orders={orders} onNewOrder={() => setShowNewOrderModal(true)} />;
      case 'vendors':
        return <Vendors />;
      case 'items':
        return <Items />;
      default:
        return <Dashboard orders={orders} onNewOrder={() => setShowNewOrderModal(true)} />;
    }
  };

  return (
    <>
      <Layout activeMenu={activeMenu} onMenuChange={setActiveMenu} title={pageTitles[activeMenu]}>
        {renderPage()}
      </Layout>

      {/* New Order Modal */}
      <Modal
        isOpen={showNewOrderModal}
        title="Create New Purchase Order"
        onClose={() => setShowNewOrderModal(false)}
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" onClick={() => setShowNewOrderModal(false)}>
              Cancel
            </button>
          </div>
        }
      >
        <NewOrderForm onSubmit={handleNewOrder} onCancel={() => setShowNewOrderModal(false)} />
      </Modal>
    </>
  );
}