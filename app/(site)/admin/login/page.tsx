'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      setLoading(true);
      setError(undefined);
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (r.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const j = await r.json().catch(() => ({}));
        setError(j?.error || 'Invalid credentials');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container-g py-24">
      <div className="max-w-md mx-auto card p-8">
        <div className="h-12 w-12 rounded-2xl bg-brand/12 text-brand-light flex items-center justify-center ring-1 ring-brand/20">
          <Lock size={20} />
        </div>
        <h1 className="text-2xl font-bold mt-5">Admin sign in</h1>
        <p className="text-sm text-slate-400 mt-2">Enquiries received through the website.</p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div className="field">
            <label className="field-label" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" name="email" required autoComplete="username" className="input" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="input"
            />
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={16} /> Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>
          {error && (
            <p className="alert-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
