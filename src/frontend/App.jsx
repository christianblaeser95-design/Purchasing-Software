import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Modal } from './components/Modal';
import { NewOrderForm } from './components/NewOrderForm';
import { NewVendorForm } from './components/NewVendorForm';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Vendors } from './pages/Vendors';
import { Items } from './pages/Items';
import { Purchasing } from './pages/Purchasing';
import './styles.css';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showNewVendorModal, setShowNewVendorModal] = useState(false);

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

  const [vendors, setVendors] = useState([
    { id: 1, name: 'Tech Solutions GmbH', contact: 'sales@techsol.de', city: 'Berlin', phone: '+49 30 123456' },
    { id: 2, name: 'Office Supplies Ltd', contact: 'info@officesupplies.de', city: 'Munich', phone: '+49 89 234567' },
    { id: 3, name: 'Hardware Express', contact: 'support@hardwareexpress.de', city: 'Frankfurt', phone: '+49 69 345678' },
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

  const handleNewVendor = (newVendor) => {
    setVendors((prev) => [newVendor, ...prev]);
    setShowNewVendorModal(false);
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
        return <Vendors vendors={vendors} onNewVendor={() => setShowNewVendorModal(true)} />;
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
      >
        <NewOrderForm onSubmit={handleNewOrder} onCancel={() => setShowNewOrderModal(false)} />
      </Modal>

      {/* New Vendor Modal */}
      <Modal
        isOpen={showNewVendorModal}
        title="Create New Vendor"
        onClose={() => setShowNewVendorModal(false)}
      >
        <NewVendorForm onSubmit={handleNewVendor} onCancel={() => setShowNewVendorModal(false)} />
      </Modal>
    </>
  );
}