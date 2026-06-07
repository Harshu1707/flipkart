import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { api } from '../services/api.js';
export default function Home() {
  const [categories, setCategories] = useState([]); const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/categories').then((r) => setCategories(r.data)); api.get('/products/featured').then((r) => setProducts(r.data)); }, []);
  return <div className="space-y-8"><section className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white"><p className="font-semibold">Big Saving Days</p><h1 className="mt-2 text-4xl font-extrabold">Flipkart-inspired deals across India</h1><p className="mt-3 max-w-2xl">Shop mobiles, fashion, home, electronics, appliances and more with secure checkout.</p><Link className="mt-5 inline-block rounded bg-flipkart-yellow px-5 py-3 font-bold text-slate-900" to="/products">Shop now</Link></section><section className="card grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-5">{categories.map((c) => <Link key={c.id} to={`/products?category=${c.slug}`} className="text-center"><img src={c.image_url} className="mx-auto h-20 w-20 rounded-full object-cover" /><b>{c.name}</b></Link>)}</section><section><h2 className="mb-4 text-2xl font-bold">Featured products</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div></section></div>;
}
