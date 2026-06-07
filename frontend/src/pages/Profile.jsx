import { useSelector } from 'react-redux';
export default function Profile() { const { user } = useSelector((s) => s.auth); return <div className="card mx-auto max-w-xl p-6"><h1 className="text-2xl font-bold">Profile</h1><p className="mt-4"><b>Name:</b> {user?.name}</p><p><b>Email:</b> {user?.email}</p><p><b>Role:</b> {user?.role}</p></div>; }
