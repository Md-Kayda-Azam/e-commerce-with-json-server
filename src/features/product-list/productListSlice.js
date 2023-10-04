import { createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  fetchProductsByFilters,
  fetchProductsPagination,
  getAllBrands,
  getAllCategories,
  getAllProducts,
  getProductById,
  productUpdate,
} from './productListAPI';

export const productListSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedproduct: null,
    categories: [],
    brands: [],
    status: false,
    totalItems: 0,
    loader: false,
  },
  reducers: {
    clearUpdatePrudct: (state) => {
      state.selectedproduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.status = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsPagination.pending, (state) => {
        state.status = true;
      })
      .addCase(fetchProductsPagination.fulfilled, (state, action) => {
        state.status = false;
        state.totalItems = action.payload;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.status = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = false;
        state.categories = action.payload;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.status = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.status = false;
        state.brands = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.status = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = false;
        state.selectedproduct = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = false;
        state.products.push(action.payload);
      })
      .addCase(productUpdate.pending, (state) => {
        state.status = true;
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.status = false;
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearUpdatePrudct } = productListSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAllProductsTotalItems = (state) => state.product.totalItems;
export const selectAllProductsCategories = (state) => state.product.categories;
export const selectAllProductsBrands = (state) => state.product.brands;
export const selectProduct = (state) => state.product.selectedproduct;
export const selectLoader = (state) => state.product.status;

export default productListSlice.reducer;
