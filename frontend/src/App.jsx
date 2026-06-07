import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from './layouts/AppLayout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Auth from './pages/Auth.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';
import Orders from './pages/Orders.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function Protected({ children, admin = false }) { const { user, token } = useSelector((s) => s.auth); if (!token) return <Navigate to="/login" />; if (admin && user?.role !== 'admin') return <Navigate to="/" />; return children; }
export default function App() { return <BrowserRouter><Routes><Route element={<AppLayout />}><Route index element={<Home />} /><Route path="products" element={<Products />} /><Route path="products/:id" element={<ProductDetails />} /><Route path="login" element={<Auth mode="login" />} /><Route path="register" element={<Auth mode="register" />} /><Route path="cart" element={<Protected><Cart /></Protected>} /><Route path="wishlist" element={<Protected><Wishlist /></Protected>} /><Route path="checkout" element={<Protected><Checkout /></Protected>} /><Route path="profile" element={<Protected><Profile /></Protected>} /><Route path="orders" element={<Protected><Orders /></Protected>} /><Route path="admin" element={<Protected admin><AdminDashboard /></Protected>} /></Route></Routes></BrowserRouter>; }
