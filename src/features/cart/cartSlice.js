import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addToCart,
  deleteItemFormCart,
  fetchItemByUserId,
  reserCart,
  updateCart,
} from './cartAPI';

const initialState = {
  value: 0,
  status: 'idle',
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async (userId) => {
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemFormCartAsync = createAsyncThunk(
  'cart/deleteItemFormCart',
  async (itemId) => {
    const response = await deleteItemFormCart(itemId);
    return response.data;
  }
);

export const reserCartAsync = createAsyncThunk(
  'cart/reserCart',
  async (itemId) => {
    const response = await reserCart(itemId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFormCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFormCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(reserCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reserCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
