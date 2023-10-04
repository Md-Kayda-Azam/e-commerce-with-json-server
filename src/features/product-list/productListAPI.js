import { createAsyncThunk } from '@reduxjs/toolkit';

/**
 * GET All Products
 */
export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async () => {
    const response = await fetch('http://localhost:8080/products');

    const data = response.json();
    return data;
  }
);
/**
 * GEt All Categories
 */
export const getAllCategories = createAsyncThunk(
  'products/getAllCategories',
  async () => {
    const response = await fetch('http://localhost:8080/categories');

    const data = response.json();
    return data;
  }
);
/**
 * GEt All Brands
 */
export const getAllBrands = createAsyncThunk(
  'products/getAllBrands',
  async () => {
    const response = await fetch('http://localhost:8080/brands');

    const data = response.json();
    return data;
  }
);
/**
 * Get  Sigle Product
 */
export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (id) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);

    const data = response.json();
    return data;
  }
);

/***
 * Filter = {"Category": ["smartphone", "laptops"]}
 * sort = {_sort:"price", _order="desc"}
 * pagination = {_page:1, _limit=10}
 */
export const fetchProductsByFilters = createAsyncThunk(
  'products/fetchProductsByFilters',
  async (filter) => {
    const queryString = Object.entries(filter)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const response = await fetch(
      'http://localhost:8080/products?' + queryString
    );

    const data = response.json();
    return data;
  }
);
/**
 * Fetch products pagination
 */
export const fetchProductsPagination = createAsyncThunk(
  'products/fetchProductsPagination',
  async (filter) => {
    const queryString = Object.entries(filter)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const response = await fetch(
      'http://localhost:8080/products?' + queryString
    );

    const data = response.headers.get('X-Total-Count');
    return data;
  }
);

/**
 * Create Product
 * @param {*} product
 * @returns
 */
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product) => {
    const response = await fetch('http://localhost:8080/products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();

    return data;
  }
);
/**
 * Update Product
 */
export const productUpdate = createAsyncThunk(
  'products/productUpdate',
  async (productUpdateData) => {
    const response = await fetch(
      `http://localhost:8080/products/${productUpdateData.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(productUpdateData),
        headers: { 'content-type': 'application/json' },
      }
    );

    const data = response.json();
    return data;
  }
);
