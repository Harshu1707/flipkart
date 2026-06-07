import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';
export const fetchCart = createAsyncThunk('cart/fetch', async () => api.get('/cart'));
export const addToCart = createAsyncThunk('cart/add', async (payload, { dispatch }) => { await api.post('/cart', payload); return dispatch(fetchCart()).unwrap(); });
export const updateCart = createAsyncThunk('cart/update', async ({ id, quantity }, { dispatch }) => { await api.put(`/cart/${id}`, { quantity }); return dispatch(fetchCart()).unwrap(); });
export const removeCart = createAsyncThunk('cart/remove', async (id, { dispatch }) => { await api.delete(`/cart/${id}`); return dispatch(fetchCart()).unwrap(); });
const slice = createSlice({ name: 'cart', initialState: { items: [] }, reducers: {}, extraReducers: (b) => b.addCase(fetchCart.fulfilled, (s, a) => { s.items = a.payload.data; }).addCase(addToCart.fulfilled, (s, a) => { s.items = a.payload.data; }).addCase(updateCart.fulfilled, (s, a) => { s.items = a.payload.data; }).addCase(removeCart.fulfilled, (s, a) => { s.items = a.payload.data; }) });
export default slice.reducer;
