# 🏥 উত্তরবঙ্গ স্বাস্থ্য সেতু (Uttarbanga Swasthya Setu)
## Ultra Pro Max — Production-Grade Local Healthcare Discovery Platform
### Technical Product Blueprint v1.0
**Target Region:** Cooch Behar • Siliguri • Darjeeling • Tufanganj • Dinhata • Mekhliganj • Alipurduar • Jalpaiguri
**Build Team:** Solo Developer + Claude AI
**Timeline:** 25 Days
**Prepared by:** Claude Sonnet (PM + Architect + UX Strategist)

---

> **Core Philosophy:** "Every person in North Bengal deserves to find the right doctor — in their language, from their phone, in under 30 seconds."

---

## 📋 TABLE OF CONTENTS

```
PART A — PRODUCT IDENTITY & VISION
  A1. Product Positioning
  A2. Brand Identity System
  A3. Target User Personas

PART B — INFORMATION ARCHITECTURE
  B1. Site Map & Route Structure
  B2. Navigation System
  B3. Content Hierarchy

PART C — PAGE-BY-PAGE BLUEPRINT
  C1.  Splash / Onboarding
  C2.  Home Page
  C3.  Doctor List Page
  C4.  Doctor Profile Page
  C5.  Hospital / Diagnostics Page
  C6.  Symptoms Page
  C7.  More / Profile Page
  C8.  About App Page
  C9.  Support Page
  C10. Search Results Page
  C11. City Landing Pages (SEO)
  C12. Offline Page

PART D — COMPONENT SYSTEM
  D1. Design Tokens
  D2. Card Components
  D3. Navigation Components
  D4. Modal System
  D5. Ad Components
  D6. Form Components

PART E — DATA ARCHITECTURE
  E1. Database Schema (Supabase / PostgreSQL)
  E2. API Design
  E3. Data Flow Diagrams
  E4. Search Architecture

PART F — TECHNICAL ARCHITECTURE
  F1. Tech Stack Decision
  F2. Project Folder Structure
  F3. PWA Architecture
  F4. Performance Strategy
  F5. Offline Strategy
  F6. Image Optimization Pipeline

PART G — UX DESIGN SYSTEM
  G1. Color System
  G2. Typography System
  G3. Spacing & Layout Grid
  G4. Animation & Motion
  G5. Bengali-First UX Principles
  G6. Accessibility Guidelines

PART H — FEATURE SPECIFICATIONS
  H1. Smart Search Engine
  H2. Symptom-to-Doctor Engine
  H3. Review & Rating System
  H4. Ad & Monetization System
  H5. Emergency Quick Actions
  H6. Local Area Detection
  H7. PWA Install Flow

PART I — SEO STRATEGY
  I1. URL Architecture
  I2. Schema Markup
  I3. Meta Strategy
  I4. Sitemap Structure

PART J — MONETIZATION BLUEPRINT
  J1. Revenue Streams
  J2. Ad Placement Map
  J3. Pricing Model

PART K — SECURITY & ADMIN
  K1. Security Measures
  K2. Admin Panel Scope
  K3. Content Moderation

PART L — 25-DAY EXECUTION ROADMAP
  L1. Week 1 Tasks
  L2. Week 2 Tasks
  L3. Week 3 Tasks
  L4. Buffer Days

PART M — FUTURE ROADMAP
  M1. Phase 2 — Accounts & Favorites
  M2. Phase 3 — Live Queue System
  M3. Phase 4 — AI Health Assistant
```

---

# PART A — PRODUCT IDENTITY & VISION

## A1. Product Positioning

### Product Name
**Primary:** উত্তরবঙ্গ স্বাস্থ্য সেতু
**English:** Uttarbanga Swasthya Setu
**Tagline (Bengali):** ঘরে বসেই পান সেরা ডাক্তারের খোঁজ
**Tagline (English):** North Bengal's Healthcare Discovery Platform

### What It Is
NOT just a doctor listing website.
It is a **healthcare navigation ecosystem** — combining:
- Doctor Discovery Engine
- Symptom-Based Health Guidance
- Hospital & Diagnostic Finder
- Chamber Workflow Platform
- Local Healthcare Search Engine
- Future Digital Queue Infrastructure

### Why It Will Win
| Bangladesh App (Inspiration) | Our Version |
|---|---|
| App-only | Web + PWA (installable) |
| No SEO | SEO-first architecture |
| Slow on weak networks | Optimized for 3G/4G |
| Single city | All of North Bengal |
| No structured data | Schema markup on every page |
| Basic search | Smart bilingual search |
| No offline support | Full offline cache |
| No structured URLs | City/specialty URL system |

---

## A2. Brand Identity System

### Logo Concept
- **Icon:** Stylized stethoscope merged with a mountain silhouette (represents North Bengal / Himalayas)
- **Mark:** Circular badge form — professional + trustworthy
- **Style:** Clean vector, 2-color (primary blue + white)
- **Do NOT copy:** Bangladesh app's exact logo, name, color, illustrations

### Color Brand
| Token | Hex | Usage |
|---|---|---|
| --brand-primary | #1A6FBA | Primary actions, headers |
| --brand-secondary | #0D9E6A | Success, verified badges |
| --brand-accent | #F5A623 | Ratings, highlights |
| --brand-emergency | #E53E3E | Emergency, alerts |
| --brand-bg | #F4F7FB | Page backgrounds |
| --brand-surface | #FFFFFF | Cards, modals |
| --brand-text | #1A202C | Primary text |
| --brand-muted | #718096 | Secondary text |

### Typography Brand
- **Display/Headings:** Hind Siliguri (Google Fonts) — native Bengali feel
- **Body:** Noto Sans Bengali — maximum readability
- **Numbers/English:** Nunito — friendly, modern
- **Icons:** Custom SVG icon set (no external icon library dependency)

---

## A3. Target User Personas

### Persona 1 — রমেশ বাবু (Ramesh Babu)
- Age: 52 | Cooch Behar Town
- Device: Mid-range Android, Chrome
- Network: 4G (sometimes drops to 3G)
- Literacy: Bengali-primary, basic English
- Need: Find medicine specialist near Cooch Behar for diabetes follow-up
- Pain Point: Doesn't know which doctor is available when, or their chamber address
- **Our Solution:** Category → Diabetes → Doctors near Cooch Behar → Call button

### Persona 2 — সুমনা দেবী (Sumana Devi)
- Age: 28 | Tufanganj
- Device: Budget Android, UC Browser
- Network: 3G, unreliable
- Literacy: Bengali-only
- Need: Gynecology consultation during pregnancy
- Pain Point: Doesn't know English medical terms, can't navigate complex apps
- **Our Solution:** Symptom tile (pregnancy image) → Gynecology doctors → WhatsApp button

### Persona 3 — Dr. Tapas Roy
- Age: 45 | Siliguri
- Device: iPhone, premium user
- Network: WiFi + 5G
- Need: His patients to easily find his chamber info
- **Our Solution:** Doctor Profile Page with chamber details, Google Maps, timing, fee

### Persona 4 — আকাশ (Akash)
- Age: 19 | Dinhata
- Device: Budget Android
- Network: 4G
- Need: Emergency — find nearest hospital at night
- **Our Solution:** Emergency FAB → Ambulance numbers → Nearest hospitals

---

# PART B — INFORMATION ARCHITECTURE

## B1. Site Map & Route Structure

```
/                               → Home Page
/doctors                        → All Doctors (paginated)
/doctors?specialty=medicine     → Filtered by specialty
/doctors?city=coochbehar        → Filtered by city
/doctors?area=tufanganj         → Filtered by area
/doctor/[slug]                  → Doctor Profile Page
/hospitals                      → All Hospitals & Diagnostics
/hospital/[slug]                → Hospital Detail Page
/symptoms                       → Symptoms Grid Page
/symptoms/[slug]                → Symptom Detail → Recommended Doctors
/more                           → More Options Page
/about                          → About App Page
/support                        → Support/Contact Page
/privacy                        → Privacy Policy

--- SEO CITY LANDING PAGES ---
/cooch-behar                    → Cooch Behar Healthcare Hub
/cooch-behar/medicine           → Medicine Doctors in Cooch Behar
/cooch-behar/cardiologist       → Cardiologists in Cooch Behar
/siliguri                       → Siliguri Healthcare Hub
/siliguri/medicine              → Medicine Doctors in Siliguri
/tufanganj/child-specialist     → Child Specialists in Tufanganj
/dinhata/gynecologist           → Gynecologists in Dinhata
... (all city × specialty combinations)

--- SEARCH ---
/search?q=[query]               → Search Results Page

--- OFFLINE ---
/offline                        → Offline fallback page
```

---

## B2. Navigation System

### Bottom Navigation Bar (Mobile-First, Sticky)
```
[ 🏠 Home ] [ 👨‍⚕️ Doctors ] [ 🏥 Hospitals ] [ 🩺 Symptoms ] [ ☰ More ]
  হোম         ডাক্তার       হাসপাতাল       উপসর্গ          আরো
```

**Design Specs:**
- Height: 64px (touch-safe)
- Background: #FFFFFF
- Top border: 1px solid #E2E8F0
- Active icon: --brand-primary (#1A6FBA) + filled variant
- Inactive: #A0AEC0 + outline variant
- Active label: bold, colored
- Transition: 150ms ease color change
- Safe area: padding-bottom for iOS home indicator

### Top App Bar (Per Page)
```
[ ← Back ]  [ PAGE TITLE ]  [ ⋮ Menu ] 
```
- Height: 56px
- Background: #FFFFFF (or transparent on profile pages)
- Shadow: 0 1px 3px rgba(0,0,0,0.08)
- Logo: only on Home page top bar

### Floating Action Button (Emergency)
```
  [ 🚨 ]  ← Fixed bottom-right, above navbar
```
Expands to:
- 🚑 Ambulance
- 🩸 Blood Bank
- 📞 Emergency Helpline

---

## B3. Content Hierarchy

### Information Priority (per page)
```
Home:
  1. Featured/Banner Ads
  2. Category Grid (fastest path to value)
  3. Popular Doctors
  4. Native Ads
  5. Trending Hospitals

Doctor Profile:
  1. Doctor Identity (name, specialty, image)
  2. Chamber Info (most-needed info)
  3. Contact Buttons (call/WhatsApp)
  4. Reviews (trust building)
  5. Full Bio (secondary)

Hospital:
  1. Name + Emergency status
  2. Phone (most-needed)
  3. Address + Maps
  4. Services
  5. Timing
```

---

# PART C — PAGE-BY-PAGE BLUEPRINT

## C1. Splash / Onboarding Screen

### Visual
- Full-screen illustration: doctor + North Bengal mountain skyline silhouette
- App logo centered
- App name in Hind Siliguri bold
- Tagline in Bengali
- Soft animated gradient background (blue → teal)
- Progress bar (2-second load indicator)

### Onboarding Flow (First-Time Only)
**Screen 1:** "আপনার এলাকার সেরা ডাক্তার খুঁজুন" + doctor illustration
**Screen 2:** "উপসর্গ দেখে বুঝুন কোন ডাক্তার দেখাবেন" + symptoms illustration
**Screen 3:** "হাসপাতাল ও ডায়াগনস্টিকের সব তথ্য" + hospital illustration
**CTA:** "শুরু করুন" button → Home

Storage: `localStorage.setItem('onboarding_done', true)` — skip on return visits.

---

## C2. Home Page

### Section 1 — Sticky Top Bar
```
[Logo + App Name]                          [🔍 Search] [⋮]
```

### Section 2 — Location Chip (Auto-Detected)
```
📍 কুচবিহার   [পরিবর্তন করুন ▾]
```
- Shows current detected city
- Tap to change city dropdown
- Persists in localStorage

### Section 3 — Hero Banner Slider
```
┌─────────────────────────────────┐
│  [DOCTOR PROMOTION BANNER]      │
│  [DIAGNOSTIC PACKAGE AD]        │
│  [HEALTH AWARENESS CAMPAIGN]    │
│  [PHARMACY AD]                  │
└─────────────────────────────────┘
              ● ○ ○ ○
```
**Specs:**
- Aspect ratio: 16:9
- Auto-advance: 4500ms
- Manual swipe: CSS scroll-snap
- Pagination dots: below slider
- Rounded corners: 12px
- Shadow: 0 4px 16px rgba(26,111,186,0.15)
- Banner count: 3-5 rotating
- Tap: opens target URL

### Section 4 — Quick Stats Bar
```
[👨‍⚕️ ১২০+ ডাক্তার] [🏥 ৪৫+ হাসপাতাল] [🏙️ ৮টি শহর]
```
- Horizontal scroll row
- Blue icon + bold number + description
- Animates count on page load

### Section 5 — Category Grid
**Title:** "বিভাগ অনুযায়ী ডাক্তার খুঁজুন"
**Subtitle:** "আপনার প্রয়োজন অনুযায়ী বিভাগ বেছে নিন"

```
Grid Layout: 3 columns × N rows

┌──────────┬──────────┬──────────┐
│ [💊]     │ [👂]     │ [🫁]     │
│ মেডিসিন  │ কান,নাক  │ বক্ষব্যাধি│
├──────────┼──────────┼──────────┤
│ [👶]     │ [🫀]     │ [🧠]     │
│ শিশু রোগ │ হৃদরোগ  │ নিউরো    │
├──────────┼──────────┼──────────┤
│ [👁️]     │ [🦷]     │ [🦴]     │
│ চক্ষু    │ দন্ত     │ অর্থো    │
├──────────┼──────────┼──────────┤
│ [🫂]     │ [🩺]     │ [🧬]     │
│ স্ত্রীরোগ │ ডায়াবেটিস│ ক্যান্সার │
└──────────┴──────────┴──────────┘
        [সব বিভাগ দেখুন →]
```

**Card Specs:**
- Background: #FFFFFF
- Border-radius: 16px
- Shadow: 0 2px 8px rgba(0,0,0,0.06)
- Icon: 48px SVG (blue, custom)
- Label: 13px Bengali, center-aligned
- Active/pressed: scale(0.96) + shadow deepens
- Tap: route to /doctors?specialty=[slug]

**Full Category List:**
```
medicine, ent, pulmonology, gynecology-obstetrics,
child-specialist, cardiology, neurology, nephrology,
orthopedics, ophthalmology, dental, urology,
dermatology-venereology, psychiatry, diabetes-endocrinology,
gastroenterology, oncology, neurosurgery, general-surgery,
liver-gastro, plastic-surgery, rheumatology
```

### Section 6 — Popular Doctors
**Title:** "জনপ্রিয় বিশেষজ্ঞ ডাক্তার"
**Subtitle:** "সর্বোচ্চ রেটিং ও রিভিউ অনুযায়ী"

**Doctor Card (Compact List Style):**
```
┌─────────────────────────────────────────┐
│ ┌──────┐  Dr. _____________ [✅ Verified]│
│ │ IMG  │  এম.বি.বি.এস, এম.ডি (মেডিসিন) │
│ │      │  [মেডিসিন বিশেষজ্ঞ]           │
│ └──────┘  🏥 মেডিকেল কলেজ হাসপাতাল    │
│           ⭐⭐⭐⭐⭐ 4.8  (১২ রিভিউ)     │
│           📍 কুচবিহার | 💰 ₹৩০০         │
│  [📞 কল করুন] [💬 WhatsApp] [→ বিস্তারিত]│
└─────────────────────────────────────────┘
```

**Card Specs:**
- Width: 100% (full-width cards on mobile)
- Image: 72×72px, circular, lazy-loaded
- Specialty badge: pill shape, blue bg
- Stars: custom SVG stars (not emoji)
- Badges: "Verified ✅", "Popular 🔥", "Available Today 🟢"
- Buttons: 3-button row, equal width
- Shadow: 0 2px 12px rgba(0,0,0,0.07)
- Border-radius: 16px

**Doctor Card Badges Logic:**
```
Verified → manually flagged in DB
Popular → review_count >= 5
Available Today → matched against today's chamber timing
Featured → sponsored (paid)
```

### Section 7 — Native Ad (After 4 doctors)
```
┌─────────────────────────────────────────┐
│ [SPONSORED]          Pharmacy Name      │
│ ══════════════════════════════════════  │
│   💊 ওষুধ হোম ডেলিভারি — ২৪ ঘণ্টা    │
│   কুচবিহারে বিনামূল্যে ডেলিভারি       │
│                      [এখনই অর্ডার করুন]│
└─────────────────────────────────────────┘
```
- Labeled "Sponsored" in gray
- Native card style (same card design)
- Loaded from ads table

### Section 8 — Trending Hospitals
**Title:** "কাছের হাসপাতাল ও ডায়াগনস্টিক"
**Layout:** Horizontal scroll cards

```
─────────────────────────────────────────────────►
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [BLDG IMAGE] │ │ [BLDG IMAGE] │ │ [BLDG IMAGE] │
│ Hospital A   │ │ Hospital B   │ │ Hospital C   │
│ 📍 কুচবিহার  │ │ 📍 তুফানগঞ্জ  │ │ 📍 দিনহাটা   │
│ 📞 xxxxxxx  │ │ 📞 xxxxxxx  │ │ 📞 xxxxxxx  │
│ [🗺️ নেভিগেট] │ │ [🗺️ নেভিগেট] │ │ [🗺️ নেভিগেট] │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## C3. Doctor List Page

### Layout
```
┌─────────────────────────────────────────┐
│ ← ডাক্তার খুঁজুন          🔍 ফিল্টার ⚙️│
├─────────────────────────────────────────┤
│ [Search bar: নাম, বিভাগ, এলাকা লিখুন...] │
├─────────────────────────────────────────┤
│ [মেডিসিন] [শিশু] [হৃদ] [চর্ম] [নিউরো→] │ ← Filter chips
├─────────────────────────────────────────┤
│ Sorting: [সেরা রেটিং ▾]  ১২০ জন পাওয়া গেছে│
├─────────────────────────────────────────┤
│ [Doctor Card 1]                         │
│ [Doctor Card 2]                         │
│ [Doctor Card 3]                         │
│ [Doctor Card 4]                         │
│ ────── SPONSORED ──────                 │
│ [Ad Card]                               │
│ [Doctor Card 5]                         │
│ ...                                     │
│ [Load More / Infinite Scroll]           │
└─────────────────────────────────────────┘
```

### Filter System (Full Sheet Modal)
**Filter Categories:**
```
বিভাগ (Specialty)
  ○ মেডিসিন  ○ হৃদরোগ  ○ শিশু  ○ নিউরো...

শহর (City)
  ○ কুচবিহার  ○ শিলিগুড়ি  ○ তুফানগঞ্জ  ○ দিনহাটা...

এলাকা (Area)
  ○ সদর  ○ মেখলিগঞ্জ  ○ মাথাভাঙ্গা...

ভিজিট ফি (Fee Range)
  [₹0 ──●────── ₹1000]

রেটিং
  ○ ⭐ 4+ রেটিং  ○ যেকোনো

[রিসেট] [ফলাফল দেখান →]
```

### Sorting Options
```
○ সেরা রেটিং (highest rating)
○ সবচেয়ে বেশি রিভিউ (most reviewed)
○ কম ভিজিট ফি (lowest fee)
○ বেশি অভিজ্ঞতা (most experience)
○ আজ পাওয়া যাবে (available today)
```

---

## C4. Doctor Profile Page — ★ MOST IMPORTANT ★

### Top Section — Hero Card
```
┌─────────────────────────────────────────┐
│  ┌──────────────┐  [মেডিসিন বিশেষজ্ঞ]  │
│  │              │  Dr. Full Name         │
│  │  HD PHOTO    │  MBBS, MD (Medicine)  │
│  │   160×160    │  ৮+ বছরের অভিজ্ঞতা   │
│  └──────────────┘  ⭐⭐⭐⭐⭐ 5.0 (৮ রিভিউ)│
│                   [✅ Verified Doctor]   │
│  🏥 Mymensingh Medical (position)       │
│                                         │
│  [📞 Call] [💬 WhatsApp] [🗓️ Appointment]│
└─────────────────────────────────────────┘
```

### Sticky Tab Bar
```
[তথ্য] [চেম্বার] [রিভিউ] [অ্যাপয়েন্টমেন্ট]
```
- Sticky on scroll (top: 56px)
- Active tab: bottom border blue + bold text
- Smooth scroll to section

### TAB 1 — তথ্য (Information)

**Qualification Block:**
```
🎓 শিক্ষাগত যোগ্যতা
─────────────────────
MBBS — Medical College (2010)
MD Medicine — National (2015)
FCPS — (2018)
Fellowship — USA (2020)
```

**Expertise Block:**
```
🏆 বিশেষজ্ঞতা
─────────────────────
গ্যাস্ট্রোলিভার রোগ
বক্ষব্যাধি
হৃদরোগ
কিডনি রোগ
ডায়াবেটিস
নিউরোলজি
```

**Treats Block:**
```
💊 যেসব রোগের চিকিৎসা দেন
─────────────────────────────
• জ্বর, কাশি, সর্দি           • ডায়াবেটিস
• গ্যাস্ট্রিকের সমস্যা         • রক্তচাপ
• বমি ভাব / বমি              • বুক জ্বালা
[আরো দেখুন...]
```

**BMDC Registration:**
```
🏛️ BMDC Registration: A-12345
```

**Languages:**
```
🗣️ ভাষা: বাংলা • English • হিন্দি
```

### TAB 2 — চেম্বার (Chambers)

**Chamber Card (one per chamber):**
```
┌─────────────────────────────────────────┐
│ 🏥 প্রান্ত ডায়াগনস্টিক সেন্টার         │
│ 📍 ২১১, চরপাড়া, কুচবিহার               │
│                                         │
│ ⏰ সময়সূচি:                             │
│   শনি–বৃহঃ: বিকেল ৩টা – রাত ৯টা       │
│   শুক্রবার: বন্ধ                        │
│                                         │
│ 💰 ভিজিট ফি: ₹৩০০                      │
│ 📞 সিরিয়ালের জন্য: 01888-042171        │
│                                         │
│ [📞 কল] [💬 WhatsApp] [🗺️ দিকনির্দেশনা]│
└─────────────────────────────────────────┘
```

### TAB 3 — রিভিউ (Reviews)

**Review Summary:**
```
     5.0
  ⭐⭐⭐⭐⭐
   ৮ রিভিউ

5 ★ ████████████████ 7
4 ★ ████░░░░░░░░░░░░ 1
3 ★ ░░░░░░░░░░░░░░░░ 0
2 ★ ░░░░░░░░░░░░░░░░ 0
1 ★ ░░░░░░░░░░░░░░░░ 0
```

**Individual Review Card:**
```
┌─────────────────────────────────────────┐
│ [👤] Mst. Shiuly Akter  📅 22 Apr 2026  │
│      ⭐⭐⭐⭐⭐                           │
│ ওনার চিকিৎসা অনেক ভালো। ধৈর্য সহকারে  │
│ সময় দিয়ে রোগীর সমস্যা কথা শুনেন।     │
└─────────────────────────────────────────┘
```

**Floating CTA:**
```
[+ রিভিউ দিন]  ← sticky bottom button
```

**Review Submission Modal:**
```
আপনার রিভিউ দিন
──────────────────
নাম: [________________]
রেটিং: ☆ ☆ ☆ ☆ ☆
আপনার অভিজ্ঞতা:
[________________________]
[________________________]
[সাবমিট করুন]
```

### TAB 4 — অ্যাপয়েন্টমেন্ট
```
📅 অ্যাপয়েন্টমেন্ট নিন

চেম্বার বেছে নিন:
○ প্রান্ত ডায়াগনস্টিক (বিকেল ৩টা–রাত ৯টা)
○ অন্য চেম্বার (যোগাযোগ করুন)

আজকের তারিখ: ২০ মে ২০২৬ | শনিবার
স্ট্যাটাস: 🟢 চেম্বার আজ খোলা

[📞 ফোনে অ্যাপয়েন্টমেন্ট]
[💬 WhatsApp-এ অ্যাপয়েন্টমেন্ট]
```

### Floating Sticky Bottom Bar
```
[💰 ভিজিট: ₹৩০০]  [📞 সিরিয়াল নিন]  ← Always visible
```

---

## C5. Hospital / Diagnostics Page

### Page Header
```
← হাসপাতাল ও ডায়াগনস্টিক    [🔍] [⚙️ ফিল্টার]
```

### Filter Tabs
```
[সব] [হাসপাতাল] [ডায়াগনস্টিক] [নার্সিং হোম] [ক্লিনিক]
```

### Hospital Card
```
┌─────────────────────────────────────────┐
│ ┌────────┐  Hospital Full Name          │
│ │BLDG IMG│  📍 Address, City            │
│ │        │  📞 Hotline: +91-XXXXXXXXXX  │
│ └────────┘  ⏰ সোম–শনি: ৮টা–৮টা        │
│             🟢 ICU উপলব্ধ  🚑 অ্যাম্বুলেন্স│
│  [📞 কল] [🗺️ দিকনির্দেশনা] [→ বিস্তারিত]│
└─────────────────────────────────────────┘
```

### Hospital Detail Page
**Sections:**
1. Hero image gallery (horizontal scroll)
2. Name + Emergency status badge
3. Contact buttons row
4. Services list (tags)
5. Available tests (tags)
6. Timing table (day-by-day)
7. Doctors at this hospital (linked cards)
8. Location map embed / link
9. Photos section

---

## C6. Symptoms Page

### Page Header
```
← উপসর্গ অনুযায়ী ডাক্তার    🔍
```

### Hero Text
```
এই লক্ষণগুলোর কোনোটি আছে কি?
──────────────────────────────
উপসর্গ বেছে নিন — সঠিক বিশেষজ্ঞ খুঁজুন
```

### Symptom Grid (2 columns, large cards)
```
┌─────────────────┬─────────────────┐
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ জ্বর, ঠান্ডা    │ মাথাব্যথা/মাইগ্রেন│
│ ফ্লু, অ্যালার্জি │                 │
├─────────────────┼─────────────────┤
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ বুকে ব্যথা      │ ডায়াবেটিস সমস্যা│
├─────────────────┼─────────────────┤
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ কিডনি সমস্যা    │ শ্বাসকষ্ট/কাশি  │
├─────────────────┼─────────────────┤
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ গর্ভাবস্থা সমস্যা│ চোখের সমস্যা   │
├─────────────────┼─────────────────┤
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ চুলকানি/চর্মরোগ  │ পেটের সমস্যা   │
├─────────────────┼─────────────────┤
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ শিশু রোগ সমস্যা │ যৌন সমস্যা     │
├─────────────────┼─────────────────┤
│ [REAL PHOTO]    │ [REAL PHOTO]    │
│ হাড়/জয়েন্ট ব্যথা│ মানসিক সমস্যা  │
└─────────────────┴─────────────────┘
```

**Card Specs:**
- Height: 140px
- Image: fills top 80% of card (real photographic stock)
- Text: bottom 20%, white, bold, on dark gradient overlay
- Border-radius: 16px
- Shadow: 0 4px 12px rgba(0,0,0,0.12)

### Symptom Detail Page (after tap)
```
← জ্বর, ঠান্ডা ও ফ্লু                       
──────────────────────────────────────────
[SYMPTOM HERO IMAGE]

এই উপসর্গে কোন ডাক্তার দেখাবেন:
  🏷️ মেডিসিন বিশেষজ্ঞ
  🏷️ শিশু বিশেষজ্ঞ (শিশুদের ক্ষেত্রে)
  🏷️ বক্ষব্যাধি বিশেষজ্ঞ

সম্পর্কিত ডাক্তার:
[Doctor Card 1]
[Doctor Card 2]
[Doctor Card 3]
[আরো ডাক্তার দেখুন →]
```

### Symptom → Specialty Mapping (DB Table)
```
fever             → medicine, pediatrics, pulmonology
headache          → neurology, medicine
chest-pain        → cardiology, medicine
diabetes          → endocrinology, medicine
kidney-problem    → nephrology, medicine, urology
pregnancy         → gynecology-obstetrics
eye-problem       → ophthalmology
allergy-skin      → dermatology, medicine
breathing-problem → pulmonology, medicine
child-illness     → pediatrics
joint-pain        → orthopedics, rheumatology
mental-health     → psychiatry
dental-pain       → dental
uti-urology       → urology, nephrology
stomach-liver     → gastroenterology, medicine
```

---

## C7. More / Profile Page

### Grid Menu
```
← সেবা ও সহায়তা

┌──────────────────┬──────────────────┐
│ [👨‍⚕️]            │ [📱]              │
│ ডাক্তার/হাসপাতাল │ অ্যাপ সম্পর্কে  │
│ যুক্ত করুন       │                  │
├──────────────────┼──────────────────┐
│ [🎧]             │ [🔒]             │
│ সাপোর্ট টিমের    │ প্রাইভেসি পলিসি │
│ সাথে যোগাযোগ    │                  │
├──────────────────┼──────────────────┤
│ [👤]             │ [⭐]             │
│ প্রোফাইল         │ অ্যাপ রেট করুন  │
└──────────────────┴──────────────────┘

[📤 বন্ধুকে শেয়ার করুন]

──────────────────────────────────────
[SPONSORED AD BANNER]
[SPONSORED AD BANNER 2]
```

---

## C8. About App Page

### Content Structure
```
← অ্যাপ সম্পর্কে

[APP LOGO + NAME]

আমাদের লক্ষ্য
─────────────────
উত্তরবঙ্গের প্রতিটি মানুষ যেন ঘরে বসেই
সেরা বিশেষজ্ঞ ডাক্তার খুঁজে পান।

কেন এই অ্যাপ তৈরি করা হয়েছে
──────────────────────────────
[Story section — emotional, trust-building]

দাবিত্যাগ (Disclaimer)
──────────────────────
[Legal disclaimer Bengali text]

তথ্যের নির্ভুলতা
─────────────────
[Data accuracy note]

সম্প্রদায়ে অবদান রাখুন
────────────────────────
[CTA to submit doctor/hospital info]

Version: 1.0.0 | Made with ❤️ for North Bengal
```

---

## C9. Support Page

### Content
```
← সাপোর্ট

[DEVELOPER PROFILE IMAGE — circular]
Developer Full Name
Professional App Developer / Team Name

[📞] +91-XXXXXXXXXX
[✉️] email@example.com
[📘] facebook.com/uttarbangaswasthya

[📞 কল করুন] [💬 WhatsApp করুন]

──────────────────────────────────────
ডাক্তার বা হাসপাতাল যুক্ত করতে চান?
WhatsApp করুন: +91-XXXXXXXXXX
```

---

## C10. Search Results Page

```
← "medicine doctor cooch behar" এর ফলাফল

🔍 [search query here...]

ডাক্তার (৮)
[Doctor Card 1]
[Doctor Card 2]

হাসপাতাল (৩)
[Hospital Card 1]

কোনো ফলাফল না পেলে:
┌─────────────────────────────────────┐
│ 😔 কোনো ফলাফল পাওয়া যায়নি           │
│ অন্য কীওয়ার্ড চেষ্টা করুন            │
│ বা WhatsApp-এ জিজ্ঞেস করুন          │
│ [WhatsApp-এ যোগাযোগ করুন]           │
└─────────────────────────────────────┘
```

---

## C11. City Landing Pages (SEO Power Pages)

### Template: /cooch-behar/medicine

```
H1: কুচবিহারের সেরা মেডিসিন বিশেষজ্ঞ ডাক্তার

Meta: কুচবিহারে মেডিসিন ডাক্তার খুঁজছেন? ১৫+ বিশেষজ্ঞ ডাক্তারের তালিকা, চেম্বারের ঠিকানা, সময় ও ফোন নম্বর।

[Structured breadcrumbs: Home > Cooch Behar > Medicine]

[Doctor Card 1 — with LocalBusiness schema]
[Doctor Card 2]
...

[Related Specialties in Cooch Behar]
[Nearby Cities]
[FAQ section (for rich snippets)]
```

### City Pages to Create (Priority):
```
/cooch-behar              ← highest priority
/cooch-behar/medicine
/cooch-behar/cardiology
/cooch-behar/child-specialist
/cooch-behar/gynecologist
/siliguri
/siliguri/medicine
/tufanganj
/dinhata
/mekhliganj
/alipurduar
/jalpaiguri
```

---

## C12. Offline Page

```
[OFFLINE ILLUSTRATION — cute, custom SVG]

ইন্টারনেট সংযোগ নেই 📡

আপনার ডিভাইসে ইন্টারনেট
সংযোগ পাওয়া যাচ্ছে না।

সম্প্রতি দেখা তথ্য:
[Cached doctor cards — from localStorage]

[🔄 আবার চেষ্টা করুন]
```

---

# PART D — COMPONENT SYSTEM

## D1. Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #1A6FBA;
  --color-primary-light: #E8F2FB;
  --color-primary-dark: #1255A0;
  --color-secondary: #0D9E6A;
  --color-accent: #F5A623;
  --color-emergency: #E53E3E;
  --color-bg: #F4F7FB;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-text: #1A202C;
  --color-text-secondary: #4A5568;
  --color-text-muted: #718096;

  /* Typography */
  --font-display: 'Hind Siliguri', sans-serif;
  --font-body: 'Noto Sans Bengali', sans-serif;
  --font-number: 'Nunito', sans-serif;

  /* Sizing */
  --text-xs: 11px;
  --text-sm: 13px;
  --text-md: 15px;
  --text-lg: 17px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.10);
  --shadow-card: 0 2px 12px rgba(26,111,186,0.08);

  /* Bottom Nav */
  --navbar-height: 64px;
  --topbar-height: 56px;
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

---

## D2. Card Components

### DoctorCard Component
**Props:** `doctor { id, name, slug, specialty, degree, image, rating, review_count, fees, city, badges[], chambers[] }`
**Variants:** `compact` (list view) | `featured` (home page) | `search-result`

### HospitalCard Component
**Props:** `hospital { id, name, slug, image, address, phone, emergency, icu, ambulance, timing }`

### CategoryCard Component
**Props:** `category { id, name_bn, name_en, slug, icon_svg, doctor_count }`

### SymptomCard Component
**Props:** `symptom { id, title_bn, image_url, related_specialties[] }`

### AdCard Component
**Props:** `ad { id, image, title, target_url, placement, sponsor_name }`
**Variants:** `native-feed` | `banner` | `popup`

### ReviewCard Component
**Props:** `review { username, rating, text, date, avatar_placeholder }`

---

## D3. Navigation Components

### BottomNavbar
```javascript
// Active state detection by current route
const navItems = [
  { id: 'home',      icon: 'home',      label: 'হোম',      path: '/' },
  { id: 'doctors',   icon: 'doctor',    label: 'ডাক্তার',   path: '/doctors' },
  { id: 'hospitals', icon: 'hospital',  label: 'হাসপাতাল', path: '/hospitals' },
  { id: 'symptoms',  icon: 'stethoscope',label: 'উপসর্গ',   path: '/symptoms' },
  { id: 'more',      icon: 'menu',      label: 'আরো',      path: '/more' },
]
```

### Router (Vanilla JS SPA)
```javascript
// Hash-based routing: /#/doctors, /#/doctor/slug
// History API where supported
const routes = {
  '/':                    HomePage,
  '/doctors':             DoctorsPage,
  '/doctor/:slug':        DoctorProfilePage,
  '/hospitals':           HospitalsPage,
  '/hospital/:slug':      HospitalDetailPage,
  '/symptoms':            SymptomsPage,
  '/symptoms/:slug':      SymptomDetailPage,
  '/more':                MorePage,
  '/about':               AboutPage,
  '/support':             SupportPage,
  '/search':              SearchPage,
  '/offline':             OfflinePage,
}
```

---

## D4. Modal System

### Central Modal Manager
```javascript
// Single modal container in DOM
// modalManager.open(type, data)
// modalManager.close()

Modal Types:
  - 'review'          → Review submission form
  - 'ad-popup'        → Timed advertisement
  - 'appointment'     → Appointment booking
  - 'filter'          → Full-screen filter sheet
  - 'emergency'       → Emergency contacts
  - 'offline'         → No internet alert
  - 'location'        → Location permission request
  - 'share'           → Share doctor profile
  - 'image-viewer'    → Full-screen photo viewer
```

### Ad Popup Trigger Logic
```javascript
let pageViews = parseInt(localStorage.getItem('page_views') || '0');
let sessionStart = Date.now();

// Show popup after:
// - 3 page navigations OR
// - 45 seconds session time
// - Max once per 30-minute session

if (pageViews >= 3 || (Date.now() - sessionStart > 45000)) {
  if (!sessionPopupShown) {
    modalManager.open('ad-popup', getRandomAd('popup'));
    sessionPopupShown = true;
  }
}
```

---

## D5. Ad Components

### Ad Placements Registry
```javascript
const AD_PLACEMENTS = {
  HOME_HERO:         { type: 'slider-slide',  count: 2 },
  HOME_MID:          { type: 'native-card',   after_count: 4 },
  HOME_BOTTOM:       { type: 'banner',         position: 'bottom' },
  DOCTOR_LIST_FEED:  { type: 'native-card',   every_n: 5 },
  DOCTOR_PROFILE:    { type: 'banner',         between: 'tabs' },
  SYMPTOM_GRID:      { type: 'native-card',   after_row: 3 },
  MORE_PAGE:         { type: 'banner',         full_width: true },
  POPUP:             { type: 'popup',          trigger: 'session' },
}
```

---

# PART E — DATA ARCHITECTURE

## E1. Database Schema (Supabase / PostgreSQL)

```sql
-- DOCTORS
CREATE TABLE doctors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,   -- 'dr-tapas-roy-siliguri'
  name          TEXT NOT NULL,
  name_bn       TEXT,                   -- Bengali name
  specialty     TEXT NOT NULL,          -- 'medicine'
  specialty_bn  TEXT,                   -- 'মেডিসিন বিশেষজ্ঞ'
  degree        TEXT,
  experience    INTEGER,                -- years
  bio_bn        TEXT,                   -- Bengali about doctor
  image_url     TEXT,
  tags          TEXT[],                 -- ['diabetes','heart','kidney']
  rating        DECIMAL(2,1) DEFAULT 0,
  review_count  INTEGER DEFAULT 0,
  fees          INTEGER,                -- INR
  city          TEXT,                   -- 'cooch-behar'
  area          TEXT,                   -- 'tufanganj'
  bmdc_reg      TEXT,
  languages     TEXT[],
  verified      BOOLEAN DEFAULT FALSE,
  featured      BOOLEAN DEFAULT FALSE,
  sponsored     BOOLEAN DEFAULT FALSE,
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- CHAMBERS
CREATE TABLE chambers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id   UUID REFERENCES doctors(id),
  name        TEXT NOT NULL,
  address     TEXT,
  city        TEXT,
  area        TEXT,
  phone       TEXT[],
  whatsapp    TEXT,
  fees        INTEGER,
  timing      JSONB,   -- { mon: '3pm-9pm', tue: '3pm-9pm', fri: null }
  google_maps TEXT,    -- Google Maps URL or embed URL
  latitude    DECIMAL,
  longitude   DECIMAL,
  active      BOOLEAN DEFAULT TRUE
);

-- HOSPITALS
CREATE TABLE hospitals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  name_bn       TEXT,
  type          TEXT,  -- 'hospital','diagnostic','nursing-home','clinic'
  image_url     TEXT,
  address       TEXT,
  city          TEXT,
  area          TEXT,
  phone         TEXT[],
  hotline       TEXT,
  emergency     BOOLEAN DEFAULT FALSE,
  icu           BOOLEAN DEFAULT FALSE,
  ambulance     BOOLEAN DEFAULT FALSE,
  services      TEXT[],
  tests         TEXT[],
  timing        JSONB,
  google_maps   TEXT,
  latitude      DECIMAL,
  longitude     DECIMAL,
  rating        DECIMAL(2,1) DEFAULT 0,
  active        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id   UUID REFERENCES doctors(id),
  username    TEXT NOT NULL,
  rating      INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  approved    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- SYMPTOMS
CREATE TABLE symptoms (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT UNIQUE NOT NULL,
  title_bn            TEXT NOT NULL,
  title_en            TEXT,
  image_url           TEXT,
  description_bn      TEXT,
  related_specialties TEXT[],
  display_order       INTEGER
);

-- ADS
CREATE TABLE ads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT,
  image_url   TEXT NOT NULL,
  target_url  TEXT,
  placement   TEXT,   -- from AD_PLACEMENTS keys
  sponsor     TEXT,
  priority    INTEGER DEFAULT 1,
  active      BOOLEAN DEFAULT TRUE,
  start_date  DATE,
  end_date    DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- PAGE ANALYTICS (lightweight)
CREATE TABLE page_views (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page      TEXT,
  entity_id UUID,
  city      TEXT,
  device    TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## E2. API Design

### API Functions (Supabase Client)
```javascript
// Doctors
api.getDoctors({ specialty, city, area, limit, offset, sort })
api.getDoctorBySlug(slug)
api.searchDoctors(query)
api.getFeaturedDoctors()
api.getTrendingDoctors(city)

// Chambers
api.getChambersByDoctor(doctorId)

// Hospitals
api.getHospitals({ type, city, emergency, limit, offset })
api.getHospitalBySlug(slug)

// Reviews
api.getReviewsByDoctor(doctorId)
api.submitReview({ doctorId, username, rating, text })

// Symptoms
api.getAllSymptoms()
api.getSymptomBySlug(slug)
api.getDoctorsBySymptom(symptomSlug)

// Ads
api.getAdsByPlacement(placement)

// Search
api.globalSearch(query)
```

---

## E3. Data Flow Diagrams

### Doctor Discovery Flow
```
User Input (tap/search)
    ↓
State Manager (state.js)
    ↓
API Layer (api.js)          ←→   Cache Layer (storage.js)
    ↓                              ↓
Supabase PostgreSQL           localStorage / IndexedDB
    ↓
Component Renderer (doctor-card.js)
    ↓
DOM Update
```

### Symptom → Doctor Flow
```
Symptom Card Tap
    ↓
symptoms[slug].related_specialties → ['medicine', 'pediatrics']
    ↓
api.getDoctors({ specialty: 'medicine', city: detectedCity })
    ↓
Render Recommended Doctors
```

---

## E4. Search Architecture

### Search Engine (search.js)
```javascript
// Multi-field search with Bengali + English support
// Fields searched (in priority order):
const SEARCH_FIELDS = [
  { field: 'name',         weight: 10, type: 'text' },
  { field: 'name_bn',      weight: 10, type: 'text' },
  { field: 'specialty',    weight: 8,  type: 'text' },
  { field: 'specialty_bn', weight: 8,  type: 'text' },
  { field: 'tags',         weight: 6,  type: 'array' },
  { field: 'city',         weight: 4,  type: 'text' },
  { field: 'area',         weight: 4,  type: 'text' },
  { field: 'degree',       weight: 2,  type: 'text' },
]

// Supabase Full-Text Search
supabase
  .from('doctors')
  .select('*')
  .or(`name.ilike.%${q}%,specialty.ilike.%${q}%,tags.cs.{${q}},city.ilike.%${q}%`)
  .order('sponsored', { ascending: false })
  .order('rating', { ascending: false })
```

### Bengali-English Alias Map
```javascript
const SEARCH_ALIASES = {
  'medicine':    ['মেডিসিন', 'ডাক্তার', 'doctor', 'internal medicine'],
  'heart':       ['হার্ট', 'হৃদরোগ', 'cardiology', 'cardiologist'],
  'child':       ['শিশু', 'বাচ্চা', 'pediatrics', 'child specialist'],
  'kidney':      ['কিডনি', 'nephrology', 'কিডনি রোগ'],
  'eye':         ['চোখ', 'চক্ষু', 'ophthalmology', 'eye doctor'],
  'teeth':       ['দাঁত', 'দন্ত', 'dental', 'dentist'],
  'diabetes':    ['ডায়াবেটিস', 'sugar', 'endocrinology'],
  'skin':        ['চর্ম', 'চুলকানি', 'dermatology'],
  'neuro':       ['নিউরো', 'মস্তিষ্ক', 'brain', 'neurology'],
}
```

---

# PART F — TECHNICAL ARCHITECTURE

## F1. Tech Stack Decision

```
LAYER               TECHNOLOGY              REASON
────────────────────────────────────────────────────────
Frontend            Vanilla JS              Lightweight, fast load,
                                            no hydration, works on
                                            weak networks
                    
CSS                 Custom CSS              No framework bloat,
                    (BEM methodology)       full design control

Icons               Custom SVG sprites      Zero external dependency,
                                            cached, tiny size

Fonts               Google Fonts            Hind Siliguri + Noto Sans Bengali
                    (self-hosted backup)    

Backend             Supabase                Free tier generous,
                                            PostgreSQL, Auth, Storage,
                                            Edge Functions later

Hosting             GitHub Pages / Netlify  Free, globally CDN-cached,
                                            custom domain support

Images              WebP + AVIF             60-80% smaller than JPEG
                    via Cloudinary CDN      

PWA                 Service Worker          Offline support +
                                            installability

Analytics           Plausible / GA4         Privacy-friendly +
                                            Bengali user insights
```

---

## F2. Project Folder Structure

```
uttarbanga-swasthya-setu/
│
├── index.html                    ← Entry point (SPA shell)
├── manifest.json                 ← PWA manifest
│
├── /src
│   ├── /styles
│   │   ├── _variables.css        ← Design tokens
│   │   ├── _reset.css            ← Normalize
│   │   ├── _base.css             ← Base elements
│   │   ├── _layout.css           ← Page layout
│   │   ├── _navbar.css           ← Bottom navigation
│   │   ├── _topbar.css           ← Top app bar
│   │   ├── _cards.css            ← All card components
│   │   ├── _modals.css           ← Modal system
│   │   ├── _forms.css            ← Inputs, buttons
│   │   ├── _badges.css           ← Tags, chips, pills
│   │   ├── _slider.css           ← Hero banner slider
│   │   ├── _animations.css       ← Keyframes, transitions
│   │   ├── _offline.css          ← Offline page
│   │   └── _responsive.css       ← Breakpoints (max 768px core)
│   │
│   ├── /js
│   │   ├── app.js                ← Entry, init
│   │   ├── router.js             ← SPA routing
│   │   ├── state.js              ← Global state
│   │   ├── api.js                ← All Supabase calls
│   │   ├── storage.js            ← localStorage wrapper
│   │   ├── search.js             ← Search logic
│   │   ├── location.js           ← City detection
│   │   ├── ads.js                ← Ad loading & injection
│   │   ├── analytics.js          ← View tracking
│   │   └── utils.js              ← Helpers, formatters
│   │
│   ├── /components
│   │   ├── navbar.js             ← Bottom nav
│   │   ├── topbar.js             ← Top app bar
│   │   ├── slider.js             ← Banner slider
│   │   ├── search-bar.js         ← Search UI
│   │   ├── doctor-card.js        ← Doctor card variants
│   │   ├── hospital-card.js      ← Hospital card
│   │   ├── category-card.js      ← Specialty grid item
│   │   ├── symptom-card.js       ← Symptom grid item
│   │   ├── review-card.js        ← Review item
│   │   ├── ad-card.js            ← Ad variants
│   │   ├── modal.js              ← Modal manager
│   │   ├── fab.js                ← Emergency FAB
│   │   ├── skeleton.js           ← Loading skeletons
│   │   └── toast.js              ← Notification toasts
│   │
│   ├── /pages
│   │   ├── home.js
│   │   ├── doctors.js
│   │   ├── doctor-profile.js
│   │   ├── hospitals.js
│   │   ├── hospital-detail.js
│   │   ├── symptoms.js
│   │   ├── symptom-detail.js
│   │   ├── more.js
│   │   ├── about.js
│   │   ├── support.js
│   │   ├── search-results.js
│   │   └── offline.js
│   │
│   └── /assets
│       ├── /icons                ← SVG icon set
│       ├── /illustrations        ← Splash, offline, empty states
│       └── /images               ← App-level images (not doctor photos)
│
├── /pwa
│   ├── sw.js                     ← Service worker
│   └── manifest.json
│
├── /data                         ← Static seed data for MVP
│   ├── doctors.json
│   ├── hospitals.json
│   └── symptoms.json
│
├── /scripts
│   ├── build.js                  ← Build script
│   ├── generate-sitemap.js       ← Sitemap generator
│   └── optimize-images.js        ← WebP conversion
│
├── .github/workflows
│   └── deploy.yml                ← GitHub Pages auto-deploy
│
└── README.md
```

---

## F3. PWA Architecture

### manifest.json
```json
{
  "name": "উত্তরবঙ্গ স্বাস্থ্য সেতু",
  "short_name": "স্বাস্থ্য সেতু",
  "description": "উত্তরবঙ্গের সেরা ডাক্তার ও হাসপাতালের তথ্য",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F4F7FB",
  "theme_color": "#1A6FBA",
  "orientation": "portrait",
  "icons": [
    { "src": "/assets/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/assets/icon-maskable.png", "sizes": "512x512", "purpose": "maskable" }
  ]
}
```

### Service Worker Strategy
```javascript
// sw.js — Cache Strategy
const CACHE_VERSION = 'v1.0';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const DATA_CACHE = `data-${CACHE_VERSION}`;

// CACHE-FIRST (static assets):
// CSS, JS, fonts, icons, illustrations

// STALE-WHILE-REVALIDATE (dynamic content):
// Doctor list, hospital list, category grid

// NETWORK-FIRST (real-time data):
// Reviews, ads, search results

// OFFLINE FALLBACK:
// /offline page if network unavailable
```

---

## F4. Performance Strategy

### Target Lighthouse Scores
```
Performance:     95+
Accessibility:   90+
Best Practices:  95+
SEO:             98+
PWA:             100
```

### Mandatory Optimizations
```
✓ Lazy load all images (IntersectionObserver)
✓ WebP images with JPEG fallback
✓ CSS critical path inline
✓ JS deferred loading
✓ SVG icon sprite (single request)
✓ No render-blocking fonts (font-display: swap)
✓ Gzip / Brotli compression (Netlify automatic)
✓ Infinite scroll (pagination, not all-at-once)
✓ Skeleton loaders (perceived performance)
✓ Prefetch on hover (doctor profiles)
✓ Debounced search input (300ms)
✓ Virtual list for 100+ doctor results
✓ Minimized CSS/JS bundles
✓ Resource hints: preconnect to Supabase CDN
```

### Loading Skeleton Pattern
```html
<!-- Shown while API fetches -->
<div class="skeleton-card">
  <div class="skeleton-image animate-pulse"></div>
  <div class="skeleton-line w-60 animate-pulse"></div>
  <div class="skeleton-line w-40 animate-pulse"></div>
  <div class="skeleton-line w-80 animate-pulse"></div>
</div>
```

---

## F5. Offline Strategy

### What Gets Cached
```javascript
const OFFLINE_CACHE = {
  HOME_PAGE:        { ttl: '1 hour',  data: ['categories', 'featured_doctors'] },
  DOCTOR_LIST:      { ttl: '2 hours', data: ['doctors by city'] },
  DOCTOR_PROFILE:   { ttl: '24 hours', data: ['per profile viewed'] },
  HOSPITALS:        { ttl: '24 hours', data: ['hospital list by city'] },
  SYMPTOMS:         { ttl: '7 days',   data: ['all symptoms'] },
}
```

### Offline UI Message
```
Bengali: "ইন্টারনেট সংযোগ নেই। সর্বশেষ সংরক্ষিত তথ্য দেখানো হচ্ছে।"
```

---

# PART G — UX DESIGN SYSTEM

## G1. Color System

### Usage Guidelines
```
Primary Blue (#1A6FBA)
  → Primary buttons, active nav, links, doctor specialty badges,
    section titles, icons

Secondary Green (#0D9E6A)
  → Verified badge, available today, success states, chamber open

Accent Yellow/Orange (#F5A623)
  → Star ratings, featured badge, highlights, price accent

Emergency Red (#E53E3E)
  → Emergency button, FAB, urgent alerts, closed status

Background Gray (#F4F7FB)
  → Page background (not pure white, reduces eye strain)

Surface White (#FFFFFF)
  → Cards, modals, navbar, top bar

Text Dark (#1A202C)
  → Primary text (headings, doctor names)

Text Secondary (#4A5568)
  → Degrees, addresses

Text Muted (#718096)
  → Timestamps, secondary info
```

---

## G2. Typography System

### Font Stack
```css
/* Bengali content — all body text, names, addresses */
font-family: 'Hind Siliguri', 'Noto Sans Bengali', sans-serif;

/* Numbers, fees, ratings, English text */
font-family: 'Nunito', 'Hind Siliguri', sans-serif;
```

### Scale
```
3XL (30px / 700) → Page hero titles
2XL (24px / 700) → Doctor name on profile
XL  (20px / 600) → Section titles
LG  (17px / 600) → Card doctor names
MD  (15px / 400) → Body text, degrees
SM  (13px / 400) → Secondary info, timestamps
XS  (11px / 400) → Labels, badges
```

---

## G3. Spacing & Layout Grid

### Mobile Layout (core: 375px–430px)
```
Screen padding:  16px left/right
Card gap:        12px
Section gap:     24px
Top bar:         56px
Bottom nav:      64px + safe area
Content area:    screen - 56px - (64px + safe area)
```

### Card Anatomy
```
Outer padding:     16px
Image margin:      0 (flush or with 8px padding)
Content padding:   12px 16px
Button gap:        8px
```

---

## G4. Animation & Motion

### Motion Principles
```
Page transition:    slide-in-from-right (300ms ease-out)
Modal open:         slide-up (250ms ease-out)
Modal close:        slide-down (200ms ease-in)
Card press:         scale(0.97) (120ms ease)
Skeleton pulse:     opacity 0.5↔1 (1.2s infinite)
Star fill:          scale(1.2) then normal (150ms)
Tab indicator:      width slide (200ms ease)
Slider auto:        smooth scroll (600ms ease-in-out)
FAB expand:         scale + fade (200ms spring)
Toast appear:       slide-up + fade-in (200ms)
Toast dismiss:      slide-down + fade-out (150ms)
```

### CSS Keyframes Required
```css
@keyframes pulse { ... }           /* Skeleton loader */
@keyframes slideUp { ... }         /* Modal, toast */
@keyframes slideInRight { ... }    /* Page transitions */
@keyframes fadeIn { ... }          /* Content reveals */
@keyframes spin { ... }            /* Loading spinner */
@keyframes bounceIn { ... }        /* FAB expand items */
```

---

## G5. Bengali-First UX Principles

### Rule 1: Bengali Primary, English Secondary
- All navigation labels: Bengali first
- Category names: Bengali + English subtitle
- Doctor names: English (as on degree certificate)
- Specialty: Bengali bold + English small

### Rule 2: Large Touch Targets
- Minimum button height: 48px
- Minimum tap area: 44×44px
- Icon buttons with label (no icon-only)
- Generous padding on all interactive elements

### Rule 3: Visual Over Text
- Use images for symptoms (not icon+text)
- Doctor photos mandatory (placeholder if missing)
- Hospital images (building photo)
- Colored badges over plain text status

### Rule 4: Redundant Call-to-Actions
- Never assume user reads instructions
- Multiple entry points to the same action
- Phone number always visible (not just "Call" button)
- WhatsApp always visible (preferred contact method in Bengal)

### Rule 5: Trust Signals Everywhere
- Verified badge on confirmed doctors
- BMDC registration shown
- Review count and stars visible on list cards
- "X years experience" visible on card
- Hospital hotline number large and tappable

---

## G6. Accessibility Guidelines

```
Color contrast:    AA standard minimum (4.5:1 for text)
Font minimum:      13px rendered Bengali
Focus states:      visible outline on all interactive elements
Alt text:          all doctor/hospital images
ARIA labels:       all icon-only buttons
Screen reader:     semantic HTML (header, nav, main, section, article)
Motion:            prefers-reduced-motion respected
```

---

# PART H — FEATURE SPECIFICATIONS

## H1. Smart Search Engine

### Behavior
```
Trigger: User types in search bar
Debounce: 300ms
Minimum: 2 characters

Search order:
1. Exact name match (weight: 10)
2. Specialty match (weight: 8)
3. Tag match (weight: 6)
4. City/area match (weight: 4)
5. Degree keyword (weight: 2)

Results sections:
→ Doctors (top results)
→ Hospitals (if any match)
→ Symptom suggestions (if symptom keyword detected)
```

### Search Suggestions Dropdown
```
While typing:
┌─────────────────────────────────────┐
│ 🔍 "medicine"                       │
├─────────────────────────────────────┤
│ 👨‍⚕️ Dr. Tapas Roy — Medicine, Sili. │
│ 👨‍⚕️ Dr. Ratan Das — Medicine, C.B. │
│ 🏥 City Diagnostic — Cooch Behar   │
│ 🏷️ মেডিসিন বিভাগ — সব ডাক্তার      │
└─────────────────────────────────────┘
```

---

## H2. Symptom-to-Doctor Engine

### Algorithm
```javascript
function getRecommendedDoctors(symptomSlug, userCity) {
  // 1. Get symptom record
  const symptom = await api.getSymptomBySlug(symptomSlug);
  
  // 2. Get related specialties
  const specialties = symptom.related_specialties;
  // e.g. ['medicine', 'pediatrics']
  
  // 3. Fetch doctors matching ANY of the specialties + user city
  const doctors = await api.getDoctors({
    specialty: specialties,
    city: userCity,
    sort: 'rating',
  });
  
  // 4. Rank: sponsored first, then verified, then by rating
  return rankDoctors(doctors);
}
```

---

## H3. Review & Rating System

### Submission Flow
```
1. User taps "+ রিভিউ দিন"
2. Modal opens
3. User fills: Name + Stars + Text
4. Client-side validation
5. Submit → reviews table (approved: false)
6. Admin approves → approved: true → visible
7. Doctor rating auto-recalculated (SQL trigger)
```

### Rating Recalculation (SQL Trigger)
```sql
CREATE OR REPLACE FUNCTION update_doctor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE doctors
  SET
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM reviews
      WHERE doctor_id = NEW.doctor_id AND approved = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE doctor_id = NEW.doctor_id AND approved = true
    )
  WHERE id = NEW.doctor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## H4. Ad & Monetization System

### Ad Loading Logic
```javascript
// ads.js
async function loadAds(placement) {
  const today = new Date().toISOString().split('T')[0];
  
  return supabase
    .from('ads')
    .select('*')
    .eq('placement', placement)
    .eq('active', true)
    .lte('start_date', today)
    .gte('end_date', today)
    .order('priority', { ascending: false });
}

// Inject native ad after every N cards
function injectNativeAds(cards, ads, everyN = 5) {
  const result = [];
  cards.forEach((card, i) => {
    result.push(card);
    if ((i + 1) % everyN === 0 && ads.length > 0) {
      result.push({ type: 'ad', data: ads[i % ads.length] });
    }
  });
  return result;
}
```

---

## H5. Emergency Quick Actions

### FAB Behavior
```javascript
// Floating Action Button — bottom right, above navbar
// Tap: expand with 3 options

const emergencyActions = [
  {
    icon: '🚑',
    label: 'অ্যাম্বুলেন্স',
    numbers: [
      { name: 'National', number: '102' },
      { name: 'Cooch Behar Hospital', number: '+91-3582-220555' },
    ]
  },
  {
    icon: '🩸',
    label: 'ব্লাড ব্যাংক',
    numbers: [
      { name: 'Dist. Hospital Blood Bank', number: '+91-XXXXXXXXXX' },
    ]
  },
  {
    icon: '📞',
    label: 'জরুরি হেল্পলাইন',
    numbers: [
      { name: 'Health Helpline', number: '104' },
      { name: 'Police', number: '100' },
    ]
  }
]
```

---

## H6. Local Area Detection

### Strategy
```javascript
// location.js
async function detectCity() {
  // 1. Check localStorage first (saved preference)
  const saved = localStorage.getItem('user_city');
  if (saved) return saved;

  // 2. Browser Geolocation API
  if (navigator.geolocation) {
    const coords = await getPosition();
    const city = await reverseGeocode(coords);
    // Map to known cities:
    // Cooch Behar, Siliguri, Darjeeling, etc.
    localStorage.setItem('user_city', city);
    return city;
  }

  // 3. Fallback: ask user
  showCityPickerModal();
  return 'cooch-behar'; // default
}

// City list for picker modal
const NORTH_BENGAL_CITIES = [
  { id: 'cooch-behar',    name_bn: 'কুচবিহার',    name: 'Cooch Behar' },
  { id: 'siliguri',       name_bn: 'শিলিগুড়ি',    name: 'Siliguri' },
  { id: 'darjeeling',     name_bn: 'দার্জিলিং',    name: 'Darjeeling' },
  { id: 'tufanganj',      name_bn: 'তুফানগঞ্জ',    name: 'Tufanganj' },
  { id: 'dinhata',        name_bn: 'দিনহাটা',      name: 'Dinhata' },
  { id: 'mekhliganj',     name_bn: 'মেখলিগঞ্জ',    name: 'Mekhliganj' },
  { id: 'mathabhanga',    name_bn: 'মাথাভাঙ্গা',   name: 'Mathabhanga' },
  { id: 'jalpaiguri',     name_bn: 'জলপাইগুড়ি',   name: 'Jalpaiguri' },
  { id: 'alipurduar',     name_bn: 'আলিপুরদুয়ার', name: 'Alipurduar' },
]
```

---

## H7. PWA Install Flow

### Install Prompt Strategy
```javascript
// Show install banner after:
// - 2nd visit to the app
// - User has been on app > 30 seconds

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  const visits = parseInt(localStorage.getItem('visits') || '0') + 1;
  localStorage.setItem('visits', visits);
  
  if (visits >= 2 && !localStorage.getItem('install_dismissed')) {
    showInstallBanner();
  }
});
```

### Install Banner UI
```
┌─────────────────────────────────────────┐
│ [APP ICON] অ্যাপটি ইনস্টল করুন!         │
│           হোম স্ক্রিনে যুক্ত করুন        │
│           [এখন নয়]    [ইনস্টল করুন]     │
└─────────────────────────────────────────┘
```

---

# PART I — SEO STRATEGY

## I1. URL Architecture

### URL Design Principles
```
Descriptive + Bengali-keyword-friendly English slugs
City in URL for local SEO
Specialty in URL for intent matching

Examples:
/cooch-behar/medicine-doctor         ← Local intent
/siliguri/cardiologist                ← Specialty intent
/doctor/dr-tapas-roy-siliguri        ← Brand/name intent
/symptoms/chest-pain                  ← Informational intent
```

### Priority URL Generation
```javascript
// Auto-generate city × specialty landing pages
const cities = ['cooch-behar', 'siliguri', 'tufanganj', ...]
const specialties = ['medicine', 'cardiology', 'child-specialist', ...]

cities.forEach(city => {
  specialties.forEach(specialty => {
    generateLandingPage(`/${city}/${specialty}`);
  });
});
// = 9 cities × 22 specialties = 198 SEO landing pages
```

---

## I2. Schema Markup

### Doctor Profile — Person + LocalBusiness Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Tapas Roy",
  "medicalSpecialty": "Cardiology",
  "description": "...",
  "hasCredential": "MBBS, MD (Cardiology)",
  "availableService": "Heart, Cardiology consultation",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cooch Behar",
    "addressRegion": "West Bengal",
    "addressCountry": "IN"
  },
  "telephone": "+91-XXXXXXXXXX",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "8"
  }
}
</script>
```

### Hospital — LocalBusiness Schema
```json
{
  "@type": "Hospital",
  "name": "...",
  "address": { ... },
  "telephone": "...",
  "openingHours": "Mo-Sa 08:00-20:00",
  "hasMap": "https://maps.google.com/..."
}
```

### FAQ Schema (for City Landing Pages)
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@question": "কুচবিহারে সেরা মেডিসিন ডাক্তার কে?",
      "@answer": "..."
    }
  ]
}
```

---

## I3. Meta Strategy

### Template per page type
```html
<!-- Home -->
<title>উত্তরবঙ্গ স্বাস্থ্য সেতু | ডাক্তার ও হাসপাতালের তথ্য</title>
<meta name="description" content="উত্তরবঙ্গের কুচবিহার, শিলিগুড়ি সহ সব শহরের বিশেষজ্ঞ ডাক্তার ও হাসপাতালের তথ্য। ঘরে বসেই সেরা ডাক্তার খুঁজুন।">

<!-- Doctor Profile -->
<title>Dr. [Name] — [Specialty] | [City] | স্বাস্থ্য সেতু</title>
<meta name="description" content="Dr. [Name] [City]-এর একজন [Specialty] বিশেষজ্ঞ। [Degree]. চেম্বার: [Address]. ফোন: [Phone]">

<!-- City Landing -->
<title>কুচবিহারের সেরা মেডিসিন ডাক্তার | স্বাস্থ্য সেতু</title>
<meta name="description" content="কুচবিহারে ১৫+ মেডিসিন বিশেষজ্ঞ ডাক্তার। চেম্বারের ঠিকানা, সময়, ফি ও ফোন নম্বর।">
```

### Open Graph (Social Sharing)
```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="/assets/og-cover.jpg">
<meta property="og:type" content="website">
<meta property="og:locale" content="bn_IN">
```

---

## I4. Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset>
  <url><loc>https://domain.com/</loc><priority>1.0</priority></url>
  <url><loc>https://domain.com/cooch-behar</loc><priority>0.9</priority></url>
  <url><loc>https://domain.com/cooch-behar/medicine</loc><priority>0.8</priority></url>
  <!-- all city/specialty combinations -->
  <url><loc>https://domain.com/doctor/[slug]</loc><priority>0.7</priority></url>
  <!-- all doctor pages -->
  <url><loc>https://domain.com/hospital/[slug]</loc><priority>0.6</priority></url>
  <!-- all hospital pages -->
</urlset>
```

---

# PART J — MONETIZATION BLUEPRINT

## J1. Revenue Streams

```
STREAM 1 — Sponsored Doctor Listings
  Doctor pays monthly fee for:
  - "Featured" badge
  - Priority ranking (appears first)
  - Banner slot in hero slider
  Price: ₹500–₹2000/month (based on city)

STREAM 2 — Diagnostic/Hospital Promotions
  Diagnostic pays for:
  - Homepage hospital cards (priority)
  - "Recommended" badge
  - Banner ad slot
  Price: ₹1000–₹5000/month

STREAM 3 — Banner Advertising
  Local businesses: pharmacies, insurance, labs
  Price: ₹500–₹2000/month per placement

STREAM 4 — Native Feed Ads
  Inline ad cards in doctor list
  Price: ₹300–₹1000/month per slot

STREAM 5 — Popup Ads
  Full-screen timed ads (highest CTR)
  Price: ₹2000–₹5000/month (exclusive)

STREAM 6 (Future) — Appointment Lead Gen
  Per successful appointment call: ₹20–₹50

STREAM 7 (Future) — Queue/CRM SaaS
  Doctor pays monthly for chamber management system
```

---

## J2. Ad Placement Map

```
PAGE            POSITION              SLOT NAME           PRICE TIER
─────────────────────────────────────────────────────────────────────
Home            Hero slider           HOME_HERO_1-3       High
Home            After 4th doctor      HOME_FEED_1         Medium
Home            Bottom sticky         HOME_BOTTOM         Medium
Home            Hospital section      HOME_HOSPITAL       Medium

Doctor List     After every 5th       LIST_FEED_1-N       Medium
Doctor List     Sticky bottom         LIST_BOTTOM         Medium

Doctor Profile  Between tabs          PROFILE_MID         Low-Medium
Doctor Profile  Bottom of info tab    PROFILE_BOTTOM      Low

Symptoms        After row 3           SYMPTOM_FEED        Low-Medium
Symptoms        Bottom                SYMPTOM_BOTTOM      Low

More Page       Full-width 1          MORE_BANNER_1       Medium
More Page       Full-width 2          MORE_BANNER_2       Medium

Popup           Session-triggered     POPUP_SESSION       Highest
```

---

## J3. Monthly Revenue Projection (Conservative)

```
Year 1 (25 doctors, 15 hospitals):
  5 sponsored doctors × ₹1000     =  ₹5,000
  3 sponsored hospitals × ₹2000   =  ₹6,000
  2 banner advertisers × ₹1000    =  ₹2,000
  1 popup advertiser × ₹3000      =  ₹3,000
  ─────────────────────────────────────────
  Total Monthly:                      ₹16,000

Year 2 (100 doctors, 40 hospitals):
  15 sponsored doctors × ₹1500    = ₹22,500
  8 sponsored hospitals × ₹3000   = ₹24,000
  5 banner advertisers × ₹1500    =  ₹7,500
  2 popup advertisers × ₹4000     =  ₹8,000
  ─────────────────────────────────────────
  Total Monthly:                      ₹62,000
```

---

# PART K — SECURITY & ADMIN

## K1. Security Measures

```
Row Level Security (Supabase RLS):
  - Public read: doctors, hospitals, symptoms, approved reviews
  - Public insert: reviews (pending approval only)
  - Authenticated write: all other operations

Input Sanitization:
  - All user inputs: DOMPurify before storage
  - Phone numbers: regex validation
  - Review text: max 500 chars, profanity filter

Rate Limiting:
  - Review submit: max 3 per IP per doctor per 24h
  - Search: max 100 requests per minute per IP (Supabase handles)

Spam Protection:
  - Review submission: honeypot field
  - Minimum review text: 20 characters
  - Admin approval required before display
```

---

## K2. Admin Panel Scope (Phase 2)

```
URL: /admin (protected route)

Sections:
  1. Dashboard — stats: views, doctors, reviews pending
  2. Doctors — add/edit/delete/verify doctor
  3. Chambers — manage chamber details per doctor
  4. Hospitals — add/edit/delete hospital
  5. Reviews — approve/reject submitted reviews
  6. Ads — upload/manage ad creatives, placements
  7. Symptoms — manage symptom list and mappings
  8. Analytics — page views, most searched, trending
```

---

# PART L — 25-DAY EXECUTION ROADMAP

## L1. Week 1 — Foundation (Days 1–7)

```
DAY 1:
  □ Project setup (repo, folder structure, hosting)
  □ Design tokens CSS file (variables)
  □ Base CSS, reset, typography
  □ Supabase project setup
  □ Database schema creation

DAY 2:
  □ Bottom navbar component
  □ Top app bar component
  □ Router.js (basic SPA routing)
  □ Home page shell (HTML structure)
  □ Category grid (static data)

DAY 3:
  □ Hero banner slider component
  □ Doctor card component (compact variant)
  □ Home page — all sections wired
  □ Skeleton loaders

DAY 4:
  □ Doctor list page
  □ Search bar component
  □ Filter chips
  □ API integration (get doctors)

DAY 5:
  □ Doctor profile page
  □ Tab navigation
  □ Information tab
  □ Chamber cards

DAY 6:
  □ Review system (display + submit modal)
  □ Rating calculation display
  □ Appointment tab

DAY 7:
  □ Symptoms page
  □ Symptom grid
  □ Symptom → Doctor flow
  □ Seed data: 20 doctors, 10 hospitals, all symptoms
```

## L2. Week 2 — Features (Days 8–14)

```
DAY 8:
  □ Hospitals page
  □ Hospital cards
  □ Hospital detail page

DAY 9:
  □ More page
  □ About page
  □ Support page
  □ Privacy policy page

DAY 10:
  □ Search results page
  □ Global search logic
  □ Bengali-English alias map

DAY 11:
  □ Ad system (all placement types)
  □ Native feed ad injection
  □ Popup ad with session trigger

DAY 12:
  □ Emergency FAB
  □ Location detection
  □ City picker modal

DAY 13:
  □ PWA manifest + service worker
  □ Offline page
  □ Install banner

DAY 14:
  □ Modal system complete (all modal types)
  □ Toast notifications
  □ All animations implemented
```

## L3. Week 3 — Polish & SEO (Days 15–21)

```
DAY 15:
  □ City landing pages (SEO templates)
  □ Schema markup on all page types
  □ Meta tags dynamic generation
  □ Sitemap generation script

DAY 16:
  □ Image optimization (WebP conversion)
  □ Lazy loading on all images
  □ Performance audit (Lighthouse)
  □ Fix performance issues

DAY 17:
  □ Accessibility audit
  □ ARIA labels on all interactive elements
  □ Color contrast check
  □ Keyboard navigation

DAY 18:
  □ Complete data entry (all known doctors)
  □ Complete hospital data entry
  □ Review real chamber timings
  □ Verify all phone numbers

DAY 19:
  □ Mobile testing (Android + iPhone)
  □ Browser testing (Chrome, Firefox, Samsung Internet)
  □ Weak network testing (throttled 3G)
  □ Bug fixes

DAY 20:
  □ Final UI polish pass
  □ Typography refinement
  □ Spacing consistency
  □ Animation smoothness

DAY 21:
  □ Production deployment
  □ Custom domain setup
  □ Google Search Console submission
  □ Sitemap submission
```

## L4. Buffer Days (Days 22–25)

```
DAY 22–23: Bug fixes from real user testing
DAY 24:    Data updates, additional doctors
DAY 25:    Performance monitoring, analytics setup
```

---

# PART M — FUTURE ROADMAP

## M1. Phase 2 — Accounts & Engagement (Month 2–3)

```
□ User accounts (Supabase Auth — phone OTP)
□ Favorite doctors (save list)
□ Recently viewed doctors
□ Appointment request form (simple)
□ Push notifications (appointment reminders)
□ Share doctor profile (WhatsApp/social)
□ Doctor claiming: "Are you this doctor?"
```

## M2. Phase 3 — Live Queue System (Month 4–6)

```
□ Doctor dashboard (web)
□ Digital token system
□ Real-time queue display ("আপনি ৫ নম্বরে")
□ SMS token confirmation
□ Chamber opening/closing live status
□ Patient wait time estimation
```

## M3. Phase 4 — AI Health Assistant (Month 6–12)

```
□ Bengali chatbot: "কী সমস্যা হচ্ছে?" → Recommended doctor
□ Symptom checker with AI logic
□ Voice input (Bengali speech-to-text)
□ Multilingual: Bengali + Hindi + English
□ Telemedicine booking integration
□ Basic health records (opt-in)
```

---

# FINAL SUMMARY

## What We Are Building

```
উত্তরবঙ্গ স্বাস্থ্য সেতু
─────────────────────────────

CORE MISSION:
Every person in North Bengal — from Cooch Behar to Siliguri,
from Tufanganj to Darjeeling — should be able to find the
right doctor, in 30 seconds, from their phone, in Bengali.

HOW WE WIN:
1. SEO-first: we become Google for North Bengal healthcare
2. PWA-first: feels like an app, works offline
3. Bengali-first: designed for actual users, not tech users
4. Performance-first: works on cheap Android, 3G network
5. Trust-first: verified, reviewed, real chamber data

COMPETITIVE MOAT:
The Bangladesh app has the UX playbook. We have:
→ Web + SEO (they have none)
→ City URL system (198 landing pages)
→ Schema markup (rich Google results)
→ PWA (installable)
→ Better performance
→ Local North Bengal data
→ Scalable architecture
→ Future AI/queue features

TECHNICAL EDGE:
Vanilla JS + Supabase + GitHub Pages/Netlify
= Near-zero running cost, globally cached, fast everywhere

BUSINESS MODEL:
₹16,000/month (Year 1) → ₹62,000/month (Year 2)
From: sponsored doctors, hospital ads, banners, popups

NORTH BENGAL IMPACT:
A platform that connects 10 million people
to quality healthcare information —
that today requires local knowledge or luck to find.
```

---

*Blueprint Version: 1.0 | Prepared: May 2026*
*Team: Solo Developer + Claude Sonnet AI (PM + Architect)*
*Next Action: Begin Day 1 — Project Setup & Design Tokens*

---
**Document End — উত্তরবঙ্গ স্বাস্থ্য সেতু Technical Product Blueprint**
