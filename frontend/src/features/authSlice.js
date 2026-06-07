import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api.js';

export const login = createAsyncThunk('auth/login', async (payload) => api.post('/auth/login', payload));
export const register = createAsyncThunk('auth/register', async (payload) => api.post('/auth/register', payload));
export const fetchMe = createAsyncThunk('auth/me', async () => api.get('/auth/me'));

const initialState = { user: JSON.parse(localStorage.getItem('user') || 'null'), token: localStorage.getItem('token'), status: 'idle' };
const slice = createSlice({ name: 'auth', initialState, reducers: { logout(state) { state.user = null; state.token = null; localStorage.removeItem('token'); localStorage.removeItem('user'); } }, extraReducers: (builder) => {
  [login, register].forEach((thunk) => builder.addCase(thunk.fulfilled, (state, action) => { state.user = action.payload.user; state.token = action.payload.token; localStorage.setItem('token', action.payload.token); localStorage.setItem('user', JSON.stringify(action.payload.user)); }));
  builder.addCase(fetchMe.fulfilled, (state, action) => { state.user = action.payload.user; localStorage.setItem('user', JSON.stringify(action.payload.user)); });
} });
export const { logout } = slice.actions;
export default slice.reducer;
