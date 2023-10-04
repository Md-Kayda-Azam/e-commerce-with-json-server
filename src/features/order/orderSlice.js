import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteItemOrderAsync,
  fetchAllOrders,
  updateOrder,
} from './orderAPI';

const initialState = {
  value: 0,
  status: 'idle',
  orders: [],
  totalOrders: 0,
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (data) => {
    const response = await fetchAllOrders(data);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (data) => {
    const response = await updateOrder(data);
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reserOrder: (state) => {
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(
          (item) => item.id === action.payload.id
        );
        state.orders[index] = action.payload;
      })
      .addCase(deleteItemOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        // Update the state after deleting the item
        state.orders = state.orders.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export const { reserOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
