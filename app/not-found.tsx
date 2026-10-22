import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#FA6D0B] uppercase tracking-widest block">
          ERROR 404 // JALUR TIDAK DITEMUKAN
        </span>
        <h1 className="font-display text-5xl sm:text-7xl font-black uppercase text-white italic tracking-tight">
          OFF-ROUTE
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          Koordinat halaman yang Anda tuju berada di luar rute resmi balapan atau berkas telah dipindahkan.
        </p>
      </div>

      <Button
        href="/"
        variant="primary"
        size="lg"
        withArrow
        className="font-mono text-xs"
      >
        KEMBALI KE BASECAMP
      </Button>
    </div>
  );
}
