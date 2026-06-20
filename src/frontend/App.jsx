import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Modal } from './components/Modal';
import { NewOrderForm } from './components/NewOrderForm';
import { NewVendorForm } from './components/NewVendorForm';
import { NewItemForm } from './components/NewItemForm';
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
  const [showNewItemModal, setShowNewItemModal] = useState(false);

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

  const [items, setItems] = useState([
    { id: 1, code: 'LAPTOP-001', name: 'Laptops Dell', vendor: 'Tech Solutions GmbH', unitPrice: 800, unit: 'Stück' },
    { id: 2, code: 'PAPER-A4', name: 'Printer Paper A4', vendor: 'Office Supplies Ltd', unitPrice: 4.5, unit: 'Ream' },
    { id: 3, code: 'MONITOR-27', name: 'Monitor 27" 4K', vendor: 'Tech Solutions GmbH', unitPrice: 450, unit: 'Stück' },
    { id: 4, code: 'MOUSE-WIRELESS', name: 'Wireless Mouse', vendor: 'Hardware Express', unitPrice: 25, unit: 'Stück' },
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

  const handleNewItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    setShowNewItemModal(false);
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
        return <Items items={items} onNewItem={() => setShowNewItemModal(true)} />;
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

      {/* New Item Modal */}
      <Modal
        isOpen={showNewItemModal}
        title="Create New Item"
        onClose={() => setShowNewItemModal(false)}
      >
        <NewItemForm onSubmit={handleNewItem} onCancel={() => setShowNewItemModal(false)} />
      </Modal>
    </>
  );
}