import fs from 'fs';
import path from 'path';

// Enquiry persistence. Uses Vercel Postgres when a connection string is
// present, and a local JSON file otherwise so the form works in development
// without any database at all.

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  message: string;
};

export function hasDatabase() {
  return (
    !!process.env.POSTGRES_URL ||
    !!process.env.POSTGRES_PRISMA_URL ||
    !!process.env.POSTGRES_URL_NON_POOLING
  );
}

async function saveToPostgres(payload: ContactPayload) {
  const { sql } = await import('@vercel/postgres');
  await sql`CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    country TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  )`;
  // Older deployments predate the country column; adding it is a no-op once present.
  await sql`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS country TEXT`;
  const res = await sql<{ id: number }>`INSERT INTO contact_messages (name, email, company, phone, country, message)
    VALUES (${payload.name}, ${payload.email}, ${payload.company || null}, ${payload.phone || null}, ${payload.country || null}, ${payload.message})
    RETURNING id`;
  return { id: res.rows[0].id, source: 'db' as const };
}

function saveToLocalJson(payload: ContactPayload) {
  // On Vercel the filesystem is read-only apart from /tmp.
  const baseDir = process.env.VERCEL ? '/tmp' : process.cwd();
  const dataDir = path.join(baseDir, 'data');
  const file = path.join(dataDir, 'contact-messages.json');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const existing: any[] = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  const id = existing.length ? existing[existing.length - 1].id + 1 : 1;
  existing.push({ id, ...payload, createdAt: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
  return { id, source: 'local' as const };
}

export async function saveContactSubmission(
  payload: ContactPayload,
  options?: { requireDbInProd?: boolean }
) {
  if (hasDatabase()) {
    try {
      const res = await saveToPostgres(payload);
      console.log('[contact] stored in Postgres', res);
      return res;
    } catch (err) {
      console.error('[contact] DB write failed:', (err as any)?.message);
      // In production a silent fallback to /tmp would lose the lead on the next
      // cold start, so surface the failure instead of pretending it worked.
      if (options?.requireDbInProd && process.env.VERCEL) throw err;
      return saveToLocalJson(payload);
    }
  }
  return saveToLocalJson(payload);
}
