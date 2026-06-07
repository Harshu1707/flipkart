import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';
export const fetchWishlist = createAsyncThunk('wishlist/fetch', async () => api.get('/wishlist'));
export const addWishlist = createAsyncThunk('wishlist/add', async (product_id, { dispatch }) => { await api.post('/wishlist', { product_id }); return dispatch(fetchWishlist()).unwrap(); });
export const removeWishlist = createAsyncThunk('wishlist/remove', async (productId, { dispatch }) => { await api.delete(`/wishlist/${productId}`); return dispatch(fetchWishlist()).unwrap(); });
const slice = createSlice({ name: 'wishlist', initialState: { items: [] }, reducers: {}, extraReducers: (b) => b.addCase(fetchWishlist.fulfilled, (s, a) => { s.items = a.payload.data; }).addCase(addWishlist.fulfilled, (s, a) => { s.items = a.payload.data; }).addCase(removeWishlist.fulfilled, (s, a) => { s.items = a.payload.data; }) });
export default slice.reducer;
