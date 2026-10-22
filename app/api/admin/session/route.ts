import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = verifyAdminRequest(req);

  if (!auth.authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    username: auth.username || 'panitia',
  });
}
