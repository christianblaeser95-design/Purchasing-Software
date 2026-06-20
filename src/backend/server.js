import express from 'express';
import {
  initializeDatabase,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getVendors,
  addVendor,
  updateVendor,
  getItems,
  addItem,
  updateItem,
} from './db.js';

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(express.json());

// Initialize database on startup
initializeDatabase().catch((err) => {
  console.error('Failed to initialize database:', err);
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend läuft! ✅' });
});

// ===== ORDERS =====
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { vendor, item, quantity, unitPrice, totalAmount, orderDate, status } = req.body;
    const id = `PO-2024-${Math.floor(Math.random() * 10000)}`;
    const newOrder = await addOrder(id, vendor, item, quantity, unitPrice, totalAmount, orderDate, status || 'open');
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const { vendor, item, quantity, unitPrice, totalAmount, orderDate, status } = req.body;
    const updatedOrder = await updateOrder(req.params.id, vendor, item, quantity, unitPrice, totalAmount, orderDate, status);
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await deleteOrder(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== VENDORS =====
app.get('/api/vendors', async (req, res) => {
  try {
    const vendors = await getVendors();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

app.post('/api/vendors', async (req, res) => {
  try {
    const { name, contact, city, phone } = req.body;
    const newVendor = await addVendor(name, contact, city, phone);
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/vendors/:id', async (req, res) => {
  try {
    const { name, contact, city, phone } = req.body;
    const updatedVendor = await updateVendor(req.params.id, name, contact, city, phone);
    res.json(updatedVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== ITEMS =====
app.get('/api/items', async (req, res) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const { code, name, vendor, unitPrice, unit } = req.body;
    const newItem = await addItem(code, name, vendor, unitPrice, unit);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    const { code, name, vendor, unitPrice, unit } = req.body;
    const updatedItem = await updateItem(req.params.id, code, name, vendor, unitPrice, unit);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend läuft auf http://localhost:${PORT}`);
});