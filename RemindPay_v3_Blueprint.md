# 🚀 RemindPay — Complete Project Blueprint
### *"Get Paid. Stress-Free. Every Time."*

> **Role:** Lead Architect + Senior Engineer Strategist + Product Manager
> **Version:** 3.0 — GAS + Firebase + GitHub Pages Edition
> **Last Updated:** May 2026

---

## 📌 TABLE OF CONTENTS

1. [Executive Summary & Vision](#1-executive-summary)
2. [Target Market Deep-Dive](#2-target-market)
3. [Feature Matrix — $1/mo = Premium Value](#3-feature-matrix)
4. [Zero-Cost Infrastructure Stack](#4-zero-cost-stack)
5. [Architecture Blueprint](#5-architecture)
6. [Database Schema (Firestore)](#6-database-schema)
7. [Screen-by-Screen UI/UX Layout](#7-ui-ux-screens)
8. [User Flow & Journey Map](#8-user-flow)
9. [Payment Architecture](#9-payment)
10. [GitHub Pages Auto-Deploy Plan](#10-deploy)
11. [Complete To-Do Task List](#11-todo)
12. [Step-by-Step Build Guide (Day-by-Day)](#12-build-guide)
13. [Go-to-Market Strategy](#13-gtm)
14. [Revenue Projection](#14-revenue)
15. [Risk & Mitigation](#15-risk)

---

## 1. EXECUTIVE SUMMARY & POLISHED VISION {#1-executive-summary}

### 🎯 Product Identity

| | |
|---|---|
| **Product Name** | **RemindPay** |
| **Tagline** | *"Get Paid. Stress-Free. Every Time."* |
| **Category** | Micro-SaaS / Freelancer Fintech Tool |
| **Price** | Free forever + $1/month Pro |
| **Primary Problem** | Freelancers lose 20–30% revenue chasing unpaid invoices manually |
| **Core Insight** | At $1/mo, the psychological barrier to upgrade is nearly zero — cheaper than a candy bar |

### 🧠 Polished One-Liner (for landing page hero)
> *"Create professional invoices in 90 seconds. RemindPay automatically follows up with your clients so you never have to chase payments again — or feel awkward about it."*

### 💡 Why RemindPay Wins vs. Wave / FreshBooks / Zoho

| Feature | Wave | FreshBooks | **RemindPay $1** |
|---|---|---|---|
| Price | Free (ads) | $17/mo | **$1/mo** |
| Auto Reminders | ✅ (complex) | ✅ (complex) | ✅ **Simple + Smart** |
| Setup Time | 30+ mins | 45+ mins | **< 5 mins** |
| Mobile-First UX | ❌ | ❌ | ✅ |
| Target: Solo/Freelancer | Partial | Partial | **100% focus** |
| Multi-Currency | ✅ | ✅ | ✅ |
| Beginner Friendly | ❌ | ❌ | ✅ **Zero learning curve** |

---

## 2. TARGET MARKET DEEP-DIVE {#2-target-market}

### 🌍 Geographic Targets & Localization

| Country | Currency | Payment Method | Language | Key User Persona |
|---|---|---|---|---|
| 🇺🇸 United States | USD $ | Stripe, PayPal | English | Freelance devs, designers, consultants |
| 🇨🇦 Canada | CAD $ | Stripe | English/French | Creative freelancers, coaches |
| 🇦🇺 Australia | AUD $ | Stripe | English | Agency solo owners, VAs |
| 🇳🇿 New Zealand | NZD $ | Stripe | English | Freelancers, small biz |
| 🇸🇬 Singapore | SGD $ | Stripe | English | Tech freelancers, consultants |
| 🇬🇧 United Kingdom | GBP £ | Stripe | English | Contractors, creatives |
| 🇩🇪 Germany | EUR € | Stripe | English/German | Freelance engineers, designers |
| 🇳🇱 Netherlands | EUR € | Stripe | English/Dutch | Remote workers, tech freelancers |
| 🇮🇳 India | INR ₹ | Razorpay / Stripe | English/Hindi | Upwork/Fiverr freelancers (HUGE market) |
| 🇵🇰 Pakistan | PKR ₨ | Stripe (limited) / Manual | English/Urdu | Fiverr top earners, developers |
| 🇳🇵 Nepal | NPR रू | Manual / Wise | English/Nepali | Freelancers, remote workers |

### 👤 User Persona Profiles

**Persona A — "The Upwork Dev" (India/Pakistan/Nepal)**
- Age: 22–35, earns $500–$3000/month
- Pain: Clients ghost after delivery, manual WhatsApp follow-up is humiliating
- Wins with RemindPay: Auto email reminders, client tracking, professional PDF

**Persona B — "The Creative Freelancer" (US/UK/Canada)**
- Age: 25–40, graphic designer / copywriter / video editor
- Pain: Inconsistent cash flow, hates "money talk"
- Wins with RemindPay: Branded invoices, auto follow-ups, payment status dashboard

**Persona C — "The Solo Consultant" (Germany/Netherlands/Singapore)**
- Age: 30–50, coach / consultant / VA
- Pain: Spending hours on invoicing instead of client work
- Wins with RemindPay: Speed (90-second invoice), professionalism, multi-currency

---

## 3. FEATURE MATRIX — $1/mo = PREMIUM VALUE {#3-feature-matrix}

### 🆓 Free Plan
- 5 invoices/month
- PDF download & shareable link
- Basic invoice template (1 design)
- Manual status tracking
- Email support (community)
- RemindPay branding on invoice footer
- 1 client/business profile

### ⭐ Pro Plan — $1/month (THE STAR)

**Invoicing & Documents**
- ✅ Unlimited invoices
- ✅ 5 beautiful invoice templates (Modern, Minimal, Bold, Classic, Creative)
- ✅ Custom logo upload + brand color picker
- ✅ Custom footer text & payment instructions
- ✅ Recurring invoices (weekly/monthly auto-generate)
- ✅ Invoice duplication (clone previous invoice in 1 click)
- ✅ Quote → Invoice conversion
- ✅ Bulk invoice export (ZIP of PDFs)
- ✅ Multi-currency (USD, GBP, EUR, AUD, CAD, SGD, INR, PKR, NPR + 15 more)
- ✅ Tax line items (GST, VAT, HST — by country)
- ✅ Discount support (% or fixed)
- ✅ Partial payment tracking

**Smart Reminders & Automation**
- ✅ Auto email reminders: 3 days before due, on due date, 3 days after, 7 days after
- ✅ Custom reminder schedule (set your own trigger days)
- ✅ Polite, professional email templates (editable)
- ✅ WhatsApp reminder copy (1-click copy formatted message)
- ✅ Late fee auto-calculation display on overdue notice
- ✅ Client email open tracking ("Viewed" status)

**Dashboard & Analytics**
- ✅ Payment status pipeline: Draft → Sent → Viewed → Partial → Paid → Overdue
- ✅ Monthly earnings summary widget
- ✅ Outstanding amount counter (real-time)
- ✅ Client payment behavior score (pays on time? late?)
- ✅ Revenue chart (last 6 months bar chart)
- ✅ Best client by revenue leaderboard
- ✅ Average payment time metric

**Client Management**
- ✅ Unlimited client profiles
- ✅ Client contact book (name, email, phone, company, address)
- ✅ Per-client invoice history
- ✅ Client notes (internal, not visible to client)
- ✅ Client portal link (client sees all their invoices in one place)

**Business Profile & Settings**
- ✅ Multiple business profiles (freelancer + side project)
- ✅ Custom "From" email display name
- ✅ Business address, tax ID, registration number
- ✅ Payment instructions per invoice (bank transfer, PayPal link, UPI ID, etc.)
- ✅ Default payment terms (Net 7, Net 15, Net 30, custom)

**Productivity & Extras**
- ✅ Service/Product catalog (save frequently billed items)
- ✅ CSV export (accounting-ready, Tally/QuickBooks compatible)
- ✅ Activity log (who did what, when)
- ✅ Mobile-optimized PWA (works like native app)
- ✅ Dark mode
- ✅ Priority email support

> 💬 **$1/month delivers what competitors charge $15–$30 for. This is the killer positioning.**

---

## 4. ZERO-COST INFRASTRUCTURE STACK {#4-zero-cost-stack}

### 🆓 100% Free Tier Services (New Stack)

| Service | Purpose | Free Limit | Replaces What? |
|---|---|---|---|
| **GitHub Pages** | Static site hosting + auto-deploy | Unlimited bandwidth, free SSL | Vercel hosting |
| **Firebase Firestore** | NoSQL database + real-time sync | 50k reads/day, 20k writes/day, 1 GB | Supabase PostgreSQL |
| **Firebase Auth** | Authentication (Google + Email) | Unlimited users (Spark plan) | Supabase Auth |
| **Firebase Storage** | File storage (logos, PDFs) | 5 GB free | Supabase Storage |
| **Google Apps Script (GAS)** | Backend API + Cron engine + Email | 6 hrs/day execution free | Vercel Serverless + Cron + Resend |
| **GAS MailApp / GmailApp** | Transactional & reminder emails | 100 emails/day (MailApp), 500/day (GmailApp) | Resend API |
| **GAS Time-based Triggers** | Daily automated reminder scheduler | 20 triggers/project free | Vercel Cron Jobs |
| **GAS doPost() Web App** | Stripe webhook receiver + processor | Free | Supabase Edge Functions / Webhooks |
| **GAS HTML/Blob PDF** | Server-side invoice PDF generation | Free | React PDF / Puppeteer |
| **jsPDF (CDN)** | Client-side PDF generation fallback | Free (MIT library) | React PDF |
| **Stripe** | Pro subscription payments | Free until revenue (2.9% + 30¢) | Same |
| **GitHub** | Code repo + CI/CD trigger | Unlimited repos | Same |
| **Cloudflare** | DNS + CDN + DDoS + SSL | Always free plan | Same |
| **Chart.js (CDN)** | Analytics charts | Free (MIT library) | Recharts |
| **PostHog** | Analytics + User behavior | 1M events/month free | Same |

### 🔄 Technology Migration Map

| Old Stack (v2) | New Stack (v3) | Benefit |
|---|---|---|
| Next.js 14 + React | **HTML + Tailwind CDN + Vanilla JS** | No build step, no Node.js needed |
| Vercel | **GitHub Pages** | Simpler, free, push-to-deploy |
| Supabase PostgreSQL | **Firebase Firestore** | Real-time, flexible, generous free tier |
| Supabase Auth | **Firebase Authentication** | Battle-tested, Google OAuth built-in |
| Supabase Storage | **Firebase Storage** | 5 GB free, CDN-backed |
| Vercel Serverless Functions | **GAS Web App (doPost/doGet)** | No server, no config, truly serverless |
| Vercel Cron Jobs | **GAS Time-based Triggers** | Free daily scheduler via Google |
| Resend API | **GAS MailApp / GmailApp** | Free email via Google account |
| React PDF / Puppeteer | **GAS Blob PDF + jsPDF** | No npm, no build, runs in GAS/browser |
| Supabase Webhooks | **GAS doPost() as webhook URL** | GAS Web App URL = Stripe webhook endpoint |
| shadcn/ui | **Tailwind CSS CDN + custom components** | No npm, no build step |
| Recharts | **Chart.js (CDN)** | Drop-in `<script>` tag, no bundle |
| Upstash Redis | **GAS PropertiesService (caching)** | Free built-in GAS key-value store |
| TypeScript | **Vanilla JS** | Simpler, no transpilation needed |

### 💰 Monthly Cost Breakdown

| Users | Monthly Cost | Revenue | Profit |
|---|---|---|---|
| 0–100 | **$0** | $0–$100 | $0–$100 |
| 100–500 | **$0** (all free tiers cover it) | $100–$500 | ~$100–$500 |
| 500–2000 | **~$0** (GAS + GitHub Pages scale freely) | $500–$2000 | ~$500–$2000 |
| 2000–10000 | **~$25** (Firebase Blaze plan if needed) | $2000–$10000 | $1975–$9975 |

**Conclusion: Zero cost until ~2,000 paying users. Nearly pure profit from day 1.**

---

## 5. ARCHITECTURE BLUEPRINT {#5-architecture}

### 🏗️ System Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                             │
│   Browser / PWA / Mobile                                      │
│   HTML + Tailwind CSS (CDN) + Vanilla JS                      │
│   Hosted on: GitHub Pages (remindpay.com)                     │
└───────────────────────┬──────────────────────────────────────┘
                        │ HTTPS
         ┌──────────────┴──────────────┐
         │                             │
┌────────▼────────────┐      ┌─────────▼──────────────────────┐
│   FIREBASE LAYER    │      │   GOOGLE APPS SCRIPT (GAS)     │
│                     │      │   (Backend + API + Engine)      │
│  Firestore          │      │                                  │
│  (NoSQL Database)   │◄─────┤  GAS Web App URL (doPost/doGet) │
│                     │      │  → Invoice email sender          │
│  Firebase Auth      │      │  → Reminder email engine         │
│  (Google + Email)   │      │  → PDF generator (Blob)          │
│                     │      │  → Stripe webhook handler        │
│  Firebase Storage   │      │                                  │
│  (Logos, PDFs)      │      │  GAS Time-based Triggers         │
│                     │      │  → Daily 8 AM cron               │
└─────────────────────┘      │  → Scans Firestore via REST API  │
                             │  → Sends reminder emails         │
                             └─────────────────┬────────────────┘
                                               │
                                    ┌──────────▼──────────┐
                                    │     STRIPE API       │
                                    │  Pro subscriptions   │
                                    │  $1/month billing    │
                                    └─────────────────────┘
```

### 📂 GitHub Pages Project Structure

```
remindpay/                          ← GitHub repository root
│
├── index.html                      ← Landing page (public)
├── pricing.html                    ← Pricing page (public)
├── login.html                      ← Login / Signup (public)
│
├── dashboard/
│   ├── index.html                  ← Dashboard home
│   ├── invoices.html               ← Invoice list
│   ├── invoice-new.html            ← Create invoice
│   ├── invoice-detail.html         ← Invoice detail/edit
│   ├── clients.html                ← Client list
│   ├── client-detail.html          ← Client detail + history
│   ├── reminders.html              ← Reminder settings
│   ├── analytics.html              ← Charts & insights
│   ├── settings.html               ← Settings (profile, billing)
│   ├── services.html               ← Services catalog
│   └── upgrade.html                ← Pro upgrade page
│
├── public/
│   ├── invoice.html                ← Public invoice view (for clients)
│   └── portal.html                 ← Client portal (all their invoices)
│
├── js/
│   ├── firebase-config.js          ← Firebase init (config keys)
│   ├── auth.js                     ← Login, logout, session guard
│   ├── firestore.js                ← Firestore CRUD helpers
│   ├── invoices.js                 ← Invoice create/read/update/delete
│   ├── clients.js                  ← Client management
│   ├── reminders.js                ← Reminder settings UI
│   ├── analytics.js                ← Charts (Chart.js)
│   ├── pdf.js                      ← PDF generation (jsPDF)
│   ├── stripe.js                   ← Stripe Checkout trigger
│   ├── dashboard.js                ← Dashboard stats + widgets
│   ├── gas-api.js                  ← GAS Web App fetch() calls
│   └── utils.js                    ← Shared helpers (currency, dates)
│
├── css/
│   └── custom.css                  ← Overrides (dark mode, fonts)
│
├── assets/
│   └── images/                     ← Logo, icons, og-image
│
└── gas/                            ← Google Apps Script code (reference)
    ├── Code.gs                     ← Main GAS file (doGet, doPost)
    ├── EmailService.gs             ← MailApp email functions
    ├── PdfService.gs               ← PDF generation (Blob/HTML)
    ├── ReminderCron.gs             ← Daily trigger function
    ├── StripeWebhook.gs            ← Stripe event handler
    └── FirestoreService.gs         ← Firebase REST API calls from GAS
```

### 🔄 Key Data Flows

**Flow 1: Invoice Creation**
```
User fills form (HTML) →
Vanilla JS validates + calculates →
Firebase SDK writes to Firestore (invoices collection) →
Generate unique public_token (stored in doc) →
fetch() → GAS Web App → GAS sends "Invoice Sent" email to client (MailApp) →
GAS generates PDF (Blob) → Upload to Firebase Storage →
Update invoice doc with pdf_url →
Dashboard status updates in real-time (Firestore listener)
```

**Flow 2: Auto Reminder Engine (GAS Cron)**
```
GAS Time-based Trigger fires daily at 8 AM UTC →
ReminderCron.gs runs →
Calls Firebase REST API → Queries invoices needing reminders →
For each invoice: checks trigger conditions (days before/after due) →
Sends reminder email via MailApp →
Updates reminder_logs in Firestore via REST API →
Updates invoice.reminder_count
```

**Flow 3: Stripe Subscription**
```
User clicks "Upgrade to Pro" →
JS calls Stripe.js → Creates Checkout Session (via GAS Web App) →
Redirect to Stripe hosted checkout →
User pays → Stripe fires webhook →
Stripe sends POST to GAS Web App URL (doPost) →
StripeWebhook.gs verifies signature + processes event →
Updates users.plan = 'pro' in Firestore via REST API →
Pro features unlock instantly on next page load
```

**Flow 4: PDF Generation**
```
Option A (Server-side): fetch() → GAS Web App →
PdfService.gs builds HTML invoice → HtmlService.createHtmlOutput →
Convert to PDF Blob → Return as base64 →
JS decodes → Download / upload to Firebase Storage

Option B (Client-side): jsPDF library →
JS builds invoice layout → jsPDF.save() → download PDF →
Upload blob to Firebase Storage → Store URL in Firestore
```

---

## 6. DATABASE SCHEMA (FIRESTORE) {#6-database-schema}

> Firebase Firestore is a NoSQL document database. Data is stored as collections of documents. Each document is a JSON-like object.

### 📊 Collections & Document Structures

---

#### Collection: `users`
```
Document ID: {firebase_uid}

{
  uid:                  string (Firebase Auth UID)
  email:                string
  full_name:            string
  avatar_url:           string | null
  plan:                 "free" | "pro"
  plan_started_at:      timestamp | null
  plan_expires_at:      timestamp | null
  stripe_customer_id:   string | null
  stripe_subscription_id: string | null
  invoice_count_month:  number (free tier counter)
  invoice_count_reset:  timestamp (when to reset counter)
  country:              string (auto-detect)
  currency:             string (default: "USD")
  timezone:             string (default: "UTC")
  created_at:           timestamp
  updated_at:           timestamp
}
```

---

#### Collection: `business_profiles`
```
Document ID: auto-generated

{
  user_id:              string (ref → users)
  business_name:        string
  logo_url:             string | null
  brand_color:          string (default: "#4F46E5")
  address_line1:        string | null
  address_line2:        string | null
  city:                 string | null
  state:                string | null
  postal_code:          string | null
  country:              string | null
  phone:                string | null
  website:              string | null
  tax_id:               string | null
  tax_label:            string (default: "Tax")
  default_currency:     string (default: "USD")
  default_due_days:     number (default: 14)
  payment_instructions: string | null
  invoice_prefix:       string (default: "INV")
  invoice_counter:      number (default: 1)
  footer_text:          string | null
  template_id:          string (default: "modern")
  is_default:           boolean
  created_at:           timestamp
  updated_at:           timestamp
}
```

---

#### Collection: `clients`
```
Document ID: auto-generated

{
  user_id:              string (ref → users)
  name:                 string
  email:                string
  phone:                string | null
  company_name:         string | null
  address_line1:        string | null
  city:                 string | null
  state:                string | null
  postal_code:          string | null
  country:              string | null
  currency:             string | null (override user default)
  notes:                string | null (private)
  payment_score:        number (1–10, auto-calculated)
  avg_payment_days:     number | null
  total_billed:         number (default: 0)
  total_paid:           number (default: 0)
  portal_token:         string (unique, for client portal URL)
  created_at:           timestamp
  updated_at:           timestamp
}
```

---

#### Collection: `invoices`
```
Document ID: auto-generated

{
  user_id:              string (ref → users)
  business_profile_id:  string (ref → business_profiles)
  client_id:            string (ref → clients)
  invoice_number:       string ("INV-001")
  title:                string | null
  status:               "draft" | "sent" | "viewed" | "partial" | "paid" | "overdue" | "cancelled"
  currency:             string
  subtotal:             number
  discount_type:        "percent" | "fixed" | null
  discount_value:       number (default: 0)
  discount_amount:      number (calculated)
  tax_rate:             number (default: 0)
  tax_amount:           number (calculated)
  total:                number
  amount_paid:          number (default: 0)
  amount_due:           number (calculated)
  issue_date:           string ("YYYY-MM-DD")
  due_date:             string ("YYYY-MM-DD")
  notes:                string | null (visible to client)
  terms:                string | null
  public_token:         string (unique, for public URL)
  pdf_url:              string | null
  viewed_at:            timestamp | null
  view_count:           number (default: 0)
  paid_at:              timestamp | null
  reminder_enabled:     boolean (default: true)
  reminder_count:       number (default: 0)
  last_reminder_at:     timestamp | null
  is_recurring:         boolean (default: false)
  recurring_freq:       "weekly" | "monthly" | "quarterly" | null
  recurring_end:        string | null ("YYYY-MM-DD")
  parent_invoice_id:    string | null (ref → invoices)
  created_at:           timestamp
  updated_at:           timestamp
}

  Subcollection: invoices/{invoiceId}/items
  {
    description:        string
    quantity:           number
    unit:               string ("item" | "hour" | "piece" | "word")
    unit_price:         number
    amount:             number (qty × price)
    sort_order:         number
    service_id:         string | null (ref → services_catalog)
    created_at:         timestamp
  }
```

---

#### Collection: `payments`
```
Document ID: auto-generated

{
  invoice_id:           string (ref → invoices)
  user_id:              string (ref → users)
  amount:               number
  currency:             string
  payment_method:       "bank_transfer" | "paypal" | "cash" | "stripe" | "upi" | "wise" | "other"
  reference_number:     string | null
  notes:                string | null
  payment_date:         string ("YYYY-MM-DD")
  recorded_at:          timestamp
  recorded_by:          string (ref → users)
}
```

---

#### Collection: `reminder_settings`
```
Document ID: {user_id} (one per user)

{
  user_id:              string
  enabled:              boolean (default: true)
  before_due_days:      number[] (default: [3, 7])
  on_due_day:           boolean (default: true)
  after_due_days:       number[] (default: [3, 7, 14])
  send_time_hour:       number (default: 9, = 9 AM in user's timezone)
  email_subject_tpl:    string
  email_body_tpl:       string
  include_pdf:          boolean (default: true)
  from_name:            string ("Your Name via RemindPay")
  created_at:           timestamp
  updated_at:           timestamp
}
```

---

#### Collection: `reminder_logs`
```
Document ID: auto-generated

{
  invoice_id:           string
  user_id:              string
  client_email:         string
  trigger_type:         "before_due" | "on_due" | "after_due" | "manual"
  days_offset:          number (-3 = 3 days before, 7 = 7 days after)
  email_subject:        string
  sent_at:              timestamp
  status:               "sent" | "failed" | "bounced"
  gas_message_id:       string | null (GAS mail reference)
}
```

---

#### Collection: `services_catalog`
```
Document ID: auto-generated

{
  user_id:              string
  name:                 string ("Logo Design", "Web Development")
  description:          string | null
  default_rate:         number
  unit:                 string ("hour" | "piece" | "word" | "day")
  created_at:           timestamp
  updated_at:           timestamp
}
```

---

#### Collection: `subscriptions`
```
Document ID: {user_id} (one per user)

{
  user_id:              string
  stripe_subscription_id: string
  stripe_price_id:      string
  status:               "active" | "cancelled" | "past_due" | "trialing"
  current_period_start: timestamp
  current_period_end:   timestamp
  cancel_at_period_end: boolean
  created_at:           timestamp
  updated_at:           timestamp
}
```

---

#### Collection: `activity_logs`
```
Document ID: auto-generated

{
  user_id:              string
  entity_type:          "invoice" | "client" | "payment" | "reminder"
  entity_id:            string
  action:               "created" | "updated" | "sent" | "paid" | "viewed" | "deleted"
  description:          string (human-readable)
  metadata:             object (extra data, flexible)
  created_at:           timestamp
}
```

### 🔒 Firebase Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // All user-owned collections: filter by user_id
    match /business_profiles/{docId} {
      allow read, write: if request.auth != null
        && resource.data.user_id == request.auth.uid;
      allow create: if request.auth != null
        && request.resource.data.user_id == request.auth.uid;
    }

    // Repeat pattern for: clients, invoices, payments,
    // reminder_settings, reminder_logs, services_catalog,
    // subscriptions, activity_logs

    // Public invoice view — anyone with public_token can read
    match /invoices/{invoiceId} {
      allow read: if resource.data.public_token != null; // public view
      allow read, write: if request.auth != null
        && resource.data.user_id == request.auth.uid;
    }

    // Client portal — anyone with portal_token can read their invoices
    match /clients/{clientId} {
      allow read: if resource.data.portal_token != null; // portal view
      allow read, write: if request.auth != null
        && resource.data.user_id == request.auth.uid;
    }
  }
}
```

---

## 7. SCREEN-BY-SCREEN UI/UX LAYOUT {#7-ui-ux-screens}

### 🎨 Design System

**Color Palette**
```
Primary:    #4F46E5 (Indigo 600) — trust, professional
Success:    #10B981 (Emerald 500) — paid status, positive
Warning:    #F59E0B (Amber 500) — due soon, attention
Danger:     #EF4444 (Red 500) — overdue, urgent
Neutral:    #1F2937 (Gray 800) — text
Background: #F9FAFB (Gray 50) — main bg
Card:       #FFFFFF — card bg
Dark Mode:  #111827 bg, #1F2937 card
```

**Typography (loaded via Google Fonts CDN)**
```
Display/Headings: "Sora" — geometric, modern, professional
Body/UI:          "Inter" — readable, clean
Numbers/Amounts:  "JetBrains Mono" — clear financial figures
```

**Tailwind CDN (no build step needed)**
```html
<script src="https://cdn.tailwindcss.com"></script>
<!-- Custom config in same script tag or custom.css for specifics -->
```

**Spacing Grid:** 4px base unit (4, 8, 12, 16, 24, 32, 48, 64px)

---

### SCREEN 01 — Landing Page (Public)

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR                                                      │
│  [Logo: RemindPay ⚡] -------- [Features] [Pricing] [Login] │
│                                              [Get Started→]  │
├─────────────────────────────────────────────────────────────┤
│  HERO SECTION                                                │
│                                                              │
│  ┌──────────────────────────┐  ┌───────────────────────────┐ │
│  │                          │  │  📄 INVOICE PREVIEW       │ │
│  │  Get Paid.               │  │  ┌─────────────────────┐  │ │
│  │  Stress-Free.            │  │  │ RemindPay Invoice    │  │ │
│  │  Every Time.             │  │  │ INV-042             │  │ │
│  │                          │  │  │ Due: June 15, 2026  │  │ │
│  │  Create professional     │  │  │ Amount: $1,500.00   │  │ │
│  │  invoices in 90 seconds. │  │  │ Status: 🟡 Sent     │  │ │
│  │  Auto reminders do the   │  │  └─────────────────────┘  │ │
│  │  chasing for you.        │  │                           │ │
│  │                          │  │  ✅ Reminder sent 3 days  │ │
│  │  [🚀 Start Free →]       │  │     before due date       │ │
│  │  [Watch 60s demo ▶]      │  │  ✅ Client viewed invoice  │ │
│  │                          │  │  ⏳ Awaiting payment...   │ │
│  │  No credit card needed   │  └───────────────────────────┘ │
│  └──────────────────────────┘                               │
├─────────────────────────────────────────────────────────────┤
│  SOCIAL PROOF BAR                                            │
│  "Join 1,200+ freelancers in 11 countries"                  │
│  ⭐⭐⭐⭐⭐  |  🇺🇸🇮🇳🇬🇧🇩🇪🇦🇺🇨🇦🇸🇬🇳🇿🇳🇱🇵🇰🇳🇵          │
├─────────────────────────────────────────────────────────────┤
│  PAIN → SOLUTION (3 columns)                                 │
│  ┌────────────────┐ ┌────────────────┐ ┌─────────────────┐  │
│  │ 😰 Awkward     │ │ ⏰ Hours Lost  │ │ 😤 Clients Ghost│  │
│  │ chasing money  │ │ on follow-ups  │ │ after delivery  │  │
│  │ ↓              │ │ ↓              │ │ ↓               │  │
│  │ System sends   │ │ Auto reminders │ │ Smart 4-touch   │  │
│  │ polite reminders│ │ run on autopilot││ follow-up system│  │
│  └────────────────┘ └────────────────┘ └─────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  FEATURE SHOWCASE (alternating image + text sections)        │
│  Feature 1: Invoice Creator (screenshot)                     │
│  Feature 2: Auto Reminder Timeline visual                    │
│  Feature 3: Dashboard analytics preview                      │
│  Feature 4: Client Portal demo                               │
├─────────────────────────────────────────────────────────────┤
│  PRICING SECTION                                             │
│  ┌─────────────────────┐   ┌─────────────────────────────┐  │
│  │ 🆓 FREE             │   │ ⭐ PRO — $1/month           │  │
│  │ Forever free        │   │ That's $12/year!             │  │
│  │ • 5 invoices/month  │   │ • Everything in Free         │  │
│  │ • PDF download      │   │ • Unlimited invoices         │  │
│  │ • Basic template    │   │ • Auto email reminders       │  │
│  │                     │   │ • 5 beautiful templates      │  │
│  │ [Get Started Free]  │   │ • Client portal              │  │
│  └─────────────────────┘   │ • Analytics dashboard        │  │
│                             │ • Multi-currency             │  │
│                             │ [Upgrade for $1/month →]     │  │
│                             └─────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  TESTIMONIALS (3 cards)                                      │
├─────────────────────────────────────────────────────────────┤
│  FINAL CTA                                                   │
│  "Stop losing money to late payments. Start free today."    │
│  [🚀 Create Your First Invoice Free →]                       │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  Links | Countries | Privacy | Terms | Twitter | Email      │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 02 — Login / Signup

```
┌─────────────────────────────────────────────────────────────┐
│  [← Back to homepage]                     [RemindPay ⚡]    │
│                                                              │
│           ┌────────────────────────────────────┐            │
│           │                                    │            │
│           │    Welcome to RemindPay ⚡         │            │
│           │    Get paid faster. Always.        │            │
│           │                                    │            │
│           │  [🔵 Continue with Google]         │            │
│           │  (Firebase Auth — 1 click)         │            │
│           │                                    │            │
│           │  ─────────── or ───────────        │            │
│           │                                    │            │
│           │  Email: [________________]         │            │
│           │  Password: [_______________]       │            │
│           │                                    │            │
│           │  [Sign In]  or  [Create Account]   │            │
│           │                                    │            │
│           │  Forgot password?                  │            │
│           │                                    │            │
│           │  ✅ Free forever • No credit card  │            │
│           └────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 03 — Onboarding (3 steps)

```
STEP 1/3 — Business Info
┌─────────────────────────────────────────────────────────────┐
│  🎉 Let's set up your account (takes 2 minutes)             │
│  ●──○──○                                                     │
│                                                              │
│  Your Name: [_________________]                              │
│  Business Name: [_______________]                            │
│  Country: [Dropdown — 11 countries + Other]                  │
│  Currency: [Auto-selected based on country + editable]       │
│                                                              │
│  [Continue →]                                                │
└─────────────────────────────────────────────────────────────┘

STEP 2/3 — Brand Setup
┌─────────────────────────────────────────────────────────────┐
│  Make your invoices look professional                        │
│  ○──●──○                                                     │
│                                                              │
│  Upload Logo: [📁 Firebase Storage upload]  [Skip]          │
│  Brand Color: [🎨 Color picker] #4F46E5                     │
│  Invoice prefix: INV-                                        │
│  Default due date: [14 days] after invoice date             │
│                                                              │
│  ┌── LIVE PREVIEW ─────────────────────────┐                │
│  │  [Your Logo]   Your Business Name       │                │
│  │                Invoice #INV-001          │                │
│  └─────────────────────────────────────────┘                │
│                                                              │
│  [← Back]  [Continue →]                                     │
└─────────────────────────────────────────────────────────────┘

STEP 3/3 — Payment Info
┌─────────────────────────────────────────────────────────────┐
│  How do your clients pay you?                                │
│  ○──○──●                                                     │
│                                                              │
│  Payment Instructions (shown on invoice):                    │
│  [Large text area]                                           │
│  Placeholder: "Bank: HDFC, Account: 1234567890..."          │
│              "PayPal: name@email.com"                        │
│              "UPI: yourname@upi"                             │
│                                                              │
│  Tax ID (optional): [____________]                           │
│  Tax Label: [VAT ▼]  Tax Rate: [0%]                         │
│                                                              │
│  [← Back]  [🚀 Go to Dashboard!]                            │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 04 — Dashboard (Main Home)

```
┌─────────────────────────────────────────────────────────────┐
│ SIDEBAR (collapsible on mobile)      TOPBAR                  │
│ ┌──────────────────┐   ┌──────────────────────────────────┐  │
│ │ [RP] RemindPay   │   │  Good morning, Sarah! 👋          │  │
│ │                  │   │  You have 2 overdue invoices 🔴  │  │
│ │ 📊 Dashboard     │   └──────────────────────────────────┘  │
│ │ 📄 Invoices      │                                          │
│ │ 👥 Clients       │   ┌──STAT CARDS (4 in a row)──────────┐  │
│ │ ⏰ Reminders     │   │ 💰         📤         🔴        ✅│  │
│ │ 📈 Analytics     │   │ $4,200     12          3         8 │  │
│ │ ⚙️  Settings     │   │ Total Due  Sent    Overdue    Paid │  │
│ │                  │   └──────────────────────────────────┘  │
│ │ ──────────       │                                          │
│ │ 🆓 Free Plan     │   ┌──REVENUE CHART (Chart.js)─────────┐  │
│ │ 4/5 invoices     │   │ $5k│          ██                   │  │
│ │ used this month  │   │ $3k│       ██ ██ ██                │  │
│ │                  │   │ $2k│ ██ ██ ██ ██ ██ ██            │  │
│ │ [⭐ Upgrade $1] │   │    Jan Feb Mar Apr May Jun         │  │
│ └──────────────────┘   └──────────────────────────────────┘  │
│                                                               │
│                         ┌──RECENT INVOICES──────────────────┐ │
│                         │ INV-012  Acme Co.  $1,500  🟡Sent │ │
│                         │ INV-011  John D.   $800    🔴Ovrd │ │
│                         │ INV-010  TechFirm  $2,400  ✅Paid │ │
│                         │                    [View All →]    │ │
│                         └──────────────────────────────────┘  │
│                                                               │
│                         ┌──QUICK ACTIONS────────────────────┐ │
│                         │ [+ New Invoice]  [+ Add Client]   │ │
│                         │ [📥 Import CSV]  [📊 View Report] │ │
│                         └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 05 — Create Invoice

```
┌─────────────────────────────────────────────────────────────┐
│  [← Back]   New Invoice                    [Save Draft] [Send]│
├─────────────────────────────────────────────────────────────┤
│  LEFT COLUMN (Form)              RIGHT COLUMN (Live Preview)  │
│                                                              │
│  FROM: [Your Business ▼]         ┌─ LIVE PREVIEW ─────────┐  │
│                                  │ [Logo] ACME DESIGN      │  │
│  TO: [Select or + Add Client]    │ INVOICE #INV-015        │  │
│  Name: [___________]             │ Due: Jun 15, 2026       │  │
│  Email: [____________]           │                         │  │
│                                  │ Website Design  $1,500  │  │
│  Invoice #: INV-015 (auto)       │ Tax (10%): $150         │  │
│  Issue Date: [📅 Today]          │ TOTAL: $1,650.00        │  │
│  Due Date: [📅 Jun 15, 2026]     └────────────────────────┘  │
│                                                              │
│  ITEMS:                                                      │
│  ┌─────────────────────────────┐                            │
│  │ Description   Qty  Price  Amt│                           │
│  │ Website Design 1  1500 $1500│                            │
│  │ [+ Add Item from catalog]   │                            │
│  └─────────────────────────────┘                            │
│                                                              │
│  Discount: [None ▼]  Tax: [10%▼] GST                        │
│  TOTAL: $1,650                                               │
│                                                              │
│  NOTES: [________________________]                           │
│                                                              │
│  REMINDER SETTINGS:                                          │
│  ✅ Auto reminders enabled                                   │
│  [3 days before] [Due date] [3 days after] [7 days after]   │
│                                                              │
│  [💾 Save Draft]  [📤 Send via GAS Email]                   │
│  [📋 Copy Shareable Link] [📱 Copy WhatsApp Message]        │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 06 — Invoice List

```
┌─────────────────────────────────────────────────────────────┐
│  Invoices               [+ New Invoice]   [📊 Export CSV]   │
│                                                              │
│  FILTER BAR: [All ▼] [This Month ▼] [Client: All ▼]         │
│  STATUS TABS: [All 24] [Draft 3] [Sent 8] [Overdue 3] [Paid]│
├─────────────────────────────────────────────────────────────┤
│  Invoice    Client      Amount    Due Date    Status  Action │
│  INV-015   John Smith   $1,650   Jun 15      🟡 Sent   [•••] │
│  INV-014   Acme Corp    $3,200   Jun 10      🔴 Overdue [•••] │
│             ⚠️ 5 days overdue — Reminder sent 3 times         │
│  INV-013   Alice M.     $800     Jun 20      👁️ Viewed  [•••] │
│  INV-012   TechFirm     $2,400   May 30      ✅ Paid    [•••] │
│  ──────────────────────────────────────────────────────────  │
│  Total Outstanding: $5,650.00   Total Paid (Month): $4,200  │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 07 — Invoice Detail View

```
┌─────────────────────────────────────────────────────────────┐
│  [← Invoices]  INV-014 • Acme Corp             [Edit] [•••] │
│                                                              │
│  STATUS: 🔴 OVERDUE (5 days)                                 │
│  ✅Draft → ✅Sent → ✅Viewed → ⬜Partial → ⬜Paid            │
│                                                              │
│  ┌─ AMOUNTS ──────────┐   ┌─ CLIENT ──────────────────────┐ │
│  │ Invoice Total: $3,200│   │ Acme Corporation              │ │
│  │ Amount Paid: $0     │   │ acme@company.com              │ │
│  │ AMOUNT DUE: $3,200  │   │ [Send Reminder] [View Portal] │ │
│  │ Due: June 10, 2026  │   │ Payment Score: ⭐⭐⭐ (3.2/5) │ │
│  │ [+ Record Payment]  │   └──────────────────────────────┘ │
│  └─────────────────────┘                                    │
│                                                              │
│  ┌─ REMINDER HISTORY (from Firestore reminder_logs) ──────┐  │
│  │ ✅ Jun 7  — "3 days before due" reminder sent via GAS   │  │
│  │ ✅ Jun 10 — "Due date" reminder sent via GAS            │  │
│  │ ✅ Jun 13 — "3 days overdue" reminder sent via GAS      │  │
│  │ ⏳ Jun 17 — "7 days overdue" reminder scheduled         │  │
│  │                    [Send Manual Reminder Now via GAS]   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─ ACTIONS ──────────────────────────────────────────────┐  │
│  │ [📤 Resend Invoice] [📋 Copy Link] [📱 WhatsApp Copy]  │  │
│  │ [💰 Record Payment] [📄 Download PDF] [🔄 Duplicate]   │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 08 — Public Invoice (Client View)

```
URL: remindpay.com/public/invoice.html?token={public_token}
(Vanilla JS reads ?token param → fetches from Firestore)

┌─────────────────────────────────────────────────────────────┐
│  [RP ⚡]                              [🌐 English ▼]        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [LOGO]     SARAH'S DESIGN STUDIO                  │    │
│  │  INVOICE #INV-014  |  Due: Jun 10, 2026            │    │
│  │  BILL TO: Acme Corporation                         │    │
│  │  ITEMS: Web Development  40h × $80  $3,200         │    │
│  │  TOTAL DUE: $3,200.00 USD                          │    │
│  │  PAYMENT: PayPal: sarah@designstudio.com           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  [📥 Download PDF (jsPDF)]                                  │
│  💬 Questions? Reply to sarah@designstudio.com               │
│  Powered by RemindPay — remindpay.com                       │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 09 — Client Portal

```
URL: remindpay.com/public/portal.html?token={portal_token}

┌─────────────────────────────────────────────────────────────┐
│  [RP ⚡]  Your Invoices from Sarah's Design Studio          │
├─────────────────────────────────────────────────────────────┤
│  Hi, Acme Corporation! Here are your invoices:              │
│                                                              │
│  │ INV-014  Jun 1, 2026   $3,200  🔴 OVERDUE  [View]   │   │
│  │ INV-010  Apr 5, 2026   $1,800  ✅ PAID     [View]   │   │
│                                                              │
│  Total Outstanding: $3,200.00                                │
│  💬 Contact Sarah: sarah@designstudio.com                    │
└─────────────────────────────────────────────────────────────┘
```

---

### SCREEN 10 — Clients Page, SCREEN 11 — Reminder Settings, SCREEN 12 — Analytics, SCREEN 13 — Upgrade Page, SCREEN 14 — Settings

*(Same layouts as v2.0 — UI/UX unchanged. Only the backend plumbing is different: Firestore instead of Supabase, Chart.js instead of Recharts, GAS instead of Vercel API.)*

---

## 8. USER FLOW & JOURNEY MAP {#8-user-flow}

### 🗺️ Complete User Journey

```
DISCOVERY
    │
    ▼
Landing Page (GitHub Pages) → Sees "Get Paid Stress-Free" → Resonates
    │
    ▼
SIGNUP (30 seconds)
Firebase Auth: Google 1-click or Email/Password
Auto-create user doc in Firestore → Redirect to Onboarding
    │
    ▼
ONBOARDING (2 minutes)
3-step form → Saves to Firestore (business_profiles + users collections)
    │
    ▼
FIRST INVOICE (90 seconds)
Dashboard → "Create your first invoice" CTA →
JS form → Live preview (client-side) → Save to Firestore →
fetch() → GAS Web App → GAS MailApp sends email to client
    │
    ▼
AHA MOMENT (Day 3)
GAS Time-based Trigger fires at 8 AM →
ReminderCron.gs reads Firestore via REST API →
Sends reminder email via GAS MailApp →
User sees "Paid" notification in dashboard →
"I didn't have to chase! This works!" 🎉
    │
    ▼
UPGRADE TRIGGER
a) 5th invoice → "Free limit hit"
b) Tries custom logo → "Pro feature"
c) Wants custom reminder schedule → "Pro feature"
    │
    ▼
UPGRADE (30 seconds)
Upgrade page → JS → GAS creates Stripe Checkout Session →
Stripe hosted checkout → User pays $1 →
Stripe webhook fires → POST to GAS Web App URL →
StripeWebhook.gs updates Firestore: users.plan = 'pro' →
Instant Pro unlock
    │
    ▼
RETENTION (Monthly)
Monthly summary email sent by GAS scheduled trigger:
"This month you collected $X using Y reminders. Saved Z hours."
→ Clear value → Zero churn motivation
```

---

## 9. PAYMENT ARCHITECTURE {#9-payment}

### 💳 Stripe Integration Plan

**Product in Stripe**
```
Product: RemindPay Pro
Price:   $1.00 USD/month
ID:      price_remindpay_pro_monthly
Stripe amounts in cents → 100 = $1.00
```

**Stripe Webhooks → GAS Web App**

| Stripe Event | GAS Handler Action |
|---|---|
| `checkout.session.completed` | Activate Pro, store subscription_id in Firestore |
| `customer.subscription.updated` | Sync plan status in Firestore |
| `customer.subscription.deleted` | Downgrade to Free in Firestore |
| `invoice.payment_failed` | GAS MailApp → email user: "Payment failed" |
| `invoice.payment_succeeded` | Extend Pro period in Firestore |

**GAS Stripe Webhook Setup**
```
1. Deploy GAS project as Web App (accessible to "Anyone")
2. Copy GAS Web App URL (looks like: https://script.google.com/macros/s/AKfycb.../exec)
3. Paste URL as Stripe webhook endpoint in Stripe Dashboard
4. GAS doPost(e) receives all Stripe events
5. Verify Stripe-Signature header in GAS
6. Process event → update Firestore via REST API
```

**GAS Checkout Session Creation**
```javascript
// GAS Web App (Code.gs)
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  if (data.action === 'createCheckoutSession') {
    const stripe = StripeService.init(STRIPE_SECRET_KEY);
    const session = stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: APP_URL + '/dashboard/upgrade.html?success=1',
      cancel_url:  APP_URL + '/dashboard/upgrade.html?cancelled=1',
      customer_email: data.email,
      metadata: { user_id: data.userId }
    });
    return ContentService.createTextOutput(
      JSON.stringify({ url: session.url })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Free Tier Enforcement (Vanilla JS + Firestore)**
```javascript
// invoices.js
async function checkInvoiceLimit(userId) {
  const userDoc = await getDoc(doc(db, 'users', userId));
  const user = userDoc.data();
  
  if (user.plan === 'free') {
    if (user.invoice_count_month >= 5) {
      showUpgradeModal('You've used all 5 free invoices this month.');
      return false;
    }
  }
  return true;
}
```

**India/Pakistan/Nepal Alternative**
- Primary: Stripe (international cards work)
- Fallback: Manual — email request → PayPal/Wise payment
- Future: Razorpay integration for INR billing

---

## 10. GITHUB PAGES AUTO-DEPLOY PLAN {#10-deploy}

### 🔄 Zero-Command Deployment Strategy

**Philosophy: Push code → GitHub → Auto-serves via GitHub Pages. Done.**
No build step. No terminal needed after initial setup. Static HTML just works.

### Step 1: GitHub Repository Setup

```
Repository Name: remindpay
Visibility:      Public (required for free GitHub Pages)
Main branch:     main → serves to remindpay.github.io/remindpay/
Custom domain:   remindpay.com (via CNAME file + Cloudflare DNS)

Branches:
├── main        → production (remindpay.com)
└── develop     → staging (preview before merge)
```

### Step 2: Enable GitHub Pages

```
Settings → Pages → Source: Deploy from branch → main → / (root)
→ GitHub auto-serves index.html from root
→ HTTPS: auto-enabled (Let's Encrypt via GitHub)
→ Custom domain: add remindpay.com in Settings → Pages
→ Add CNAME file to repo root containing: remindpay.com
```

### Step 3: Cloudflare DNS Setup

```
DNS Record:
  Type: CNAME
  Name: remindpay.com
  Target: your-username.github.io
  Proxy: ✅ (Orange cloud — Cloudflare CDN + DDoS)

SSL: Full (Strict) — GitHub's Let's Encrypt cert behind Cloudflare
```

### Step 4: Google Apps Script Deployment

```
1. Open script.google.com → New Project → "RemindPay Backend"
2. Write all GAS files (Code.gs, EmailService.gs, etc.)
3. Deploy → New Deployment → Type: Web App
4. Execute as: Me (your Google account)
5. Who has access: Anyone
6. Copy Web App URL → store in js/gas-api.js as GAS_URL constant
7. Re-deploy after any code changes (new deployment version)
```

### Step 5: Environment Config (No .env needed for static site)

```javascript
// js/firebase-config.js (committed to repo — Firebase config is safe to expose)
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "remindpay.firebaseapp.com",
  projectId: "remindpay",
  storageBucket: "remindpay.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

// js/gas-api.js
const GAS_URL = "https://script.google.com/macros/s/AKfycb.../exec";
const STRIPE_PUBLISHABLE_KEY = "pk_live_..."; // safe to expose (publishable)
```

> **Note:** Firebase config keys are safe to expose publicly — security is enforced by Firestore Security Rules, not by hiding keys. Never commit `STRIPE_SECRET_KEY` — that lives only in GAS PropertiesService (server-side).

```javascript
// In GAS (Code.gs) — SECRET keys stored safely server-side
const STRIPE_SECRET_KEY = PropertiesService.getScriptProperties()
                            .getProperty('STRIPE_SECRET_KEY');
const FIREBASE_API_KEY   = PropertiesService.getScriptProperties()
                            .getProperty('FIREBASE_API_KEY');
```

### Deployment Flow (Ongoing)

```
Developer edits HTML/JS/CSS locally →
git add . && git commit -m "feat: new feature" →
git push origin main →
GitHub Pages auto-serves updated files in ~30 seconds →
Live at remindpay.com →

For GAS changes: update GAS editor → Deploy new version →
Update GAS_URL in gas-api.js if needed → push to GitHub
```

---

## 11. GOOGLE APPS SCRIPT — FULL ENGINE GUIDE

### ⚙️ GAS: The 5-in-1 Backend Engine

GAS replaces five separate services from v2.0 — completely free.

---

### GAS File 1: `Code.gs` — Main Router

```javascript
// Routes all incoming requests (Web App entry point)
function doGet(e) {
  const action = e.parameter.action;
  if (action === 'trackView') return handleInvoiceView(e);
  return ContentService.createTextOutput('RemindPay GAS Backend v3');
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  
  switch(action) {
    case 'sendInvoiceEmail':    return sendInvoiceEmail(data);
    case 'sendReminderEmail':   return sendReminderEmail(data);
    case 'generatePDF':         return generateInvoicePDF(data);
    case 'createCheckout':      return createStripeCheckout(data);
    case 'stripeWebhook':       return handleStripeWebhook(e);
    default: return errorResponse('Unknown action');
  }
}
```

---

### GAS File 2: `EmailService.gs` — Reminder + Invoice Emails

```javascript
// Replaces: Resend API
// Uses: GAS MailApp (free, 100/day) or GmailApp (free, 500/day)

function sendInvoiceEmail(data) {
  const { to, clientName, invoiceNumber, amount, dueDate,
          invoiceLink, fromName, pdfBase64 } = data;

  const subject = `Invoice ${invoiceNumber} — ${amount} due ${dueDate}`;
  const body    = buildInvoiceEmailBody(clientName, invoiceNumber,
                                        amount, dueDate, invoiceLink);
  const options = { name: fromName };
  
  if (pdfBase64) {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(pdfBase64), 'application/pdf',
      `Invoice-${invoiceNumber}.pdf`
    );
    options.attachments = [blob];
  }

  MailApp.sendEmail(to, subject, '', { ...options, htmlBody: body });
  return successResponse({ sent: true });
}

function sendReminderEmail(data) {
  const { to, clientName, invoiceNumber, amount,
          dueDate, invoiceLink, fromName, triggerType } = data;

  const templates = {
    before_due: buildBeforeDueTemplate(clientName, invoiceNumber,
                                       amount, dueDate, invoiceLink),
    on_due:     buildDueTodayTemplate(clientName, invoiceNumber,
                                       amount, dueDate, invoiceLink),
    after_due:  buildOverdueTemplate(clientName, invoiceNumber,
                                       amount, dueDate, invoiceLink)
  };

  const html    = templates[triggerType] || templates.after_due;
  const subject = `Reminder: Invoice ${invoiceNumber} — ${amount}`;

  MailApp.sendEmail(to, subject, '', { name: fromName, htmlBody: html });
  return successResponse({ sent: true });
}
```

---

### GAS File 3: `ReminderCron.gs` — Daily Cron Engine

```javascript
// Replaces: Vercel Cron Jobs
// Setup: Edit → Triggers → Add Trigger → dailyReminderJob
//        → Time-based → Day timer → 8 AM to 9 AM

function dailyReminderJob() {
  const today = new Date();
  
  // Query Firestore for all active invoices via REST API
  const invoices = FirestoreService.queryInvoices({
    status: ['sent', 'viewed', 'partial', 'overdue'],
    reminder_enabled: true
  });

  invoices.forEach(invoice => {
    const dueDate    = new Date(invoice.due_date);
    const daysUntil  = Math.floor((dueDate - today) / (1000*60*60*24));
    const settings   = FirestoreService.getReminderSettings(invoice.user_id);

    if (!settings.enabled) return;

    // Determine trigger type
    let triggerType = null;
    if (daysUntil > 0 && settings.before_due_days.includes(daysUntil)) {
      triggerType = 'before_due';
    } else if (daysUntil === 0 && settings.on_due_day) {
      triggerType = 'on_due';
    } else if (daysUntil < 0 && settings.after_due_days.includes(Math.abs(daysUntil))) {
      triggerType = 'after_due';
    }

    if (!triggerType) return;

    // Check if already sent this reminder
    const alreadySent = FirestoreService.checkReminderSent(
      invoice.id, triggerType, Math.abs(daysUntil)
    );
    if (alreadySent) return;

    // Get client details
    const client   = FirestoreService.getClient(invoice.client_id);
    const business = FirestoreService.getBusinessProfile(invoice.business_profile_id);

    // Send reminder email
    sendReminderEmail({
      to:            client.email,
      clientName:    client.name,
      invoiceNumber: invoice.invoice_number,
      amount:        formatCurrency(invoice.total, invoice.currency),
      dueDate:       invoice.due_date,
      invoiceLink:   `https://remindpay.com/public/invoice.html?token=${invoice.public_token}`,
      fromName:      `${business.business_name} via RemindPay`,
      triggerType:   triggerType
    });

    // Log in Firestore
    FirestoreService.logReminder({
      invoice_id:   invoice.id,
      user_id:      invoice.user_id,
      client_email: client.email,
      trigger_type: triggerType,
      days_offset:  daysUntil,
      status:       'sent'
    });

    // Update invoice.reminder_count
    FirestoreService.incrementReminderCount(invoice.id);
  });

  Logger.log(`Daily reminder job complete. Processed ${invoices.length} invoices.`);
}

// Set up trigger once (run this function once from GAS editor)
function setupDailyTrigger() {
  ScriptApp.newTrigger('dailyReminderJob')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}
```

---

### GAS File 4: `PdfService.gs` — Invoice PDF Generator

```javascript
// Replaces: React PDF / Puppeteer
// Returns: base64-encoded PDF string → JS decodes and downloads

function generateInvoicePDF(data) {
  const { invoice, items, business, client } = data;

  // Build HTML template for the invoice
  const html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { display: flex; justify-content: space-between; }
        .logo { font-size: 24px; font-weight: bold; color: ${business.brand_color}; }
        .invoice-title { font-size: 32px; color: #4F46E5; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #F3F4F6; padding: 12px; text-align: left; }
        td { padding: 12px; border-bottom: 1px solid #E5E7EB; }
        .totals { text-align: right; margin-top: 20px; }
        .total-row { font-size: 20px; font-weight: bold; color: #4F46E5; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">${business.business_name}</div>
          <div>${business.address_line1 || ''}</div>
          <div>${business.city || ''}, ${business.country || ''}</div>
        </div>
        <div>
          <div class="invoice-title">INVOICE</div>
          <div>#${invoice.invoice_number}</div>
          <div>Issue: ${invoice.issue_date}</div>
          <div>Due: ${invoice.due_date}</div>
        </div>
      </div>

      <div style="margin: 30px 0;">
        <strong>BILL TO:</strong><br>
        ${client.name}<br>
        ${client.company_name || ''}<br>
        ${client.email}
      </div>

      <table>
        <tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Amount</th></tr>
        ${items.map(item => `
          <tr>
            <td>${item.description}</td>
            <td>${item.quantity}</td>
            <td>${formatCurrencyGAS(item.unit_price, invoice.currency)}</td>
            <td>${formatCurrencyGAS(item.amount, invoice.currency)}</td>
          </tr>
        `).join('')}
      </table>

      <div class="totals">
        <div>Subtotal: ${formatCurrencyGAS(invoice.subtotal, invoice.currency)}</div>
        ${invoice.discount_amount > 0 ? `<div>Discount: -${formatCurrencyGAS(invoice.discount_amount, invoice.currency)}</div>` : ''}
        ${invoice.tax_amount > 0 ? `<div>${business.tax_label || 'Tax'} (${invoice.tax_rate}%): ${formatCurrencyGAS(invoice.tax_amount, invoice.currency)}</div>` : ''}
        <div class="total-row">TOTAL: ${formatCurrencyGAS(invoice.total, invoice.currency)}</div>
      </div>

      ${invoice.notes ? `<div style="margin-top: 30px;"><strong>Notes:</strong><br>${invoice.notes}</div>` : ''}
      ${business.payment_instructions ? `<div style="margin-top: 20px;"><strong>Payment Instructions:</strong><br>${business.payment_instructions}</div>` : ''}

      <div style="margin-top: 40px; color: #9CA3AF; font-size: 12px; border-top: 1px solid #E5E7EB; padding-top: 10px;">
        ${business.footer_text || 'Thank you for your business!'}<br>
        Generated by RemindPay — remindpay.com
      </div>
    </body>
    </html>
  `);

  // Convert HTML to PDF Blob
  const blob = html.getAs('application/pdf')
                   .setName(`Invoice-${invoice.invoice_number}.pdf`);
  
  const base64 = Utilities.base64Encode(blob.getBytes());
  return ContentService.createTextOutput(JSON.stringify({ pdf: base64 }))
                       .setMimeType(ContentService.MimeType.JSON);
}
```

---

### GAS File 5: `FirestoreService.gs` — Firebase REST API Client

```javascript
// GAS doesn't have Firebase SDK — use Firebase REST API directly
// Replaces: Supabase client queries

const FIREBASE_PROJECT_ID = 'remindpay';
const FIREBASE_API_KEY    = PropertiesService.getScriptProperties()
                              .getProperty('FIREBASE_API_KEY');
const FIRESTORE_BASE      = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

function firestoreGet(collection, docId) {
  const url      = `${FIRESTORE_BASE}/${collection}/${docId}?key=${FIREBASE_API_KEY}`;
  const response = UrlFetchApp.fetch(url);
  return parseFirestoreDoc(JSON.parse(response.getContentText()));
}

function firestoreQuery(collection, filters) {
  const url  = `${FIRESTORE_BASE}:runQuery?key=${FIREBASE_API_KEY}`;
  const body = buildStructuredQuery(collection, filters);
  const opts = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ structuredQuery: body })
  };
  const response = UrlFetchApp.fetch(url, opts);
  return JSON.parse(response.getContentText())
    .filter(r => r.document)
    .map(r => parseFirestoreDoc(r.document));
}

function firestoreUpdate(collection, docId, fields) {
  const url  = `${FIRESTORE_BASE}/${collection}/${docId}?key=${FIREBASE_API_KEY}`;
  const body = { fields: toFirestoreFields(fields) };
  const opts = {
    method: 'patch',
    contentType: 'application/json',
    payload: JSON.stringify(body)
  };
  UrlFetchApp.fetch(url, opts);
}

// Helper: convert JS object to Firestore field format
function toFirestoreFields(obj) {
  const fields = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (typeof val === 'string')  fields[key] = { stringValue: val };
    if (typeof val === 'number')  fields[key] = { integerValue: val };
    if (typeof val === 'boolean') fields[key] = { booleanValue: val };
  });
  return fields;
}
```

---

### GAS File 6: `StripeWebhook.gs` — Stripe Event Handler

```javascript
// Replaces: Supabase Edge Functions / Webhooks
// GAS Web App URL = Stripe webhook endpoint URL

function handleStripeWebhook(e) {
  const payload   = e.postData.contents;
  const sigHeader = e.parameter['stripe-signature'] || '';
  
  // Verify webhook signature
  const webhookSecret = PropertiesService.getScriptProperties()
                          .getProperty('STRIPE_WEBHOOK_SECRET');
  if (!verifyStripeSignature(payload, sigHeader, webhookSecret)) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid signature' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  const event = JSON.parse(payload);
  
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId  = session.metadata.user_id;
      FirestoreService.firestoreUpdate('users', userId, { plan: 'pro' });
      FirestoreService.firestoreUpdate('subscriptions', userId, {
        stripe_subscription_id: session.subscription,
        status: 'active'
      });
      break;
    }
    case 'customer.subscription.deleted': {
      const sub    = event.data.object;
      const userId = sub.metadata.user_id;
      FirestoreService.firestoreUpdate('users', userId, { plan: 'free' });
      break;
    }
    case 'invoice.payment_failed': {
      const inv    = event.data.object;
      const email  = inv.customer_email;
      MailApp.sendEmail(email, 'RemindPay: Payment failed',
        'Your RemindPay Pro payment failed. Please update your card: ' +
        'https://remindpay.com/dashboard/settings.html#billing');
      break;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ received: true }))
                       .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 12. COMPLETE TO-DO TASK LIST {#11-todo}

### 📋 Phase 0: Accounts & Services Setup

**GitHub**
- [ ] Create GitHub account
- [ ] Create public repository: `remindpay`
- [ ] Enable GitHub Pages (Settings → Pages → main branch)
- [ ] Add CNAME file for custom domain

**Firebase**
- [ ] Create Firebase project: "remindpay" at console.firebase.google.com
- [ ] Enable Firestore (Native mode)
- [ ] Enable Firebase Authentication (Email/Password + Google OAuth)
- [ ] Enable Firebase Storage
- [ ] Copy Firebase config object → paste into `js/firebase-config.js`
- [ ] Write and deploy Firestore Security Rules

**Google Apps Script**
- [ ] Create GAS project at script.google.com
- [ ] Write all 6 GAS files (Code, EmailService, ReminderCron, PdfService, FirestoreService, StripeWebhook)
- [ ] Set Script Properties: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FIREBASE_API_KEY`
- [ ] Deploy as Web App (Anyone can access)
- [ ] Copy Web App URL → paste into `js/gas-api.js`
- [ ] Set up daily time-based trigger (`setupDailyTrigger()`)

**Stripe**
- [ ] Create Stripe account
- [ ] Create RemindPay Pro product ($1/month)
- [ ] Copy price ID → add to GAS Script Properties
- [ ] Set webhook endpoint = GAS Web App URL
- [ ] Test webhook delivery in Stripe Dashboard

**Cloudflare**
- [ ] Buy/transfer domain to Cloudflare (~$10/year)
- [ ] Add CNAME record → GitHub Pages
- [ ] Enable Cloudflare proxy

---

### 📋 Phase 1: HTML Foundation

**HTML/CSS Base**
- [ ] Build `index.html` — Landing page (Tailwind CDN)
- [ ] Build `login.html` — Firebase Auth (Google + Email)
- [ ] Build dashboard shell layout (sidebar + topbar)
- [ ] Write `auth.js` — Firebase Auth session guard
- [ ] Write `firestore.js` — Firestore CRUD helpers
- [ ] Write `utils.js` — currency formatting, date helpers
- [ ] Build onboarding 3-step flow
- [ ] Push to GitHub → verify GitHub Pages serves it

---

### 📋 Phase 2: Core Features

**Invoice System**
- [ ] `invoice-new.html` — Invoice create form
- [ ] Client-side live preview (JS reads form → renders preview)
- [ ] Invoice number auto-generation (read business profile counter)
- [ ] Line items add/remove/edit
- [ ] Tax & discount calculation (pure JS)
- [ ] Save to Firestore (`invoices` collection + `items` subcollection)
- [ ] Fetch → GAS → MailApp sends invoice email to client
- [ ] `invoice-detail.html` — Invoice detail view
- [ ] `invoices.html` — Invoice list with status filters
- [ ] `public/invoice.html` — Client-facing public view (?token param)
- [ ] Invoice edit, duplicate, delete, cancel
- [ ] Status update (Draft → Sent → Viewed → Paid)

**PDF Generation**
- [ ] Implement client-side PDF: jsPDF library (CDN)
- [ ] OR: fetch() → GAS PdfService → return base64 → JS download
- [ ] Upload generated PDF to Firebase Storage
- [ ] Store `pdf_url` in Firestore invoice doc

**Client Management**
- [ ] `clients.html` — Client list
- [ ] Add/edit client form → save to Firestore
- [ ] `client-detail.html` — Client detail + invoice history
- [ ] `public/portal.html` — Client portal (?token param)
- [ ] Client payment score calculation (JS)

**Reminder System**
- [ ] `reminders.html` — Reminder settings UI
- [ ] Save reminder settings to Firestore (`reminder_settings` doc)
- [ ] GAS `ReminderCron.gs` — query invoices + send emails via MailApp
- [ ] Manual "Send Reminder Now" button → fetch() → GAS
- [ ] Log reminders in `reminder_logs` Firestore collection
- [ ] WhatsApp copy button (formatted message generator)

**Dashboard**
- [ ] Stat cards — query Firestore for counts (JS + Firestore SDK)
- [ ] Revenue chart — Chart.js (CDN) bar chart
- [ ] Recent invoices widget — real-time Firestore listener
- [ ] Quick action buttons

**Analytics**
- [ ] `analytics.html` — full analytics page
- [ ] Revenue trend (6-month bar chart — Chart.js)
- [ ] Payment status pie chart — Chart.js
- [ ] Client leaderboard — JS sort from Firestore data
- [ ] Reminder effectiveness stats

**Settings**
- [ ] `settings.html` — Business profile, billing, notifications
- [ ] Logo upload → Firebase Storage → update Firestore
- [ ] Brand color picker
- [ ] Invoice template picker (5 designs)
- [ ] CSV export (JS → generate CSV from Firestore data)

---

### 📋 Phase 3: Payments

- [ ] `upgrade.html` — Pro upgrade page
- [ ] JS fetch() → GAS → create Stripe Checkout Session
- [ ] Redirect to Stripe hosted checkout
- [ ] GAS `StripeWebhook.gs` handles events → updates Firestore
- [ ] Free tier gating in `invoices.js` (check `user.plan`)
- [ ] Pro feature gates (logo upload, templates, reminders)
- [ ] Stripe Customer Portal link (for cancel/manage)

---

### 📋 Phase 4: Polish & Launch

**UI Polish**
- [ ] Dark mode toggle (CSS custom properties + JS)
- [ ] Mobile responsive (Tailwind responsive classes)
- [ ] Empty states (no invoices, no clients, first-time experience)
- [ ] Loading spinners / skeleton screens
- [ ] Toast notifications (custom JS or tiny library)
- [ ] Confetti on first payment / upgrade

**PWA Setup**
- [ ] `manifest.json` — app name, icons, colors
- [ ] `sw.js` — Service Worker (cache static assets)
- [ ] Add `<link rel="manifest">` to all HTML pages

**Performance**
- [ ] Lazy-load Chart.js (only on analytics page)
- [ ] Minimize Firestore reads (cache in sessionStorage)
- [ ] Compress images in `/assets/`

**Legal**
- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie banner (GDPR — EU users)

**Testing**
- [ ] Test full flow: signup → invoice → email → reminder → payment
- [ ] Test Stripe in test mode (real $1 transaction)
- [ ] Test GAS triggers (manually run daily job)
- [ ] Test on iPhone + Android
- [ ] Beta test with 5–10 real freelancers

**Launch**
- [ ] Switch Stripe to live mode
- [ ] GAS Script Properties → live Stripe keys
- [ ] Final deploy to GitHub main branch
- [ ] PostHog analytics script added to all pages
- [ ] Submit to Product Hunt (prep post)

---

## 13. STEP-BY-STEP BUILD GUIDE (8-Day Plan) {#12-build-guide}

---

**DAY 0 — Accounts & Setup (2–3 hours, zero coding)**

```
Morning:
□ Create GitHub account → create public repo "remindpay"
□ Create Firebase project (console.firebase.google.com)
  → Enable Firestore + Auth + Storage
  → Copy firebase config object
□ Create GAS project (script.google.com) → "RemindPay Backend"
□ Create Stripe account → create Pro product ($1/month)

Afternoon:
□ Buy domain (Cloudflare ~$10/year)
□ Point domain → GitHub Pages (CNAME record in Cloudflare)
□ Enable GitHub Pages on repo (Settings → Pages)
□ Deploy starter GAS Web App (just a health check doGet)
□ Add Stripe webhook → GAS Web App URL
□ Set GAS Script Properties (STRIPE_SECRET_KEY, etc.)

Result: All services connected. Push any HTML → live at domain. ✅
```

---

**DAY 1 — Project Foundation**

```
Tasks:
□ Create index.html (Landing page with Tailwind CDN)
□ Create login.html (Firebase Auth: Google + Email)
□ Create dashboard/index.html (shell: sidebar + layout)
□ Write js/firebase-config.js (Firebase init)
□ Write js/auth.js (login, logout, session guard)
□ Write js/firestore.js (CRUD helpers for Firestore)
□ Build onboarding flow (3 HTML steps + JS save to Firestore)
□ Push to GitHub → verify live on GitHub Pages

End of Day 1: Auth works, onboarding works, data saves to Firestore.
```

---

**DAY 2 — Invoice Core**

```
Tasks:
□ dashboard/invoice-new.html (create invoice form)
□ Live preview (JS reads form → updates right-side HTML preview)
□ Line items add/edit/remove (pure JS DOM manipulation)
□ Tax + discount calculation (pure JS)
□ Save invoice + items to Firestore
□ Generate unique public_token (crypto.randomUUID())
□ dashboard/invoices.html (invoice list with filters)
□ dashboard/invoice-detail.html (detail view)
□ public/invoice.html (client-facing view, reads ?token from URL)
□ fetch() → GAS → MailApp sends "Invoice Sent" email

End of Day 2: Can create, send, and view invoices. Core loop works.
```

---

**DAY 3 — PDF + Client Management**

```
Tasks:
□ Implement jsPDF for client-side PDF generation
□ 2 invoice templates (Modern + Minimal) in JS
□ PDF download button + upload to Firebase Storage
□ Store pdf_url in Firestore invoice doc
□ dashboard/clients.html (client list)
□ Add/edit client form → saves to Firestore
□ dashboard/client-detail.html (invoice history per client)
□ public/portal.html (client portal via portal_token)
□ dashboard/services.html (services catalog CRUD)

End of Day 3: Beautiful PDFs. Client management complete.
```

---

**DAY 4 — GAS Reminder Engine**

```
Tasks:
□ dashboard/reminders.html (settings UI)
□ Reminder settings save to Firestore (reminder_settings doc)
□ Write GAS ReminderCron.gs (full daily cron logic)
□ Write GAS EmailService.gs (all 3 email templates)
□ Write GAS FirestoreService.gs (Firebase REST API wrapper)
□ Run setupDailyTrigger() in GAS editor → trigger created ✅
□ Manual "Send Reminder Now" button → fetch() → GAS
□ Log reminders in Firestore reminder_logs collection
□ WhatsApp copy button (JS formats message → navigator.clipboard)

End of Day 4: Reminders fire automatically at 8 AM daily. Zero manual work.
```

---

**DAY 5 — Dashboard + Analytics**

```
Tasks:
□ Dashboard stat cards (query Firestore → JS renders counts)
□ Revenue chart (Chart.js CDN → bar chart, 6-month data from Firestore)
□ Real-time recent invoices (Firestore onSnapshot listener)
□ dashboard/analytics.html (full analytics page)
□ Client leaderboard (JS sort Firestore data)
□ Payment status pie chart (Chart.js)
□ Reminder effectiveness stats

End of Day 5: Rich analytics. Users see their value clearly.
```

---

**DAY 6 — Payments + Pro Features**

```
Tasks:
□ dashboard/upgrade.html (upgrade page UI)
□ JS fetch() → GAS → create Stripe Checkout Session
□ Stripe redirect flow (success/cancel URLs)
□ GAS StripeWebhook.gs (handle all 5 Stripe events)
□ Pro feature gating in invoices.js (check user.plan from Firestore)
□ Feature gates: logo upload, templates, custom reminders, unlimited
□ settings.html billing section (Stripe Customer Portal link)
□ Free tier invoice counter logic (increment on create, reset monthly)

End of Day 6: $1/month subscriptions live. Money in Stripe account.
```

---

**DAY 7 — Polish + Templates**

```
Tasks:
□ 3 more PDF invoice templates (Bold, Classic, Creative) = 5 total
□ Dark mode toggle (CSS vars + JS class toggle)
□ All empty states (zero invoices, zero clients, first-run experience)
□ All loading states (CSS skeleton pulses)
□ Toast notifications (lightweight custom JS)
□ Mobile responsive check + fixes (Tailwind sm/md/lg breakpoints)
□ PWA: manifest.json + service worker (sw.js)
□ Privacy Policy + Terms pages (HTML)

End of Day 7: Production-quality app. Installs like a native app on mobile.
```

---

**DAY 8 — Test + Launch**

```
Morning — Testing:
□ Full flow test: signup → invoice → GAS email → cron reminder → payment
□ Test Stripe payment (real $1 transaction)
□ Test GAS daily trigger manually (run dailyReminderJob() in GAS)
□ Test on iPhone + Android (PWA install test)
□ Test all 11 country personas
□ Give to 5 beta users → collect feedback → fix critical bugs

Afternoon — Launch:
□ Switch Stripe to live mode
□ Update GAS Script Properties → live Stripe keys
□ Final git push → GitHub Pages live
□ PostHog analytics active
□ Submit to Product Hunt (prep post)
□ Post on Reddit (r/freelance, r/SideProject, r/Upwork)
□ Tweet thread: "Built a $1/month invoice tool in 8 days — no servers, no build step"
□ Post in 10 Facebook freelancer groups
□ DM 20 targeted Upwork/Fiverr freelancers

End of Day 8: LIVE. Accepting real users. Collecting real $1/month.
```

---

## 14. GO-TO-MARKET STRATEGY {#13-gtm}

### 📣 Launch Channels

**Week 1 — Warm Channels**
- Personal network: 20 freelancer friends → ask for feedback
- Discord servers: Indie Hackers, r/SideProject, Freelancer groups
- Facebook Groups: "Freelancers in [Country]" groups (11 countries)

**Week 2 — Content Channels**
- Reddit: r/freelance, r/Upwork, r/freelancers, r/digitalnomad
- Twitter/X: Thread "I built an invoice tool with zero servers, zero build step, in 8 days"
- LinkedIn: Target freelancers and agencies in target countries

**Week 3 — Community Channels**
- Product Hunt launch (Tuesday = best day)
- Hacker News: Show HN post
- IndieHackers.com project page

**Ongoing**
- Monthly blog posts: "How to get clients to pay on time" → SEO
- YouTube tutorial: "Invoice tutorial for freelancers"

### 📱 Message Templates

**English (US/UK/AU/CA/SG/NZ/DE/NL)**
> "Tired of chasing clients for payment? RemindPay creates professional invoices in 90 seconds and automatically follows up — so you never have to feel awkward asking for your money again. Free to start, Pro is just $1/month. [link]"

**Hindi/Urdu (India/Pakistan)**
> "Client को payment के लिए follow up करना awkward लगता है? RemindPay automatic reminder भेजता है — आपको कुछ नहीं करना। Free में शुरू करें, Pro सिर्फ $1/month।"

---

## 15. REVENUE PROJECTION {#14-revenue}

### 📊 Conservative Growth Model

| Month | Free Users | Pro Users | MRR | Notes |
|---|---|---|---|---|
| Month 1 | 50 | 5 | $5 | Soft launch, friends + Reddit |
| Month 2 | 120 | 15 | $15 | Word of mouth starts |
| Month 3 | 300 | 40 | $40 | Product Hunt boost |
| Month 6 | 800 | 120 | $120 | SEO kicking in |
| Month 12 | 2,500 | 400 | $400 | Organic growth compounding |
| Month 18 | 6,000 | 1,000 | $1,000 | **$1K MRR milestone** |
| Month 24 | 15,000 | 3,000 | $3,000 | **$3K MRR = $36K ARR** |

**Conversion assumption: 8–15% free → Pro (typical for $1 tools)**
**Churn assumption: 5% monthly (nobody cancels $1)**

---

## 16. RISK & MITIGATION {#15-risk}

| Risk | Probability | Mitigation |
|---|---|---|
| Stripe blocks account | Low | Stay ToS compliant, verify identity early |
| GAS email limit (100/day MailApp) | Medium | Switch to GmailApp (500/day); at scale use Brevo/Mailgun free tier |
| GAS execution timeout (6 min/day) | Low | Optimize cron: batch operations, exit gracefully |
| Firebase Firestore free limit hit | Low | 50k reads/day free = easily covers 500+ users; upgrade to Blaze (~$25/mo) |
| Firebase Storage free limit (5 GB) | Low | PDFs are small; compress; delete old PDFs after 1 year |
| GitHub Pages downtime | Very Low | 99.9% uptime; Cloudflare CDN caches most requests |
| GAS Web App URL changes on re-deploy | Medium | Use fixed versioned deployment URL, not @HEAD |
| Competition (Wave, FreshBooks) | High | Price moat ($1 vs $17+), simplicity, no-server stack story |
| Low conversion | Medium | Improve upgrade page copy, add testimonials |
| Reminder emails go to spam | Medium | Authenticate sender domain in GAS; warm up Gmail account |
| Stripe not available (PK, NP) | Medium | Offer manual Pro ($1 via PayPal Friends & Family) |
| GAS daily trigger misfires | Low | Monitor via GAS execution log; add error email alerts |

---

## 🏁 FINAL SUMMARY

```
Product:       RemindPay — Invoice + Auto Reminder Micro-SaaS
Target:        Freelancers in 11 countries
Pricing:       Free (5 invoices) + $1/month Pro (unlimited + automation)

NEW STACK v3.0:
  Frontend:    HTML + Tailwind CSS (CDN) + Vanilla JS
  Hosting:     GitHub Pages (free, push-to-deploy)
  Database:    Firebase Firestore (NoSQL, real-time)
  Auth:        Firebase Authentication
  Storage:     Firebase Storage
  Backend API: Google Apps Script Web App (doPost/doGet)
  Cron Engine: GAS Time-based Triggers (replaces Vercel Cron)
  Email:       GAS MailApp / GmailApp (replaces Resend)
  PDF:         GAS HTML→PDF Blob + jsPDF client-side (replaces React PDF)
  Stripe Hook: GAS doPost() as webhook URL (replaces Supabase Edge Fn)
  Payments:    Stripe ($1/month Pro)
  DNS/CDN:     Cloudflare (free)

Deploy:        git push → GitHub Pages auto-serves (no build, no commands)
Build Time:    8 days
Cost:          $0/month until ~2,000 paying users
Goal:          $5/month in 2 weeks → $1,000/month in 18 months

The $1 price is the moat.
The GAS automation is the engine.
The GitHub Pages simplicity is the superpower.
Zero servers. Zero build step. Pure product.
```

---

*Blueprint v3.0 — Rewritten by: Lead Architect + Senior Engineer Strategist + Product Manager*
*RemindPay — GAS + Firebase + GitHub Pages Edition — May 2026*
