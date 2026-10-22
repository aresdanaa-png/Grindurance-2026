import crypto from 'crypto';

export const ADMIN_SESSION_COOKIE = 'gx_admin_session';

// Kunci rahasia master panitia Grindurance 2026
const getAdminSecretKey = () => {
  return process.env.ADMIN_SECRET_KEY || 'GX2026PANITIA';
};

/**
 * Buat token sesi admin terenkripsi HMAC
 */
export function createAdminSessionToken(username: string = 'panitia'): string {
  const secret = getAdminSecretKey();
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

/**
 * Verifikasi token sesi admin
 */
export function verifyAdminSessionToken(token?: string | null): { authenticated: boolean; username?: string } {
  if (!token) return { authenticated: false };

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [username, timestampStr, signature] = decoded.split(':');

    if (!username || !timestampStr || !signature) {
      return { authenticated: false };
    }

    // Periksa masa berlaku sesi (24 Jam)
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

    if (isNaN(timestamp) || now - timestamp > TWENTY_FOUR_HOURS_MS) {
      return { authenticated: false };
    }

    // Verifikasi HMAC signature
    const secret = getAdminSecretKey();
    const expectedPayload = `${username}:${timestampStr}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(expectedPayload).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { authenticated: true, username };
    }

    return { authenticated: false };
  } catch (err) {
    return { authenticated: false };
  }
}

/**
 * Helper untuk memverifikasi request route handler Next.js
 */
export function verifyAdminRequest(req: Request): { authenticated: boolean; username?: string } {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const sessionCookie = cookies.find((c) => c.startsWith(`${ADMIN_SESSION_COOKIE}=`));

  if (!sessionCookie) {
    // Juga dukung Authorization header Bearer token untuk API client
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      return verifyAdminSessionToken(token);
    }
    return { authenticated: false };
  }

  const token = sessionCookie.substring(`${ADMIN_SESSION_COOKIE}=`.length);
  return verifyAdminSessionToken(token);
}
