# Vytanexa — Technical Architecture, Stack & Security Specification
## User-Side Web App (Next.js 15 + Supabase) | Phase 1
### Version: 1.0.0 | Date: 2026-06-04

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [System Architecture (Decoupled)](#3-system-architecture-decoupled)
4. [Design Tokens & Theme System](#4-design-tokens--theme-system)
5. [Information Architecture & URL Routing](#5-information-architecture--url-routing)
6. [Database Integration Architecture](#6-database-integration-architecture)
7. [API Design & Contracts](#7-api-design--contracts)
8. [State Management Architecture](#8-state-management-architecture)
9. [Internationalization (i18n) Architecture](#9-internationalization-i18n-architecture)
10. [Location & Geolocation Architecture](#10-location--geolocation-architecture)
11. [Security Architecture](#11-security-architecture)
12. [Performance & Scalability](#12-performance--scalability)
13. [PWA & Offline Architecture](#13-pwa--offline-architecture)
14. [Deployment Architecture](#14-deployment-architecture)
15. [Environment Variables](#15-environment-variables-reference)
16. [Project Folder Structure](#16-project-folder-structure)
17. [Data Flow Diagrams](#17-data-flow-diagrams)

---

## 1. EXECUTIVE SUMMARY

**Project:** Vytanexa (Vita + Nexa = Life Connection System)  
**Type:** Healthcare Discovery & Coordination Ecosystem for India  
**Target:** Multi-State India (All States → Districts → Sub-districts → Blocks/Wards → Local)  
**Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Supabase  
**Architecture:** Decoupled — Vytanexa Web App and Admin Panel are separate repositories, separate deployments, connected to the same Supabase project.  
**Constraint:** Zero hardcoded/seeded dynamic content. All data (doctors, hospitals, symptoms, ads, FAQs, articles, locations, links) is managed exclusively via the Admin Panel and served from Supabase. Only static legal pages (Privacy, Terms, Transparency, How to Use, About Us) exist as code.

---

## 2. TECH STACK & DEPENDENCIES

### 2.1 Core Framework

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 15.x | App Router, SSR/SSG, API Routes |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.4+ | Utility-first CSS |
| UI Components | shadcn/ui | latest | Accessible component primitives |
| Animation | Framer Motion | 11.x | Page transitions, gestures |
| Icons | Lucide React | latest | Consistent iconography |
| Fonts | Google Fonts (Inter, Noto Sans Bengali, Noto Sans Devanagari) | — | Multi-script typography |

### 2.2 State & Data

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Server State | TanStack Query (React Query) | v5 | Caching, sync, background refetch |
| Client State | Zustand | v4 | Global UI state (location, auth, theme, nav) |
| Forms | React Hook Form + Zod | v7 + v3 | Validation, type-safe forms |
| HTTP Client | Supabase JS SDK | v2 | DB + Auth + Storage + Realtime |

### 2.3 Specialized Libraries

| Feature | Library |
|---------|---------|
| i18n | `next-intl` (App Router native) |
| Maps | `@react-google-maps/api` or `react-leaflet` |
| Geocoding | Google Maps Geocoding API (server-side via Route Handler) |
| PWA | `@serwist/next` or `next-pwa` |
| Markdown/Rich Text | `react-markdown` + `remark-gfm` (for articles) |
| Date/Time | `date-fns` (tree-shakeable) |
| Phone Input | `react-phone-number-input` |
| Share API | Native Web Share API (fallback to clipboard) |
| QR Code | `qrcode.react` (for doctor profile sharing) |

### 2.4 DevOps & Tooling

| Tool | Purpose |
|------|---------|
| ESLint + Prettier | Code quality |
| Husky + lint-staged | Pre-commit hooks |
| Vitest | Unit testing |
| Playwright | E2E testing |
| Vercel | Hosting + CI/CD |

---

## 3. SYSTEM ARCHITECTURE (DECOUPLED)

### 3.1 High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────┬─────────────────────────────────────────────────┤
│   Vytanexa Web App          │   Admin Panel (GOD MODE)                       │
│   (Next.js 15 + Vercel)     │   (Separate Repo + Vercel)                     │
│   Public Facing              │   Internal Only                                │
├─────────────────────────────┴─────────────────────────────────────────────────┤
│                              SUPABASE PROJECT                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐  │
│  │ PostgreSQL  │  │ Auth        │  │ Storage     │  │ Edge Functions   │  │
│  │ (19+ Tables)│  │ (OTP/OAuth) │  │ (6 Buckets) │  │ (RPC + Hooks)    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Repository Isolation Rules

| Rule | Vytanexa Web App | Admin Panel |
|------|-----------------|-------------|
| Repo | `vytanexa-web` | `vytanexa-admin` |
| Deploy | `vytanexa.vercel.app` | `admin.vytanexa.vercel.app` |
| Supabase Role | `anon` key (public) + Service Role (Server Actions only) | `anon` + Service Role |
| RLS | Respected for all public reads | Bypassed via Service Role |
| Shared Assets | Same Supabase Storage buckets | Same Supabase Storage buckets |

### 3.3 Communication Contract

- **Web App → Supabase:** Direct client calls (SELECT with RLS) for public data. Server Actions (INSERT/UPDATE) for user-generated content (reviews, submissions, questions).
- **Admin Panel → Supabase:** Full CRUD via Service Role key (server-side only).
- **No direct Web App ↔ Admin Panel communication.** Both are independent clients of Supabase.
- **Realtime:** Web App subscribes to `notifications` and `announcement_banners` tables for instant updates.

---

## 4. DESIGN TOKENS & THEME SYSTEM

### 4.1 Color System (Tailwind Config)

```typescript
// tailwind.config.ts — theme extension
const config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E8F2FB',
          100: '#D0E5F7',
          200: '#A1CBEF',
          300: '#72B1E7',
          400: '#4397DF',
          500: '#1A6FBA', // Primary
          600: '#155A96',
          700: '#104472',
          800: '#0A2F4D',
          900: '#051929',
        },
        success: {
          50: '#E6F7F1',
          500: '#0D9E6A',
          600: '#0A7E55',
        },
        warning: {
          50: '#FEF5E6',
          500: '#F5A623',
          600: '#C4841C',
        },
        danger: {
          50: '#FDECEC',
          500: '#E53E3E',
          600: '#B83232',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F4F7FB',
          tertiary: '#E2E8F0',
        },
        text: {
          primary: '#1A202C',
          secondary: '#4A5568',
          muted: '#718096',
          inverse: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Inter', 'Noto Sans Bengali', 'Noto Sans Devanagari', 'sans-serif'],
        body: ['Inter', 'Noto Sans Bengali', 'Noto Sans Devanagari', 'sans-serif'],
      },
      spacing: {
        'navbar': '64px',
        'topbar': '56px',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
      },
      borderRadius: {
        'card': '16px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(26,111,186,0.08)',
        'card-hover': '0 4px 20px rgba(26,111,186,0.12)',
        'float': '0 4px 16px rgba(0,0,0,0.12)',
      },
    },
  },
};
```

### 4.2 Typography Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-3xl` | 30px | 700 | Hero titles (H1) |
| `text-2xl` | 24px | 700 | Page titles (H2) |
| `text-xl` | 20px | 600 | Section headers |
| `text-lg` | 17px | 600 | Card titles, doctor names |
| `text-base` | 15px | 400 | Body text |
| `text-sm` | 13px | 400 | Secondary info, timestamps |
| `text-xs` | 11px | 400 | Badges, labels, captions |

### 4.3 Z-Index Hierarchy

| Layer | Z-Index | Element |
|-------|---------|---------|
| Background | 0 | Page content |
| Sticky headers | 40 | Top bar, tab bars |
| Bottom nav | 50 | Navigation bar |
| FAB | 60 | Emergency button |
| Modals / Drawers | 100 | Overlays |
| Toast / Snackbar | 110 | Notifications |
| Full-screen loaders | 120 | Blocking spinners |

---

## 5. INFORMATION ARCHITECTURE & URL ROUTING

### 5.1 App Router Route Map (Next.js 15)

```
app/
├── (marketing)/
│   ├── page.tsx                    → Home Page (locale root)
│   ├── about/page.tsx              → About Us (static)
│   ├── privacy/page.tsx            → Privacy Policy (static)
│   ├── terms/page.tsx              → Terms & Conditions (static)
│   ├── transparency/page.tsx       → Transparency (static)
│   ├── how-to-use/page.tsx         → How to Use (static)
│   └── support/page.tsx            → Contact / Support (static)
│
├── (discovery)/
│   ├── doctors/page.tsx            → Doctor List (/doctors)
│   ├── doctors/[slug]/page.tsx     → Doctor Profile (/doctor/dr-name)
│   ├── hospitals/page.tsx          → Hospital List (/hospitals)
│   ├── hospitals/[slug]/page.tsx   → Hospital Detail (/hospital/name)
│   ├── symptoms/page.tsx           → Symptoms Grid (/symptoms)
│   ├── symptoms/[slug]/page.tsx    → Symptom Detail (/symptoms/fever)
│   ├── labs/page.tsx               → Lab & Diagnostics (/labs)
│   ├── blood-services/page.tsx     → Blood Services (/blood-services)
│   └── emergency/page.tsx          → Emergency Directory (/emergency)
│
├── (content)/
│   ├── magazine/page.tsx           → Health Magazine (/magazine)
│   ├── magazine/[slug]/page.tsx    → Article Detail (/magazine/article-slug)
│   ├── qa/page.tsx                 → Q&A Community (/qa)
│   ├── qa/[id]/page.tsx            → Question Detail (/qa/123)
│   ├── ask/page.tsx                → Ask a Question (/ask)
│   ├── polls/page.tsx              → Polls & Reports (/polls)
│   └── faq/page.tsx                → FAQ (/faq)
│
├── (search)/
│   └── search/page.tsx             → Universal Search (/search?q=...)
│
├── (seo)/
│   └── [state]/[district]/page.tsx → SEO Landing (/west-bengal/cooch-behar)
│   └── [state]/[district]/[specialty]/page.tsx → SEO Specialty Landing
│
├── (user)/
│   ├── login/page.tsx              → Login / OTP (/login)
│   ├── profile/page.tsx            → User Profile (/profile)
│   ├── favorites/page.tsx          → Saved Doctors/Hospitals (/favorites)
│   └── history/page.tsx            → Search & View History (/history)
│
├── (system)/
│   ├── settings/page.tsx           → App Settings (/settings)
│   ├── notifications/page.tsx      → Notification Center (/notifications)
│   └── offline/page.tsx            → Offline Fallback (/offline)
│
├── api/
│   ├── geocode/reverse/route.ts    → Reverse geocoding proxy
│   ├── search/route.ts             → Search API (full-text + fuzzy)
│   ├── submit-review/route.ts      → Review submission (Server Action)
│   ├── submit-question/route.ts    → Q&A submission
│   └── analytics/route.ts          → Event ingestion
│
├── layout.tsx                      → Root layout (i18n + providers)
├── loading.tsx                     → Global loading UI
├── error.tsx                       → Global error boundary
└── not-found.tsx                   → 404 page
```

### 5.2 Route Group Rules

| Group | Prefix | Middleware |
|-------|--------|------------|
| `(marketing)` | `/` | None |
| `(discovery)` | `/` | Location detection middleware |
| `(content)` | `/` | None |
| `(search)` | `/search` | Search params validation |
| `(seo)` | `/{state}/{district}` | Static generation at build time |
| `(user)` | `/` | Auth check (optional) |
| `(system)` | `/` | None |

### 5.3 Dynamic Segment Constraints

```typescript
// Route segment config
export const dynamicParams = true;
export const revalidate = 3600; // ISR: 1 hour for SEO pages

// Slug validation regex
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// State/District slugs must exist in DB (generateStaticParams for SEO pages)
```

---

## 6. DATABASE INTEGRATION ARCHITECTURE

### 6.1 Supabase Client Strategy

```typescript
// lib/supabase/client.ts — Browser client (RLS respected)
import { createBrowserClient } from '@supabase/ssr';
export const createClient = () => createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/supabase/server.ts — Server client (for Server Components/Actions)
import { createServerClient } from '@supabase/ssr';
export const createServerClient = async () => { /* ... */ };

// lib/supabase/admin.ts — Service Role (Admin-only ops, NEVER exposed to client)
import { createClient } from '@supabase/supabase-js';
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

### 6.2 Query Patterns

| Pattern | Method | Example |
|---------|--------|---------|
| Public List | TanStack Query + `supabase.from().select()` | Doctor list with pagination |
| Public Detail | TanStack Query + `supabase.from().select().eq('slug', slug).single()` | Doctor profile |
| Search | Server Action + `pg_trgm` full-text | Universal search API |
| Mutation | Server Action + `supabase.from().insert()` | Review submission |
| Realtime | `supabase.channel().on()` | Notification badges |
| RPC | `supabase.rpc('function_name', params)` | Atomic increments |

### 6.3 Location Schema Additions (Beyond v2)

The existing schema (v2) covers cities as ENUM. For Vytanexa (All-India, dynamic, no hardcode), the location hierarchy requires these **admin-managed** tables:

```sql
-- T20. states — Admin-managed, no seed data in app
CREATE TABLE states (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en     TEXT NOT NULL,              -- "West Bengal"
  name_hi     TEXT,                       -- "पश्चिम बंगाल"
  name_bn     TEXT,                       -- "পশ্চিমবঙ্গ"
  slug        TEXT UNIQUE NOT NULL,     -- "west-bengal"
  iso_code    TEXT UNIQUE,              -- "WB"
  latitude    DECIMAL(10,8),
  longitude   DECIMAL(11,8),
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- T21. districts — Admin-managed
CREATE TABLE districts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id    UUID NOT NULL REFERENCES states(id) ON DELETE CASCADE,
  name_en     TEXT NOT NULL,              -- "Cooch Behar"
  name_hi     TEXT,
  name_bn     TEXT,
  slug        TEXT NOT NULL,              -- "cooch-behar"
  UNIQUE(state_id, slug),
  latitude    DECIMAL(10,8),
  longitude   DECIMAL(11,8),
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- T22. sub_districts — Unified: sub-division, tehsil, town, city
CREATE TABLE sub_districts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id   UUID NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name_en       TEXT NOT NULL,            -- "Tufanganj"
  name_hi       TEXT,
  name_bn       TEXT,
  slug          TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('sub_division','tehsil','town','city')),
  UNIQUE(district_id, slug),
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- T23. local_areas — Unified: block, ward, locality
CREATE TABLE local_areas (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sub_district_id   UUID NOT NULL REFERENCES sub_districts(id) ON DELETE CASCADE,
  name_en           TEXT NOT NULL,        -- "Ward 12" / "Block A"
  name_hi           TEXT,
  name_bn           TEXT,
  slug              TEXT NOT NULL,
  type              TEXT NOT NULL CHECK (type IN ('block','ward','locality')),
  UNIQUE(sub_district_id, slug),
  is_active         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Add location FKs to existing tables
ALTER TABLE doctors ADD COLUMN state_id UUID REFERENCES states(id) ON DELETE SET NULL;
ALTER TABLE doctors ADD COLUMN district_id UUID REFERENCES districts(id) ON DELETE SET NULL;
ALTER TABLE doctors ADD COLUMN sub_district_id UUID REFERENCES sub_districts(id) ON DELETE SET NULL;
ALTER TABLE doctors ADD COLUMN local_area_id UUID REFERENCES local_areas(id) ON DELETE SET NULL;

ALTER TABLE hospitals ADD COLUMN state_id UUID REFERENCES states(id) ON DELETE SET NULL;
ALTER TABLE hospitals ADD COLUMN district_id UUID REFERENCES districts(id) ON DELETE SET NULL;
ALTER TABLE hospitals ADD COLUMN sub_district_id UUID REFERENCES sub_districts(id) ON DELETE SET NULL;
ALTER TABLE hospitals ADD COLUMN local_area_id UUID REFERENCES local_areas(id) ON DELETE SET NULL;

ALTER TABLE chambers ADD COLUMN state_id UUID REFERENCES states(id) ON DELETE SET NULL;
ALTER TABLE chambers ADD COLUMN district_id UUID REFERENCES districts(id) ON DELETE SET NULL;
ALTER TABLE chambers ADD COLUMN sub_district_id UUID REFERENCES sub_districts(id) ON DELETE SET NULL;
ALTER TABLE chambers ADD COLUMN local_area_id UUID REFERENCES local_areas(id) ON DELETE SET NULL;
```

### 6.4 New Content Tables (Admin-Managed)

```sql
-- T24. faqs — Admin-managed FAQ entries
CREATE TABLE faqs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en TEXT NOT NULL,
  question_hi TEXT,
  question_bn TEXT,
  answer_en   TEXT NOT NULL,
  answer_hi   TEXT,
  answer_bn   TEXT,
  category    TEXT DEFAULT 'general',     -- 'general', 'doctors', 'appointments', 'payments'
  display_order INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- T25. announcement_banners — Admin-managed top banners
CREATE TABLE announcement_banners (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en    TEXT NOT NULL,
  title_hi    TEXT,
  title_bn    TEXT,
  message_en  TEXT,
  message_hi  TEXT,
  message_bn  TEXT,
  bg_color    TEXT DEFAULT '#1A6FBA',
  text_color  TEXT DEFAULT '#FFFFFF',
  action_url  TEXT,                       -- Internal route or external link
  action_label TEXT,
  priority    INT DEFAULT 0,            -- Higher = shows first
  start_date  TIMESTAMPTZ,
  end_date    TIMESTAMPTZ,
  is_dismissible BOOLEAN DEFAULT TRUE,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- T26. health_articles — Magazine content
CREATE TABLE health_articles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title_en        TEXT NOT NULL,
  title_hi        TEXT,
  title_bn        TEXT,
  excerpt_en      TEXT,
  excerpt_hi      TEXT,
  excerpt_bn      TEXT,
  content_en      TEXT NOT NULL,          -- Markdown / HTML
  content_hi      TEXT,
  content_bn      TEXT,
  cover_image_url TEXT,
  author_name     TEXT,
  author_title    TEXT,
  category        TEXT,                   -- 'health-tips', 'disease-awareness', 'nutrition'
  tags            TEXT[] DEFAULT '{}',
  read_time_min   INT DEFAULT 3,
  view_count      INT DEFAULT 0,
  is_featured     BOOLEAN DEFAULT FALSE,
  is_published    BOOLEAN DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T27. health_questions — Q&A Community
CREATE TABLE health_questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_name      TEXT,                   -- For non-logged-in users
  guest_email     TEXT,
  guest_phone     TEXT,
  title           TEXT NOT NULL,          -- Question title
  body            TEXT NOT NULL,          -- Detailed question
  category        TEXT,                   -- 'general', 'pregnancy', 'diabetes', etc.
  tags            TEXT[] DEFAULT '{}',
  is_anonymous    BOOLEAN DEFAULT FALSE,
  is_approved     BOOLEAN DEFAULT FALSE,  -- Admin moderation
  is_answered     BOOLEAN DEFAULT FALSE,
  view_count      INT DEFAULT 0,
  answer_count    INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T28. health_answers — Doctor/Admin answers
CREATE TABLE health_answers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id     UUID NOT NULL REFERENCES health_questions(id) ON DELETE CASCADE,
  doctor_id       UUID REFERENCES doctors(id) ON DELETE SET NULL, -- If answered by listed doctor
  admin_id        UUID REFERENCES admin_users(id) ON DELETE SET NULL, -- If answered by admin
  responder_name  TEXT NOT NULL,          -- Display name
  responder_title TEXT,                   -- "Dr. ABC, Cardiologist" or "Vytanexa Team"
  body            TEXT NOT NULL,
  is_approved     BOOLEAN DEFAULT FALSE,
  is_featured     BOOLEAN DEFAULT FALSE,
  upvote_count    INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T29. polls — Community polls/reports
CREATE TABLE polls (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en     TEXT NOT NULL,
  question_hi     TEXT,
  question_bn     TEXT,
  options         JSONB NOT NULL,         -- [{"id":"1","label_en":"Yes","label_hi":"हाँ"}, ...]
  category        TEXT DEFAULT 'general', -- 'health-survey', 'feedback', 'report'
  is_multiple     BOOLEAN DEFAULT FALSE,
  is_active       BOOLEAN DEFAULT TRUE,
  end_date        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T30. poll_votes — Anonymous vote tracking (by session_id)
CREATE TABLE poll_votes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id     UUID NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id   TEXT NOT NULL,
  session_id  TEXT NOT NULL,              -- Anonymous fingerprint
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, session_id)             -- One vote per session per poll
);

-- T31. lab_tests — Diagnostic test catalog
CREATE TABLE lab_tests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en         TEXT NOT NULL,
  name_hi         TEXT,
  name_bn         TEXT,
  slug            TEXT UNIQUE NOT NULL,
  description_en  TEXT,
  description_hi  TEXT,
  description_bn  TEXT,
  category        TEXT,                   -- 'blood', 'imaging', 'pathology', 'cardiac'
  typical_price   INT,                    -- Approximate market price in INR
  preparation_en  TEXT,                   -- Fasting requirements etc.
  is_active       BOOLEAN DEFAULT TRUE,
  search_keywords TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T32. lab_test_hospital_links — Which hospital offers which test
CREATE TABLE lab_test_hospital_links (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id     UUID NOT NULL REFERENCES lab_tests(id) ON DELETE CASCADE,
  hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
  price       INT,                        -- Hospital-specific price
  turnaround  TEXT,                       -- "24 hours", "Same day"
  is_home_collection BOOLEAN DEFAULT FALSE,
  UNIQUE(test_id, hospital_id)
);

-- T33. blood_services — Blood banks & requests
CREATE TABLE blood_services (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL CHECK (type IN ('bank', 'donor', 'request')),
  -- For blood banks (linked to hospital or standalone)
  hospital_id     UUID REFERENCES hospitals(id) ON DELETE SET NULL,
  name            TEXT NOT NULL,
  address         TEXT,
  district_id     UUID REFERENCES districts(id) ON DELETE SET NULL,
  phone           TEXT,
  blood_groups    TEXT[] DEFAULT '{}',    -- ['A+', 'O-', 'B+']
  -- For donors/requests (community)
  contact_name    TEXT,
  contact_phone   TEXT,
  urgency         TEXT DEFAULT 'normal',  -- 'normal', 'urgent', 'critical'
  units_needed    INT,
  is_active       BOOLEAN DEFAULT TRUE,
  expires_at      TIMESTAMPTZ,            -- Auto-expire requests
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T34. medicines — Basic medicine catalog (admin-managed)
CREATE TABLE medicines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en         TEXT NOT NULL,
  name_hi         TEXT,
  name_bn         TEXT,
  generic_name    TEXT,
  category        TEXT,                   -- 'fever', 'pain', 'antibiotic', 'vitamin'
  description_en  TEXT,
  description_hi  TEXT,
  description_bn  TEXT,
  dosage_info_en  TEXT,
  warnings_en     TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  search_keywords TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- T35. user_favorites — Saved items per user
CREATE TABLE user_favorites (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('doctor', 'hospital', 'article')),
  entity_id   UUID NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

-- T36. user_search_history — For personalized suggestions
CREATE TABLE user_search_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id  TEXT,                     -- For anonymous users
  query       TEXT NOT NULL,
  filters     JSONB DEFAULT '{}',       -- { specialty: 'cardiology', city: 'cooch-behar' }
  result_count INT,
  clicked_entity_type TEXT,
  clicked_entity_id UUID,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- T37. user_notifications — In-app notification store
CREATE TABLE user_notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT,
  action_url  TEXT,
  image_url   TEXT,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- T38. dynamic_pages — Admin-created custom content pages
CREATE TABLE dynamic_pages (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,     -- URL slug: 'diabetes-awareness'
  title_en    TEXT NOT NULL,
  title_hi    TEXT,
  title_bn    TEXT,
  content_en  TEXT NOT NULL,            -- Rich text / Markdown / JSON blocks
  content_hi  TEXT,
  content_bn  TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 7. API DESIGN & CONTRACTS

### 7.1 Server Actions (Next.js 15)

All mutations go through Server Actions to protect sensitive keys and enforce validation.

```typescript
// app/actions/reviews.ts
'use server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';

const ReviewSchema = z.object({
  doctor_id: z.string().uuid(),
  reviewer_name: z.string().min(2).max(100),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().min(10).max(500),
  honeypot_field: z.string().max(0).optional(), // Must be empty
});

export async function submitReview(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = ReviewSchema.safeParse(raw);
  if (!parsed.success) return { error: 'Invalid input', details: parsed.error.flatten() };

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from('reviews')
    .insert({ ...parsed.data, status: 'pending', submitter_ip: 'stored-via-middleware' })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, data };
}
```

### 7.2 Route Handlers (API Routes)

```typescript
// app/api/geocode/reverse/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });

  // Call Google Maps Geocoding API (server-side, key hidden)
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  );
  const data = await res.json();

  // Extract state and district from address_components
  const components = data.results[0]?.address_components || [];
  const state = components.find((c: any) => c.types.includes('administrative_area_level_1'))?.long_name;
  const district = components.find((c: any) => c.types.includes('administrative_area_level_2'))?.long_name;

  // Match against Supabase states/districts
  const supabase = await createServerClient();
  const { data: stateRow } = await supabase.from('states').select('id, slug').ilike('name_en', state).single();
  const { data: districtRow } = await supabase.from('districts').select('id, slug').eq('state_id', stateRow?.id).ilike('name_en', district).single();

  return NextResponse.json({
    detected: { state: stateRow || null, district: districtRow || null },
    raw: { state, district }
  });
}
```

### 7.3 Search API Contract

```typescript
// GET /api/search?q={query}&type={all|doctors|hospitals|articles}&lat={lat}&lng={lng}&limit=20&offset=0

// Response:
interface SearchResponse {
  query: string;
  corrected_query?: string;           // Did-you-mean
  results: {
    doctors: DoctorSearchResult[];
    hospitals: HospitalSearchResult[];
    articles: ArticleSearchResult[];
    symptoms: SymptomResult[];
    medicines: MedicineResult[];
    lab_tests: LabTestResult[];
  };
  meta: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

// Search weights (pg_trgm + tsvector hybrid):
// 1. Exact slug match (weight: 100)
// 2. Name match (weight: 50)
// 3. Specialty match (weight: 40)
// 4. Search aliases (weight: 35)
// 5. Tags/keywords (weight: 25)
// 6. City/district match (weight: 20)
// 7. Degree match (weight: 10)
```

### 7.4 Realtime Subscriptions

```typescript
// hooks/useRealtimeAnnouncements.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useRealtimeAnnouncements() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('announcements')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'announcement_banners' },
        () => { queryClient.invalidateQueries({ queryKey: ['announcements'] }); }
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);
}
```

---

## 8. STATE MANAGEMENT ARCHITECTURE

### 8.1 Zustand Stores

```typescript
// stores/locationStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LocationState {
  stateId: string | null;
  districtId: string | null;
  subDistrictId: string | null;
  localAreaId: string | null;
  detected: boolean;
  manual: boolean;
  setLocation: (loc: Partial<LocationState>) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      stateId: null, districtId: null, subDistrictId: null, localAreaId: null,
      detected: false, manual: false,
      setLocation: (loc) => set((state) => ({ ...state, ...loc })),
      clearLocation: () => set({ stateId: null, districtId: null, subDistrictId: null, localAreaId: null, detected: false, manual: false }),
    }),
    { name: 'vytanexa-location' }
  )
);

// stores/authStore.ts
interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (user: User | null, session: Session | null) => void;
}

// stores/uiStore.ts
interface UIState {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'hi' | 'bn';
  bottomNavVisible: boolean;
  emergencyFabVisible: boolean;
  announcementDismissed: string[]; // IDs of dismissed banners
  setTheme: (theme: UIState['theme']) => void;
  setLanguage: (lang: UIState['language']) => void;
  dismissAnnouncement: (id: string) => void;
}
```

### 8.2 TanStack Query Keys (Normalized)

```typescript
// lib/queryKeys.ts
export const queryKeys = {
  doctors: {
    all: ['doctors'] as const,
    list: (filters: object) => ['doctors', 'list', filters] as const,
    detail: (slug: string) => ['doctors', 'detail', slug] as const,
    featured: (districtId?: string) => ['doctors', 'featured', districtId] as const,
  },
  hospitals: {
    all: ['hospitals'] as const,
    list: (filters: object) => ['hospitals', 'list', filters] as const,
    detail: (slug: string) => ['hospitals', 'detail', slug] as const,
  },
  symptoms: {
    all: ['symptoms'] as const,
    detail: (slug: string) => ['symptoms', 'detail', slug] as const,
  },
  articles: {
    all: ['articles'] as const,
    detail: (slug: string) => ['articles', 'detail', slug] as const,
  },
  qa: {
    list: (filters: object) => ['qa', 'list', filters] as const,
    detail: (id: string) => ['qa', 'detail', id] as const,
  },
  location: {
    states: ['location', 'states'] as const,
    districts: (stateId: string) => ['location', 'districts', stateId] as const,
    subDistricts: (districtId: string) => ['location', 'subDistricts', districtId] as const,
    localAreas: (subDistrictId: string) => ['location', 'localAreas', subDistrictId] as const,
  },
  search: (query: string) => ['search', query] as const,
  notifications: (userId: string) => ['notifications', userId] as const,
  banners: ['announcement_banners'] as const,
  faqs: ['faqs'] as const,
  polls: ['polls'] as const,
};
```

---

## 9. INTERNATIONALIZATION (I18N) ARCHITECTURE

### 9.1 next-intl Configuration

```typescript
// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Asia/Kolkata',
    now: new Date(),
  };
});

// Supported locales
export const locales = ['en', 'hi', 'bn'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
```

### 9.2 Message Structure (messages/en.json)

```json
{
  "metadata": {
    "appName": "Vytanexa",
    "tagline": "Your Healthcare Connection"
  },
  "navigation": {
    "home": "Home",
    "doctors": "Doctors",
    "hospitals": "Hospitals",
    "symptoms": "Symptoms",
    "more": "More"
  },
  "home": {
    "greeting": "Find the best doctors near you",
    "searchPlaceholder": "Search doctors, hospitals, symptoms...",
    "categoriesTitle": "Find by Specialty",
    "featuredDoctors": "Featured Specialists",
    "nearbyHospitals": "Nearby Hospitals"
  },
  "doctor": {
    "profile": {
      "tabs": {
        "info": "Information",
        "chambers": "Chambers",
        "reviews": "Reviews",
        "appointment": "Appointment"
      },
      "experience": "{years} years experience",
      "verified": "Verified Doctor",
      "call": "Call",
      "whatsapp": "WhatsApp",
      "appointment": "Book Appointment"
    }
  },
  "errors": {
    "generic": "Something went wrong. Please try again.",
    "offline": "You are offline. Showing cached data.",
    "noResults": "No results found for "{query}". Try different keywords."
  }
}
```

### 9.3 Locale Detection & Routing

| Strategy | Implementation |
|----------|---------------|
| Default | `en` (no prefix in URL for default) |
| URL prefix | `/hi/doctors`, `/bn/doctors` |
| Auto-detect | Browser `Accept-Language` header → redirect on first visit |
| Manual switch | Stored in `uiStore` + cookie `NEXT_LOCALE` |
| RTL | Not required (all LTR scripts) |

### 9.4 Content Translation Strategy

| Content Type | Source | Fallback |
|-------------|--------|----------|
| UI Labels | `messages/{locale}.json` | `en` |
| Dynamic DB Content (doctor names, addresses) | DB `name_en`, `name_hi`, `name_bn` | `name_en` |
| Articles | DB `content_en`, `content_hi`, `content_bn` | `content_en` |
| SEO Meta | DB `meta_title`, `meta_description` per locale | `en` |
| User-generated (reviews, questions) | Stored as-written (no auto-translate) | — |

---

## 10. LOCATION & GEOLOCATION ARCHITECTURE

### 10.1 Hierarchy Flow

```
User opens app
    │
    ▼
[1] Check localStorage (Zustand persist)
    │
    ├── Location saved? → YES → Use saved location → Skip to Home
    │
    └── NO → Show Location Setup Screen
                  │
                  ▼
    [2] Auto-Detect Flow
         │
         ├── Browser Geolocation API → lat/lng
         │
         ├── Reverse Geocode (Server API Route)
         │   → Returns: state_name, district_name
         │
         ├── Query Supabase:
         │   states (ilike name_en = state_name)
         │   districts (state_id + ilike name_en = district_name)
         │
         ├── Match found?
         │   ├── YES → Pre-fill State + District
         │   │         → User confirms or edits
         │   │         → User selects Sub-district (from DB options)
         │   │         → User selects Local Area (from DB options)
         │   │         → Save to Zustand + localStorage
         │   │
         │   └── NO (state/district not in DB yet)
         │         → Show manual cascading dropdowns
         │         → State dropdown (from DB states table)
         │         → District dropdown (filtered by state)
         │         → Sub-district dropdown (filtered by district)
         │         → Local Area dropdown (filtered by sub-district)
         │         → Save to Zustand
         │
    [3] Manual Selection Flow (if user skips auto-detect)
         → Same cascading dropdowns as above
         → "Detect My Location" button available anytime
```

### 10.2 Cascading Dropdown Logic

```typescript
// hooks/useCascadingLocation.ts
function useCascadingLocation() {
  const [stateId, setStateId] = useState<string | null>(null);
  const [districtId, setDistrictId] = useState<string | null>(null);
  const [subDistrictId, setSubDistrictId] = useState<string | null>(null);

  const { data: states } = useQuery(queryKeys.location.states, fetchStates);
  const { data: districts } = useQuery(
    queryKeys.location.districts(stateId || ''),
    () => fetchDistricts(stateId!), 
    { enabled: !!stateId }
  );
  const { data: subDistricts } = useQuery(
    queryKeys.location.subDistricts(districtId || ''),
    () => fetchSubDistricts(districtId!),
    { enabled: !!districtId }
  );
  const { data: localAreas } = useQuery(
    queryKeys.location.localAreas(subDistrictId || ''),
    () => fetchLocalAreas(subDistrictId!),
    { enabled: !!subDistrictId }
  );

  // Reset downstream selections when upstream changes
  useEffect(() => { setDistrictId(null); }, [stateId]);
  useEffect(() => { setSubDistrictId(null); }, [districtId]);

  return { states, districts, subDistricts, localAreas, setters };
}
```

### 10.3 Location-Aware Querying

All list queries (doctors, hospitals, labs) MUST include location filters if available:

```typescript
// Default query: prioritize district, fallback to state
function buildLocationFilter(location: LocationState) {
  if (location.localAreaId) return { local_area_id: location.localAreaId };
  if (location.subDistrictId) return { sub_district_id: location.subDistrictId };
  if (location.districtId) return { district_id: location.districtId };
  if (location.stateId) return { state_id: location.stateId };
  return {}; // Nationwide
}
```

### 10.4 Edge Cases

| Case | Behavior |
|------|----------|
| Geolocation denied | Show manual selector immediately |
| Geolocation timeout | Show manual selector + "Retry" button |
| State exists, district missing | Show state pre-filled, district as free text input (admin notified) |
| User in remote area with no sub-districts | Allow "Skip" → show statewide results |
| Location changed mid-session | Invalidate all location-dependent query caches |

---

## 11. SECURITY ARCHITECTURE

### 11.1 Row Level Security (RLS) — Web App Context

The existing v2 schema RLS policies are preserved. Additional policies for new tables:

```sql
-- New table RLS policies
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_test_hospital_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE dynamic_pages ENABLE ROW LEVEL SECURITY;

-- Public read policies (all new content tables)
CREATE POLICY "public_read_states" ON states FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_districts" ON districts FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_sub_districts" ON sub_districts FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_local_areas" ON local_areas FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_faqs" ON faqs FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_announcements" ON announcement_banners FOR SELECT USING (is_active = TRUE AND (end_date IS NULL OR end_date > NOW()));
CREATE POLICY "public_read_articles" ON health_articles FOR SELECT USING (is_published = TRUE);
CREATE POLICY "public_read_questions" ON health_questions FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "public_read_answers" ON health_answers FOR SELECT USING (is_approved = TRUE);
CREATE POLICY "public_read_polls" ON polls FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_lab_tests" ON lab_tests FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_blood_services" ON blood_services FOR SELECT USING (is_active = TRUE AND (expires_at IS NULL OR expires_at > NOW()));
CREATE POLICY "public_read_medicines" ON medicines FOR SELECT USING (is_active = TRUE);
CREATE POLICY "public_read_dynamic_pages" ON dynamic_pages FOR SELECT USING (is_published = TRUE);

-- User-specific policies
CREATE POLICY "user_own_favorites" ON user_favorites FOR ALL USING (user_id = auth.uid());
CREATE POLICY "user_own_history" ON user_search_history FOR ALL USING (user_id = auth.uid());
CREATE POLICY "user_own_notifications" ON user_notifications FOR ALL USING (user_id = auth.uid());

-- Public insert (anonymous voting)
CREATE POLICY "public_insert_poll_votes" ON poll_votes FOR INSERT WITH CHECK (TRUE);
```

### 11.2 Content Security Policy (CSP)

```typescript
// next.config.ts
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https://*.supabase.co https://maps.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co https://maps.googleapis.com;
  frame-src 'self' https://www.google.com;
`;

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: [{ key: 'Content-Security-Policy', value: csp.replace(/\n/g, ' ').trim() }] }];
  },
};
```

### 11.3 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| Search API | 30 req/min | IP-based (Vercel Edge Config or Upstash Redis) |
| Review Submit | 3 per doctor / 24h | IP + doctor_id |
| Question Submit | 5 per hour | auth.uid() or IP |
| Vote Submit | 1 per poll | session_id |
| OTP Request | 3 per hour | phone number |

### 11.4 Input Sanitization

- All user inputs: DOMPurify (client) + Zod validation (server)
- Phone numbers: `libphonenumber-js` validation
- Markdown content: `react-markdown` with allowed tags only (no script/iframes)
- Image uploads: Client-side canvas resize + WebP conversion before Supabase upload
- SQL Injection: Impossible via Supabase SDK (parameterized queries)

---

## 12. PERFORMANCE & SCALABILITY

### 12.1 Rendering Strategy by Route

| Route Type | Strategy | Rationale |
|-----------|----------|-----------|
| Home | SSR + ISR (revalidate 300s) | Fresh content, fast TTFB |
| Doctor/Hospital List | SSR + Client fetch | Dynamic filters, pagination |
| Doctor/Hospital Detail | SSG + ISR (revalidate 3600s) | SEO critical, content stable |
| SEO Landing Pages | SSG (`generateStaticParams`) | Build-time generation |
| Search | Client-side only | Too dynamic for SSR |
| User Dashboard | Client-side + auth guard | Personalized data |
| Articles | SSG + ISR | Content marketing |

### 12.2 Caching Strategy (TanStack Query)

| Data Type | Stale Time | Cache Time | Background Refetch |
|-----------|-----------|------------|-------------------|
| States/Districts | 1 hour | 24 hours | On window focus |
| Categories | 30 min | 24 hours | On window focus |
| Doctor List | 2 min | 10 min | Every 2 min |
| Doctor Detail | 5 min | 30 min | On window focus |
| Articles | 10 min | 1 hour | On window focus |
| Announcements | 0 | 5 min | Realtime subscription |
| User Favorites | 0 | Infinite | Manual invalidation |

### 12.3 Image Optimization

- **Next.js Image component** mandatory for all images
- **Supabase Storage** serves images via CDN
- **Format:** WebP primary, JPEG fallback
- **Sizes:** Doctor photo: 400x400 (display), 100x100 (thumbnail). Hospital cover: 800x400. Article cover: 1200x600.
- **Lazy loading:** `loading="lazy"` + IntersectionObserver for below-fold
- **Blur placeholder:** Base64 blurhash stored in DB `blurhash` column

### 12.4 Bundle Optimization

- **Route splitting:** Next.js automatic code splitting
- **Dynamic imports:** `next/dynamic` for heavy components (maps, charts, image viewers)
- **Tree shaking:** `date-fns` import specific functions only
- **Font optimization:** `next/font` for automatic subsetting

### 12.5 Scalability Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| TTFB | < 200ms | Edge caching + SSR optimization |
| LCP | < 1.5s | Image optimization + font preload |
| CLS | < 0.1 | Explicit image dimensions + skeletons |
| INP | < 200ms | Debounced inputs + virtualized lists |
| Lighthouse | 95+ | All categories |
| Concurrent users | 10,000 | Vercel Edge + Supabase connection pooling |
| DB rows | 1M+ doctors | Proper indexing + read replicas |

---

## 13. PWA & OFFLINE ARCHITECTURE

### 13.1 Service Worker (Serwist)

```typescript
// app/sw.ts
import { defaultCache } from '@serwist/next/browser';
import { Serwist } from 'serwist';

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ url }) => url.pathname.startsWith('/api/'),
      handler: 'NetworkFirst',
      options: { cacheName: 'api-cache', expiration: { maxEntries: 100, maxAgeSeconds: 300 } },
    },
    {
      matcher: ({ url }) => url.host.includes('supabase.co'),
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'supabase-cache', expiration: { maxEntries: 500, maxAgeSeconds: 3600 } },
    },
  ],
});

serwist.addEventListeners();
```

### 13.2 Offline Fallback Strategy

| Data Type | Offline Behavior | Cache Source |
|-----------|-----------------|--------------|
| Static assets | Cache-first | Service Worker precache |
| Doctor/Hospital lists | Stale-while-revalidate | TanStack Query + SW |
| Doctor profiles | Cache + background update | IndexedDB (via Query cache) |
| Search | Queue for retry | No offline search (show "Search when online") |
| Reviews/Questions | Queue in IndexedDB, sync when online | Background sync API |
| Emergency contacts | Pre-cache permanently | SW runtime cache (never expires) |

### 13.3 Offline UI States

```typescript
// hooks/useNetworkStatus.ts
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    const handle = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handle);
    window.addEventListener('offline', handle);
    return () => {
      window.removeEventListener('online', handle);
      window.removeEventListener('offline', handle);
    };
  }, []);
  return isOnline;
}

// Usage: Show banner when offline
// <OfflineBanner /> appears at top of screen when !isOnline
```

### 13.4 PWA Manifest

```json
{
  "name": "Vytanexa — Healthcare Discovery",
  "short_name": "Vytanexa",
  "description": "Find doctors, hospitals, labs, and blood services across India",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F4F7FB",
  "theme_color": "#1A6FBA",
  "orientation": "portrait",
  "icons": [
    { "src": "/icon-72x72.png", "sizes": "72x72" },
    { "src": "/icon-192x192.png", "sizes": "192x192" },
    { "src": "/icon-512x512.png", "sizes": "512x512", "purpose": "maskable" }
  ],
  "screenshots": [
    { "src": "/screenshot-home.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" }
  ]
}
```

---

## 14. DEPLOYMENT ARCHITECTURE

### 14.1 Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["bom1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/sitemap.xml", "destination": "/api/sitemap" },
    { "source": "/robots.txt", "destination": "/api/robots" }
  ]
}
```

### 14.2 Environment Strategy

| Environment | Branch | URL | Supabase Project |
|-------------|--------|-----|-----------------|
| Development | `dev` | `localhost:3000` | `vytanexa-dev` |
| Staging | `staging` | `staging.vytanexa.vercel.app` | `vytanexa-staging` |
| Production | `main` | `vytanexa.in` | `vytanexa-prod` |

### 14.3 Build Pipeline

```
Git Push to main
    │
    ▼
Vercel Build
    ├── Lint + Type Check
    ├── Build SSG pages (SEO landings, articles)
    ├── Generate PWA assets
    └── Deploy to Edge Network
    │
    ▼
Post-Deploy
    ├── Purge CDN cache
    ├── Revalidate ISR pages
    └── Notify Sentry release
```

---

## 15. ENVIRONMENT VARIABLES REFERENCE

```bash
# ── Public (prefixed with NEXT_PUBLIC_, exposed to browser) ──
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_STORAGE_BASE_URL=https://<project>.supabase.co/storage/v1/object/public
NEXT_PUBLIC_APP_URL=https://vytanexa.in
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<maps-key>  # Restricted to vytanexa.in

# ── Server-only (NEVER prefix with NEXT_PUBLIC_) ──
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # Server Actions + API Routes only
DATABASE_URL=<direct-connection-string>  # For migrations (if using Prisma)

# ── Auth ──
NEXT_PUBLIC_AUTH_OTP_EXPIRY=300  # seconds

# ── External APIs ──
GOOGLE_MAPS_GEOCODING_API_KEY=<server-side-geocoding-key>

# ── Analytics (optional) ──
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vytanexa.in

# ── Feature Flags ──
NEXT_PUBLIC_ENABLE_QA=true
NEXT_PUBLIC_ENABLE_POLLS=true
NEXT_PUBLIC_ENABLE_BLOOD_SERVICES=true
```

---

## 16. PROJECT FOLDER STRUCTURE

```
vytanexa-web/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── transparency/page.tsx
│   │   ├── how-to-use/page.tsx
│   │   └── support/page.tsx
│   ├── (discovery)/
│   │   ├── doctors/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── hospitals/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── symptoms/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── labs/page.tsx
│   │   ├── blood-services/page.tsx
│   │   └── emergency/page.tsx
│   ├── (content)/
│   │   ├── magazine/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── qa/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── ask/page.tsx
│   │   ├── polls/page.tsx
│   │   └── faq/page.tsx
│   ├── (search)/
│   │   └── search/page.tsx
│   ├── (seo)/
│   │   └── [state]/[district]/
│   │       ├── page.tsx
│   │       └── [specialty]/page.tsx
│   ├── (user)/
│   │   ├── login/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── favorites/page.tsx
│   │   └── history/page.tsx
│   ├── (system)/
│   │   ├── settings/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── offline/page.tsx
│   ├── api/
│   │   ├── geocode/reverse/route.ts
│   │   ├── search/route.ts
│   │   ├── sitemap/route.ts
│   │   ├── robots/route.ts
│   │   ├── submit-review/route.ts
│   │   ├── submit-question/route.ts
│   │   └── analytics/route.ts
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── layout/                # Navbar, BottomNav, TopBar, Footer
│   ├── cards/                 # DoctorCard, HospitalCard, ArticleCard, etc.
│   ├── forms/                 # Input wrappers, SearchBar, FilterSheet
│   ├── modals/                # Modal shells, BottomSheet
│   ├── skeletons/             # Loading placeholders
│   ├── maps/                  # MapEmbed, LocationPicker
│   └── shared/                # EmptyState, ErrorState, OfflineBanner
│
├── hooks/
│   ├── useLocation.ts
│   ├── useAuth.ts
│   ├── useNetworkStatus.ts
│   ├── useRealtime.ts
│   ├── useDebounce.ts
│   └── useInfiniteScroll.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── queryKeys.ts
│   ├── utils.ts
│   └── constants.ts
│
├── stores/
│   ├── locationStore.ts
│   ├── authStore.ts
│   └── uiStore.ts
│
├── types/
│   ├── database.ts            # Generated Supabase types
│   ├── location.ts
│   ├── doctor.ts
│   ├── hospital.ts
│   └── api.ts
│
├── messages/                  # i18n translation files
│   ├── en.json
│   ├── hi.json
│   └── bn.json
│
├── public/
│   ├── icons/
│   ├── images/
│   ├── manifest.json
│   └── sw.ts
│
├── actions/                   # Server Actions
│   ├── reviews.ts
│   ├── questions.ts
│   ├── submissions.ts
│   └── votes.ts
│
├── middleware.ts              # Locale detection + auth guards
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 17. DATA FLOW DIAGRAMS

### 17.1 Doctor Discovery Flow

```
User Action (tap category / search / symptom)
    │
    ▼
Zustand: Check location state
    │
    ▼
TanStack Query: Check cache (stale-while-revalidate)
    │
    ├── Cache HIT + Fresh → Return immediately
    │
    └── Cache MISS / Stale
              │
              ▼
        Supabase Client (anon key)
              │
              ├── RLS Policy Check (public_read_verified_doctors)
              │
              ├── Query Execution (indexed filters: district_id, specialty, is_deleted=FALSE)
              │
              └── Response
                    │
                    ▼
              TanStack Query: Update cache
                    │
                    ▼
              React Components: Re-render with data
                    │
                    ▼
              UI: DoctorCard list displayed
```

### 17.2 Review Submission Flow

```
User fills review form → taps Submit
    │
    ▼
Client Validation (Zod schema)
    │
    ▼
Server Action (submitReview)
    │
    ├── Honeypot check (must be empty)
    ├── Rate limit check (IP + doctor_id)
    ├── Input sanitization (DOMPurify)
    │
    ▼
Supabase Server Client (Service Role for INSERT)
    │
    ├── Insert into reviews (status='pending')
    ├── Trigger: recalculate_doctor_rating() (async)
    │
    ▼
Response: { success: true }
    │
    ▼
UI: Toast "Review submitted for moderation"
    │
    ▼
TanStack Query: invalidateQueries(['doctors', 'detail', slug])
```

### 17.3 Location Auto-Detect Flow

```
App Mount / User taps "Detect Location"
    │
    ▼
navigator.geolocation.getCurrentPosition()
    │
    ├── Permission DENIED → Show manual selector
    │
    └── Position: { lat, lng }
              │
              ▼
        API Route: /api/geocode/reverse?lat=&lng=
              │
              ├── Google Maps Reverse Geocoding (server-side)
              ├── Extract state, district names
              │
              ▼
        Supabase: Match state → Match district
              │
              ├── Match FOUND
              │   ├── Return { stateId, districtId }
              │   ├── Zustand: setLocation()
              │   └── UI: Show confirmation + sub-district selector
              │
              └── Match NOT FOUND
                    ├── Return { raw: stateName, districtName }
                    ├── UI: Pre-fill text inputs + "Suggest Location"
                    └── Log to analytics (missing location data)
```

### 17.4 Realtime Notification Flow

```
Admin publishes announcement via Admin Panel
    │
    ▼
Supabase: INSERT into announcement_banners
    │
    ▼
PostgreSQL NOTIFY → Realtime broadcast
    │
    ▼
Web App subscribers (useRealtimeAnnouncements hook)
    │
    ▼
TanStack Query: invalidateQueries(['announcement_banners'])
    │
    ▼
UI: Banner slides down from top (Framer Motion)
    │
    ▼
User dismisses → Zustand uiStore.dismissAnnouncement(id)
```

---

*End of Architecture Specification*
