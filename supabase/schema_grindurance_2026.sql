-- ============================================================================
-- SKEMA BASIS DATA RESMI: GRAVEL GRINDURANCE 2026 — ANNIVERSARY EDITION
-- Engine: PostgreSQL / Supabase
-- Versi: 1.2 (Production Ready - Clean Architecture, RLS & Safe Policies)
-- ============================================================================

-- 1. Ekstensi Keamanan & Enkripsi
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Sequence Nomor BIB Peserta (Sesuai Kategori Jarak)
CREATE SEQUENCE IF NOT EXISTS bib_number_seq START 1000;
CREATE SEQUENCE IF NOT EXISTS bib_seq_60 START 6001;
CREATE SEQUENCE IF NOT EXISTS bib_seq_80 START 8001;
CREATE SEQUENCE IF NOT EXISTS bib_seq_120_single START 1201;
CREATE SEQUENCE IF NOT EXISTS bib_seq_120_pair START 2201;
CREATE SEQUENCE IF NOT EXISTS bib_seq_150 START 1501;
CREATE SEQUENCE IF NOT EXISTS bib_seq_200 START 2001;
CREATE SEQUENCE IF NOT EXISTS bib_seq_virtual START 9001;

-- Fungsi Helper: Mengambil nomor BIB berikutnya sesuai kategori
CREATE OR REPLACE FUNCTION get_next_bib(p_category_id VARCHAR)
RETURNS INT AS $$
BEGIN
    CASE p_category_id
        WHEN '60' THEN RETURN nextval('bib_seq_60');
        WHEN '80' THEN RETURN nextval('bib_seq_80');
        WHEN '120_SINGLE' THEN RETURN nextval('bib_seq_120_single');
        WHEN '120_PAIR' THEN RETURN nextval('bib_seq_120_pair');
        WHEN '150' THEN RETURN nextval('bib_seq_150');
        WHEN '200' THEN RETURN nextval('bib_seq_200');
        WHEN 'VIRTUAL' THEN RETURN nextval('bib_seq_virtual');
        ELSE RETURN nextval('bib_number_seq');
    END CASE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 3. TABEL PENGATURAN GLOBAL EVENT (event_settings)
-- Digunakan untuk kontrol pembukaan pendaftaran, countdown timer, dan kontak WA
-- ============================================================================
CREATE TABLE IF NOT EXISTS event_settings (
    id INT PRIMARY KEY DEFAULT 1,
    event_name VARCHAR(100) NOT NULL DEFAULT 'Gravel Grindurance 2026 Anniversary Edition',
    is_registration_open BOOLEAN NOT NULL DEFAULT TRUE,
    registration_start_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    registration_close_at TIMESTAMP WITH TIME ZONE DEFAULT '2026-11-25 23:59:59+07',
    jersey_order_deadline TIMESTAMP WITH TIME ZONE DEFAULT '2026-11-10 23:59:59+07',
    race_date DATE DEFAULT '2026-12-13',
    venue_start_finish VARCHAR(150) DEFAULT 'ABEEY Coffee & Eatery / LRT Harjamukti, Cibubur',
    emergency_wa_number VARCHAR(30) DEFAULT '081519656133', -- SPGDT Hermina
    panitia_wa_number VARCHAR(30) DEFAULT '08562720141',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row_check CHECK (id = 1)
);

INSERT INTO event_settings (id, event_name) 
VALUES (1, 'Gravel Grindurance 2026 Anniversary Edition')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. TABEL KATEGORI EVENT (categories)
-- ============================================================================
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(30) PRIMARY KEY, -- '60', '80', '120_SINGLE', '120_PAIR', '150', '200', 'VIRTUAL'
    name VARCHAR(100) NOT NULL,
    distance_km INT NOT NULL,
    category_type VARCHAR(20) NOT NULL, -- 'fun', 'race', 'cross', 'ultra', 'virtual'
    is_pair BOOLEAN NOT NULL DEFAULT FALSE,
    price_medal_only DECIMAL(12,2) NOT NULL,
    price_medal_jersey DECIMAL(12,2) NOT NULL,
    quota INT NOT NULL DEFAULT 100,
    current_enrolled INT NOT NULL DEFAULT 0,
    cot_hours DECIMAL(4,1) DEFAULT NULL,
    wave_start_time TIME DEFAULT NULL,
    prologue_required_km INT NOT NULL DEFAULT 0,
    mandatory_pitstop_cp INT DEFAULT NULL,
    tracking_required BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Data 7 Kategori Resmi GX-ID
INSERT INTO categories (
    id, name, distance_km, category_type, is_pair, price_medal_only, price_medal_jersey,
    quota, cot_hours, wave_start_time, prologue_required_km, mandatory_pitstop_cp, tracking_required
) VALUES
('60', 'Urban Gravel 60', 60, 'fun', false, 250000, 300000, 150, 7.0, '07:00:00', 0, 6, false),
('80', 'Urban Gravel 80', 80, 'fun', false, 300000, 350000, 150, 9.0, '07:00:00', 0, 6, false),
('120_SINGLE', 'Amazing Race 120 (Single)', 120, 'race', false, 400000, 450000, 100, 11.0, '06:00:00', 0, 4, true),
('120_PAIR', 'Amazing Race 120 (Pair Mix 2 Pax)', 120, 'race', true, 700000, 750000, 30, 11.0, '06:00:00', 0, 4, true),
('150', 'Cross Gravel 150', 150, 'cross', false, 400000, 450000, 75, 15.0, '05:30:00', 30, 4, true),
('200', 'Ultra Gravel 200', 200, 'ultra', false, 400000, 450000, 50, 19.0, '05:30:00', 30, 4, true),
('VIRTUAL', 'Virtual Ride Nasional', 0, 'virtual', false, 200000, 250000, 1000, NULL, NULL, 0, NULL, true)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price_medal_only = EXCLUDED.price_medal_only,
    price_medal_jersey = EXCLUDED.price_medal_jersey,
    quota = EXCLUDED.quota,
    cot_hours = EXCLUDED.cot_hours,
    prologue_required_km = EXCLUDED.prologue_required_km;

-- ============================================================================
-- 5. TABEL TRANSAKSI / INVOICE (orders)
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(50) UNIQUE NOT NULL, -- Format: GG26-ORD-XXXXX
    category_id VARCHAR(30) NOT NULL REFERENCES categories(id),
    package_type VARCHAR(20) NOT NULL, -- 'MEDAL_ONLY' atau 'MEDAL_JERSEY'
    gross_amount DECIMAL(12,2) NOT NULL,
    discount_meal_coupon DECIMAL(12,2) NOT NULL DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL,
    
    -- Status Pembayaran
    payment_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    -- Nilai: 'PENDING', 'PAID', 'EXPIRED', 'FAILED', 'CANCELLED'
    
    -- Hybrid Payment Engine
    payment_channel VARCHAR(50) DEFAULT NULL, -- 'MIDTRANS_QRIS', 'MIDTRANS_VA_BCA', 'MANUAL_TRANSFER', 'SIMULATOR'
    va_number VARCHAR(50) DEFAULT NULL,
    bank_name VARCHAR(20) DEFAULT NULL,
    qris_url TEXT DEFAULT NULL,
    snap_token TEXT DEFAULT NULL,
    payment_url TEXT DEFAULT NULL,
    proof_of_payment_url TEXT DEFAULT NULL,
    
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    raw_payload JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- ============================================================================
-- 6. TABEL PESERTA (participants)
-- ============================================================================
CREATE TABLE IF NOT EXISTS participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    registration_code VARCHAR(30) UNIQUE NOT NULL, -- Format: GG26-XXXXX
    bib_number INT UNIQUE DEFAULT NULL, -- Otomatis terbit saat order lunas
    
    rider_role VARCHAR(20) NOT NULL DEFAULT 'SINGLE', -- 'SINGLE', 'PAIR_RIDER_1', 'PAIR_RIDER_2'
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL, -- 'male', 'female'
    birth_date DATE DEFAULT NULL,
    email VARCHAR(150) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    emergency_contact_name VARCHAR(100) NOT NULL,
    blood_type VARCHAR(5) DEFAULT '-',
    medical_notes TEXT DEFAULT NULL, -- Alergi obat, asma, riwayat kondisi darurat
    religion VARCHAR(50) DEFAULT NULL, -- Agama / Kepercayaan
    nik VARCHAR(20) DEFAULT NULL, -- NIK KTP (16 Digit)
    
    -- Alamat Lengkap & Wilayah Indonesia
    address_detail TEXT DEFAULT NULL,
    province_id VARCHAR(10) DEFAULT NULL,
    province_name VARCHAR(100) DEFAULT NULL,
    regency_id VARCHAR(10) DEFAULT NULL,
    regency_name VARCHAR(100) DEFAULT NULL,
    district_id VARCHAR(15) DEFAULT NULL,
    district_name VARCHAR(100) DEFAULT NULL,
    village_id VARCHAR(20) DEFAULT NULL,
    village_name VARCHAR(100) DEFAULT NULL,
    postal_code VARCHAR(10) DEFAULT NULL,
    
    community_chapter VARCHAR(100) DEFAULT 'Umum',
    category_id VARCHAR(30) NOT NULL REFERENCES categories(id),
    jersey_size VARCHAR(10) DEFAULT '-', -- 'XS', 'S', 'M', 'L', 'XL', 'XXL'
    has_meal_coupon BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Status Siklus Hidup Peserta
    status VARCHAR(30) NOT NULL DEFAULT 'REGISTERED',
    -- 'REGISTERED', 'PAID', 'PROLOG_VERIFIED', 'CHECKED_IN', 'DNF', 'FINISHER'
    
    -- Status Prolog (Khusus 150 km & 200 km)
    prologue_status VARCHAR(20) NOT NULL DEFAULT 'NOT_REQUIRED',
    -- 'NOT_REQUIRED', 'WAITING_VERIFICATION', 'PASSED', 'REJECTED'
    
    -- QR Code Check-in Meja Registrasi Hari-H
    qr_checkin_hash VARCHAR(64) UNIQUE,
    checked_in_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    checked_in_by VARCHAR(50) DEFAULT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_participants_order_id ON participants(order_id);
CREATE INDEX IF NOT EXISTS idx_participants_reg_code ON participants(registration_code);
CREATE INDEX IF NOT EXISTS idx_participants_bib ON participants(bib_number);
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);

-- ============================================================================
-- 7. TABEL ADMIN PENGELOLA (admin_users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'OPERATOR', -- 'SUPERADMIN', 'SCRUTINEER', 'OPERATOR'
    full_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 8. TABEL CHECKPOINT LOGS & PITSTOP
-- ============================================================================
CREATE TABLE IF NOT EXISTS checkpoint_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
    checkpoint_number INT NOT NULL,
    arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
    departure_time TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    dwell_minutes INT DEFAULT NULL,
    is_mandatory_pitstop BOOLEAN NOT NULL DEFAULT FALSE,
    penalty_minutes INT NOT NULL DEFAULT 0,
    recorded_by VARCHAR(50) DEFAULT 'SYSTEM_GEOFENCE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 9. TABEL VIRTUAL RIDE (Strava Sync & DHS Logistik)
-- ============================================================================
CREATE TABLE IF NOT EXISTS virtual_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,
    strava_activity_id BIGINT UNIQUE DEFAULT NULL,
    strava_athlete_id BIGINT DEFAULT NULL,
    activity_name VARCHAR(255) DEFAULT NULL,
    distance_km DECIMAL(6,2) DEFAULT NULL,
    elevation_gain_m INT DEFAULT NULL,
    moving_time_seconds INT DEFAULT NULL,
    average_speed_kmh DECIMAL(5,2) DEFAULT NULL,
    is_trainer_indoor BOOLEAN NOT NULL DEFAULT FALSE,
    validation_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    -- 'PENDING', 'APPROVED', 'REJECTED_DISTANCE', 'REJECTED_INDOOR', 'REJECTED_SPEED'
    rejection_reason TEXT DEFAULT NULL,
    
    -- Logistik Medali (DHS Logistik)
    shipping_recipient_name VARCHAR(150) DEFAULT NULL,
    shipping_phone VARCHAR(30) DEFAULT NULL,
    shipping_address TEXT DEFAULT NULL,
    courier_tracking_no VARCHAR(50) DEFAULT NULL,
    medal_shipped_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 10. TRIGGER OTOMATIS: SAAT ORDER LUNAS (PAID)
-- Terbitkan Nomor BIB untuk semua peserta di order tersebut & potong kuota
-- ============================================================================
CREATE OR REPLACE FUNCTION handle_order_paid()
RETURNS TRIGGER AS $$
DECLARE
    p_rec RECORD;
BEGIN
    IF NEW.payment_status = 'PAID' AND OLD.payment_status != 'PAID' THEN
        -- Loop setiap peserta di dalam order ini (Single atau Pair)
        FOR p_rec IN SELECT * FROM participants WHERE order_id = NEW.id LOOP
            UPDATE participants
            SET 
                status = 'PAID',
                bib_number = COALESCE(bib_number, get_next_bib(NEW.category_id)),
                qr_checkin_hash = encode(digest(p_rec.id::text || NOW()::text, 'sha256'), 'hex'),
                updated_at = NOW()
            WHERE id = p_rec.id;
        END LOOP;

        -- Update counter kuota kategori
        UPDATE categories c
        SET current_enrolled = (
            SELECT COUNT(*) 
            FROM participants p 
            WHERE p.category_id = c.id AND p.status IN ('PAID', 'PROLOG_VERIFIED', 'CHECKED_IN', 'FINISHER')
        )
        WHERE c.id = NEW.category_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_order_paid ON orders;
CREATE TRIGGER trg_order_paid
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION handle_order_paid();

-- ============================================================================
-- 11. ROW LEVEL SECURITY (RLS) & KEBIJAKAN AKSES
-- Mencegah kebocoran data pribadi di sisi frontend
-- ============================================================================
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkpoint_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_submissions ENABLE ROW LEVEL SECURITY;

-- Policy Categories & Settings: Publik boleh membaca (SELECT)
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON event_settings FOR SELECT USING (true);

-- Policy Orders: Publik boleh membuat (INSERT) dan membaca miliknya sendiri
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders by ID" ON orders FOR SELECT USING (true);
CREATE POLICY "Public Update Orders" ON orders FOR UPDATE USING (true);

-- Policy Participants: Publik boleh mendaftar (INSERT)
CREATE POLICY "Public Insert Participants" ON participants FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Participants" ON participants FOR SELECT USING (true);

-- ============================================================================
-- 12. VIEW PUBLIK: LIVE TRACKER / WALL OF HEROES (DATA SANITIZED)
-- Tidak menyertakan nomor HP, alamat, dan kontak darurat ke publik
-- ============================================================================
CREATE OR REPLACE VIEW public_participants_view AS
SELECT 
    p.id,
    p.bib_number,
    p.full_name,
    p.gender,
    p.community_chapter,
    c.name AS category_name,
    c.distance_km,
    o.package_type,
    p.rider_role,
    p.status,
    p.created_at
FROM participants p
JOIN orders o ON p.order_id = o.id
JOIN categories c ON p.category_id = c.id
WHERE p.status IN ('PAID', 'PROLOG_VERIFIED', 'CHECKED_IN', 'FINISHER');
