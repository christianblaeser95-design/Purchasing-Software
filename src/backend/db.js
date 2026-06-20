import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || `https://gzthqxxjxmvopskdtowr.supabase.co`;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_ANON_KEY is not set');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function initializeDatabase() {
  try {
    console.log('✅ Connected to Supabase');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

export async function getVendors() {
  try {
    const { data, error } = await supabase.from('vendors').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function addVendor(name, contact, city, phone) {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .insert([{ name, contact, city, phone }])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function updateVendor(id, name, contact, city, phone) {
  try {
    const { data, error } = await supabase
      .from('vendors')
      .update({ name, contact, city, phone })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getItems() {
  try {
    const { data, error } = await supabase.from('items').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export async function addItem(code, name, vendor, unitPrice, unit) {
  try {
    const { data, error } = await supabase
      .from('items')
      .insert([{ code, name, vendor, unit_price: unitPrice, unit }])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function updateItem(id, code, name, vendor, unitPrice, unit) {
  try {
    const { data, error } = await supabase
      .from('items')
      .update({ code, name, vendor, unit_price: unitPrice, unit })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getOrders() {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map((row) => ({
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
    const { data, error } = await supabase
      .from('orders')
      .insert([{ id, vendor, item, quantity, unit_price: unitPrice, total_amount: totalAmount, order_date: orderDate, status }])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function updateOrder(id, vendor, item, quantity, unitPrice, totalAmount, orderDate, status) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ vendor, item, quantity, unit_price: unitPrice, total_amount: totalAmount, order_date: orderDate, status })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function deleteOrder(id) {
  try {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}
