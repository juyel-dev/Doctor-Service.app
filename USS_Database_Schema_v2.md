# Uttarbanga Swasthya Setu — Supabase Database Schema Blueprint
**Version:** 2.0 | **Stack:** Next.js 15 + TypeScript + Supabase (PostgreSQL) + Vercel
**Upgraded from:** v1.0 (Bengali) → v2.0 (English, Production-Ready)

---

## TABLE OF CONTENTS

```
SECTION 1  — Extensions
SECTION 2  — Enum Types (11 types)
SECTION 3  — Shared Trigger Function (updated_at)
SECTION 4  — Core Tables
             T01. cities
             T02. categories
             T03. admin_users        ← Must exist before doctors (FK dependency)
             T04. doctors
             T05. chambers           ← One-to-Many with doctors
             T06. hospitals
             T07. hospital_images    ← One-to-Many with hospitals
             T08. doctor_hospital_links ← Junction Table
SECTION 5  — Content Tables
             T09. symptoms
             T10. symptom_specialty_mapping ← Junction Table
             T11. reviews
SECTION 6  — Ads & Monetization
             T12. ads
SECTION 7  — Admin & System Tables
             T13. emergency_contacts
             T14. notifications
             T15. seo_pages
             T16. app_settings       ← Single-row enforced
             T17. admin_activity_logs
             T18. user_submissions
             T19. analytics_events
SECTION 8  — Database Functions & Triggers
SECTION 9  — Row Level Security (RLS) Policies
SECTION 10 — Storage Buckets & Bucket Policies
SECTION 11 — Seed Data
SECTION 12 — Environment Variables Reference (.env.local)
SECTION 13 — Execution Order (run in this exact sequence)
SECTION 14 — Schema Summary
```

---

## SECTION 1 — EXTENSIONS

```sql
-- Run first. These must exist before any table or function is created.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- UUID generation fallback
CREATE EXTENSION IF NOT EXISTS "pg_trgm";     -- Fuzzy / trigram text search (Bengali names)
CREATE EXTENSION IF NOT EXISTS "unaccent";    -- Accent-insensitive search support
```

---

## SECTION 2 — ENUM TYPES

> **Rule:** All fixed-value columns MUST use an Enum type.
> Never use free-text for fields like specialty, city, or status.

```sql
-- 1. Doctor Specialty
CREATE TYPE specialty_type AS ENUM (
  'medicine',           -- General Medicine / Internal Medicine
  'cardiology',         -- Heart Specialist
  'gynecology',         -- Gynecologist / Obstetrics
  'pediatrics',         -- Child Specialist
  'orthopedics',        -- Bone & Joint Specialist
  'dermatology',        -- Skin Specialist
  'neurology',          -- Neuro Specialist
  'ophthalmology',      -- Eye Specialist
  'ent',                -- Ear Nose Throat Specialist
  'psychiatry',         -- Mental Health Specialist
  'urology',            -- Urologist
  'gastroenterology',   -- Stomach & Liver Specialist
  'oncology',           -- Cancer Specialist
  'nephrology',         -- Kidney Specialist
  'endocrinology',      -- Diabetes & Thyroid Specialist
  'dentistry',          -- Dental Surgeon
  'radiology',          -- Radiologist / Imaging
  'surgery',            -- General Surgeon
  'pulmonology',        -- Lung & Respiratory Specialist
  'rheumatology',       -- Arthritis & Joint Disease Specialist
  'physiotherapy',      -- Physiotherapist
  'nutrition',          -- Nutritionist / Dietitian
  'other'
);

-- 2. City Names — North Bengal (matches slug system)
CREATE TYPE city_name AS ENUM (
  'cooch_behar',
  'siliguri',
  'darjeeling',
  'tufanganj',
  'dinhata',
  'mekhliganj',
  'alipurduar',
  'jalpaiguri',
  'mathabhanga',
  'haldibari',
  'raiganj',
  'other'
);

-- 3. Doctor / Hospital Verification Status
CREATE TYPE verification_status AS ENUM (
  'pending',
  'verified',
  'rejected'
);

-- 4. Ad Priority Level
CREATE TYPE ad_priority AS ENUM (
  'low',
  'medium',
  'high',
  'premium'
);

-- 5. Ad Placement Position
CREATE TYPE ad_placement AS ENUM (
  'homepage_banner',    -- Hero slider on Home page
  'popup',              -- Session-triggered popup
  'sponsored_card',     -- Sponsored doctor card in list
  'native_feed',        -- Inline native ad in doctor list
  'symptom_banner'      -- Banner on Symptoms page
);

-- 6. Review Moderation Status
CREATE TYPE review_status AS ENUM (
  'pending',
  'approved',
  'rejected'
);

-- 7. User Submission Status
CREATE TYPE submission_status AS ENUM (
  'pending',
  'approved',
  'rejected'
);

-- 8. Admin User Role
CREATE TYPE admin_role AS ENUM (
  'superadmin',   -- Full access: all modules, delete, settings
  'editor',       -- Add / edit doctors, hospitals, content
  'moderator'     -- Reviews, submissions, notifications only
);

-- 9. Notification / Announcement Type
CREATE TYPE notice_type AS ENUM (
  'general',
  'emergency',
  'maintenance',
  'popup_announcement'
);

-- 10. Healthcare Facility Type
CREATE TYPE hospital_type AS ENUM (
  'hospital',
  'diagnostic_center',
  'clinic',
  'nursing_home',
  'blood_bank'
);

-- 11. Emergency Contact Category
CREATE TYPE emergency_category AS ENUM (
  'ambulance',
  'blood_bank',
  'police',
  'fire',
  'helpline',
  'hospital_emergency'
);
```

---

## SECTION 3 — SHARED TRIGGER FUNCTION

```sql
-- This single function is reused by all updated_at triggers.
-- Create it BEFORE any table that needs it.

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## SECTION 4 — CORE TABLES

---

### T01. `cities` — City Master Table

```sql
CREATE TABLE cities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name_en         TEXT NOT NULL,                    -- "Cooch Behar"
  name_bn         TEXT NOT NULL,                    -- "কোচবিহার"
  slug            TEXT UNIQUE NOT NULL,             -- "cooch-behar" (used in URLs)

  -- Links the slug-based system to the Enum system
  city_enum       city_name UNIQUE,                 -- 'cooch_behar'

  -- Alternate spellings and local names for search
  search_keywords TEXT[] DEFAULT '{}',
  -- Example: ['কোচবিহার', 'CB', 'Kochbihar', 'Koch Bihar']

  is_active       BOOLEAN DEFAULT TRUE,
  display_order   INT DEFAULT 0,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER cities_updated_at
  BEFORE UPDATE ON cities
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_cities_slug         ON cities(slug);
CREATE INDEX idx_cities_enum         ON cities(city_enum);
CREATE INDEX idx_cities_active       ON cities(is_active, display_order);
```

**Sample Data:**
```
name_en="Cooch Behar" | name_bn="কোচবিহার"  | slug="cooch-behar" | city_enum='cooch_behar'
name_en="Siliguri"    | name_bn="শিলিগুড়ি"  | slug="siliguri"    | city_enum='siliguri'
name_en="Tufanganj"   | name_bn="তুফানগঞ্জ"  | slug="tufanganj"   | city_enum='tufanganj'
```

---

### T02. `categories` — Specialty Category Master

```sql
CREATE TABLE categories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name_en         TEXT NOT NULL,                    -- "Cardiologist"
  name_bn         TEXT NOT NULL,                    -- "হৃদরোগ বিশেষজ্ঞ"
  slug            TEXT UNIQUE NOT NULL,             -- "cardiology"

  -- Links to the Enum type for database-level validation
  specialty       specialty_type NOT NULL,

  -- Icon image (Storage: category-icons bucket — SVG or WebP)
  icon_url        TEXT,

  -- Colloquial and regional keywords for bilingual search
  search_keywords TEXT[] DEFAULT '{}',
  -- Example (cardiology): ['হার্টের ডাক্তার', 'বুকের ব্যথা', 'heart doctor', 'chest pain']

  is_active       BOOLEAN DEFAULT TRUE,
  display_order   INT DEFAULT 0,                    -- Controls grid order on Home page

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_categories_slug     ON categories(slug);
CREATE INDEX idx_categories_specialty ON categories(specialty);
CREATE INDEX idx_categories_active   ON categories(is_active, display_order);
CREATE INDEX idx_categories_keywords ON categories USING GIN (search_keywords);
```

---

### T03. `admin_users` — Admin User Accounts

> **Important:** This table must be created BEFORE `doctors` and `reviews` because they
> reference `admin_users.id` in their `reviewed_by` foreign key column.

```sql
-- Linked to Supabase Auth. A user must exist in auth.users first.
CREATE TABLE admin_users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  email        TEXT UNIQUE NOT NULL,
  full_name    TEXT NOT NULL,
  avatar_url   TEXT,

  role         admin_role DEFAULT 'editor',
  is_active    BOOLEAN DEFAULT TRUE,

  last_login   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
  -- No updated_at needed — this table is rarely updated.
);

CREATE INDEX idx_admin_users_role    ON admin_users(role);
CREATE INDEX idx_admin_users_active  ON admin_users(is_active);
```

---

### T04. `doctors` — Doctor Master Table

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- Reminder: must exist for GIN trgm indexes

CREATE TABLE doctors (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name_en              TEXT NOT NULL,               -- "Dr. Priyanka Das" (as on degree)
  name_bn              TEXT,                        -- "ডা. প্রিয়ঙ্কা দাস"
  slug                 TEXT UNIQUE NOT NULL,        -- "dr-priyanka-das-coochbehar"

  -- Profile Photo (Storage: doctor-photos bucket — relative path only)
  -- Full URL = NEXT_PUBLIC_STORAGE_BASE_URL + '/doctor-photos/' + photo_url
  photo_url            TEXT,

  -- Specialty
  specialty            specialty_type NOT NULL,
  category_id          UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Qualifications
  degree               TEXT[] DEFAULT '{}',
  -- Example: ['MBBS', 'MD (Medicine)', 'MRCP (UK)']
  experience_years     INT DEFAULT 0,
  bmdc_reg_no          TEXT,                        -- BMDC / MCI Registration Number

  -- Languages the doctor can consult in
  languages            TEXT[] DEFAULT '{}',
  -- Example: ['Bengali', 'English', 'Hindi']

  -- Biography
  bio_en               TEXT,
  bio_bn               TEXT,

  -- Contact
  phone                TEXT,
  whatsapp             TEXT,

  -- Consultation Fee Range (INR)
  consultation_fee_min INT DEFAULT 0,
  consultation_fee_max INT DEFAULT 0,

  -- ──────────────────────────────────────────────
  -- SEARCH & DISCOVERY
  -- ──────────────────────────────────────────────

  -- Alternate name spellings, short forms, local pronunciations
  search_aliases       TEXT[] DEFAULT '{}',
  -- Example: ['P.K. Das', 'পি কে দাস', 'PKDas', 'Pikedas']

  -- Disease keywords, treatment tags
  search_keywords      TEXT[] DEFAULT '{}',
  -- Example: ['diabetes', 'thyroid', 'ডায়াবেটিস', 'থাইরয়েড']

  -- Admin UI display tags
  tags                 TEXT[] DEFAULT '{}',
  -- Example: ['featured', 'women-specialist', 'telemedicine', 'visiting']

  -- ──────────────────────────────────────────────
  -- STATUS & VISIBILITY CONTROL
  -- ──────────────────────────────────────────────

  verification_status  verification_status DEFAULT 'pending',
  is_featured          BOOLEAN DEFAULT FALSE,
  is_available         BOOLEAN DEFAULT TRUE,
  is_deleted           BOOLEAN DEFAULT FALSE,       -- Soft delete (data preserved)
  featured_priority    INT DEFAULT 0,               -- Higher = appears first

  -- ──────────────────────────────────────────────
  -- COMPUTED STATS (updated by triggers)
  -- ──────────────────────────────────────────────

  rating_avg           NUMERIC(3,2) DEFAULT 0,      -- Auto-recalculated on review approval
  rating_count         INT DEFAULT 0,               -- Auto-recalculated on review approval
  view_count           INT DEFAULT 0,               -- Incremented atomically via function

  -- ──────────────────────────────────────────────
  -- SEO
  -- ──────────────────────────────────────────────

  meta_title           TEXT,
  meta_description     TEXT,
  og_image_url         TEXT,
  schema_markup        JSONB,                       -- JSON-LD for Google rich results

  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ── Fuzzy Search Indexes (GIN + trigram for Bengali name matching) ──
CREATE INDEX idx_doctors_name_en_trgm    ON doctors USING GIN (name_en gin_trgm_ops);
CREATE INDEX idx_doctors_name_bn_trgm    ON doctors USING GIN (name_bn gin_trgm_ops);
CREATE INDEX idx_doctors_aliases_gin     ON doctors USING GIN (search_aliases gin_trgm_ops);
CREATE INDEX idx_doctors_keywords_gin    ON doctors USING GIN (search_keywords);
CREATE INDEX idx_doctors_tags_gin        ON doctors USING GIN (tags);

-- ── Filter & Routing Indexes ──
CREATE INDEX idx_doctors_specialty       ON doctors(specialty);
CREATE INDEX idx_doctors_featured        ON doctors(is_featured, featured_priority DESC)
                                          WHERE is_featured = TRUE;
CREATE INDEX idx_doctors_verification    ON doctors(verification_status);
CREATE INDEX idx_doctors_slug            ON doctors(slug);
CREATE INDEX idx_doctors_active          ON doctors(is_deleted, verification_status)
                                          WHERE is_deleted = FALSE;
```

---

### T05. `chambers` — Chamber / Clinic Details (One-to-Many with doctors)

> **Rule:** One doctor can have multiple chambers.
> **CASCADE:** Deleting a doctor automatically deletes ALL their chambers.

```sql
CREATE TABLE chambers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Key: Doctor → Chambers (One-to-Many)
  doctor_id       UUID NOT NULL
                  REFERENCES doctors(id)
                  ON DELETE CASCADE,                -- Chambers auto-deleted with doctor

  -- Chamber Identity
  chamber_name    TEXT NOT NULL,                    -- "City Clinic Chamber"
  address         TEXT NOT NULL,                    -- "Station Road, Cooch Behar"
  area            TEXT,                             -- Sub-locality (e.g., "Station Road")

  -- City (both Enum for DB integrity and FK for joins)
  city            city_name NOT NULL,
  city_id         UUID REFERENCES cities(id) ON DELETE SET NULL,

  -- Contact
  phone           TEXT,
  whatsapp        TEXT,

  -- Location
  map_link        TEXT,                             -- Google Maps share URL
  latitude        DECIMAL(10,8),                   -- For map embed in Next.js
  longitude       DECIMAL(11,8),                   -- For map embed in Next.js

  -- Weekly Schedule (JSONB — flexible for irregular schedules)
  schedule        JSONB DEFAULT '[]',
  /*
    Schedule Format:
    [
      { "day": "Saturday",  "day_bn": "শনিবার",  "open": "10:00", "close": "14:00", "closed": false },
      { "day": "Sunday",    "day_bn": "রবিবার",  "open": "10:00", "close": "14:00", "closed": false },
      { "day": "Friday",    "day_bn": "শুক্রবার", "open": null,    "close": null,    "closed": true  }
    ]
  */

  fees            INT DEFAULT 0,                    -- Consultation fee in INR

  is_primary      BOOLEAN DEFAULT FALSE,            -- Primary/main chamber flag
  display_order   INT DEFAULT 0,                    -- Order shown on doctor profile

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER chambers_updated_at
  BEFORE UPDATE ON chambers
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_chambers_doctor_id      ON chambers(doctor_id);
CREATE INDEX idx_chambers_city           ON chambers(city);
CREATE INDEX idx_chambers_primary        ON chambers(doctor_id, is_primary)
                                          WHERE is_primary = TRUE;
```

---

### T06. `hospitals` — Hospital & Diagnostic Center Master Table

```sql
CREATE TABLE hospitals (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name_en           TEXT NOT NULL,
  name_bn           TEXT,
  slug              TEXT UNIQUE NOT NULL,

  type              hospital_type DEFAULT 'hospital',

  -- Location
  address           TEXT,
  area              TEXT,
  city              city_name NOT NULL,
  city_id           UUID REFERENCES cities(id) ON DELETE SET NULL,

  -- Cover image (Storage: hospital-images bucket — relative path)
  cover_image_url   TEXT,

  -- Contact
  phone_primary     TEXT,
  phone_secondary   TEXT,
  hotline           TEXT,
  whatsapp          TEXT,
  email             TEXT,
  website           TEXT,

  -- Map
  map_link          TEXT,
  latitude          DECIMAL(10,8),                 -- For map embed in Next.js
  longitude         DECIMAL(11,8),                 -- For map embed in Next.js

  -- Weekly Operating Hours (JSONB)
  open_hours        JSONB DEFAULT '[]',
  /*
    Open Hours Format:
    [
      { "day": "Monday", "day_bn": "সোমবার", "open": "08:00", "close": "22:00", "closed": false },
      { "day": "Friday", "day_bn": "শুক্রবার","open": "08:00", "close": "14:00", "closed": false },
      { "day": "Sunday", "day_bn": "রবিবার", "open": null,    "close": null,    "closed": true  }
    ]
  */

  -- Services offered (searchable array)
  services          TEXT[] DEFAULT '{}',
  -- Example: ['X-Ray', 'ECG', 'USG', 'CT Scan', 'Pathology', 'ICU', 'Blood Bank']

  -- Facility flags (for quick filtering)
  bed_count         INT,                            -- Total bed count
  has_emergency     BOOLEAN DEFAULT FALSE,
  has_icu           BOOLEAN DEFAULT FALSE,
  has_ambulance     BOOLEAN DEFAULT FALSE,
  has_blood_bank    BOOLEAN DEFAULT FALSE,

  -- Visibility Control
  is_featured       BOOLEAN DEFAULT FALSE,
  is_trending       BOOLEAN DEFAULT FALSE,
  is_deleted        BOOLEAN DEFAULT FALSE,          -- Soft delete
  featured_priority INT DEFAULT 0,

  -- Stats
  rating_avg        NUMERIC(3,2) DEFAULT 0,
  rating_count      INT DEFAULT 0,
  view_count        INT DEFAULT 0,                  -- Incremented atomically via function

  -- Search
  search_keywords   TEXT[] DEFAULT '{}',

  -- SEO
  meta_title        TEXT,
  meta_description  TEXT,
  og_image_url      TEXT,

  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER hospitals_updated_at
  BEFORE UPDATE ON hospitals
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_hospitals_slug          ON hospitals(slug);
CREATE INDEX idx_hospitals_city          ON hospitals(city);
CREATE INDEX idx_hospitals_type          ON hospitals(type);
CREATE INDEX idx_hospitals_featured      ON hospitals(is_featured, featured_priority DESC)
                                          WHERE is_featured = TRUE;
CREATE INDEX idx_hospitals_emergency     ON hospitals(has_emergency)
                                          WHERE has_emergency = TRUE;
CREATE INDEX idx_hospitals_active        ON hospitals(is_deleted)
                                          WHERE is_deleted = FALSE;
CREATE INDEX idx_hospitals_keywords_gin  ON hospitals USING GIN (search_keywords);
CREATE INDEX idx_hospitals_services_gin  ON hospitals USING GIN (services);
```

---

### T07. `hospital_images` — Multiple Images per Hospital

> **CASCADE:** Deleting a hospital automatically deletes ALL its image records.

```sql
CREATE TABLE hospital_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  hospital_id   UUID NOT NULL
                REFERENCES hospitals(id)
                ON DELETE CASCADE,

  -- Relative path in Storage (hospital-images bucket)
  -- Full URL = NEXT_PUBLIC_STORAGE_BASE_URL + '/hospital-images/' + image_url
  image_url     TEXT NOT NULL,

  alt_text      TEXT,
  is_cover      BOOLEAN DEFAULT FALSE,              -- If TRUE, used as the main display image
  display_order INT DEFAULT 0,

  created_at    TIMESTAMPTZ DEFAULT NOW()
  -- No updated_at — images are replaced, not edited.
);

CREATE INDEX idx_hospital_images_hospital ON hospital_images(hospital_id);
CREATE INDEX idx_hospital_images_cover    ON hospital_images(hospital_id, is_cover)
                                           WHERE is_cover = TRUE;
CREATE INDEX idx_hospital_images_order    ON hospital_images(hospital_id, display_order);
```

---

### T08. `doctor_hospital_links` — Doctor ↔ Hospital Junction Table

```sql
CREATE TABLE doctor_hospital_links (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  doctor_id    UUID NOT NULL
               REFERENCES doctors(id)
               ON DELETE CASCADE,

  hospital_id  UUID NOT NULL
               REFERENCES hospitals(id)
               ON DELETE CASCADE,

  -- Doctor's role at this hospital
  role         TEXT,
  -- Example: 'Visiting Consultant', 'Resident Surgeon', 'Honorrary Consultant'

  UNIQUE(doctor_id, hospital_id),               -- Prevent duplicate links

  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dhl_doctor_id    ON doctor_hospital_links(doctor_id);
CREATE INDEX idx_dhl_hospital_id  ON doctor_hospital_links(hospital_id);
```

---

## SECTION 5 — CONTENT TABLES

---

### T09. `symptoms` — Symptom Management

```sql
CREATE TABLE symptoms (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Bilingual titles
  title_en        TEXT NOT NULL,                    -- "Chest Pain"
  title_bn        TEXT NOT NULL,                    -- "বুকে ব্যথা"
  slug            TEXT UNIQUE NOT NULL,             -- "chest-pain"

  -- Grid card image (Storage: symptom-images bucket)
  image_url       TEXT,

  -- Detailed description
  description_en  TEXT,
  description_bn  TEXT,

  -- If TRUE: shows a red emergency badge on the card
  is_emergency    BOOLEAN DEFAULT FALSE,

  -- Local/colloquial keywords (Bengali dialect + English)
  search_keywords TEXT[] DEFAULT '{}',
  -- Example (chest pain): ['বুক ধড়ফড়', 'chest tightness', 'হার্টের সমস্যা', 'বুক জ্বলা']

  is_active       BOOLEAN DEFAULT TRUE,
  display_order   INT DEFAULT 0,                    -- Controls grid position

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER symptoms_updated_at
  BEFORE UPDATE ON symptoms
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_symptoms_slug         ON symptoms(slug);
CREATE INDEX idx_symptoms_active       ON symptoms(is_active, display_order);
CREATE INDEX idx_symptoms_keywords_gin ON symptoms USING GIN (search_keywords);
CREATE INDEX idx_symptoms_emergency    ON symptoms(is_emergency)
                                        WHERE is_emergency = TRUE;
```

---

### T10. `symptom_specialty_mapping` — Symptom ↔ Specialty Junction

> **How it works:**
> User searches "বুক ধড়ফড়" →
> `symptoms.search_keywords` match → symptom: "Chest Pain" (id: xyz) →
> `symptom_specialty_mapping` → specialty: 'cardiology' (priority: 10) →
> `doctors WHERE specialty = 'cardiology'` → Recommended doctors displayed.

```sql
CREATE TABLE symptom_specialty_mapping (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  symptom_id   UUID NOT NULL
               REFERENCES symptoms(id)
               ON DELETE CASCADE,

  -- Direct Enum for fast querying (no join needed)
  specialty    specialty_type NOT NULL,

  -- FK to categories for frontend navigation
  category_id  UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Higher priority = more relevant to this symptom
  priority     INT DEFAULT 0,

  UNIQUE(symptom_id, specialty),

  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ssm_symptom_id   ON symptom_specialty_mapping(symptom_id);
CREATE INDEX idx_ssm_specialty    ON symptom_specialty_mapping(specialty);
CREATE INDEX idx_ssm_priority     ON symptom_specialty_mapping(symptom_id, priority DESC);
```

---

### T11. `reviews` — Doctor Reviews & Ratings

```sql
CREATE TABLE reviews (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  doctor_id       UUID NOT NULL
                  REFERENCES doctors(id)
                  ON DELETE CASCADE,

  -- Reviewer info (anonymous — no user account required)
  reviewer_name   TEXT NOT NULL,
  rating          INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text     TEXT CHECK (char_length(review_text) >= 10),

  -- Moderation
  status          review_status DEFAULT 'pending',
  is_spam         BOOLEAN DEFAULT FALSE,

  -- Spam protection
  submitter_ip    TEXT,
  honeypot_field  TEXT,                             -- Must ALWAYS be empty (bot trap)

  -- Admin moderation
  admin_note      TEXT,
  reviewed_by     UUID REFERENCES admin_users(id) ON DELETE SET NULL,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_reviews_doctor_status ON reviews(doctor_id, status);
CREATE INDEX idx_reviews_pending       ON reviews(status) WHERE status = 'pending';
CREATE INDEX idx_reviews_spam          ON reviews(is_spam) WHERE is_spam = TRUE;
```

---

## SECTION 6 — ADS & MONETIZATION

---

### T12. `ads` — Banner & Advertisement Management

```sql
CREATE TABLE ads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title            TEXT NOT NULL,
  -- Relative path in Storage (banner-ads bucket)
  image_url        TEXT NOT NULL,
  target_url       TEXT,                            -- URL opened on click

  placement        ad_placement NOT NULL,
  priority         ad_priority DEFAULT 'medium',
  display_order    INT DEFAULT 0,

  is_active        BOOLEAN DEFAULT TRUE,
  start_date       DATE,
  end_date         DATE,
  CONSTRAINT valid_ad_date_range
    CHECK (end_date IS NULL OR end_date >= start_date),

  -- Analytics
  click_count      INT DEFAULT 0,
  impression_count INT DEFAULT 0,

  -- Advertiser reference (internal — not shown publicly)
  advertiser_name  TEXT,
  advertiser_phone TEXT,
  monthly_rate     INT,                             -- Monthly charge in INR

  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER ads_updated_at
  BEFORE UPDATE ON ads
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_ads_placement_active ON ads(placement, is_active);
CREATE INDEX idx_ads_dates            ON ads(start_date, end_date);
CREATE INDEX idx_ads_active           ON ads(is_active)
                                       WHERE is_active = TRUE;
```

---

## SECTION 7 — ADMIN & SYSTEM TABLES

---

### T13. `emergency_contacts` — Emergency Phone Numbers

```sql
CREATE TABLE emergency_contacts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title         TEXT NOT NULL,                      -- "Cooch Behar District Ambulance"
  title_bn      TEXT,                               -- "কোচবিহার জেলা অ্যাম্বুলেন্স"
  category      emergency_category NOT NULL,
  phone         TEXT NOT NULL,
  whatsapp      TEXT,
  city          city_name,                          -- NULL = national / state-level
  city_id       UUID REFERENCES cities(id) ON DELETE SET NULL,
  address       TEXT,

  is_active     BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,

  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER emergency_contacts_updated_at
  BEFORE UPDATE ON emergency_contacts
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_emergency_city      ON emergency_contacts(city, is_active);
CREATE INDEX idx_emergency_category  ON emergency_contacts(category, is_active);
```

---

### T14. `notifications` — App Announcements & Notices

```sql
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  title       TEXT NOT NULL,
  title_bn    TEXT,
  message     TEXT,
  message_bn  TEXT,

  type        notice_type DEFAULT 'general',
  is_active   BOOLEAN DEFAULT TRUE,

  -- Auto-expire: if set, the notice hides after this timestamp
  expires_at  TIMESTAMPTZ,

  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER notifications_updated_at
  BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_notifications_active ON notifications(is_active, expires_at);
CREATE INDEX idx_notifications_type   ON notifications(type, is_active);
```

---

### T15. `seo_pages` — SEO Control Panel for City/Specialty Landing Pages

```sql
CREATE TABLE seo_pages (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Unique page identifier for lookup
  page_identifier   TEXT UNIQUE NOT NULL,
  -- Examples: 'home', 'cooch-behar', 'cooch-behar/medicine', 'doctor/dr-abc'

  -- Core SEO fields
  page_title        TEXT,
  meta_description  TEXT,
  slug              TEXT,
  canonical_url     TEXT,

  -- Open Graph (social sharing)
  og_title          TEXT,
  og_description    TEXT,
  og_image_url      TEXT,                           -- app-assets bucket URL

  -- JSON-LD Schema Markup (Physician / LocalBusiness / FAQPage)
  schema_markup     JSONB,

  -- Sitemap settings
  is_in_sitemap     BOOLEAN DEFAULT TRUE,
  sitemap_priority  NUMERIC(2,1) DEFAULT 0.8
                    CHECK (sitemap_priority BETWEEN 0.1 AND 1.0),

  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER seo_pages_updated_at
  BEFORE UPDATE ON seo_pages
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE INDEX idx_seo_pages_identifier ON seo_pages(page_identifier);
CREATE INDEX idx_seo_pages_sitemap    ON seo_pages(is_in_sitemap)
                                       WHERE is_in_sitemap = TRUE;
```

---

### T16. `app_settings` — Global App Configuration

> **Important:** This table ALWAYS contains exactly ONE row.
> Enforced by a `UNIQUE` constraint on `singleton_guard`.

```sql
CREATE TABLE app_settings (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Singleton enforcement: only one row allowed
  singleton_guard   BOOLEAN UNIQUE DEFAULT TRUE,
  CONSTRAINT only_one_settings_row CHECK (singleton_guard = TRUE),

  -- Brand
  app_name          TEXT DEFAULT 'Uttarbanga Swasthya Setu',
  app_name_bn       TEXT DEFAULT 'উত্তরবঙ্গ স্বাস্থ্য সেতু',
  logo_url          TEXT,                           -- app-assets bucket
  favicon_url       TEXT,

  -- Contact
  contact_phone     TEXT,
  contact_email     TEXT,
  whatsapp_number   TEXT,

  -- Social Media Links
  social_links      JSONB DEFAULT '{}',
  -- Format: { "facebook": "url", "instagram": "url", "youtube": "url" }

  -- Homepage Display Config
  homepage_settings JSONB DEFAULT '{}',
  -- Format: { "show_featured_doctors": true, "show_trending_hospitals": true }

  -- Theme Color Overrides (for dynamic theming)
  theme_colors      JSONB DEFAULT '{}',
  -- Format: { "primary": "#1A6FBA", "secondary": "#0D9E6A", "accent": "#F5A623" }

  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER app_settings_updated_at
  BEFORE UPDATE ON app_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
```

---

### T17. `admin_activity_logs` — Complete Audit Trail

```sql
CREATE TABLE admin_activity_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  admin_id     UUID REFERENCES admin_users(id) ON DELETE SET NULL,

  -- What happened
  action       TEXT NOT NULL,
  -- Values: 'created', 'updated', 'deleted', 'approved', 'rejected', 'featured', 'restored'

  -- Where it happened
  table_name   TEXT NOT NULL,
  -- Values: 'doctors', 'hospitals', 'reviews', 'ads', etc.

  record_id    UUID,                               -- The affected record's ID

  -- Change details for audit
  old_values   JSONB,                              -- State before change
  new_values   JSONB,                              -- State after change

  -- Request metadata
  ip_address   TEXT,
  user_agent   TEXT,                               -- Browser / device info

  created_at   TIMESTAMPTZ DEFAULT NOW()
  -- No updated_at — logs are immutable.
);

CREATE INDEX idx_logs_admin_id         ON admin_activity_logs(admin_id);
CREATE INDEX idx_logs_table_record     ON admin_activity_logs(table_name, record_id);
CREATE INDEX idx_logs_created_at       ON admin_activity_logs(created_at DESC);
```

---

### T18. `user_submissions` — Community Contributions

```sql
CREATE TABLE user_submissions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Type of submission
  submission_type  TEXT NOT NULL,
  -- Values: 'new_doctor', 'new_hospital', 'correction', 'review_report'

  -- All submitted data in JSONB (flexible — each type has different fields)
  data             JSONB NOT NULL,

  status           submission_status DEFAULT 'pending',

  -- Spam protection
  submitter_ip     TEXT,
  honeypot_field   TEXT,                           -- Must ALWAYS be empty

  -- Admin review
  admin_note       TEXT,
  reviewed_by      UUID REFERENCES admin_users(id) ON DELETE SET NULL,

  created_at       TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at      TIMESTAMPTZ                     -- Set when admin approves/rejects
);

CREATE INDEX idx_submissions_status ON user_submissions(status);
CREATE INDEX idx_submissions_type   ON user_submissions(submission_type, status);
CREATE INDEX idx_submissions_date   ON user_submissions(created_at DESC);
```

---

### T19. `analytics_events` — App Usage Analytics

```sql
CREATE TABLE analytics_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Event classification
  event_type   TEXT NOT NULL,
  /*
    Values:
    'page_view'       — Any page visited
    'doctor_view'     — Doctor profile opened
    'hospital_view'   — Hospital detail opened
    'symptom_view'    — Symptom card tapped
    'search'          — Search query submitted
    'banner_click'    — Hero banner ad clicked
    'ad_impression'   — Any ad shown on screen
    'ad_click'        — Any ad clicked
    'whatsapp_click'  — WhatsApp button tapped
    'call_click'      — Phone call button tapped
    'pwa_install'     — User installed the PWA
  */

  -- What was interacted with
  entity_type  TEXT,               -- 'doctor', 'hospital', 'ad', 'symptom', 'category'
  entity_id    UUID,               -- The related record's ID

  -- Context
  city         city_name,          -- Detected or selected city
  search_query TEXT,               -- Search term (for 'search' events only)
  device_type  TEXT,               -- 'mobile', 'tablet', 'desktop'
  referrer     TEXT,               -- Referring URL
  session_id   TEXT,               -- Anonymous session ID (no PII)

  created_at   TIMESTAMPTZ DEFAULT NOW()
  -- High-volume table: no updated_at, no foreign keys (performance-first)
);

-- Partial indexes for common dashboard queries
CREATE INDEX idx_analytics_event_date  ON analytics_events(event_type, created_at DESC);
CREATE INDEX idx_analytics_entity      ON analytics_events(entity_type, entity_id);
CREATE INDEX idx_analytics_city        ON analytics_events(city, created_at DESC);
CREATE INDEX idx_analytics_search      ON analytics_events(search_query)
                                        WHERE search_query IS NOT NULL;
CREATE INDEX idx_analytics_date        ON analytics_events(created_at DESC);
```

---

## SECTION 8 — DATABASE FUNCTIONS & TRIGGERS

```sql
-- ─────────────────────────────────────────────────────────────────────
-- FUNCTION 1: Auto-recalculate doctor rating when a review is approved
-- Fires on: INSERT or UPDATE of reviews.status
-- ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION recalculate_doctor_rating()
RETURNS TRIGGER AS $$
DECLARE
  v_doctor_id UUID;
BEGIN
  -- Works for both INSERT (new approved review) and UPDATE (status change)
  v_doctor_id := COALESCE(NEW.doctor_id, OLD.doctor_id);

  -- Only recalculate if status changed or new review inserted
  IF (TG_OP = 'INSERT') OR
     (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN

    UPDATE doctors
    SET
      rating_avg = (
        SELECT COALESCE(ROUND(AVG(rating)::NUMERIC, 2), 0)
        FROM reviews
        WHERE doctor_id = v_doctor_id
          AND status = 'approved'
          AND is_spam = FALSE
      ),
      rating_count = (
        SELECT COUNT(*)
        FROM reviews
        WHERE doctor_id = v_doctor_id
          AND status = 'approved'
          AND is_spam = FALSE
      )
    WHERE id = v_doctor_id;

  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_recalculate_doctor_rating
  AFTER INSERT OR UPDATE OF status, is_spam ON reviews
  FOR EACH ROW EXECUTE FUNCTION recalculate_doctor_rating();


-- ─────────────────────────────────────────────────────────────────────
-- FUNCTION 2: Atomic view count increment (race-condition safe)
-- Usage in Next.js Server Action:
--   await supabase.rpc('increment_view_count', { p_table: 'doctors', p_id: doctorId })
-- ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION increment_view_count(
  p_table TEXT,   -- 'doctors' or 'hospitals'
  p_id    UUID
)
RETURNS VOID AS $$
BEGIN
  IF p_table = 'doctors' THEN
    UPDATE doctors
    SET view_count = view_count + 1
    WHERE id = p_id AND is_deleted = FALSE;

  ELSIF p_table = 'hospitals' THEN
    UPDATE hospitals
    SET view_count = view_count + 1
    WHERE id = p_id AND is_deleted = FALSE;

  ELSE
    RAISE EXCEPTION 'Invalid table: %. Must be doctors or hospitals.', p_table;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─────────────────────────────────────────────────────────────────────
-- FUNCTION 3: Atomic ad stat counter (race-condition safe)
-- Usage in Next.js Server Action:
--   await supabase.rpc('increment_ad_stat', { p_ad_id: adId, p_stat: 'click' })
-- ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION increment_ad_stat(
  p_ad_id UUID,
  p_stat  TEXT    -- 'click' or 'impression'
)
RETURNS VOID AS $$
BEGIN
  IF p_stat = 'click' THEN
    UPDATE ads SET click_count = click_count + 1
    WHERE id = p_ad_id AND is_active = TRUE;

  ELSIF p_stat = 'impression' THEN
    UPDATE ads SET impression_count = impression_count + 1
    WHERE id = p_ad_id AND is_active = TRUE;

  ELSE
    RAISE EXCEPTION 'Invalid stat: %. Must be click or impression.', p_stat;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─────────────────────────────────────────────────────────────────────
-- FUNCTION 4: Honeypot field validation (spam protection helper)
-- Used in RLS policies for reviews and user_submissions
-- ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION is_honeypot_valid(honeypot TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Field must be NULL or empty string — bots fill it in automatically
  RETURN (honeypot IS NULL OR honeypot = '');
END;
$$ LANGUAGE plpgsql IMMUTABLE;


-- ─────────────────────────────────────────────────────────────────────
-- FUNCTION 5: Check if current authenticated user is an admin
-- Used in RLS policies for admin-only access
-- ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
      AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ─────────────────────────────────────────────────────────────────────
-- FUNCTION 6: Check if current admin has a specific role
-- Usage: is_admin_role('superadmin') or is_admin_role('editor')
-- ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION is_admin_role(required_role admin_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
      AND is_active = TRUE
      AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## SECTION 9 — ROW LEVEL SECURITY (RLS) POLICIES

```sql
-- ─────────────────────────────────────────────────────────────────────
-- STEP 1: Enable RLS on ALL tables
-- ─────────────────────────────────────────────────────────────────────

ALTER TABLE cities                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories                ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE chambers                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_images           ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_hospital_links     ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_specialty_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads                       ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications             ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings              ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_submissions          ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events          ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────────────
-- STEP 2: PUBLIC READ POLICIES
-- Used by Next.js App (anon key) — read-only access to public content
-- ─────────────────────────────────────────────────────────────────────

CREATE POLICY "public_read_cities"
  ON cities FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "public_read_categories"
  ON categories FOR SELECT
  USING (is_active = TRUE);

-- Public app only sees VERIFIED, non-deleted doctors
CREATE POLICY "public_read_verified_doctors"
  ON doctors FOR SELECT
  USING (
    verification_status = 'verified'
    AND is_deleted = FALSE
  );

-- Public app only sees chambers of verified doctors
CREATE POLICY "public_read_chambers"
  ON chambers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM doctors d
      WHERE d.id = chambers.doctor_id
        AND d.verification_status = 'verified'
        AND d.is_deleted = FALSE
    )
  );

-- Public app sees all non-deleted hospitals
CREATE POLICY "public_read_hospitals"
  ON hospitals FOR SELECT
  USING (is_deleted = FALSE);

CREATE POLICY "public_read_hospital_images"
  ON hospital_images FOR SELECT
  USING (TRUE);

CREATE POLICY "public_read_doctor_hospital_links"
  ON doctor_hospital_links FOR SELECT
  USING (TRUE);

CREATE POLICY "public_read_symptoms"
  ON symptoms FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "public_read_symptom_mapping"
  ON symptom_specialty_mapping FOR SELECT
  USING (TRUE);

-- Public app only sees APPROVED, non-spam reviews
CREATE POLICY "public_read_approved_reviews"
  ON reviews FOR SELECT
  USING (
    status = 'approved'
    AND is_spam = FALSE
  );

-- Public app only sees active, date-valid ads
CREATE POLICY "public_read_active_ads"
  ON ads FOR SELECT
  USING (
    is_active = TRUE
    AND (start_date IS NULL OR start_date <= CURRENT_DATE)
    AND (end_date IS NULL OR end_date >= CURRENT_DATE)
  );

CREATE POLICY "public_read_emergency_contacts"
  ON emergency_contacts FOR SELECT
  USING (is_active = TRUE);

-- Public app only sees active, non-expired notifications
CREATE POLICY "public_read_notifications"
  ON notifications FOR SELECT
  USING (
    is_active = TRUE
    AND (expires_at IS NULL OR expires_at > NOW())
  );

CREATE POLICY "public_read_app_settings"
  ON app_settings FOR SELECT
  USING (TRUE);


-- ─────────────────────────────────────────────────────────────────────
-- STEP 3: PUBLIC INSERT POLICIES
-- Allow anonymous users to submit reviews and suggestions
-- ─────────────────────────────────────────────────────────────────────

-- New reviews always start as 'pending' + honeypot must be empty
CREATE POLICY "public_insert_reviews"
  ON reviews FOR INSERT
  WITH CHECK (
    status = 'pending'
    AND is_honeypot_valid(honeypot_field)
  );

-- New submissions always start as 'pending' + honeypot must be empty
CREATE POLICY "public_insert_submissions"
  ON user_submissions FOR INSERT
  WITH CHECK (
    status = 'pending'
    AND is_honeypot_valid(honeypot_field)
  );

-- Analytics events can be inserted anonymously (no auth required)
CREATE POLICY "public_insert_analytics"
  ON analytics_events FOR INSERT
  WITH CHECK (TRUE);


-- ─────────────────────────────────────────────────────────────────────
-- STEP 4: ADMIN POLICIES
-- Admin Panel uses authenticated Supabase session (email + password).
-- All write operations go through Next.js Server Actions using
-- the service_role key. Admin reads use is_admin() check.
-- ─────────────────────────────────────────────────────────────────────

-- Admin can see ALL doctors (including pending, deleted)
CREATE POLICY "admin_read_all_doctors"
  ON doctors FOR SELECT
  USING (is_admin());

CREATE POLICY "admin_write_doctors"
  ON doctors FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_chambers"
  ON chambers FOR ALL
  USING (is_admin());

CREATE POLICY "admin_read_all_hospitals"
  ON hospitals FOR SELECT
  USING (is_admin());

CREATE POLICY "admin_write_hospitals"
  ON hospitals FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_hospital_images"
  ON hospital_images FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_doctor_hospital_links"
  ON doctor_hospital_links FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_categories"
  ON categories FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_cities"
  ON cities FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_symptoms"
  ON symptoms FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_symptom_mapping"
  ON symptom_specialty_mapping FOR ALL
  USING (is_admin());

-- Admin can see ALL reviews (including pending, rejected)
CREATE POLICY "admin_read_all_reviews"
  ON reviews FOR SELECT
  USING (is_admin());

CREATE POLICY "admin_manage_reviews"
  ON reviews FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_ads"
  ON ads FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_emergency"
  ON emergency_contacts FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_notifications"
  ON notifications FOR ALL
  USING (is_admin());

CREATE POLICY "admin_manage_seo"
  ON seo_pages FOR ALL
  USING (is_admin());

-- Only superadmin can change app settings
CREATE POLICY "superadmin_manage_settings"
  ON app_settings FOR ALL
  USING (is_admin_role('superadmin'));

CREATE POLICY "admin_read_settings"
  ON app_settings FOR SELECT
  USING (is_admin());

-- Logs: read-only for all admins, insert by any admin
CREATE POLICY "admin_read_logs"
  ON admin_activity_logs FOR SELECT
  USING (is_admin());

CREATE POLICY "admin_insert_logs"
  ON admin_activity_logs FOR INSERT
  WITH CHECK (is_admin());

-- Submissions: admin read + manage
CREATE POLICY "admin_manage_submissions"
  ON user_submissions FOR ALL
  USING (is_admin());

-- Admin users: read own record, superadmin reads all
CREATE POLICY "admin_read_own_profile"
  ON admin_users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "superadmin_manage_admin_users"
  ON admin_users FOR ALL
  USING (is_admin_role('superadmin'));
```

---

## SECTION 10 — STORAGE BUCKETS & POLICIES

```sql
-- ─────────────────────────────────────────────────────────────────────
-- STEP 1: Create Storage Buckets
-- Run in Supabase Dashboard > Storage, OR via SQL below
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'doctor-photos',
    'doctor-photos',
    TRUE,
    5242880,  -- 5 MB max
    ARRAY['image/webp', 'image/jpeg', 'image/png']
  ),
  (
    'hospital-images',
    'hospital-images',
    TRUE,
    5242880,
    ARRAY['image/webp', 'image/jpeg', 'image/png']
  ),
  (
    'banner-ads',
    'banner-ads',
    TRUE,
    5242880,
    ARRAY['image/webp', 'image/jpeg', 'image/png']
  ),
  (
    'symptom-images',
    'symptom-images',
    TRUE,
    5242880,
    ARRAY['image/webp', 'image/jpeg', 'image/png']
  ),
  (
    'category-icons',
    'category-icons',
    TRUE,
    1048576,  -- 1 MB max (SVG icons are small)
    ARRAY['image/webp', 'image/svg+xml', 'image/png']
  ),
  (
    'app-assets',
    'app-assets',
    TRUE,
    5242880,
    ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/svg+xml']
  )
ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- STEP 2: Storage RLS Policies
-- ─────────────────────────────────────────────────────────────────────

-- Public read: anyone can view files in all public buckets
CREATE POLICY "public_read_doctor_photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'doctor-photos');

CREATE POLICY "public_read_hospital_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hospital-images');

CREATE POLICY "public_read_banner_ads"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'banner-ads');

CREATE POLICY "public_read_symptom_images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'symptom-images');

CREATE POLICY "public_read_category_icons"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'category-icons');

CREATE POLICY "public_read_app_assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'app-assets');

-- Admin only: upload to any bucket
CREATE POLICY "admin_upload_storage"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id IN (
      'doctor-photos', 'hospital-images', 'banner-ads',
      'symptom-images', 'category-icons', 'app-assets'
    )
    AND is_admin()
  );

-- Admin only: delete from any bucket
CREATE POLICY "admin_delete_storage"
  ON storage.objects FOR DELETE
  USING (is_admin());
```

---

## SECTION 11 — SEED DATA

```sql
-- ─────────────────────────────────────────────────────────────────────
-- SEED 1: app_settings (singleton — only 1 row ever)
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO app_settings (
  app_name, app_name_bn,
  social_links,
  homepage_settings,
  theme_colors
) VALUES (
  'Uttarbanga Swasthya Setu',
  'উত্তরবঙ্গ স্বাস্থ্য সেতু',
  '{"facebook": "", "instagram": "", "youtube": ""}',
  '{"show_featured_doctors": true, "show_trending_hospitals": true, "show_category_grid": true, "show_symptom_section": true}',
  '{"primary": "#1A6FBA", "secondary": "#0D9E6A", "accent": "#F5A623", "emergency": "#E53E3E", "bg": "#F4F7FB"}'
) ON CONFLICT (singleton_guard) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- SEED 2: cities (11 North Bengal cities)
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO cities (name_en, name_bn, slug, city_enum, display_order) VALUES
  ('Cooch Behar',   'কোচবিহার',      'cooch-behar',   'cooch_behar',   1),
  ('Siliguri',      'শিলিগুড়ি',       'siliguri',       'siliguri',       2),
  ('Darjeeling',    'দার্জিলিং',       'darjeeling',     'darjeeling',     3),
  ('Tufanganj',     'তুফানগঞ্জ',       'tufanganj',      'tufanganj',      4),
  ('Dinhata',       'দিনহাটা',         'dinhata',        'dinhata',        5),
  ('Mekhliganj',    'মেখলিগঞ্জ',       'mekhliganj',     'mekhliganj',     6),
  ('Mathabhanga',   'মাথাভাঙ্গা',      'mathabhanga',    'mathabhanga',    7),
  ('Jalpaiguri',    'জলপাইগুড়ি',      'jalpaiguri',     'jalpaiguri',     8),
  ('Alipurduar',    'আলিপুরদুয়ার',     'alipurduar',     'alipurduar',     9),
  ('Haldibari',     'হলদিবাড়ি',        'haldibari',      'haldibari',      10),
  ('Raiganj',       'রায়গঞ্জ',         'raiganj',        'raiganj',        11)
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- SEED 3: categories (22 specialties)
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO categories (name_en, name_bn, slug, specialty, display_order, search_keywords) VALUES
  ('General Medicine',        'মেডিসিন বিশেষজ্ঞ',       'medicine',         'medicine',         1,  ARRAY['ডাক্তার', 'জ্বর', 'সর্দি', 'doctor', 'general', 'মেডিসিন']),
  ('Cardiologist',            'হৃদরোগ বিশেষজ্ঞ',        'cardiology',       'cardiology',       2,  ARRAY['হার্ট', 'হৃদরোগ', 'বুকের ব্যথা', 'heart', 'chest pain']),
  ('Gynecologist',            'গাইনি বিশেষজ্ঞ',         'gynecology',       'gynecology',       3,  ARRAY['মহিলা রোগ', 'গর্ভাবস্থা', 'গাইনি', 'pregnancy', 'ladies']),
  ('Child Specialist',        'শিশু বিশেষজ্ঞ',          'child-specialist', 'pediatrics',       4,  ARRAY['শিশু', 'বাচ্চা', 'child', 'baby', 'শিশু রোগ']),
  ('Orthopedic Surgeon',      'হাড় ও জয়েন্ট বিশেষজ্ঞ', 'orthopedics',      'orthopedics',      5,  ARRAY['হাড়', 'জয়েন্ট', 'bone', 'joint', 'ব্যথা']),
  ('Dermatologist',           'চর্মরোগ বিশেষজ্ঞ',       'dermatology',      'dermatology',      6,  ARRAY['চুলকানি', 'অ্যালার্জি', 'skin', 'allergy', 'চর্মরোগ']),
  ('Neurologist',             'নিউরো বিশেষজ্ঞ',         'neurology',        'neurology',        7,  ARRAY['নিউরো', 'মস্তিষ্ক', 'brain', 'স্নায়ু', 'মাথাব্যথা']),
  ('Eye Specialist',          'চক্ষু বিশেষজ্ঞ',         'ophthalmology',    'ophthalmology',    8,  ARRAY['চোখ', 'চক্ষু', 'eye', 'vision', 'দৃষ্টি']),
  ('ENT Specialist',          'নাক-কান-গলা বিশেষজ্ঞ',  'ent',              'ent',              9,  ARRAY['নাক', 'কান', 'গলা', 'ear', 'nose', 'throat']),
  ('Psychiatrist',            'মানসিক রোগ বিশেষজ্ঞ',   'psychiatry',       'psychiatry',       10, ARRAY['মানসিক', 'depression', 'anxiety', 'মন', 'psychiatry']),
  ('Urologist',               'মূত্ররোগ বিশেষজ্ঞ',      'urology',          'urology',          11, ARRAY['প্রস্রাব', 'kidney stone', 'urinary', 'মূত্র']),
  ('Gastroenterologist',      'পেট ও লিভার বিশেষজ্ঞ',  'gastroenterology', 'gastroenterology', 12, ARRAY['পেট', 'লিভার', 'গ্যাস্ট্রিক', 'liver', 'stomach', 'gastric']),
  ('Oncologist',              'ক্যান্সার বিশেষজ্ঞ',    'oncology',         'oncology',         13, ARRAY['ক্যান্সার', 'cancer', 'tumor', 'টিউমার']),
  ('Nephrologist',            'কিডনি বিশেষজ্ঞ',        'nephrology',       'nephrology',       14, ARRAY['কিডনি', 'kidney', 'dialysis', 'ডায়ালাইসিস']),
  ('Diabetes & Endocrinology','ডায়াবেটিস বিশেষজ্ঞ',    'endocrinology',    'endocrinology',    15, ARRAY['ডায়াবেটিস', 'থাইরয়েড', 'diabetes', 'thyroid', 'sugar', 'চিনি']),
  ('Dentist',                 'দন্ত বিশেষজ্ঞ',          'dentistry',        'dentistry',        16, ARRAY['দাঁত', 'দন্ত', 'tooth', 'dental', 'মাড়ি']),
  ('Radiologist',             'রেডিওলজি বিশেষজ্ঞ',     'radiology',        'radiology',        17, ARRAY['এক্স-রে', 'আল্ট্রা', 'X-Ray', 'USG', 'CT Scan', 'MRI']),
  ('Surgeon',                 'সার্জন',                  'surgery',          'surgery',          18, ARRAY['অপারেশন', 'surgery', 'সার্জারি', 'operation']),
  ('Pulmonologist',           'ফুসফুস বিশেষজ্ঞ',       'pulmonology',      'pulmonology',      19, ARRAY['ফুসফুস', 'শ্বাস', 'lung', 'breathing', 'TB', 'যক্ষ্মা']),
  ('Rheumatologist',          'বাত রোগ বিশেষজ্ঞ',      'rheumatology',     'rheumatology',     20, ARRAY['বাত', 'arthritis', 'joint pain', 'গাঁটে ব্যথা']),
  ('Physiotherapist',         'ফিজিওথেরাপিস্ট',        'physiotherapy',    'physiotherapy',    21, ARRAY['ফিজিও', 'physiotherapy', 'rehab', 'পুনর্বাসন']),
  ('Nutritionist',            'পুষ্টি বিশেষজ্ঞ',        'nutrition',        'nutrition',        22, ARRAY['পুষ্টি', 'diet', 'ডায়েট', 'খাদ্য', 'nutrition'])
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- SEED 4: symptoms (16 core symptoms)
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO symptoms
  (title_en, title_bn, slug, is_emergency, display_order, search_keywords)
VALUES
  ('Fever & Cold',            'জ্বর ও সর্দি-কাশি',      'fever-cold',           FALSE, 1,  ARRAY['জ্বর', 'সর্দি', 'কাশি', 'fever', 'flu', 'cold']),
  ('Headache & Migraine',     'মাথাব্যথা ও মাইগ্রেন',   'headache-migraine',    FALSE, 2,  ARRAY['মাথাব্যথা', 'মাথা ঘোরা', 'headache', 'migraine']),
  ('Chest Pain',              'বুকে ব্যথা',              'chest-pain',           TRUE,  3,  ARRAY['বুকে ব্যথা', 'বুক ধড়ফড়', 'chest pain', 'heart', 'হার্ট']),
  ('Diabetes Problems',       'ডায়াবেটিস সমস্যা',       'diabetes-problems',    FALSE, 4,  ARRAY['ডায়াবেটিস', 'চিনি', 'diabetes', 'blood sugar', 'থাইরয়েড']),
  ('Kidney Problems',         'কিডনি সমস্যা',            'kidney-problems',      FALSE, 5,  ARRAY['কিডনি', 'পাথর', 'kidney', 'stone', 'dialysis']),
  ('Breathing Difficulty',    'শ্বাসকষ্ট ও কাশি',       'breathing-difficulty', TRUE,  6,  ARRAY['শ্বাসকষ্ট', 'হাঁপানি', 'breathing', 'asthma', 'TB', 'যক্ষ্মা']),
  ('Pregnancy Issues',        'গর্ভাবস্থার সমস্যা',     'pregnancy-issues',     FALSE, 7,  ARRAY['গর্ভাবস্থা', 'pregnancy', 'গর্ভবতী', 'delivery', 'প্রসব']),
  ('Eye Problems',            'চোখের সমস্যা',            'eye-problems',         FALSE, 8,  ARRAY['চোখ', 'দৃষ্টি', 'eye', 'vision', 'চশমা']),
  ('Skin Allergy & Rash',     'চুলকানি ও চর্মরোগ',      'skin-allergy',         FALSE, 9,  ARRAY['চুলকানি', 'অ্যালার্জি', 'চর্মরোগ', 'skin', 'allergy', 'rash']),
  ('Stomach & Liver Issues',  'পেট ও লিভারের সমস্যা',   'stomach-liver',        FALSE, 10, ARRAY['পেটব্যথা', 'গ্যাস্ট্রিক', 'লিভার', 'stomach', 'liver', 'acidity']),
  ('Child Illness',           'শিশুর রোগ-বালাই',        'child-illness',        FALSE, 11, ARRAY['শিশু', 'বাচ্চা', 'child', 'baby', 'শিশু রোগ']),
  ('Bone & Joint Pain',       'হাড় ও জয়েন্টে ব্যথা',   'bone-joint-pain',      FALSE, 12, ARRAY['হাড়', 'জয়েন্ট', 'বাত', 'bone', 'joint', 'arthritis']),
  ('Mental Health',           'মানসিক সমস্যা',           'mental-health',        FALSE, 13, ARRAY['মানসিক', 'depression', 'উদ্বেগ', 'anxiety', 'stress']),
  ('Dental Pain',             'দাঁতের ব্যথা',            'dental-pain',          FALSE, 14, ARRAY['দাঁত', 'মাড়ি', 'dental', 'tooth', 'toothache']),
  ('Urinary Problems',        'প্রস্রাবের সমস্যা',       'urinary-problems',     FALSE, 15, ARRAY['প্রস্রাব', 'urinary', 'UTI', 'bladder', 'kidney stone']),
  ('High Blood Pressure',     'উচ্চ রক্তচাপ',            'high-blood-pressure',  TRUE,  16, ARRAY['রক্তচাপ', 'BP', 'blood pressure', 'hypertension', 'হাইপার'])
ON CONFLICT (slug) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- SEED 5: symptom_specialty_mapping
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO symptom_specialty_mapping (symptom_id, specialty, priority)
SELECT s.id, m.specialty::specialty_type, m.priority
FROM symptoms s
JOIN (VALUES
  -- fever-cold → medicine (primary), pediatrics, pulmonology
  ('fever-cold',           'medicine',         10),
  ('fever-cold',           'pediatrics',        8),
  ('fever-cold',           'pulmonology',       5),
  -- headache → neurology, medicine
  ('headache-migraine',    'neurology',        10),
  ('headache-migraine',    'medicine',          6),
  -- chest pain → cardiology, medicine, pulmonology
  ('chest-pain',           'cardiology',       10),
  ('chest-pain',           'medicine',          7),
  ('chest-pain',           'pulmonology',       5),
  -- diabetes → endocrinology, medicine
  ('diabetes-problems',    'endocrinology',    10),
  ('diabetes-problems',    'medicine',          8),
  -- kidney problems → nephrology, urology, medicine
  ('kidney-problems',      'nephrology',       10),
  ('kidney-problems',      'urology',           7),
  ('kidney-problems',      'medicine',          5),
  -- breathing → pulmonology, medicine, cardiology
  ('breathing-difficulty', 'pulmonology',      10),
  ('breathing-difficulty', 'medicine',          7),
  ('breathing-difficulty', 'cardiology',        4),
  -- pregnancy → gynecology
  ('pregnancy-issues',     'gynecology',       10),
  -- eye → ophthalmology
  ('eye-problems',         'ophthalmology',    10),
  -- skin → dermatology, medicine
  ('skin-allergy',         'dermatology',      10),
  ('skin-allergy',         'medicine',          5),
  -- stomach/liver → gastroenterology, medicine
  ('stomach-liver',        'gastroenterology', 10),
  ('stomach-liver',        'medicine',          7),
  -- child illness → pediatrics
  ('child-illness',        'pediatrics',       10),
  ('child-illness',        'medicine',          5),
  -- bone/joint → orthopedics, rheumatology
  ('bone-joint-pain',      'orthopedics',      10),
  ('bone-joint-pain',      'rheumatology',      8),
  -- mental health → psychiatry
  ('mental-health',        'psychiatry',       10),
  -- dental → dentistry
  ('dental-pain',          'dentistry',        10),
  -- urinary → urology, nephrology
  ('urinary-problems',     'urology',          10),
  ('urinary-problems',     'nephrology',        7),
  -- blood pressure → cardiology, medicine
  ('high-blood-pressure',  'cardiology',       10),
  ('high-blood-pressure',  'medicine',          8),
  ('high-blood-pressure',  'endocrinology',     5)
) AS m(symptom_slug, specialty, priority)
ON s.slug = m.symptom_slug
ON CONFLICT (symptom_id, specialty) DO NOTHING;


-- ─────────────────────────────────────────────────────────────────────
-- SEED 6: Emergency Contacts (national numbers)
-- ─────────────────────────────────────────────────────────────────────

INSERT INTO emergency_contacts (title, title_bn, category, phone, display_order) VALUES
  ('National Ambulance',           'জাতীয় অ্যাম্বুলেন্স',       'ambulance',         '102', 1),
  ('National Health Helpline',     'জাতীয় স্বাস্থ্য হেল্পলাইন', 'helpline',          '104', 2),
  ('Police Emergency',             'পুলিশ জরুরি সেবা',           'police',            '100', 3),
  ('Fire Service',                 'দমকল বাহিনী',                'fire',              '101', 4)
ON CONFLICT DO NOTHING;
```

---

## SECTION 12 — ENVIRONMENT VARIABLES REFERENCE

```bash
# ──────────────────────────────────────────────────────────────
# Next.js App — .env.local
# Also add these to Vercel Dashboard > Project > Settings > Environment Variables
# ──────────────────────────────────────────────────────────────

# ── Supabase ──────────────────────────────────────────────────

# Public (safe to expose in browser code)
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# Private (SERVER-SIDE ONLY — never in client code or NEXT_PUBLIC_*)
# Used in Next.js Server Actions and Route Handlers only
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# ── Storage ───────────────────────────────────────────────────

# Base URL for constructing full image URLs from relative paths
NEXT_PUBLIC_STORAGE_BASE_URL=https://<project-id>.supabase.co/storage/v1/object/public

# Usage in code:
# const photoUrl = `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/doctor-photos/${doctor.photo_url}`

# ── App (Admin Panel) ─────────────────────────────────────────
# Admin Panel environment variables (separate repo / Vercel project)

NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co   # same project
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
NEXT_PUBLIC_STORAGE_BASE_URL=https://<project-id>.supabase.co/storage/v1/object/public

# ── Supabase Key Quick Reference ──────────────────────────────
# anon key      → Safe for browser. Subject to RLS policies. Use for all public reads.
# service_role  → Bypasses ALL RLS. Use ONLY in server-side code (Server Actions / API routes).
#                 NEVER put in NEXT_PUBLIC_* or client-side bundles.
```

---

## SECTION 13 — EXECUTION ORDER

```
Run the SQL sections in this EXACT sequence in Supabase SQL Editor.
Foreign key dependencies must be created before the tables that reference them.

─────────────────────────────────────────────────────────────────────
 STEP  SECTION / TABLE                        DEPENDENCIES
─────────────────────────────────────────────────────────────────────
  1    SECTION 1 — Extensions                 (none)
  2    SECTION 2 — Enum Types                 Extensions
  3    SECTION 3 — handle_updated_at()        (none)
  4    T01 cities                             Enums, trigger function
  5    T02 categories                         Enums, trigger function
  6    T03 admin_users                        auth.users (Supabase Auth)
  7    T04 doctors                            categories (FK), admin_users
  8    T05 chambers                           doctors (FK), cities (FK)
  9    T06 hospitals                          cities (FK)
 10    T07 hospital_images                    hospitals (FK)
 11    T08 doctor_hospital_links              doctors (FK), hospitals (FK)
 12    T09 symptoms                           (none)
 13    T10 symptom_specialty_mapping          symptoms (FK), categories (FK)
 14    T11 reviews                            doctors (FK), admin_users (FK)
 15    T12 ads                                Enums
 16    T13 emergency_contacts                 cities (FK), Enums
 17    T14 notifications                      Enums
 18    T15 seo_pages                          (none)
 19    T16 app_settings                       (none)
 20    T17 admin_activity_logs                admin_users (FK)
 21    T18 user_submissions                   admin_users (FK)
 22    T19 analytics_events                   Enums
 23    SECTION 8 — DB Functions & Triggers    All tables
 24    SECTION 9 — RLS Policies               All tables, DB functions
 25    SECTION 10 — Storage Buckets           Supabase Storage enabled
 26    SECTION 11 — Seed Data                 All tables created
─────────────────────────────────────────────────────────────────────
```

---

## SECTION 14 — SCHEMA SUMMARY

```
─────────────────────────────────────────────────────────────────────────────────
  #    TABLE                        MODULE         EXPECTED ROWS     KEY FEATURES
─────────────────────────────────────────────────────────────────────────────────
 T01   cities                       Core           11                Slug↔Enum bridge
 T02   categories                   Core           22                Search keywords
 T03   admin_users                  System         1–5               Auth linked
 T04   doctors                      Module #1      50–500+           Fuzzy search, soft delete
 T05   chambers                     Module #1      100–1500+         Lat/lng, JSONB schedule
 T06   hospitals                    Module #2      20–100+           Lat/lng, soft delete
 T07   hospital_images              Module #2      50–300+           Display order
 T08   doctor_hospital_links        Junction       50–200+           Unique constraint
 T09   symptoms                     Module #4      16–80             Emergency flag
 T10   symptom_specialty_mapping    Junction       35–150+           Priority-based ranking
 T11   reviews                      Module #5      100–5000+         Auto-rating trigger
 T12   ads                          Module #3      5–50              Date validation, stats
 T13   emergency_contacts           Module #12     10–50             City-scoped
 T14   notifications                Module #11     1–20 (active)     Auto-expire
 T15   seo_pages                    Module #13     50–200+           Schema markup JSONB
 T16   app_settings                 Module #14     1 (always)        Singleton enforced
 T17   admin_activity_logs          Module #15     Growing           Immutable audit trail
 T18   user_submissions             Module #9      Growing           Honeypot protected
 T19   analytics_events             Module #10     High volume       Session tracking
─────────────────────────────────────────────────────────────────────────────────

TOTAL:
  19 Tables  |  6 Storage Buckets  |  11 Enum Types
  6 DB Functions  |  5 Triggers  |  ~45 RLS Policies
  Complete Seed Data (11 cities, 22 categories, 16 symptoms, 35 symptom mappings)

UPGRADES FROM v1.0:
  ✅ latitude + longitude added to chambers and hospitals
  ✅ languages[] array added to doctors
  ✅ is_deleted (soft delete) added to doctors and hospitals
  ✅ updated_at auto-trigger on every applicable table
  ✅ recalculate_doctor_rating() trigger (fires on review status change)
  ✅ increment_view_count() atomic function (race-condition safe)
  ✅ increment_ad_stat() atomic function (race-condition safe)
  ✅ is_admin() and is_admin_role() helper functions for RLS
  ✅ is_honeypot_valid() spam protection function
  ✅ Singleton guard on app_settings (UNIQUE + CHECK constraint)
  ✅ Date range constraint on ads (end_date >= start_date)
  ✅ Complete RLS policies (not just plan — actual SQL)
  ✅ Storage bucket creation SQL with mime type restrictions
  ✅ Storage RLS policies
  ✅ .env.local reference for Next.js
  ✅ Exact execution order with dependency notes
  ✅ city_enum column in cities table (bridges slug and Enum systems)
  ✅ user_agent column in admin_activity_logs
  ✅ session_id column in analytics_events
  ✅ bed_count column in hospitals
  ✅ Full seed data (cities, categories, symptoms, mappings, emergency contacts)
─────────────────────────────────────────────────────────────────────────────────
```

---

*Schema Version: 2.0 | Stack: Next.js 15 + TypeScript + Supabase + Vercel*
*Project: Uttarbanga Swasthya Setu | Region: North Bengal, West Bengal, India*
*Covers: All 19 Tables | 15 Admin Modules | All Golden Rules Applied ✅*
