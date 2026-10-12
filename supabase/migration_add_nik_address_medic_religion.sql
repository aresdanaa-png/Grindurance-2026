-- ============================================================================
-- MIGRATION: ADD IDENTITY, FULL ADDRESS (WILAYAH INDONESIA), MEDIC ALERT & RELIGION
-- Gravel Grindurance 2026 Anniversary Edition
-- ============================================================================

ALTER TABLE participants 
    ADD COLUMN IF NOT EXISTS nik VARCHAR(20) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS address_detail TEXT DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS province_id VARCHAR(10) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS province_name VARCHAR(100) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS regency_id VARCHAR(10) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS regency_name VARCHAR(100) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS district_id VARCHAR(15) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS district_name VARCHAR(100) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS village_id VARCHAR(20) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS village_name VARCHAR(100) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10) DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS medical_notes TEXT DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS religion VARCHAR(50) DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_participants_nik ON participants(nik);
