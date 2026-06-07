import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice.js';

export default function Header() {
  const { user } = useSelector((s) => s.auth);
  const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function search(e) { e.preventDefault(); const q = e.currentTarget.q.value.trim(); navigate(q ? `/products?search=${encodeURIComponent(q)}` : '/products'); }
  return <header className="sticky top-0 z-40 bg-flipkart-blue text-white shadow">
    <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3">
      <Menu className="md:hidden" /><Link to="/" className="text-2xl font-bold italic">FlipShop</Link>
      <form onSubmit={search} className="flex flex-1 overflow-hidden rounded bg-white text-slate-900"><input name="q" className="w-full px-4 py-2 outline-none" placeholder="Search for products, brands and more" /><button className="px-3 text-flipkart-blue"><Search /></button></form>
      <nav className="flex items-center gap-4 text-sm font-semibold"><Link to="/wishlist"><Heart /></Link><Link to="/cart" className="relative"><ShoppingCart />{cartCount > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-flipkart-yellow px-1 text-xs text-black">{cartCount}</span>}</Link>{user ? <div className="group relative"><Link to="/profile" className="flex items-center gap-1"><User />{user.name}</Link><div className="absolute right-0 hidden w-40 rounded bg-white p-2 text-slate-800 shadow group-hover:block"><Link className="block p-2" to="/orders">Orders</Link>{user.role === 'admin' && <Link className="block p-2" to="/admin">Admin</Link>}<button className="block p-2" onClick={() => dispatch(logout())}>Logout</button></div></div> : <Link to="/login" className="rounded bg-white px-4 py-1 text-flipkart-blue">Login</Link>}</nav>
    </div>
  </header>;
}
