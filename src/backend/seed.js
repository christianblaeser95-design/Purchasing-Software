import { sql } from '@vercel/postgres';
import { initializeDatabase, addVendor, addItem, addOrder } from './db.js';

async function seedDatabase() {
  try {
    console.log('🌱 Initializing database...');
    await initializeDatabase();

    console.log('📝 Seeding sample data...');

    // Add vendors
    const vendor1 = await addVendor('Tech Solutions GmbH', 'sales@techsol.de', 'Berlin', '+49 30 123456');
    const vendor2 = await addVendor('Office Supplies Ltd', 'info@officesupplies.de', 'Munich', '+49 89 234567');
    const vendor3 = await addVendor('Hardware Express', 'support@hardwareexpress.de', 'Frankfurt', '+49 69 345678');

    console.log('✅ Vendors added');

    // Add items
    await addItem('LAPTOP-001', 'Laptops Dell', 'Tech Solutions GmbH', 800, 'Stück');
    await addItem('PAPER-A4', 'Printer Paper A4', 'Office Supplies Ltd', 4.5, 'Ream');
    await addItem('MONITOR-27', 'Monitor 27" 4K', 'Tech Solutions GmbH', 450, 'Stück');
    await addItem('MOUSE-WIRELESS', 'Wireless Mouse', 'Hardware Express', 25, 'Stück');

    console.log('✅ Items added');

    // Add orders
    await addOrder('PO-2024-001', 'Tech Solutions GmbH', 'Laptops Dell', 5, 800, 4000, '2024-06-15', 'confirmed');
    await addOrder('PO-2024-002', 'Office Supplies Ltd', 'Printer Paper A4', 50, 4.5, 225, '2024-06-18', 'open');

    console.log('✅ Orders added');
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
