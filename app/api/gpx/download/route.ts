import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GPX_FILE_MAP, GPX_DISPLAY_INFO, GPX_UNLOCK_DATE_ISO } from '@/lib/data/categories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || '';
    const unlockOverride = searchParams.get('unlock') === '1' || searchParams.get('unlock_gpx') === '1';

    const relativePath = GPX_FILE_MAP[category];
    const displayInfo = GPX_DISPLAY_INFO[category];

    if (!relativePath || !displayInfo?.fileName) {
      return NextResponse.json(
        { error: 'CATEGORY_NOT_FOUND', message: `Tidak ada file GPX untuk kategori ${category}` },
        { status: 404 }
      );
    }

    const unlockTime = new Date(GPX_UNLOCK_DATE_ISO).getTime();
    const now = Date.now();

    // Enforce lock until H-2 unless testing override is passed
    if (now < unlockTime && !unlockOverride) {
      return NextResponse.json(
        {
          error: 'FILE_LOCKED_UNTIL_H2',
          message: 'File GPX resmi dikunci hingga H-2 (11 Desember 2026, 00:00 WIB) untuk finalisasi rute dan safety reconnaissance.',
          unlockDate: GPX_UNLOCK_DATE_ISO,
          category,
        },
        { status: 423 }
      );
    }

    // Unlocked: Stream file from public directory
    const cleanRelativePath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(process.cwd(), 'public', cleanRelativePath);

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'FILE_NOT_FOUND', message: 'File GPX tidak ditemukan pada server' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(fullPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/gpx+xml; charset=utf-8',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(displayInfo.fileName)}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Gagal mengunduh file GPX';
    return NextResponse.json(
      { error: 'SERVER_ERROR', message },
      { status: 500 }
    );
  }
}
