import { Outlet } from 'react-router-dom';
import Header from '../components/Header.jsx';
export default function AppLayout() { return <><Header /><main className="mx-auto max-w-7xl px-3 py-6"><Outlet /></main><footer className="mt-10 bg-slate-900 p-8 text-center text-white">FlipShop © 2026 · Secure payments · Easy returns</footer></>; }
