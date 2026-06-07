import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../features/cartSlice.js';
import { addWishlist } from '../features/wishlistSlice.js';
import { api } from '../services/api.js';
export default function ProductDetails() {
  const { id } = useParams(); const [product, setProduct] = useState(null); const dispatch = useDispatch(); const token = useSelector((s) => s.auth.token);
  useEffect(() => { api.get(`/products/${id}`).then((r) => setProduct(r.data)); }, [id]);
  if (!product) return <p>Loading...</p>;
  const image = product.images?.[0]?.url;
  return <div className="grid gap-8 md:grid-cols-2"><div className="card p-6"><img src={image} className="h-96 w-full object-contain" /></div><div className="card space-y-4 p-6"><h1 className="text-3xl font-bold">{product.name}</h1><p className="text-green-700">Special price</p><div><b className="text-3xl">₹{Number(product.price).toLocaleString('en-IN')}</b><span className="ml-3 text-slate-400 line-through">₹{Number(product.mrp).toLocaleString('en-IN')}</span></div><p>{product.description}</p><p className="font-semibold">Stock: {product.stock}</p><div className="flex gap-3"><button className="btn-primary" onClick={() => token ? dispatch(addToCart({ product_id: product.id, quantity: 1 })) : toast.error('Login required')}>Add to cart</button><button className="rounded bg-orange-500 px-4 py-2 font-bold text-white" onClick={() => token ? dispatch(addWishlist(product.id)) : toast.error('Login required')}>Wishlist</button></div><h2 className="pt-5 text-xl font-bold">Reviews</h2>{product.reviews?.map((r) => <div className="border-t py-2" key={r.id}><b>{r.user_name}</b> · {r.rating}/5<p>{r.comment}</p></div>)}</div></div>;
}
