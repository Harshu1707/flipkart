import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
export default function Orders() { const [orders, setOrders] = useState([]); useEffect(() => { api.get('/orders/mine').then((r) => setOrders(r.data)); }, []); return <section className="card p-5"><h1 className="mb-4 text-2xl font-bold">Order history</h1>{orders.map((o) => <div className="border-t py-3" key={o.id}><b>Order #{o.id}</b><p>₹{Number(o.total_amount).toLocaleString('en-IN')} · {o.status} · {new Date(o.created_at).toLocaleString()}</p></div>)}</section>; }
