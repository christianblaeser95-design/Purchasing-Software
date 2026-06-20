import { sql } from '@vercel/postgres';

export async function initializeDatabase() {
  try {
    // Create vendors table
    await sql`
      CREATE TABLE IF NOT EXISTS vendors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        contact VARCHAR(255),
        city VARCHAR(100),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create items table
    await sql`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        vendor VARCHAR(255) NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        vendor VARCHAR(255) NOT NULL,
        item VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_amount DECIMAL(12, 2) NOT NULL,
        order_date DATE NOT NULL,
        status VARCHAR(50) DEFAULT 'open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

export async function getVendors() {
  try {
    const result = await sql`SELECT * FROM vendors ORDER BY created_at DESC;`;
    return result.rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function addVendor(name, contact, city, phone) {
  try {
    const result = await sql`
      INSERT INTO vendors (name, contact, city, phone)
      VALUES (${name}, ${contact}, ${city}, ${phone})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function updateVendor(id, name, contact, city, phone) {
  try {
    const result = await sql`
      UPDATE vendors
      SET name = ${name}, contact = ${contact}, city = ${city}, phone = ${phone}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getItems() {
  try {
    const result = await sql`SELECT * FROM items ORDER BY created_at DESC;`;
    return result.rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function addItem(code, name, vendor, unitPrice, unit) {
  try {
    const result = await sql`
      INSERT INTO items (code, name, vendor, unit_price, unit)
      VALUES (${code}, ${name}, ${vendor}, ${unitPrice}, ${unit})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function updateItem(id, code, name, vendor, unitPrice, unit) {
  try {
    const result = await sql`
      UPDATE items
      SET code = ${code}, name = ${name}, vendor = ${vendor}, unit_price = ${unitPrice}, unit = ${unit}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getOrders() {
  try {
    const result = await sql`SELECT * FROM orders ORDER BY created_at DESC;`;
    return result.rows.map((row) => ({
      id: row.id,
      vendor: row.vendor,
      item: row.item,
      quantity: row.quantity,
      unitPrice: parseFloat(row.unit_price),
      totalAmount: parseFloat(row.total_amount),
      orderDate: row.order_date,
      status: row.status,
    }));
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function addOrder(id, vendor, item, quantity, unitPrice, totalAmount, orderDate, status) {
  try {
    const result = await sql`
      INSERT INTO orders (id, vendor, item, quantity, unit_price, total_amount, order_date, status)
      VALUES (${id}, ${vendor}, ${item}, ${quantity}, ${unitPrice}, ${totalAmount}, ${orderDate}, ${status})
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function updateOrder(id, vendor, item, quantity, unitPrice, totalAmount, orderDate, status) {
  try {
    const result = await sql`
      UPDATE orders
      SET vendor = ${vendor}, item = ${item}, quantity = ${quantity}, unit_price = ${unitPrice},
          total_amount = ${totalAmount}, order_date = ${orderDate}, status = ${status}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function deleteOrder(id) {
  try {
    await sql`DELETE FROM orders WHERE id = ${id};`;
    return true;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
