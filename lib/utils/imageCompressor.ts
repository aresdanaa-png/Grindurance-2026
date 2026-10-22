/**
 * Client-Side Image Compressor for Grindurance 2026
 * Mengompres foto bukti transfer bank / screenshot QRIS atlet secara instan di browser
 * sebelum diunggah ke server, mereduksi ukuran file dari ~3-10 MB menjadi ~50-120 KB
 * tanpa mengorbankan keterbacaan teks bukti transfer (nominal, nomor rekening, tanggal).
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 - 1.0 (default: 0.75)
  mimeType?: 'image/webp' | 'image/jpeg';
}

export interface CompressionResult {
  file: File;
  blob: Blob;
  dataUrl: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  savedBytes: number;
  reductionPercentage: number;
  width: number;
  height: number;
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Kompres file gambar di sisi client (browser) menggunakan HTML5 Canvas
 */
export async function compressPaymentReceipt(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1200,
    maxHeight = 1600,
    quality = 0.75,
    mimeType = 'image/webp',
  } = options;

  if (!file.type.startsWith('image/')) {
    throw new Error('Berkas yang dipilih bukan gambar. Harap unggah format JPG, PNG, atau WEBP.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Gagal membaca berkas gambar. Silakan coba lagi.'));
    };

    reader.onload = (event) => {
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Gagal memuat gambar untuk proses kompresi. Berkas mungkin korup.'));
      };

      img.onload = () => {
        try {
          let { width, height } = img;

          // Hitung rasio aspek terkunci
          if (width > maxWidth || height > maxHeight) {
            const widthRatio = maxWidth / width;
            const heightRatio = maxHeight / height;
            const bestRatio = Math.min(widthRatio, heightRatio);

            width = Math.round(width * bestRatio);
            height = Math.round(height * bestRatio);
          }

          // Buat Canvas untuk re-sampling
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Gagal menginisialisasi Canvas 2D engine browser.');
          }

          // Kualitas rendering optimal untuk teks tanda bukti transfer
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Gambar ulang ke canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Coba ekspor ke format WebP terlebih dahulu, fallback ke JPEG jika browser lawas
          const tryExport = (targetMime: string) => {
            canvas.toBlob(
              (blob) => {
                if (!blob && targetMime === 'image/webp') {
                  // Fallback ke JPEG jika WebP blob gagal
                  tryExport('image/jpeg');
                  return;
                }

                if (!blob) {
                  reject(new Error('Gagal menghasilkan berkas kompresi gambar.'));
                  return;
                }

                const originalSize = file.size;
                const compressedSize = blob.size;
                const savedBytes = Math.max(0, originalSize - compressedSize);
                const reductionPercentage = originalSize > 0
                  ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
                  : 0;

                const baseExt = targetMime === 'image/webp' ? '.webp' : '.jpg';
                const originalNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                const newFileName = `${originalNameWithoutExt}_gx_compressed${baseExt}`;

                const compressedFile = new File([blob], newFileName, {
                  type: targetMime,
                  lastModified: Date.now(),
                });

                const dataUrl = canvas.toDataURL(targetMime, quality);

                resolve({
                  file: compressedFile,
                  blob,
                  dataUrl,
                  originalSizeBytes: originalSize,
                  compressedSizeBytes: compressedSize,
                  savedBytes,
                  reductionPercentage: Math.max(0, reductionPercentage),
                  width,
                  height,
                });
              },
              targetMime,
              quality
            );
          };

          tryExport(mimeType);
        } catch (err) {
          reject(err);
        }
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
