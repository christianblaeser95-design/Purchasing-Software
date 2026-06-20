import express from 'express';

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(express.json());

// In-Memory Store (später durch Datenbank ersetzen)
let purchaseOrders = [
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
];

let vendors = [
  { id: 1, name: 'Tech Solutions GmbH', contact: 'sales@techsol.de' },
  { id: 2, name: 'Office Supplies Ltd', contact: 'info@officesupplies.de' },
  { id: 3, name: 'Hardware Express', contact: 'support@hardwareexpress.de' },
];

let items = [
  { id: 1, code: 'LAPTOP-001', name: 'Laptops Dell', price: 800 },
  { id: 2, code: 'PAPER-A4', name: 'Printer Paper A4', price: 4.5 },
  { id: 3, code: 'MONITOR-27', name: 'Monitor 27" 4K', price: 450 },
  { id: 4, code: 'MOUSE-WIRELESS', name: 'Wireless Mouse', price: 25 },
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend läuft! ✅' });
});

// Purchase Orders
app.get('/api/orders', (req, res) => {
  res.json(purchaseOrders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = {
    ...req.body,
    id: `PO-2024-${Math.floor(Math.random() * 10000)}`,
  };
  purchaseOrders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
  const order = purchaseOrders.find((o) => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  Object.assign(order, req.body);
  res.json(order);
});

app.delete('/api/orders/:id', (req, res) => {
  const index = purchaseOrders.findIndex((o) => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Order not found' });
  purchaseOrders.splice(index, 1);
  res.json({ message: 'Order deleted' });
});

// Vendors
app.get('/api/vendors', (req, res) => {
  res.json(vendors);
});

app.post('/api/vendors', (req, res) => {
  const newVendor = { id: Date.now(), ...req.body };
  vendors.push(newVendor);
  res.status(201).json(newVendor);
});

// Items
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});