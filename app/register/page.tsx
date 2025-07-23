"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Register failed');
      return;
    }
    // Simpan user-token ke cookie (dummy, seharusnya dari BE)
    document.cookie = `user-token=${btoa(JSON.stringify(data))}; path=/`;
    router.push('/dashboard');
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold mb-2">Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full" required />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Register</button>
        <a href="/login" className="block text-center text-blue-600 underline">Already have an account? Login</a>
      </form>
    </main>
  );
}
