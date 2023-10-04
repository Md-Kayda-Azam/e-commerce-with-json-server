import { createAsyncThunk } from '@reduxjs/toolkit';

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8080/orders/' + order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export const deleteItemOrderAsync = createAsyncThunk(
  'orders/deleteItemOrder',
  async (itemId) => {
    await fetch(`http://localhost:8080/orders/${itemId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    return itemId; // Assuming the server sends back the deleted item's data
  }
);

export function fetchAllOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders');
    const data = await response.json();
    resolve({ data: { orders: data, totalOrders: data.length } });
  });
}
