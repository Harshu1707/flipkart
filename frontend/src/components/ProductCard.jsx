import { Heart, ShoppingCart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice.js';
import { addWishlist } from '../features/wishlistSlice.js';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);
  const image = product.images?.[0]?.url || product.image || 'https://placehold.co/500x500?text=Product';
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  async function guarded(action) { if (!token) return toast.error('Please login first'); await action(); toast.success('Done'); }
  return <article className="card group p-4 transition hover:-translate-y-1 hover:shadow-lg">
    <Link to={`/products/${product.slug || product.product_id}`}><img src={image} alt={product.name} className="h-48 w-full object-contain" /><h3 className="mt-3 line-clamp-2 font-semibold">{product.name}</h3></Link>
    <div className="mt-2 flex items-center gap-2 text-sm"><span className="flex items-center rounded bg-green-600 px-1.5 py-0.5 text-white">{product.rating_avg || 4.2}<Star size={12} fill="currentColor" /></span><span className="text-slate-500">{product.brand}</span></div>
    <div className="mt-2 flex items-end gap-2"><b className="text-lg">₹{Number(product.price).toLocaleString('en-IN')}</b><span className="text-sm text-slate-400 line-through">₹{Number(product.mrp).toLocaleString('en-IN')}</span><span className="text-sm font-semibold text-green-600">{discount}% off</span></div>
    <div className="mt-4 grid grid-cols-2 gap-2"><button className="btn-primary flex items-center justify-center gap-1" onClick={() => guarded(() => dispatch(addToCart({ product_id: product.id || product.product_id, quantity: 1 })))}><ShoppingCart size={16} />Cart</button><button className="rounded border px-3 py-2 font-semibold" onClick={() => guarded(() => dispatch(addWishlist(product.id || product.product_id)))}><Heart className="mx-auto" size={18} /></button></div>
  </article>;
}
