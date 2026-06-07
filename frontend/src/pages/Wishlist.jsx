import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';
import { fetchWishlist } from '../features/wishlistSlice.js';
export default function Wishlist() { const dispatch = useDispatch(); const items = useSelector((s) => s.wishlist.items); useEffect(() => { dispatch(fetchWishlist()); }, [dispatch]); return <section><h1 className="mb-4 text-2xl font-bold">My wishlist</h1><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>; }
