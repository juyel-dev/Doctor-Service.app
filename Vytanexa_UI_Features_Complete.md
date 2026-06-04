# Vytanexa — Complete UI/UX Specification & Feature Breakdown
## User-Side Web App | Phase 1 | Screen-by-Screen Wireframe + Component Logic
### Version: 1.0.0 | Date: 2026-06-04

---

## TABLE OF CONTENTS

1. [Design Philosophy & Principles](#1-design-philosophy--principles)
2. [Global Components](#2-global-components)
3. [Splash & Onboarding](#3-splash--onboarding)
4. [Location Setup Flow](#4-location-setup-flow)
5. [Home Page](#5-home-page)
6. [Universal Search](#6-universal-search)
7. [Doctor Discovery](#7-doctor-discovery)
8. [Doctor Profile](#8-doctor-profile)
9. [Hospital Discovery](#9-hospital-discovery)
10. [Hospital Detail](#10-hospital-detail)
11. [Symptoms Engine](#11-symptoms-engine)
12. [Lab & Diagnostics](#12-lab--diagnostics)
13. [Blood Services](#13-blood-services)
14. [Emergency System](#14-emergency-system)
15. [Health Magazine](#15-health-magazine)
16. [Q&A Community](#16-qa-community)
17. [Polls & Reports](#17-polls--reports)
18. [User Account](#18-user-account)
19. [More Page (Hamburger)](#19-more-page-hamburger)
20. [Settings & Preferences](#20-settings--preferences)
21. [Notification Center](#21-notification-center)
22. [SEO Landing Pages](#22-seo-landing-pages)
23. [Offline & Error States](#23-offline--error-states)
24. [PWA Install Flow](#24-pwa-install-flow)
25. [Interaction Matrix](#25-interaction-matrix)
26. [Edge Cases & Error Handling](#26-edge-cases--error-handling)
27. [Test Cases](#27-test-cases)

---

## 1. DESIGN PHILOSOPHY & PRINCIPLES

### 1.1 Core Principles

| # | Principle | Implementation |
|---|-----------|---------------|
| 1 | **Mobile-First** | All designs start at 375px width. Desktop is progressive enhancement. |
| 2 | **Speed First** | Every screen must render primary content in < 1.5s on 3G. |
| 3 | **Trust Everywhere** | Verified badges, review counts, BMDC numbers visible on every card. |
| 4 | **Redundant CTAs** | Phone, WhatsApp, and Appointment buttons visible simultaneously. Never hide behind menus. |
| 5 | **No Dead Ends** | Every empty state has a clear next action. Every error has a recovery path. |
| 6 | **Context Awareness** | Location, time-of-day, and network status influence what is shown. |
| 7 | **Accessibility** | WCAG 2.1 AA minimum. Focus rings, alt text, ARIA labels, reduced-motion support. |

### 1.2 Touch Target Standards

| Element | Minimum Size | Padding |
|---------|-------------|---------|
| Primary buttons | 48px height | 16px horizontal |
| Icon buttons | 44x44px | 8px |
| List items | 72px height | 16px horizontal |
| Form inputs | 48px height | 12px horizontal |
| Bottom nav items | 64px height | Full width / 5 items |

### 1.3 Animation Standards

| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Page transition (slide) | 300ms | cubic-bezier(0.4, 0, 0.2, 1) | Route change |
| Modal/Bottom sheet | 250ms | cubic-bezier(0.32, 0.72, 0, 1) | Open/Close |
| Card press | 120ms | ease-out | :active state |
| Skeleton pulse | 1.5s | ease-in-out | Loading state |
| Toast appear | 200ms | ease-out | Action trigger |
| Toast dismiss | 150ms | ease-in | Timeout / swipe |
| FAB expand | 200ms | spring(1, 100, 10, 0) | Tap |
| Tab indicator | 200ms | ease | Tab switch |
| Banner slide | 300ms | ease-out | New announcement |

---

## 2. GLOBAL COMPONENTS

### 2.1 Top App Bar

```
[≡]  Vytanexa          [🔍] [🔔] [👤]
       (logo + name)
```

**Props:**
- `variant`: 'default' | 'transparent' | 'search'
- `title`: Shows instead of logo on sub-pages
- `showBack`: Shows back arrow + title
- `showSearch`: Search icon
- `showNotifications`: Bell icon with badge
- `showProfile`: Avatar or login icon
- `onMenuOpen`: Opens hamburger drawer

**Behavior:**
- Default: Logo left, actions right
- Scroll > 50px: Add subtle shadow (shadow-sm)
- Search variant: Expands search input inline
- Back variant: Replaces logo with back arrow + page title

### 2.2 Bottom Navigation Bar

```
[🏠]    [👨‍⚕️]    [🏥]    [🩺]    [☰]
Home   Doctors Hospitals Symptoms More
```

**Props:**
- `activeTab`: 'home' | 'doctors' | 'hospitals' | 'symptoms' | 'more'
- `onTabChange`: (tab: string) => void
- `badgeCounts`: { notifications?: number; more?: number }

**Behavior:**
- Height: 64px + safe-area-inset-bottom
- Active: Filled icon + brand-500 color + bold label
- Inactive: Outline icon + text-muted + normal weight
- Tap feedback: Scale 0.95 + color flash
- Hidden on: Scroll down (reappears on scroll up)
- Keyboard open: Hidden (prevents overlap)

### 2.3 Announcement Banner

```
🔔 New: Free diabetes checkup camp in Cooch Behar on June 15. Learn more→ [✕]
```

**Logic:**
- Fetched from `announcement_banners` table (active + date-valid)
- Sorted by `priority DESC`
- Dismissed IDs stored in Zustand `uiStore.announcementDismissed`
- Realtime subscription: New banner appears with slide-down animation
- Background color: `bg_color` from DB (default: brand-500)
- Text color: `text_color` from DB (default: white)
- Action: Tap anywhere on banner -> navigate to `action_url`
- Dismiss: Tap X -> banner slides up, ID added to dismissed list

### 2.4 Emergency FAB (Floating Action Button)

Collapsed: Single red circular button (56px), pulse animation, fixed bottom-right above navbar.

Expanded (on tap): 3 action buttons vertically arranged with stagger animation:
- 🩸 Blood Bank
- 🚑 Ambulance  
- 📞 Helpline
- 🚨 Close

**States:**
- Long-press: Direct dial to national emergency (112)
- Data Source: `emergency_contacts` table, filtered by user's detected district

### 2.5 Search Bar Component

```
[🔍] Search doctors, hospitals, symptoms
     [📍 Cooch Behar ▾]
```

**Variants:**
- `compact`: Inline in top bar, expands on tap
- `full`: Dedicated search page header
- `sticky`: Sticks below top bar on scroll

**Behavior:**
- Tap -> Focus input + show keyboard
- Typing -> Debounce 300ms -> trigger search API
- Empty -> Show recent searches (from `user_search_history` if logged in, else localStorage)
- Results -> Autocomplete dropdown with categorized suggestions

### 2.6 Skeleton Loaders

**Types:**
- `card`: Avatar + 3 lines (doctor/hospital cards)
- `list`: Full-width rows (search results)
- `grid`: 3-column placeholder (categories)
- `hero`: Large rectangle (banner/article cover)
- `text`: 4-5 lines (article content)

**Animation:** `animate-pulse` with `bg-surface-tertiary`

### 2.7 Empty States

Every list/grid that can be empty MUST have an empty state with:
- Custom SVG illustration (theme-aware light/dark)
- Clear title (no blame on user)
- Description explaining why + what to do
- Primary CTA to resolve (never just "OK")

Example: "No doctors found in this area. Try expanding your search or select a different location. [Change Location] [Search All India]"

### 2.8 Error States

**Types:**
- `network`: Connection failed
- `server`: 5xx error
- `not_found`: 404 (slug invalid)
- `forbidden`: 403 (RLS blocked)
- `timeout`: Request took too long

**Behavior:**
- Retry: Re-fetches with exponential backoff
- Go Offline: Shows cached data if available
- Report: Opens feedback modal with pre-filled error context

---

## 3. SPLASH & ONBOARDING

### 3.1 Splash Screen

- Duration: 2 seconds minimum (brand exposure)
- During load: Pre-fetch critical data (categories, states, announcements)
- After load: Check if onboarding completed -> Route accordingly
- Background: Brand gradient (brand-500 -> brand-700)
- Logo: Animated scale-in (0.8 -> 1.0, 400ms)

### 3.2 Language Selection (First Launch Only)

Options: English (default), Hindi (हिंदी), Bengali (বাংলা)

**Logic:**
- Auto-detect from `navigator.language` -> Pre-select matching option
- Tap language -> Highlight + store in `uiStore.language`
- Continue -> Save to cookie `NEXT_LOCALE` + proceed to onboarding
- Can be changed later in Settings

### 3.3 Onboarding Slides (3 slides)

**Slide 1: "Find Doctors Near You"**
- Illustration: Doctor + map pin
- Text: "Find verified doctors in your area with ratings, fees, and timings."

**Slide 2: "Search by Symptoms"**
- Illustration: Person with symptoms
- Text: "Not sure which doctor? Select your symptoms and get matched with the right specialist."

**Slide 3: "Emergency Ready"**
- Illustration: Ambulance + phone
- Text: "Quick access to emergency numbers, blood banks, and 24/7 hospitals."

**Logic:**
- Swipe left/right to navigate
- Dot indicators show progress
- Skip -> Immediately to location setup
- Get Started -> Mark onboarding complete in localStorage + proceed to location setup
- Can be replayed from Settings > "How to Use"

---

## 4. LOCATION SETUP FLOW

### 4.1 Auto-Detect Screen

States:
1. **Prompt:** Show auto-detect button + manual option
2. **Loading:** Show radar animation while fetching geolocation
3. **Success:** Show detected location -> "Confirm" or "Change"
4. **Permission Denied:** Show manual selector immediately
5. **Not Found:** Show "We couldn't find your exact location" + manual fallback

### 4.2 Manual Location Selector

Cascading dropdowns:
- State* (required) -> Fetch districts
- District* (required) -> Fetch sub-districts
- City/Tehsil/Town* (required) -> Fetch local areas
- Block/Ward/Local Area (optional)

**Edge Cases:**
- State has no districts yet -> Show "Coming soon to your area" + allow nationwide search
- District has no sub-districts -> Skip sub-district, enable local area (or skip)
- User types in search box above dropdown -> Filter options client-side

### 4.3 Location Confirmation

Shows full hierarchy: "West Bengal > Cooch Behar > Tufanganj > Ward 3"

**After Confirm:**
- Save to Zustand (persisted to localStorage)
- Invalidate all location-dependent query caches
- Navigate to Home
- Show location chip in home header

---

## 5. HOME PAGE

### 5.1 Section Layout (Admin-Controlled Order)

Sections rendered based on `app_settings.homepage_settings.section_order`:

1. **Announcement Banner** - From `announcement_banners` table
2. **Hero Banner Slider** - From `ads` table (placement='homepage_banner')
3. **Location Chip** - User's saved location
4. **Quick Stats** - COUNT queries (doctors, hospitals, specialties, districts)
5. **Category Grid** - From `categories` table (is_active=TRUE, display_order ASC)
6. **Featured Doctors** - From `doctors` (is_featured=TRUE, district match)
7. **Native Ad Card** - From `ads` table (placement='native_feed')
8. **Nearby Hospitals** - From `hospitals` (district match, is_deleted=FALSE)
9. **Health Tips** - From `health_articles` (is_featured=TRUE, is_published=TRUE)
10. **Banner Ad** - From `ads` table (placement='homepage_banner_bottom')
11. **Popular Symptoms** - From `symptoms` (top 4 by view_count)
12. **Quick Links** - Static routes (Lab Tests, Blood Services)
13. **Emergency CTA** - Prominent emergency access button
14. **Active Poll** - From `polls` (is_active=TRUE, end_date > NOW)

### 5.2 Admin-Controlled Order

```json
{
  "section_order": [
    "announcement_banner", "hero_slider", "location_chip", "quick_stats",
    "category_grid", "featured_doctors", "native_ad_1", "nearby_hospitals",
    "health_tips", "banner_ad_1", "popular_symptoms", "quick_links",
    "emergency_cta", "active_poll"
  ],
  "enabled_sections": {
    "announcement_banner": true,
    "hero_slider": true,
    "health_tips": true,
    "active_poll": false
  }
}
```

---

## 6. UNIVERSAL SEARCH

### 6.1 Search Page

**States:**
- Empty: Show recent searches + trending searches + browse categories
- Typing: Show autocomplete dropdown (debounced 300ms, min 2 chars)
- Submitted: Show full results page with filters

### 6.2 Autocomplete Dropdown

Categories shown (max 3 each):
- 👨‍⚕️ Doctors (name match)
- 🏥 Hospitals (name match)
- 🩺 Symptoms (title match)
- 💊 Medicines (name match)
- 🏷️ Categories (specialty match)

### 6.3 Search Results Page

Grouped by type:
- 👨‍⚕️ Doctors (count)
- 🏥 Hospitals (count)
- 📰 Articles (count)
- 💊 Medicines (count)
- 🧪 Lab Tests (count)

**Filter tabs:** [All] [Doctors] [Hospitals] [Articles] [Tests] [Medicines]

**Sort options (single type):**
- Relevance (default)
- Rating (high to low)
- Distance (nearest first)
- Experience (most years)
- Fee (low to high)

**Empty State:**
"No results for 'xyzabc'. Try: checking spelling, using broader terms, searching without location filter. [Search All India] [Ask a Question]"

---

## 7. DOCTOR DISCOVERY

### 7.1 Doctor List Page

Header: Back + Title + Search + Filter
- Search bar: "Search by name, specialty, area..."
- Filter chips: Specialty dropdown, Location dropdown, Filter button
- Sort dropdown: Best Match (default), Rating, Experience, Fee
- Result count: "120 doctors found"

### 7.2 Doctor Card (Compact List Variant)

```
[PHOTO]  Dr. Priyanka Das      [✓]
         MBBS, MD (Medicine)
         [Medicine Specialist]
         🏥 Medical College Hospital
         ⭐⭐⭐⭐⭐ 4.8 (12 reviews)
         📍 Cooch Behar | 💰 ₹300-500

[📞 Call] [💬 WhatsApp] [-> Details]
```

**Props interface:**
```typescript
interface DoctorCardProps {
  doctor: {
    id: string; slug: string; name_en: string; name_hi?: string; name_bn?: string;
    photo_url?: string; specialty: string; degree: string[];
    experience_years: number; rating_avg: number; rating_count: number;
    consultation_fee_min: number; consultation_fee_max: number;
    verification_status: string; is_featured: boolean;
    chambers: { city: string; fees: number; }[];
  };
  variant: 'compact' | 'featured' | 'search-result';
  showActions?: boolean;
}
```

**Badges (left-to-right):**
1. `verified` (green check) - if verification_status === 'verified'
2. `featured` (gold star) - if is_featured === true
3. `available_today` (green dot) - if any chamber schedule matches today + current time
4. `popular` (fire) - if rating_count >= 10 && rating_avg >= 4.5

### 7.3 Filter Sheet (Bottom Sheet Modal)

**Filter categories:**
- Specialty: Radio buttons (All, Medicine, Cardiology, etc.)
- Location: State dropdown, District dropdown, City dropdown
- Fee Range: Slider ₹0 to ₹2000
- Experience: Radio (Any, 5+ years, 10+ years)
- Availability: Checkbox "Available Today", Checkbox "Verified Only"
- Sort By: Relevance, Rating, Experience, Fee Low-High, Fee High-Low

**Actions:** [Reset] [Show X Results ->]

---

## 8. DOCTOR PROFILE

### 8.1 Hero Section

```
[<-] Dr. Priyanka Das          [⋮] [♡]

[PHOTO 160x160]  [Medicine Specialist]
                 Dr. Priyanka Das
                 MBBS, MD (Medicine)
                 15+ years experience
                 ⭐⭐⭐⭐⭐ 4.8 (12)
                 [✓ Verified Doctor]

🏥 Medical College Hospital
🗣️ Bengali, English, Hindi

[📞 Call] [💬 WhatsApp] [📅 Book]
```

### 8.2 Sticky Tab Bar

Tabs: [Information] [Chambers] [Reviews] [Book]
- Sticky below top bar on scroll (top: 56px)
- Active tab indicator slides horizontally (Framer Motion)
- Swipe left/right on content to switch tabs

### 8.3 Tab 1: Information

Sections:
- Qualifications: 🎓 Degree list with year
- Expertise: 🏆 Specialty areas
- Treats: 💊 Disease keywords (expandable)
- Registration: 🏛️ BMDC number
- Languages: 🗣️ Spoken languages
- About: Bio text (expandable)

### 8.4 Tab 2: Chambers

Each chamber card:
- 🏥 Chamber name
- 📍 Address
- ⏰ Schedule (with "Open Now" / "Closed" / "Opens at X" badge)
- 💰 Fee
- 📞 Phone number
- [📞 Call] [💬 WhatsApp] [🗺️ Directions]

Primary chamber shown first. Map link opens Google Maps.

### 8.5 Tab 3: Reviews

Rating Summary:
- Average rating (large)
- Star breakdown bar chart
- Total review count

Individual reviews:
- Reviewer name, date, stars, text
- "Load More Reviews" button

Sticky bottom: [+ Write a Review]

**Review Submission Modal:**
- Your Name* (2-100 chars)
- Rating* (tap stars 1-5)
- Your Experience* (10-500 chars)
- Honeypot field (hidden, must be empty)
- [Submit Review]
- Warning: "Your review will be visible after moderation."

**Validation:**
- Rate limit: 3 reviews per doctor per 24h per IP
- Auto-flag spam via honeypot

### 8.6 Tab 4: Appointment

- Chamber selection (radio buttons)
- Date picker (next 7 days)
- Slot status: "Open" / "Closed" / "Opens at X"
- [📞 Call for Appointment]
- [💬 WhatsApp for Appointment] (pre-filled message)

**Note:** No online booking in Phase 1. Only call/WhatsApp CTAs.

### 8.7 Share Modal

Options:
- 🔗 Copy Link
- 📱 WhatsApp
- 📘 Facebook
- 🐦 Twitter
- 📧 Email
- 📋 More...
- QR Code (for scanning on another device)

---

## 9. HOSPITAL DISCOVERY

### 9.1 Hospital List Page

Filter tabs: [All] [Hospital] [Diagnostic] [Nursing Home] [Clinic] [Blood Bank]

### 9.2 Hospital Card

```
[COVER IMAGE]  City Hospital & Diagnostic
               📍 Station Road, Cooch Behar
               📞 +91-3582-220XXX
               ⏰ Open 24 hours
               🟢 Emergency | 🚑 Ambulance
               🩸 Blood Bank | 🛏️ 50 Beds

[📞 Call] [🗺️ Directions] [-> Details]
```

**Badges:**
- `emergency` (red) - if has_emergency === true
- `icu` (blue) - if has_icu === true
- `ambulance` (green) - if has_ambulance === true
- `blood_bank` (red drop) - if has_blood_bank === true
- `open_24h` (green) - if schedule shows all days open

---

## 10. HOSPITAL DETAIL

### 10.1 Layout

Header: Back + Title + Menu + Favorite
- Cover image gallery (horizontal scroll)
- Name, address, rating
- [📞 Call] [🗺️ Directions] [🌐 Website]

Tabs: [Overview] [Services] [Doctors] [Photos]

**Tab: Overview**
- Type, Beds, Emergency, ICU, Ambulance, Blood Bank
- Timings table
- Services tags
- Tests available tags

**Tab: Services**
- Full service list with descriptions

**Tab: Doctors**
- Doctor cards of affiliated doctors
- [View All Doctors at this Hospital ->]

**Tab: Photos**
- Grid gallery
- Lightbox on tap

---

## 11. SYMPTOMS ENGINE

### 11.1 Symptoms Grid Page

Grid: 2 columns, large cards (160px height)
- Image fills 70% of card
- Text on dark gradient overlay (bottom 30%)
- Border-radius: 16px
- Emergency badge: Red pill on top-right if is_emergency === true

### 11.2 Symptom Detail Page

Sections:
- Hero image
- 🚨 Emergency warning (if is_emergency === true)
- Recommended Specialists (from symptom_specialty_mapping)
- "When to see which doctor" guide
- Related Doctors in Your Area
- [View All {Specialty} ->]
- Related Articles
- [🚨 Emergency Contacts ->]

---

## 12. LAB & DIAGNOSTICS

### 12.1 Lab Tests Page

Search bar + Category filters: [Blood] [Imaging] [Cardiac] [Pathology] [Urine] [Allergy] [Hormone]

Test cards:
- Test name
- Price range (₹MIN-MAX across hospitals)
- Turnaround time
- [Book at X centers ->]

### 12.2 Test Detail Page

- About This Test (description)
- Preparation requirements
- Normal range
- Where to get this test (hospital list with prices)
- Home collection availability
- [Book Test ->] (links to hospital detail)

---

## 13. BLOOD SERVICES

### 13.1 Blood Services Page

Tabs: [Blood Banks] [Donors] [Requests]

**Blood Banks:**
- Name, address, available blood groups, phone
- [Call] [Directions]

**Blood Requests (Community):**
- Urgency badge (critical/urgent/normal)
- Blood group needed, units, location, contact
- Expiry date
- [Contact] [Share Request]

**Filter by Blood Group:** [A+] [A-] [B+] [B-] [AB+] [AB-] [O+] [O-] [All]

### 13.2 Post Blood Request

Form:
- Type: Request / Donor
- Blood Group* (multi-select for requests)
- Units needed
- Location
- Contact name + phone
- Urgency level
- Expiry date
- [Submit]

---

## 14. EMERGENCY SYSTEM

### 14.1 Emergency Page

**National Emergency:**
- 112 — National Emergency Number [📞 Tap to Call]

**Ambulance Services:**
- National Ambulance — 102
- District Hospital — [local number]

**Blood Banks (24/7):**
- List of emergency blood banks

**Hospitals with Emergency:**
- List from hospitals table (has_emergency=TRUE)

**Police & Fire:**
- Police: 100 | Fire: 101

**Important Disclaimer:**
- Call 112 for any life-threatening emergency
- Do not use this app as a substitute for emergency services
- Always call emergency services first

### 14.2 Emergency FAB (Global)

- Visible on all pages except emergency page
- Long-press: Direct dial 112
- Tap: Expand menu (Blood Bank, Ambulance, Helpline, Close)
- Pulse animation when on emergency symptom page

---

## 15. HEALTH MAGAZINE

### 15.1 Magazine Home

Categories: [All] [Tips] [Diseases] [Nutrition] [Mental Health] [News]

Featured Article (large card with cover image)
Latest Articles (grid)

### 15.2 Article Detail

- Cover image (full width)
- Title, author, publish date, read time
- [Share] [Bookmark] [Text Size ▾]
- Content (Markdown rendered with react-markdown)
- Related Articles
- [💬 Ask a Question about this topic]

**Text Size:** Small / Medium / Large (stored in uiStore)

---

## 16. Q&A COMMUNITY

### 16.1 Q&A Home

[ + Ask a Question ]
Categories: [All] [General] [Pregnancy] [Diabetes] [Mental Health] [Child]

Trending Questions:
- Question title
- Views count | Answers count
- [View Answers ->]

### 16.2 Question Detail

- Question title, asker, date, category, views
- [Share] [Follow] [Report]
- Answers list (sorted by helpfulness/upvotes)
- Verified doctor answers show "✅ Verified Doctor" badge
- [👍 Helpful (count)]
- [+ Add Your Answer]

### 16.3 Ask a Question

Form:
- Your Question* (title)
- Details (optional, multi-line)
- Category* (dropdown)
- [☐ Ask Anonymously]
- [Submit Question]
- Disclaimer: "This is for informational purposes only. Always consult a doctor for medical advice."

**Logic:**
- Questions stored in `health_questions` (status='pending' until admin approves)
- Answers stored in `health_answers` (also require approval)
- Upvotes: Anonymous (session_id based)

---

## 17. POLLS & REPORTS

### 17.1 Polls Page

**Active Polls:**
- Question
- Options (radio buttons)
- [Submit Vote]
- Vote count

**After Voting:**
- Show results with percentages
- Bar chart visualization

**Past Polls:**
- Read-only results
- [View Details ->]

**Logic:**
- One vote per session (stored in `poll_votes`)
- Polls from `polls` table (is_active=TRUE, end_date > NOW)

---

## 18. USER ACCOUNT

### 18.1 Login Page

- Phone number input (+91 prefix)
- [Send OTP]
- ──── OR ────
- [Continue with Google]
- Terms & Privacy links

**Logic:**
- OTP via Supabase Auth (phone provider)
- Google OAuth via Supabase Auth
- After login: Merge localStorage favorites with user_favorites table

### 18.2 Profile Page

- Photo, name, phone, member since
- [Change Photo] [Edit Profile]
- Activity stats: Favorites count, Questions count, Reviews count
- Links: My Favorites, My Questions, My Reviews, Search History
- [Settings ->] [Help & Support ->] [Logout]

### 18.3 Favorites Page

Tabs: [Doctors] [Hospitals] [Articles]
- Swipe-to-delete or edit-mode delete
- Empty state: "You haven't saved any favorites yet. Tap the ♡ icon on any doctor, hospital, or article to save it here."

---

## 19. MORE PAGE (HAMBURGER)

### 19.1 Full Menu

**User Section:**
- 👤 Name + Phone [-> Profile] (or "Login / Sign Up" button if guest)

**Quick Settings:**
- 🌐 Language [English ▾]
- 🌙 Theme [Light ▾]
- 📍 Location [Cooch Behar, WB ▾]

**Content Modules:**
- 📰 Health Magazine [->]
- ❓ Health Q&A [->]
- 📊 Community Polls [->]
- 🧪 Lab Tests [->]
- 🩸 Blood Services [->]
- 🚨 Emergency Contacts [->]

**App Actions:**
- ⭐ Rate the App [->]
- 📤 Share App [->]
- 💬 Feedback / Report Issue [->]
- 💡 Suggest a Feature [->]
- ❓ How to Use [->]

**Information:**
- ℹ️ About Us [->]
- 📞 Support / Contact [->]
- 🔒 Privacy Policy [->]
- 📋 Terms & Conditions [->]
- 🔍 Transparency Report [->]

**Footer:**
- Social icons: [Facebook] [Instagram] [YouTube] [X]
- Version 1.0.0 | Made with ❤️ in India

---

## 20. SETTINGS & PREFERENCES

### 20.1 Settings Page

**Account:**
- [Edit Profile ->]
- [Change Phone Number ->]
- [Delete Account ->]

**Preferences:**
- [Language ->] English
- [Theme ->] Light
- [Notifications ->] Enabled
- [Location ->] Cooch Behar, WB

**Privacy & Security:**
- [Clear Search History ->]
- [Clear Cache ->]
- [Manage Cookies ->]

**About:**
- [About Vytanexa ->]
- [Privacy Policy ->]
- [Terms & Conditions ->]
- [Transparency Report ->]
- [Open Source Licenses ->]

**Actions:**
- [Reset All Preferences]
- [Logout]

**Logic:**
- All preferences stored in Zustand + localStorage (persisted)
- Language change: Reloads page with new locale prefix
- Theme change: Toggles `dark` class on `<html>`
- Clear search history: Deletes from `user_search_history` table (if logged in) or localStorage
- Clear cache: Unregisters Service Worker + clears TanStack Query cache
- Reset preferences: Clears all localStorage except auth session

---

## 21. NOTIFICATION CENTER

### 21.1 Notification Page

Grouped by date: Today, Yesterday, Earlier

Each notification:
- Icon (🔔 📢 🩸 etc.)
- Title
- Body
- Timestamp
- Unread: Bold title + blue dot

**Actions:**
- Tap: Mark as read + navigate to relevant page
- Swipe left: Delete
- [Mark All Read]
- [Load More...]

**Realtime:**
- New notifications slide in with animation
- Badge count on bell icon in top bar

---

## 22. SEO LANDING PAGES

### 22.1 State/District Landing Page

URL: /west-bengal/cooch-behar

Content:
- H1: Healthcare Services in Cooch Behar
- Quick Stats: Doctors count, Hospitals count, Specialties count, Nearby cities
- Top Specialties in Cooch Behar (category pills)
- Featured Doctors (cards)
- Top Hospitals (cards)
- Related Locations (links to nearby districts)
- FAQs (accordion)
- Schema markup: LocalBusiness + FAQPage

### 22.2 Specialty Landing Page

URL: /west-bengal/cooch-behar/medicine

Content:
- H1: Best Medicine Specialists in Cooch Behar, West Bengal
- Meta description with counts
- Doctor cards list
- Related Specialties
- Other Cities for Medicine Specialists
- Breadcrumb: Home > West Bengal > Cooch Behar > Medicine Specialists

**SEO Requirements:**
- SSG with generateStaticParams at build time
- ISR revalidation: 3600s (1 hour)
- Schema markup on every page
- Dynamic meta tags
- Canonical URL
- Open Graph image
- Sitemap auto-generation

---

## 23. OFFLINE & ERROR STATES

### 23.1 Offline Page

- Illustration + "You're offline" message
- Last updated timestamp
- [🔄 Retry Connection]
- Cached Content section:
  - Recently Viewed Doctors
  - Saved Favorites
  - Emergency Contacts (always available)

**Logic:**
- Triggered when navigator.onLine === false
- Emergency contacts pre-cached in Service Worker
- Auto-recover: Toast + refresh when connection restored

### 23.2 404 Page

- Illustration + "Page not found"
- [Go Home] [Search]
- Popular pages links

### 23.3 Generic Error Boundary

- Illustration + "Something went wrong"
- Error ID for reporting
- [Try Again] [Go Home] [Report this issue]

---

## 24. PWA INSTALL FLOW

### 24.1 Install Prompt (Custom)

```
[App Icon]  Add Vytanexa to Home Screen
            Get faster access and offline support.

   [Not Now]    [Add to Home Screen]
```

**Trigger Conditions:**
- User visited >= 2 pages
- Session duration >= 30 seconds
- Not already installed
- Not dismissed in last 7 days
- Browser supports beforeinstallprompt

**Dismissal:**
- "Not Now": Hide for 3 days
- "Never": Store in localStorage, never show again
- Install success: Confetti animation + "Welcome to Vytanexa!"

---

## 25. INTERACTION MATRIX

### 25.1 Global Interactions

| Action | Trigger | Result | State Change | API Call |
|--------|---------|--------|------------|----------|
| Tap bottom nav | User tap | Navigate to tab | uiStore.activeTab | None |
| Pull to refresh | Pull down | Refresh page | Query invalidation | Re-fetch |
| Swipe back | Edge swipe | Go back | Router back | None |
| Long-press FAB | Hold 1s | Dial 112 | None | tel:112 |
| Tap notification | Notification tap | Navigate | Mark read | UPDATE notification |
| Share app | Menu tap | Share sheet | None | Web Share API |
| Change language | Settings tap | Reload page | uiStore.language | None |
| Toggle theme | Settings tap | Toggle class | uiStore.theme | None |

### 25.2 Page-Specific Interactions

| Page | Action | Result | API |
|------|--------|--------|-----|
| Home | Tap category | Navigate to doctor list with filter | None |
| Home | Tap doctor card | Navigate to doctor profile | Increment view_count (RPC) |
| Home | Dismiss banner | Hide banner | UPDATE uiStore |
| Doctor List | Apply filter | Update list | Re-fetch with filters |
| Doctor Profile | Tap call | Open dialer | tel: link |
| Doctor Profile | Tap WhatsApp | Open WhatsApp | wa.me link |
| Doctor Profile | Submit review | Toast confirmation | INSERT review |
| Doctor Profile | Favorite | Toggle heart | UPSERT user_favorite |
| Hospital Detail | Tap map | Open Google Maps | External link |
| Symptom Detail | Tap specialty | Filter doctors by specialty | None |
| Search | Type query | Show autocomplete | Debounced search API |
| Article | Bookmark | Save to favorites | UPSERT user_favorite |
| Q&A | Submit question | Toast + pending | INSERT question |
| Q&A | Upvote answer | Increment count | UPSERT vote |
| Poll | Vote | Show results | INSERT poll_vote |
| User | Login | OTP flow | Supabase Auth |

---

## 26. EDGE CASES & ERROR HANDLING

### 26.1 Location Edge Cases

| Case | Behavior | Fallback |
|------|----------|----------|
| Geolocation denied | Show manual selector | Nationwide search |
| Geolocation timeout | Show manual selector + retry | Last known location |
| State not in DB | Show "Coming soon" + suggest feedback | Nationwide search |
| District not in DB | Show state-level results + notify admin | State-level filter |
| User in remote area | Allow "Skip" -> show statewide | State-level results |
| Location changed mid-session | Invalidate caches + re-fetch | Toast notification |

### 26.2 Data Edge Cases

| Case | Behavior | Fallback |
|------|----------|----------|
| Doctor has no chambers | Show "No chamber info" | Hide from list |
| Doctor has no photo | Show initials avatar | Generic silhouette |
| Hospital has no images | Show building icon | Hide gallery tab |
| Article has no cover | Show category placeholder | Text-only card |
| Review has no text | Show "Rated X stars" | Display rating only |
| Search returns 0 results | Show empty state with suggestions | Related searches |
| API rate limit hit | Show "Too many requests" | Cached data |
| Supabase down | Show offline page | Static emergency page |

### 26.3 Auth Edge Cases

| Case | Behavior | Fallback |
|------|----------|----------|
| OTP not received | Show "Resend OTP" (30s cooldown) | WhatsApp OTP fallback |
| Invalid OTP | Show error + allow retry (max 3) | Request new OTP |
| Session expired | Show login modal + preserve state | Guest mode |
| Merge favorites conflict | Server wins + log conflict | Manual merge UI |
| Account deletion | Confirm modal + 7-day grace | Immediate logout |

### 26.4 Network Edge Cases

| Case | Behavior | Fallback |
|------|----------|----------|
| Slow 2G | Show skeleton longer + low-res images | Text-only mode |
| Intermittent connection | Queue actions + retry | Offline mode |
| Upload timeout | Show "Upload failed, retry?" | Save to draft |
| Download timeout | Show "Failed to load, retry?" | Cached placeholder |

---

## 27. TEST CASES

### 27.1 Unit Tests

| Component | Test | Expected |
|-----------|------|----------|
| DoctorCard | Render with all props | Correct info displayed |
| DoctorCard | Tap call button | tel: link triggered |
| BottomNav | Active tab highlight | Correct tab highlighted |
| SearchBar | Type 2 chars | Autocomplete API called |
| SearchBar | Type < 2 chars | No API call |
| FilterSheet | Apply filters | Callback with filter object |
| ReviewForm | Submit with empty text | Validation error shown |
| ReviewForm | Submit with honeypot filled | Silently rejected |
| LocationPicker | Select state | District dropdown populated |
| AnnouncementBanner | Dismiss | ID added to dismissed list |

### 27.2 Integration Tests

| Flow | Steps | Expected |
|------|-------|----------|
| Doctor discovery | Home -> Category -> List -> Profile | All data loads correctly |
| Search | Type query -> Autocomplete -> Result -> Profile | Navigation + data correct |
| Review submission | Profile -> Review form -> Submit -> Toast | Review saved as pending |
| Location change | Settings -> Change district -> Home | Content refreshes with new location |
| Favorite | Tap heart -> Profile -> Favorites | Item appears in favorites |
| Share | Profile -> Share -> Copy link | Link copied to clipboard |
| Offline | Turn off WiFi -> Open app | Cached content shown |
| PWA install | Visit 2 pages -> Prompt -> Install | App added to home screen |

### 27.3 E2E Tests (Playwright)

| Scenario | Steps | Assertions |
|----------|-------|------------|
| Complete user journey | Onboard -> Set location -> Search doctor -> View profile -> Call doctor | All pages load, phone dialer opens |
| Emergency flow | Tap FAB -> Select ambulance -> Call | Emergency number dialed |
| Content moderation | Submit review -> Admin approves -> Review visible | Review appears after approval |
| Multi-language | Switch to Hindi -> Verify all labels | No English text visible |
| Accessibility | Tab navigation -> Screen reader | All interactive elements reachable |
| Performance | Lighthouse audit | All scores >= 90 |

### 27.4 API Contract Tests

| Endpoint | Request | Expected Response | Error Cases |
|----------|---------|-------------------|-------------|
| GET /api/search?q=medicine | { q: "medicine" } | { results: { doctors: [...], hospitals: [...] } } | 400 (empty query), 429 (rate limit) |
| POST /api/submit-review | { doctor_id, name, rating, text } | { success: true, id: "..." } | 400 (validation), 429 (rate limit) |
| GET /api/geocode/reverse | { lat, lng } | { state, district } | 400 (missing coords), 404 (no match) |

---

*End of UI/UX & Feature Specification*
*Vytanexa — User-Side Web App Phase 1*
