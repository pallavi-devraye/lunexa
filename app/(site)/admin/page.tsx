import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import { AdminEnquiryList, type Enquiry } from '@/components/admin/enquiry-list';
import { SESSION_COOKIE, verifySession } from '@/lib/adminSession';
import { hasDatabase } from '@/lib/contactStore';

export const dynamic = 'force-dynamic';

// The admin area holds customer enquiries, so it must never be indexed.
export const metadata: Metadata = {
  title: { absolute: 'Admin' },
  robots: { index: false, follow: false },
};

const PER_PAGE = 15;

function readLocalEnquiries(): Enquiry[] {
  try {
    const baseDir = process.env.VERCEL ? '/tmp' : process.cwd();
    const file = path.join(baseDir, 'data', 'contact-messages.json');
    if (!fs.existsSync(file)) return [];
    const rows = JSON.parse(fs.readFileSync(file, 'utf8')) as Enquiry[];
    return rows.slice().reverse(); // newest first
  } catch {
    return [];
  }
}

async function loadEnquiries(query: string, page: number) {
  if (hasDatabase()) {
    try {
      const { sql } = await import('@vercel/postgres');
      const like = `%${query}%`;
      const isBlank = query === '';
      const count = await sql<{ c: number }>`
        SELECT COUNT(*)::int AS c FROM contact_messages
        WHERE (${isBlank} OR name ILIKE ${like} OR email ILIKE ${like}
               OR coalesce(company,'') ILIKE ${like} OR coalesce(phone,'') ILIKE ${like}
               OR coalesce(country,'') ILIKE ${like} OR message ILIKE ${like})`;
      const rows = await sql`
        SELECT id, name, email, company, phone, country, message, created_at FROM contact_messages
        WHERE (${isBlank} OR name ILIKE ${like} OR email ILIKE ${like}
               OR coalesce(company,'') ILIKE ${like} OR coalesce(phone,'') ILIKE ${like}
               OR coalesce(country,'') ILIKE ${like} OR message ILIKE ${like})
        ORDER BY created_at DESC LIMIT ${PER_PAGE} OFFSET ${(page - 1) * PER_PAGE}`;
      return {
        source: 'Postgres' as const,
        total: count.rows[0]?.c ?? 0,
        items: rows.rows.map((r) => ({
          id: r.id as number,
          name: r.name as string,
          email: r.email as string,
          company: r.company as string | null,
          phone: r.phone as string | null,
          country: r.country as string | null,
          message: r.message as string,
          createdAt: new Date(r.created_at as any).toISOString(),
        })),
      };
    } catch (e) {
      console.error('[admin] DB read failed, falling back to local file:', (e as any)?.message);
    }
  }

  const all = readLocalEnquiries();
  const q = query.toLowerCase();
  const filtered = q
    ? all.filter((r) =>
        ['name', 'email', 'company', 'phone', 'country', 'message'].some((f) =>
          String((r as any)[f] ?? '').toLowerCase().includes(q)
        )
      )
    : all;
  return {
    source: 'Local file' as const,
    total: filtered.length,
    items: filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
  };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: { q?: string; page?: string };
}) {
  if (!verifySession(cookies().get(SESSION_COOKIE)?.value)) {
    return (
      <section className="container-g py-24">
        <div className="max-w-md mx-auto card p-8 text-center">
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-slate-400 mt-3">
            You are not signed in, or your session has expired.
          </p>
          <Link href="/admin/login" className="btn btn-primary mt-6">
            Go to sign in
          </Link>
        </div>
      </section>
    );
  }

  const query = (searchParams?.q || '').toString();
  const page = Math.max(1, parseInt((searchParams?.page || '1').toString(), 10) || 1);
  const { source, total, items } = await loadEnquiries(query, page);
  const maxPage = Math.max(1, Math.ceil(total / PER_PAGE));

  const pageLink = (p: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('page', String(p));
    return `/admin?${params.toString()}`;
  };

  return (
    <section className="container-g py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Source: <span className="text-slate-300 font-medium">{source}</span> ·{' '}
            <span className="text-slate-300 font-medium">{total}</span> total
          </p>
        </div>
        <a href="/api/admin/logout" className="btn btn-outline shrink-0">
          Log out
        </a>
      </div>

      <form method="get" className="mt-8 flex flex-col sm:flex-row gap-3">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search name, email, company, country, message…"
          aria-label="Search enquiries"
          className="input flex-1"
        />
        <button className="btn btn-primary shrink-0">Search</button>
        {query && (
          <Link href="/admin" className="btn btn-outline shrink-0">
            Clear
          </Link>
        )}
      </form>

      <div className="mt-8">
        <AdminEnquiryList items={items} />
      </div>

      {maxPage > 1 && (
        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-slate-500">
            Page {page} of {maxPage}
          </span>
          <div className="flex gap-2">
            <Link
              href={pageLink(Math.max(1, page - 1))}
              aria-disabled={page === 1}
              className={`btn btn-outline ${page === 1 ? 'pointer-events-none opacity-40' : ''}`}
            >
              Previous
            </Link>
            <Link
              href={pageLink(Math.min(maxPage, page + 1))}
              aria-disabled={page === maxPage}
              className={`btn btn-outline ${page === maxPage ? 'pointer-events-none opacity-40' : ''}`}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
