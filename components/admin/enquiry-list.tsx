'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { parseEnquiry, fmtDate } from '@/lib/enquiry';

export type Enquiry = {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  country?: string | null;
  message: string;
  createdAt: string;
};

export function AdminEnquiryList({ items }: { items: Enquiry[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  const allSelected = items.length > 0 && items.every((i) => selected.has(i.id));

  function toggle(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function del(ids: number[]) {
    if (busy || ids.length === 0) return;
    const label = ids.length === 1 ? 'this enquiry' : `${ids.length} enquiries`;
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return;

    try {
      setBusy(true);
      setError(undefined);
      const r = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j?.ok) {
        setSelected(new Set());
        router.refresh();
      } else {
        setError(j?.error || 'Delete failed');
      }
    } finally {
      setBusy(false);
    }
  }

  if (items.length === 0) {
    return <p className="text-sm text-slate-500 py-10 text-center">No enquiries yet.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4 min-h-[36px]">
        <label className="flex items-center gap-2.5 text-sm text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={() => setSelected(allSelected ? new Set() : new Set(items.map((i) => i.id)))}
            className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand focus:ring-brand"
          />
          Select all on this page
        </label>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={() => del([...selected])}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-full ring-1 ring-red-500/40 text-red-300 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            {busy ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
            Delete selected ({selected.size})
          </button>
        )}
      </div>

      {error && <div className="alert-error mb-4">{error}</div>}

      <div className="space-y-3">
        {items.map((item) => {
          const checked = selected.has(item.id);
          const { service, budget, timeline, body } = parseEnquiry(item.message);
          return (
            <div
              key={item.id}
              className={clsx(
                'rounded-2xl p-5 transition-colors ring-1',
                checked ? 'ring-brand/60 bg-brand/[0.07]' : 'ring-white/10 bg-white/[0.02] hover:ring-white/20'
              )}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(item.id)}
                  aria-label={`Select enquiry #${item.id}`}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-brand focus:ring-brand"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-white">{item.name || 'Unknown'}</span>
                    <span className="text-xs text-slate-600 shrink-0">#{item.id}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {item.email && (
                      <a href={`mailto:${item.email}`} className="text-brand-light hover:underline break-all">
                        {item.email}
                      </a>
                    )}
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="text-slate-400 hover:text-brand-light">
                        {item.phone}
                      </a>
                    )}
                    {item.company && <span className="text-slate-500">{item.company}</span>}
                    {item.country && <span className="text-slate-500">{item.country}</span>}
                  </div>
                  {(service || budget || timeline) && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {service && <span className="badge">{service}</span>}
                      {budget && <span className="chip">Budget: {budget}</span>}
                      {timeline && <span className="chip">Timeline: {timeline}</span>}
                    </div>
                  )}
                  {body && (
                    <p className="text-sm text-slate-300 mt-3 whitespace-pre-wrap leading-relaxed">{body}</p>
                  )}
                  <p className="text-xs text-slate-600 mt-3">{fmtDate(item.createdAt)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => del([item.id])}
                  disabled={busy}
                  aria-label={`Delete enquiry #${item.id}`}
                  title="Delete"
                  className="text-slate-600 hover:text-red-400 shrink-0 disabled:opacity-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
