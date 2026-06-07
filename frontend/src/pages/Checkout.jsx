import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const [shipping_address, setAddress] = useState({ fullName: '', address: '', city: '', pincode: '', phone: '' });
  const [payment_method, setPayment] = useState('cod');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { api.get('/cart').then((r) => setCart(r.data)); }, []);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  async function place(paymentId = null) {
    const order = await api.post('/orders', { shipping_address, payment_method, payment_id: paymentId });
    toast.success(`Order #${order.id} placed`);
    navigate('/orders');
  }
  async function submit(e) {
    e.preventDefault();
    try {
      if (payment_method === 'cod') return await place();
      const ready = await loadRazorpay();
      if (!ready) throw new Error('Unable to load Razorpay checkout');
      const rzOrder = await api.post('/orders/razorpay', { amount: total });
      const razorpay = new window.Razorpay({
        key: rzOrder.keyId,
        amount: rzOrder.data.amount,
        currency: 'INR',
        name: 'FlipShop',
        order_id: rzOrder.data.id,
        handler: async (response) => {
          await api.post('/orders/verify-payment', response);
          await place(response.razorpay_payment_id);
        },
        prefill: { name: shipping_address.fullName, contact: shipping_address.phone }
      });
      razorpay.open();
    } catch (err) { toast.error(err.message || 'Checkout failed'); }
  }
  return <form onSubmit={submit} className="card mx-auto max-w-2xl space-y-4 p-6"><h1 className="text-2xl font-bold">Checkout</h1>{['fullName','address','city','pincode','phone'].map((f) => <input key={f} className="w-full rounded border p-3" placeholder={f} onChange={(e) => setAddress({ ...shipping_address, [f]: e.target.value })} />)}<select className="w-full rounded border p-3" onChange={(e) => setPayment(e.target.value)}><option value="cod">Cash on delivery</option><option value="razorpay">Razorpay</option></select><p className="text-right text-xl font-bold">Total: ₹{total.toLocaleString('en-IN')}</p><button className="btn-primary w-full">Confirm order</button></form>;
}
