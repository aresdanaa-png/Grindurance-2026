'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PackageType, JerseySize } from '@/lib/types';
import IndonesiaAddressSelect from '@/components/IndonesiaAddressSelect';
import { RiderState } from './types';
import { JERSEY_DIMENSIONS } from './configs';

interface DaftarRiderFormFieldsProps {
  rider: RiderState;
  onChange: (updated: Partial<RiderState>) => void;
  riderRoleTitle: string;
  riderRoleSubtitle: string;
  prefixId: string;
  packageType: PackageType;
  jerseySizes: JerseySize[];
  t: (id: string, eng: string) => string;
}

export default function DaftarRiderFormFields({
  rider,
  onChange,
  riderRoleTitle,
  riderRoleSubtitle,
  prefixId,
  packageType,
  jerseySizes,
  t,
}: DaftarRiderFormFieldsProps) {
  const [showSizeChartModal, setShowSizeChartModal] = useState(false);

  return (
    <div className="rounded-2xl bg-black/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-7">
      <div className="border-b border-white/10 pb-4">
        <span className="font-mono text-base sm:text-lg font-bold text-[#FA6D0B] uppercase tracking-widest block">
          {riderRoleTitle}
        </span>
        <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1">
          {riderRoleSubtitle}
        </p>
      </div>

      {/* Bagian 1: Identitas Resmi */}
      <div className="space-y-4">
        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
          {t('1. DATA IDENTITAS RESMI · KTP ATAU PASPOR', '1. OFFICIAL IDENTITY DATA · ID OR PASSPORT')}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('NAMA LENGKAP (SESUAI KTP/PASPOR)', 'FULL NAME (AS IN ID/PASSPORT)')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="text"
              required
              value={rider.full_name}
              onChange={(e) => onChange({ full_name: e.target.value })}
              placeholder={t('Nama Lengkap Atlet', 'Athlete Full Name')}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('NOMOR NIK / PASPOR (16 DIGIT KTP)', 'ID / PASSPORT NUMBER (16 DIGIT ID)')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={16}
              value={rider.nik}
              onChange={(e) => onChange({ nik: e.target.value.replace(/\D/g, '') })}
              placeholder="3201012345670001"
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('AGAMA / KEPERCAYAAN', 'RELIGION / BELIEF')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <select
              value={rider.religion}
              onChange={(e) => onChange({ religion: e.target.value })}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base transition-all outline-none cursor-pointer"
            >
              <option value="Islam" className="bg-[#15171C]">Islam</option>
              <option value="Kristen Protestan" className="bg-[#15171C]">Kristen Protestan</option>
              <option value="Katolik" className="bg-[#15171C]">Katolik</option>
              <option value="Hindu" className="bg-[#15171C]">Hindu</option>
              <option value="Buddha" className="bg-[#15171C]">Buddha</option>
              <option value="Khonghucu" className="bg-[#15171C]">Khonghucu</option>
              <option value="Lainnya" className="bg-[#15171C]">{t('Lainnya / Penghayat Kepercayaan', 'Other / Traditional Belief')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bagian 2: Data Fisik & Kesiapan Medis */}
      <div className="space-y-4 pt-5 border-t border-white/10">
        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
          {t('2. DATA FISIK & KESIAPAN MEDIS · SAFETY PROTOCOL', '2. PHYSICAL DATA & MEDICAL READINESS · SAFETY PROTOCOL')}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('JENIS KELAMIN', 'GENDER')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChange({ gender: 'male' })}
                className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase transition-all cursor-pointer shadow-md ${
                  rider.gender === 'male'
                    ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                    : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                }`}
              >
                {t('LAKI-LAKI', 'MALE')}
              </button>
              <button
                type="button"
                onClick={() => onChange({ gender: 'female' })}
                className={`py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-mono font-black uppercase transition-all cursor-pointer shadow-md ${
                  rider.gender === 'female'
                    ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                    : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
                }`}
              >
                {t('PEREMPUAN', 'FEMALE')}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('TANGGAL LAHIR', 'DATE OF BIRTH')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="date"
              required
              value={rider.birth_date}
              onChange={(e) => onChange({ birth_date: e.target.value })}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('GOLONGAN DARAH', 'BLOOD TYPE')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <select
              value={rider.blood_type}
              onChange={(e) => onChange({ blood_type: e.target.value })}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base transition-all outline-none cursor-pointer"
            >
              <option value="A" className="bg-[#15171C]">A</option>
              <option value="B" className="bg-[#15171C]">B</option>
              <option value="AB" className="bg-[#15171C]">AB</option>
              <option value="O" className="bg-[#15171C]">O</option>
              <option value="-" className="bg-[#15171C]">{t('Tidak Tahu / Belum Cek', 'Unknown')}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('CATATAN MEDIS / ALERGI', 'MEDICAL NOTES / ALLERGIES')}
            </label>
            <input
              type="text"
              value={rider.medical_notes}
              onChange={(e) => onChange({ medical_notes: e.target.value })}
              placeholder={t('Asma, Alergi Obat, dsb (Opsional)', 'Asthma, Drug Allergy, etc (Optional)')}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bagian 3: Komunikasi & Kontak Darurat */}
      <div className="space-y-4 pt-5 border-t border-white/10">
        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
          {t('3. KOMUNIKASI RESMI & KONTAK DARURAT (ICE)', '3. OFFICIAL COMMUNICATION & EMERGENCY CONTACT (ICE)')}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('ALAMAT EMAIL RESMI', 'OFFICIAL EMAIL ADDRESS')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="email"
              required
              value={rider.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="atlet@domain.com"
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('NOMOR WHATSAPP AKTIF', 'ACTIVE WHATSAPP NUMBER')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="tel"
              required
              value={rider.phone_number}
              onChange={(e) => onChange({ phone_number: e.target.value })}
              placeholder="08123456789"
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('NAMA KONTAK DARURAT (ICE)', 'EMERGENCY CONTACT NAME (ICE)')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="text"
              required
              value={rider.emergency_contact_name}
              onChange={(e) => onChange({ emergency_contact_name: e.target.value })}
              placeholder={t('Keluarga / Kerabat', 'Family / Relative')}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('NOMOR HP KONTAK DARURAT', 'EMERGENCY CONTACT PHONE')} <span className="text-[#FA6D0B]">*</span>
            </label>
            <input
              type="tel"
              required
              value={rider.emergency_contact_phone}
              onChange={(e) => onChange({ emergency_contact_phone: e.target.value })}
              placeholder="08xxxxxxxxxx"
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bagian 4: Komunitas */}
      <div className="space-y-4 pt-5 border-t border-white/10">
        <span className="text-xs sm:text-sm font-mono font-bold text-[#FA6D0B] uppercase tracking-wider block border-b border-white/10 pb-2">
          {t('4. KOMUNITAS SEPEDA / CHAPTER REGIONAL', '4. CYCLING COMMUNITY / REGIONAL CHAPTER')}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider mb-2">
              {t('NAMA KOMUNITAS / SQUAD (OPSIONAL)', 'COMMUNITY / SQUAD NAME (OPTIONAL)')}
            </label>
            <input
              type="text"
              value={rider.community_chapter}
              onChange={(e) => onChange({ community_chapter: e.target.value })}
              placeholder={t('Contoh: GX-ID Bogor, Gravel Jakarta, dsb', 'E.g., GX-ID Bogor, Gravel Jakarta, etc.')}
              className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-black/60 focus:ring-1 focus:ring-[#FA6D0B] shadow-inner text-white font-mono text-sm sm:text-base placeholder:text-slate-500 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bagian 5: Ukuran Jersey Finisher (jika Paket MEDAL_JERSEY) */}
      {packageType === 'MEDAL_JERSEY' && (
        <div className="space-y-4 pt-5 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="block text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                {t('5. UKURAN JERSEY FINISHER · POLLRIDE AERO FIT', '5. FINISHER JERSEY SIZE · POLLRIDE AERO FIT')} <span className="text-[#FA6D0B]">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                Model: Short sleeve without back pocket · Toleransi ±1–2 cm
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSizeChartModal(true)}
              className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-[#FA6D0B] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm active:scale-95"
            >
              <span>{t('PANDUAN UKURAN (SIZE CHART)', 'SIZE CHART GUIDE')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {jerseySizes.map((sz) => {
              const dim = JERSEY_DIMENSIONS.find((d) => d.size === sz);
              const isSelected = rider.jersey_size === sz;
              return (
                <button
                  type="button"
                  key={sz}
                  onClick={() => onChange({ jersey_size: sz })}
                  className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer shadow-md flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_20px_rgba(250,109,11,0.5)]'
                      : 'bg-black/60 text-slate-300 hover:bg-black/80 hover:text-white'
                  }`}
                >
                  <span className="font-display italic font-black text-sm sm:text-base leading-none">
                    {sz}
                  </span>
                  {dim && (
                    <span className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-black/80 font-bold' : 'text-slate-400'}`}>
                      {dim.chestCm} cm
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bagian 6: Alamat Domisili */}
      <div className="pt-5 border-t border-white/10">
        <IndonesiaAddressSelect
          prefixId={prefixId}
          value={{
            address_detail: rider.address_detail,
            province_id: rider.province_id,
            province_name: rider.province_name,
            regency_id: rider.regency_id,
            regency_name: rider.regency_name,
            district_id: rider.district_id,
            district_name: rider.district_name,
            village_id: rider.village_id,
            village_name: rider.village_name,
            postal_code: rider.postal_code,
          }}
          onChange={(addr) => onChange(addr)}
        />
      </div>

      {/* MODAL PANDUAN RESMI UKURAN JERSEY POLLRIDE (BORDERLESS & NATURAL) */}
      {showSizeChartModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-md animate-fade-in-area"
          onClick={() => setShowSizeChartModal(false)}
        >
          <div
            className="w-full max-w-3xl bg-[#121418] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_30px_90px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
              <div>
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block">
                  // PANDUAN UKURAN JERSEY · POLLRIDE APPAREL
                </span>
                <span className="text-[11px] text-[#FA6D0B] tracking-wider uppercase block mt-0.5">
                  GX-ID OFFICIAL SHORT SLEEVE WITHOUT BACK POCKET
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowSizeChartModal(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                ✕ TUTUP
              </button>
            </div>

            {/* Official Size Chart Graphic */}
            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center p-2 shadow-inner">
              <img
                src="/size-chart.jpeg"
                alt="Size Chart Resmi Pollride Gravel Grindurance 2026"
                className="w-full h-auto max-h-[48vh] object-contain rounded-xl"
              />
            </div>

            {/* Dimension Breakdown Grid */}
            <div className="space-y-3 font-mono">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                TABEL SPESIFIKASI DIMENSI (SATUAN: CENTIMETER)
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs">
                {JERSEY_DIMENSIONS.map((d) => (
                  <div
                    key={d.size}
                    onClick={() => {
                      onChange({ jersey_size: d.size });
                      setShowSizeChartModal(false);
                    }}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                      rider.jersey_size === d.size
                        ? 'bg-[#FA6D0B] text-black font-black shadow-[0_0_15px_rgba(250,109,11,0.4)]'
                        : 'bg-black/60 text-slate-300 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div className="font-display italic font-black text-sm">{d.size}</div>
                    <div className="text-[10px] mt-1 opacity-80">Dada: {d.chestCm}</div>
                    <div className="text-[10px] opacity-80">Pjg: {d.lengthCm}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-sans text-slate-400 leading-relaxed pt-1">
                *Klik salah satu ukuran di atas untuk memilih langsung. Lebar dada diukur melintang dari ketiak ke ketiak. Panjang baju diukur dari titik bahu tertinggi ke ujung bawah keliman. Toleransi konveksi ±1–2 cm.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
