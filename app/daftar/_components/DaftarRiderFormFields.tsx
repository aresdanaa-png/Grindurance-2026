'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PackageType, JerseySize } from '@/lib/types';
import IndonesiaAddressSelect from '@/components/IndonesiaAddressSelect';
import SizeChartModal from '@/components/SizeChartModal';
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
                {t('5. PILIHAN & UKURAN JERSEY FINISHER · POLLRIDE', '5. FINISHER JERSEY STYLE & SIZE · POLLRIDE')} <span className="text-[#FA6D0B]">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                {t(
                  'Pola aerodinamis tanpa saku belakang buatan Pollride Apparel · Toleransi ±1–2 cm',
                  'Aerodynamic cut without back pocket by Pollride Apparel · Tolerance ±1–2 cm'
                )}
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

          {/* Opsi Model Lengan: Pendek (Standar) vs Panjang (+Rp 40.000) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-300 font-bold uppercase tracking-wider">
                {t('// MODEL POTONGAN LENGAN', '// SLEEVE CUT STYLE')}
              </span>
              <span className="text-[#FA6D0B] font-bold">
                {rider.jersey_sleeve === 'LONG'
                  ? t('+RP 40.000 / JERSEY (ADD-ON)', '+IDR 40,000 / JERSEY (ADD-ON)')
                  : t('TERMASUK DALAM PAKET (STANDAR)', 'INCLUDED IN PACKAGE (STANDARD)')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onChange({ jersey_sleeve: 'SHORT' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  (rider.jersey_sleeve || 'SHORT') === 'SHORT'
                    ? 'bg-[#FA6D0B]/15 border-[#FA6D0B] text-white shadow-[0_0_15px_rgba(250,109,11,0.25)]'
                    : 'bg-black/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {t('LENGAN PENDEK (SHORT SLEEVE)', 'SHORT SLEEVE (STANDARD)')}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    (rider.jersey_sleeve || 'SHORT') === 'SHORT'
                      ? 'bg-[#FA6D0B] text-black font-black'
                      : 'bg-white/10 text-slate-300'
                  }`}>
                    {t('STANDAR', 'STANDARD')}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{t('Aerodinamis & Sejuk', 'Aerodynamic & Cool')}</span>
                  <span className="text-[#FA6D0B] font-bold">{t('Sudah Termasuk (+Rp 0)', 'Included (+IDR 0)')}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ jersey_sleeve: 'LONG' })}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  rider.jersey_sleeve === 'LONG'
                    ? 'bg-[#FA6D0B]/15 border-[#FA6D0B] text-white shadow-[0_0_15px_rgba(250,109,11,0.25)]'
                    : 'bg-black/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    {t('LENGAN PANJANG (LONG SLEEVE)', 'LONG SLEEVE (UPGRADE)')}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    rider.jersey_sleeve === 'LONG'
                      ? 'bg-[#FA6D0B] text-black font-black'
                      : 'bg-[#FA6D0B]/20 text-[#FA6D0B]'
                  }`}>
                    +RP 40.000
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{t('Proteksi Cuaca & Ranting', 'Trail & Sun Protection')}</span>
                  <span className="text-[#FA6D0B] font-bold">+Rp 40.000</span>
                </div>
              </button>
            </div>
          </div>

          {/* Opsi Ukuran Terbagi Bersih per Tier (Ringkas & Ergonomis di Mobile) */}
          <div className="space-y-3">
            {/* Standard Tier */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                // STANDARD FIT (XS – XL)
              </span>
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {jerseySizes
                  .filter((sz) => !['2XL', '3XL', '4XL', '5XL'].includes(sz))
                  .map((sz) => {
                    const dim = JERSEY_DIMENSIONS.find((d) => d.size === sz);
                    const isSelected = rider.jersey_size === sz;
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => onChange({ jersey_size: sz })}
                        className={`py-2.5 sm:py-3 px-1.5 rounded-xl text-center transition-all cursor-pointer shadow-md flex flex-col items-center justify-center ${
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

            {/* Up Size Tier */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#FA6D0B] font-bold block">
                // UP SIZE TIERS (2XL – 5XL)
              </span>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {jerseySizes
                  .filter((sz) => ['2XL', '3XL', '4XL', '5XL'].includes(sz))
                  .map((sz) => {
                    const dim = JERSEY_DIMENSIONS.find((d) => d.size === sz);
                    const isSelected = rider.jersey_size === sz;
                    return (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => onChange({ jersey_size: sz })}
                        className={`py-2.5 sm:py-3 px-1.5 rounded-xl text-center transition-all cursor-pointer shadow-md flex flex-col items-center justify-center ${
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
      <SizeChartModal
        isOpen={showSizeChartModal}
        onClose={() => setShowSizeChartModal(false)}
        selectedSize={rider.jersey_size}
        onSelectSize={(sz) => onChange({ jersey_size: sz })}
      />
    </div>
  );
}
