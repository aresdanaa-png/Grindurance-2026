'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

export interface AddressData {
  address_detail: string;
  province_id: string;
  province_name: string;
  regency_id: string;
  regency_name: string;
  district_id: string;
  district_name: string;
  village_id: string;
  village_name: string;
  postal_code: string;
}

interface RegionItem {
  id: string;
  name: string;
  province_id?: string;
  regency_id?: string;
  district_id?: string;
}

interface IndonesiaAddressSelectProps {
  value: AddressData;
  onChange: (updated: AddressData) => void;
  required?: boolean;
  prefixId?: string;
}

export default function IndonesiaAddressSelect({
  value,
  onChange,
  required = true,
  prefixId = 'addr',
}: IndonesiaAddressSelectProps) {
  const { t } = useLanguage();
  const [provinces, setProvinces] = useState<RegionItem[]>([]);
  const [regencies, setRegencies] = useState<RegionItem[]>([]);
  const [districts, setDistricts] = useState<RegionItem[]>([]);
  const [villages, setVillages] = useState<RegionItem[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  // 1. Load Provinces on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchProvinces() {
      setLoadingProvinces(true);
      try {
        const res = await fetch('/api/wilayah?type=provinces');
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setProvinces(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil daftar provinsi:', err);
      } finally {
        if (isMounted) setLoadingProvinces(false);
      }
    }
    fetchProvinces();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Load Regencies when province_id changes
  useEffect(() => {
    let isMounted = true;
    if (!value.province_id) {
      setRegencies([]);
      setDistricts([]);
      setVillages([]);
      return;
    }

    async function fetchRegencies() {
      setLoadingRegencies(true);
      try {
        const res = await fetch(`/api/wilayah?type=regencies&id=${value.province_id}`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setRegencies(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil daftar kabupaten/kota:', err);
      } finally {
        if (isMounted) setLoadingRegencies(false);
      }
    }
    fetchRegencies();
    return () => {
      isMounted = false;
    };
  }, [value.province_id]);

  // 3. Load Districts when regency_id changes
  useEffect(() => {
    let isMounted = true;
    if (!value.regency_id) {
      setDistricts([]);
      setVillages([]);
      return;
    }

    async function fetchDistricts() {
      setLoadingDistricts(true);
      try {
        const res = await fetch(`/api/wilayah?type=districts&id=${value.regency_id}`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setDistricts(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil daftar kecamatan:', err);
      } finally {
        if (isMounted) setLoadingDistricts(false);
      }
    }
    fetchDistricts();
    return () => {
      isMounted = false;
    };
  }, [value.regency_id]);

  // 4. Load Villages when district_id changes
  useEffect(() => {
    let isMounted = true;
    if (!value.district_id) {
      setVillages([]);
      return;
    }

    async function fetchVillages() {
      setLoadingVillages(true);
      try {
        const res = await fetch(`/api/wilayah?type=villages&id=${value.district_id}`);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          setVillages(json.data);
        }
      } catch (err) {
        console.error('Gagal mengambil daftar kelurahan/desa:', err);
      } finally {
        if (isMounted) setLoadingVillages(false);
      }
    }
    fetchVillages();
    return () => {
      isMounted = false;
    };
  }, [value.district_id]);

  // Handlers
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedObj = provinces.find((p) => p.id === selectedId);
    onChange({
      ...value,
      province_id: selectedId,
      province_name: selectedObj ? selectedObj.name : '',
      regency_id: '',
      regency_name: '',
      district_id: '',
      district_name: '',
      village_id: '',
      village_name: '',
    });
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedObj = regencies.find((r) => r.id === selectedId);
    onChange({
      ...value,
      regency_id: selectedId,
      regency_name: selectedObj ? selectedObj.name : '',
      district_id: '',
      district_name: '',
      village_id: '',
      village_name: '',
    });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedObj = districts.find((d) => d.id === selectedId);
    onChange({
      ...value,
      district_id: selectedId,
      district_name: selectedObj ? selectedObj.name : '',
      village_id: '',
      village_name: '',
    });
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedObj = villages.find((v) => v.id === selectedId);
    onChange({
      ...value,
      village_id: selectedId,
      village_name: selectedObj ? selectedObj.name : '',
    });
  };

  return (
    <div className="space-y-5 pt-4 border-t border-white/10 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <label className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
          {t('ALAMAT DOMISILI · PENGIRIMAN RACE PACK', 'DOMICILE ADDRESS · RACE PACK SHIPPING')} {required && <span className="text-[#FA6D0B] font-bold text-base">*</span>}
        </label>
        <span className="text-xs font-mono text-[#FA6D0B] uppercase tracking-widest font-bold">{t('DATABASE WILAYAH RESMI RI', 'OFFICIAL RI REGIONAL DATABASE')}</span>
      </div>

      {/* Grid 4 Kolom Dropdown Berjenjang (Provinsi, Kab/Kota, Kecamatan, Desa/Kelurahan) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. PROVINSI */}
        <div>
          <label htmlFor={`${prefixId}-prov`} className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
            {t('PROVINSI', 'PROVINCE')} {required && <span className="text-[#FA6D0B]">*</span>}
          </label>
          <div className="relative">
            <select
              id={`${prefixId}-prov`}
              required={required}
              value={value.province_id}
              onChange={handleProvinceChange}
              disabled={loadingProvinces}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 text-white text-sm font-mono focus:ring-1 focus:ring-[#FA6D0B] shadow-inner focus:outline-none appearance-none disabled:opacity-50 pr-8 transition-all cursor-pointer"
            >
              <option value="">{loadingProvinces ? t('MEMUAT...', 'LOADING...') : t('PILIH PROVINSI', 'SELECT PROVINCE')}</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.id} className="bg-[#15171C] text-white">
                  {prov.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. KABUPATEN / KOTA */}
        <div>
          <label htmlFor={`${prefixId}-reg`} className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
            {t('KABUPATEN / KOTA', 'REGENCY / CITY')} {required && <span className="text-[#FA6D0B]">*</span>}
          </label>
          <div className="relative">
            <select
              id={`${prefixId}-reg`}
              required={required}
              value={value.regency_id}
              onChange={handleRegencyChange}
              disabled={!value.province_id || loadingRegencies}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 text-white text-sm font-mono focus:ring-1 focus:ring-[#FA6D0B] shadow-inner focus:outline-none appearance-none disabled:opacity-40 disabled:cursor-not-allowed pr-8 transition-all cursor-pointer"
            >
              <option value="">
                {!value.province_id
                  ? t('PILIH PROVINSI DAHULU', 'SELECT PROVINCE FIRST')
                  : loadingRegencies
                  ? t('MEMUAT...', 'LOADING...')
                  : t('PILIH KABUPATEN / KOTA', 'SELECT CITY / REGENCY')}
              </option>
              {regencies.map((reg) => (
                <option key={reg.id} value={reg.id} className="bg-[#15171C] text-white">
                  {reg.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. KECAMATAN */}
        <div>
          <label htmlFor={`${prefixId}-dist`} className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
            {t('KECAMATAN', 'DISTRICT')} {required && <span className="text-[#FA6D0B]">*</span>}
          </label>
          <div className="relative">
            <select
              id={`${prefixId}-dist`}
              required={required}
              value={value.district_id}
              onChange={handleDistrictChange}
              disabled={!value.regency_id || loadingDistricts}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 text-white text-sm font-mono focus:ring-1 focus:ring-[#FA6D0B] shadow-inner focus:outline-none appearance-none disabled:opacity-40 disabled:cursor-not-allowed pr-8 transition-all cursor-pointer"
            >
              <option value="">
                {!value.regency_id
                  ? t('PILIH KAB/KOTA DAHULU', 'SELECT CITY FIRST')
                  : loadingDistricts
                  ? t('MEMUAT...', 'LOADING...')
                  : t('PILIH KECAMATAN', 'SELECT DISTRICT')}
              </option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id} className="bg-[#15171C] text-white">
                  {dist.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. KELURAHAN / DESA */}
        <div>
          <label htmlFor={`${prefixId}-vill`} className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
            {t('KELURAHAN / DESA', 'SUB-DISTRICT / VILLAGE')} {required && <span className="text-[#FA6D0B]">*</span>}
          </label>
          <div className="relative">
            <select
              id={`${prefixId}-vill`}
              required={required}
              value={value.village_id}
              onChange={handleVillageChange}
              disabled={!value.district_id || loadingVillages}
              className="w-full px-4 py-3.5 rounded-xl bg-black/60 text-white text-sm font-mono focus:ring-1 focus:ring-[#FA6D0B] shadow-inner focus:outline-none appearance-none disabled:opacity-40 disabled:cursor-not-allowed pr-8 transition-all cursor-pointer"
            >
              <option value="">
                {!value.district_id
                  ? t('PILIH KECAMATAN DAHULU', 'SELECT DISTRICT FIRST')
                  : loadingVillages
                  ? t('MEMUAT...', 'LOADING...')
                  : t('PILIH DESA / KELURAHAN', 'SELECT VILLAGE')}
              </option>
              {villages.map((vill) => (
                <option key={vill.id} value={vill.id} className="bg-[#15171C] text-white">
                  {vill.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Baris Detail Alamat & Kode Pos */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-3">
          <label htmlFor={`${prefixId}-detail`} className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
            {t('DETAIL JALAN, NOMOR, RT/RW, PATOKAN', 'STREET ADDRESS, NUMBER, LANDMARK')} {required && <span className="text-[#FA6D0B]">*</span>}
          </label>
          <input
            id={`${prefixId}-detail`}
            type="text"
            required={required}
            value={value.address_detail}
            onChange={(e) => onChange({ ...value, address_detail: e.target.value })}
            placeholder={t('Cth: Jl. Raya Jonggol No. 88 RT 02/05, Samping Indomaret', 'E.g., 88 Jonggol Main St, Near Community Center')}
            className="w-full px-4 py-3.5 rounded-xl bg-black/60 text-white text-sm font-mono focus:ring-1 focus:ring-[#FA6D0B] shadow-inner focus:outline-none placeholder:text-slate-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor={`${prefixId}-postal`} className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
            {t('KODE POS', 'POSTAL CODE')} {required && <span className="text-[#FA6D0B]">*</span>}
          </label>
          <input
            id={`${prefixId}-postal`}
            type="text"
            maxLength={6}
            required={required}
            value={value.postal_code}
            onChange={(e) => onChange({ ...value, postal_code: e.target.value.replace(/\D/g, '') })}
            placeholder={t('Cth: 16830', 'E.g. 16830')}
            className="w-full px-4 py-3.5 rounded-xl bg-black/60 text-white text-sm font-mono focus:ring-1 focus:ring-[#FA6D0B] shadow-inner focus:outline-none placeholder:text-slate-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
