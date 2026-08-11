import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { SESSION_COOKIE, verifySession } from '@/lib/adminSession';
import { hasDatabase } from '@/lib/contactStore';

export const runtime = 'nodejs';

const FILE = 'contact-messages.json';

export async function POST(req: NextRequest) {
  if (!verifySession(cookies().get(SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}) as any);
  const ids: number[] = Array.isArray(body?.ids)
    ? body.ids.map((x: any) => parseInt(String(x), 10)).filter((n: number) => Number.isFinite(n))
    : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: 'No valid ids provided' }, { status: 400 });
  }

  if (hasDatabase()) {
    try {
      const { sql } = await import('@vercel/postgres');
      // The table name is a literal; ids are bound as an int[] parameter.
      await sql.query('DELETE FROM contact_messages WHERE id = ANY($1::int[])', [ids]);
      return NextResponse.json({ ok: true, deleted: ids.length, source: 'db' });
    } catch (e: any) {
      return NextResponse.json({ error: e?.message || 'Database error' }, { status: 500 });
    }
  }

  try {
    const baseDir = process.env.VERCEL ? '/tmp' : process.cwd();
    const file = path.join(baseDir, 'data', FILE);
    if (fs.existsSync(file)) {
      const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
      const idset = new Set(ids);
      fs.writeFileSync(
        file,
        JSON.stringify(
          rows.filter((r: any) => !idset.has(Number(r.id))),
          null,
          2
        )
      );
    }
    return NextResponse.json({ ok: true, deleted: ids.length, source: 'local' });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Local file error' }, { status: 500 });
  }
}
