import { NextResponse } from 'next/server';
import { createAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/auth/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { password, username = 'panitia' } = await req.json();

    const expectedPassword = process.env.ADMIN_SECRET_KEY || 'GX2026PANITIA';

    if (!password || password.trim() !== expectedPassword.trim()) {
      return NextResponse.json(
        { error: 'Kunci akses panitia salah. Silakan periksa kembali kode otorisasi Anda.' },
        { status: 401 }
      );
    }

    // Buat token HMAC sesi aman
    const sessionToken = createAdminSessionToken(username);

    const response = NextResponse.json({
      success: true,
      message: 'Otorisasi admin berhasil. Selamat datang di Command Center Grindurance 2026.',
      username,
    });

    // Simpan di HttpOnly Cookie (24 Jam)
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 jam
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal memproses otorisasi admin.' },
      { status: 500 }
    );
  }
}
