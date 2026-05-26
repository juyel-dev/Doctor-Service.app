# 🚀 RemindPay — Revised Project Blueprint
### *"Get Paid. Stress-Free. Every Time."*
> **Role:** Lead Architect + Senior Engineer Strategist + Product Manager
> **Version:** 3.0 — GAS + Firebase + GitHub Pages Stack
> **Last Updated:** May 2026

---

## 📌 TABLE OF CONTENTS

1. [Executive Summary & Polished Vision](#1-executive-summary)
2. [Target Market Deep-Dive](#2-target-market)
3. [Feature Matrix — $1/mo = Premium Value](#3-feature-matrix)
4. [Zero-Cost Infrastructure Stack (Revised)](#4-zero-cost-stack)
5. [Architecture Blueprint (Revised)](#5-architecture)
6. [Database Schema — Firebase Firestore (Revised)](#6-database-schema)
7. [Screen-by-Screen UI/UX Layout](#7-ui-ux-screens)
8. [User Flow & Journey Map](#8-user-flow)
9. [Payment Architecture](#9-payment)
10. [GitHub Pages + GitHub Actions Auto-Deploy Plan (Revised)](#10-deploy)
11. [Complete To-Do Task List (Revised)](#11-todo)
12. [Step-by-Step Build Guide — Day-by-Day (Revised)](#12-build-guide)
13. [Go-to-Market Strategy](#13-gtm)
14. [Revenue Projection](#14-revenue)
15. [Risk & Mitigation (Revised)](#15-risk)

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
- Pain: Clients ghost after delivery, manual WhatsApp followup is humiliating
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
- 5 invoices/month (increased from 3 — better hook)
- PDF download & sharable link
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

## 4. ZERO-COST INFRASTRUCTURE STACK (REVISED) {#4-zero-cost-stack}

### ✅ Stack পরিবর্তনের Summary

| পুরনো (v2) | নতুন (v3) | কারণ |
|---|---|---|
| Vercel (hosting) | **GitHub Pages** | সম্পূর্ণ বিনামূল্যে, static site |
| Vercel Serverless Functions | **Google Apps Script (GAS)** | Free, no cold starts, Gmail integration built-in |
| Vercel Cron Jobs | **GAS Time-based Triggers** | Free daily triggers, no external service |
| Resend API (email) | **GAS + Gmail API** | GAS-এর মধ্যেই built-in, আলাদা সার্ভিস লাগে না |
| React PDF / Puppeteer (PDF) | **GAS PDF Engine** | GAS DriveApp দিয়ে server-side PDF generate হয় |
| Supabase (DB + Auth + Storage) | **Firebase Firestore + Firebase Auth + Firebase Storage** | Realtime, generous free tier, Google ecosystem |
| Supabase Webhooks / Edge Functions | **GAS Web App (doPost)** | Stripe Webhook → GAS → Firestore update |

### 🆓 100% Free Tier Services (New Stack)

| Service | Purpose | Free Limit | Why This One |
|---|---|---|---|
| **GitHub Pages** | Static Hosting (Next.js export) | Unlimited bandwidth | Free static hosting, GitHub-integrated |
| **GitHub Actions** | CI/CD (Build + Deploy) | 2,000 min/month free | Auto-build on push, deploy to Pages |
| **Firebase Firestore** | NoSQL Database | 1GB storage, 50K reads/day, 20K writes/day | Realtime, scalable, generous free tier |
| **Firebase Auth** | User Authentication | 10K users/month free | Google/Email OAuth, very easy setup |
| **Firebase Storage** | Logo + PDF File Storage | 5GB storage, 1GB/day download | Same Firebase project, no extra config |
| **Google Apps Script (GAS)** | Backend API + Email Engine + PDF + Cron | 6 min/execution, 20K email/day | 100% free, Gmail built-in, time triggers |
| **Stripe** | Payments (Pro subscriptions) | Free until revenue (2.9%+30¢) | Global, trusted, Webhook support |
| **GitHub** | Code repo + CI/CD | Unlimited repos | GitHub Pages integration |
| **Cloudflare** | DNS + CDN + DDoS protection | Always free plan | Fast, secure, free SSL |
| **Sentry** | Error monitoring | 5,000 errors/month free | Production bug tracking |
| **PostHog** | Analytics + User behavior | 1M events/month free | Privacy-friendly |

### 💡 GAS কী কী করবে (5টি কাজ একসাথে)

```
Google Apps Script (GAS) একটাই টুল — কিন্তু 5টা কাজ করছে:

১. Backend API (Vercel Serverless-এর বিকল্প)
   → doGet(e) / doPost(e) দিয়ে HTTP endpoint তৈরি
   → Next.js frontend থেকে GAS Web App URL-এ fetch() করা হয়

২. Email Engine (Resend-এর বিকল্প)
   → MailApp.sendEmail() অথবা Gmail API দিয়ে
   → HTML email template support
   → Daily 20,000 email limit (free)

৩. PDF Generator (React PDF / Puppeteer-এর বিকল্প)
   → HTML template → GAS → DriveApp → PDF blob
   → Firebase Storage-এ upload → public URL return

৪. Cron Scheduler (Vercel Cron-এর বিকল্প)
   → GAS Time-based Trigger (daily 8 AM)
   → Firestore query → overdue invoices check → email send

৫. Stripe Webhook Receiver (Supabase Edge Functions-এর বিকল্প)
   → GAS Web App URL = Stripe Webhook endpoint
   → doPost(e) → parse event → Firestore update
```

### 💰 Monthly Cost Breakdown (New Stack)

| Users | Monthly Cost | Revenue | Profit |
|---|---|---|---|
| 0–100 | $0 | $0–$100 | $0–$100 |
| 100–500 | $0 (সব free tier-এ আসে) | $100–$500 | $100–$500 |
| 500–2000 | ~$0–$5 (Firebase Spark → Blaze, pay-as-you-go) | $500–$2000 | ~$495–$1995 |
| 2000–10000 | ~$15–$25 (Firebase usage) | $2000–$10000 | $1975–$9975 |

> **Note:** Firebase Blaze plan-এ upgrade করলেও শুধু actual usage-এর জন্য পেমেন্ট। Spark (free) plan-এ অনেকদিন চলবে।

---

## 5. ARCHITECTURE BLUEPRINT (REVISED) {#5-architecture}

### 🏗️ System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  Browser / PWA / Mobile                                      │
│  Next.js 14 Static Export + React + Tailwind CSS            │
│  Hosted on: GitHub Pages (yourusername.github.io/remindpay) │
│  Custom Domain: remindpay.com (via Cloudflare)              │
└────────────────┬──────────────────┬─────────────────────────┘
                 │ Firebase SDK      │ fetch() API calls
                 │ (direct from      │ (to GAS Web App URL)
                 │  browser)         │
┌────────────────▼──┐      ┌─────────▼───────────────────────┐
│  Firebase Suite   │      │   Google Apps Script (GAS)       │
│                   │      │   Web App (deployed as URL)       │
│  Firestore (DB)   │      │                                   │
│  Firebase Auth    │      │  ┌─────────────────────────────┐ │
│  Firebase Storage │      │  │ doPost/doGet handlers:       │ │
│  (Logo, PDF URLs) │      │  │  • /send-invoice-email       │ │
│                   │◄─────┤  │  • /generate-pdf             │ │
│  Security Rules   │      │  │  • /stripe-webhook           │ │
│  (replaces RLS)   │      │  │  • /send-reminder (manual)   │ │
└───────────────────┘      │  └─────────────────────────────┘ │
                           │                                   │
                           │  ┌─────────────────────────────┐ │
                           │  │ Time-Based Triggers (Cron):  │ │
                           │  │  • Daily 8AM UTC             │ │
                           │  │  → Query Firestore           │ │
                           │  │  → Send reminder emails      │ │
                           │  │  → Update invoice status     │ │
                           │  └─────────────────────────────┘ │
                           │                                   │
                           │  ┌─────────────────────────────┐ │
                           │  │ Email Engine:                │ │
                           │  │  MailApp.sendEmail() or      │ │
                           │  │  Gmail API (HTML templates)  │ │
                           │  └─────────────────────────────┘ │
                           │                                   │
                           │  ┌─────────────────────────────┐ │
                           │  │ PDF Engine:                  │ │
                           │  │  HTML → DriveApp → PDF blob  │ │
                           │  │  → Firebase Storage upload   │ │
                           │  │  → Return public URL         │ │
                           │  └─────────────────────────────┘ │
                           └───────────────────────────────────┘
                                          ▲
                                          │ Webhook (doPost)
                           ┌──────────────┴──────────┐
                           │      Stripe API          │
                           │  Subscription Payments   │
                           │  Webhook Events          │
                           └─────────────────────────┘
```

### 📂 Next.js Project Structure (Static Export)

```
remindpay/
├── app/                          # Next.js 14 App Router
│   ├── (public)/                 # Public routes (no auth)
│   │   ├── page.tsx              # Landing page
│   │   ├── pricing/page.tsx      # Pricing page
│   │   ├── login/page.tsx        # Login/Signup (Firebase Auth)
│   │   └── invoice/[token]/      # Public invoice view (for clients)
│   │       └── page.tsx
│   ├── (dashboard)/              # Protected routes (auth required)
│   │   ├── layout.tsx            # Dashboard shell + sidebar
│   │   ├── dashboard/page.tsx    # Home dashboard
│   │   ├── invoices/
│   │   │   ├── page.tsx          # Invoice list
│   │   │   ├── new/page.tsx      # Create invoice
│   │   │   └── [id]/page.tsx     # Invoice detail/edit
│   │   ├── clients/
│   │   │   ├── page.tsx          # Client list
│   │   │   └── [id]/page.tsx     # Client detail
│   │   ├── reminders/page.tsx    # Reminder settings
│   │   ├── analytics/page.tsx    # Charts & insights
│   │   ├── settings/
│   │   │   ├── profile/page.tsx  # Business profile
│   │   │   ├── billing/page.tsx  # Subscription management
│   │   │   └── templates/page.tsx# Invoice template picker
│   │   └── upgrade/page.tsx      # Pro upgrade page
│   └── (no /api folder — all backend is GAS)
├── components/
│   ├── ui/                       # Base UI (shadcn/ui)
│   ├── invoice/                  # Invoice-specific components
│   ├── dashboard/                # Dashboard widgets
│   ├── charts/                   # Analytics charts
│   └── pdf-templates/            # HTML templates (sent to GAS for PDF render)
├── lib/
│   ├── firebase/                 # Firebase client config + helpers
│   │   ├── config.ts             # Firebase app initialization
│   │   ├── auth.ts               # Auth helpers (signIn, signOut, onAuthChange)
│   │   ├── firestore.ts          # Firestore CRUD helpers
│   │   └── storage.ts            # Firebase Storage upload helpers
│   ├── gas/                      # GAS API call helpers
│   │   ├── client.ts             # fetch() wrapper for GAS Web App
│   │   ├── email.ts              # Call GAS to send emails
│   │   ├── pdf.ts                # Call GAS to generate PDF
│   │   └── stripe.ts             # Stripe checkout session helper
│   └── utils/                    # Shared utilities
├── gas/                          # Google Apps Script source files
│   ├── Code.gs                   # Main GAS file (doGet, doPost router)
│   ├── EmailService.gs           # Email sending functions
│   ├── PdfService.gs             # PDF generation functions
│   ├── ReminderCron.gs           # Daily cron logic
│   ├── StripeWebhook.gs          # Stripe event handler
│   ├── FirestoreService.gs       # Firestore REST API calls from GAS
│   └── appsscript.json           # GAS manifest
├── next.config.js                # output: 'export', basePath config
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: build + deploy to Pages
├── firebase.json                 # Firebase project config
├── firestore.rules               # Security rules (replaces Supabase RLS)
├── storage.rules                 # Storage security rules
└── public/                       # Static assets
```

### 🔄 Key Data Flows (Revised)

**Flow 1: Invoice Creation**
```
User fills form (Next.js) →
Firebase Auth token verify (client-side) →
Save invoice doc to Firestore (client SDK) →
Call GAS /generate-pdf → GAS creates PDF →
Upload to Firebase Storage → Return PDF URL →
Update Firestore invoice.pdfUrl →
Call GAS /send-invoice-email → GAS sends HTML email via MailApp →
Update invoice.status = 'sent' in Firestore →
Dashboard re-renders (Firestore realtime listener)
```

**Flow 2: Auto Reminder Engine (GAS Cron)**
```
GAS Time Trigger fires daily at 8 AM UTC →
GAS calls Firestore REST API →
Query invoices where:
  - status IN ['sent', 'viewed', 'partial', 'overdue']
  - reminderEnabled = true
  - dueDate matches reminder schedule →
For each invoice: calculate trigger type →
GAS EmailService sends reminder HTML email →
GAS updates reminderLogs in Firestore →
GAS updates invoice.reminderCount, lastReminderAt
```

**Flow 3: Stripe Subscription**
```
User clicks "Upgrade to Pro" →
Frontend calls Stripe.js → Stripe Checkout →
User pays → Stripe fires Webhook →
Webhook URL = GAS Web App URL (doPost) →
GAS StripeWebhook.gs parses event →
GAS updates Firestore users/{uid}.plan = 'pro' →
Frontend Firestore listener detects change →
Pro features unlock instantly (no page refresh needed)
```

**Flow 4: Client Views Invoice (Static Public Page)**
```
Client receives email with link: remindpay.com/invoice/[token] →
Next.js static page loads →
Fetches invoice from Firestore by publicToken (no auth needed, security rule allows) →
Renders invoice in browser →
GAS logs view event → Updates invoice.viewedAt, viewCount in Firestore
```

---

## 6. DATABASE SCHEMA — FIREBASE FIRESTORE (REVISED) {#6-database-schema}

> **Note:** Firestore is NoSQL (document-based), Supabase-এর SQL table structure-এর মতো না।
> Collections = Tables, Documents = Rows, Fields = Columns।
> Subcollections ব্যবহার করা হয়েছে user data isolation-এর জন্য।

### 📊 Firestore Collection Structure

```
firestore/
├── users/                           # Root collection
│   └── {userId}/                    # Document (Firebase Auth UID)
│       ├── [User Document Fields]
│       ├── business_profiles/       # Subcollection
│       │   └── {profileId}/
│       ├── clients/                 # Subcollection
│       │   └── {clientId}/
│       ├── invoices/                # Subcollection
│       │   └── {invoiceId}/
│       │       └── items/           # Sub-subcollection
│       │           └── {itemId}/
│       ├── payments/                # Subcollection
│       │   └── {paymentId}/
│       ├── reminder_logs/           # Subcollection
│       │   └── {logId}/
│       ├── activity_logs/           # Subcollection
│       │   └── {logId}/
│       └── services_catalog/        # Subcollection
│           └── {serviceId}/
│
└── subscriptions/                   # Root collection (Stripe sync)
    └── {userId}/                    # Document (same as Firebase UID)
        └── [Subscription Fields]
```

---

### 📄 Collection: `users/{userId}`

```javascript
// Document Fields:
{
  uid: "firebase_auth_uid",           // string — from Firebase Auth
  email: "user@example.com",          // string
  fullName: "Sarah Ahmed",            // string
  avatarUrl: "https://...",           // string | null
  plan: "free",                       // string — 'free' | 'pro'
  planStartedAt: Timestamp | null,    // Firestore Timestamp
  planExpiresAt: Timestamp | null,    // Firestore Timestamp
  stripeCustomerId: "cus_xxx",        // string | null
  stripeSubscriptionId: "sub_xxx",    // string | null
  invoiceCountThisMonth: 0,           // number — free tier limit tracker
  invoiceCountResetAt: Timestamp,     // Timestamp — reset on 1st of month
  country: "IN",                      // string — ISO country code
  currency: "USD",                    // string — default currency
  timezone: "Asia/Kolkata",           // string — IANA timezone
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 📄 Subcollection: `users/{userId}/business_profiles/{profileId}`

```javascript
{
  id: "auto_generated_id",
  businessName: "Sarah's Design Studio",  // string (required)
  logoUrl: "https://firebase.storage/...", // string | null (Firebase Storage URL)
  brandColor: "#6366f1",                  // string — hex color
  addressLine1: "123 Main Street",        // string | null
  addressLine2: "Apt 4B",                 // string | null
  city: "Mumbai",                         // string | null
  state: "Maharashtra",                   // string | null
  postalCode: "400001",                   // string | null
  country: "IN",                          // string | null
  phone: "+91-9876543210",               // string | null
  website: "https://sarahdesigns.com",    // string | null
  taxId: "27XXXXX1234X1Z5",              // string | null (GST/VAT/EIN)
  taxLabel: "GST",                        // string — 'VAT', 'GST', 'HST', 'Tax'
  defaultCurrency: "USD",                 // string
  defaultDueDays: 14,                     // number — Net 14
  paymentInstructions: "UPI: sarah@upi", // string | null
  invoicePrefix: "INV",                   // string — prefix for invoice numbers
  invoiceCounter: 1,                      // number — auto-increment
  footerText: "Thank you for your business!", // string | null
  templateId: "modern",                   // string — 'modern'|'minimal'|'bold'|'classic'|'creative'
  isDefault: true,                        // boolean
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 📄 Subcollection: `users/{userId}/clients/{clientId}`

```javascript
{
  id: "auto_generated_id",
  name: "John Smith",                    // string (required)
  email: "john@acmecorp.com",           // string (required)
  phone: "+1-555-0100",                 // string | null
  companyName: "Acme Corporation",       // string | null
  addressLine1: "456 Business Ave",      // string | null
  addressLine2: null,
  city: "San Francisco",
  state: "CA",
  postalCode: "94102",
  country: "US",
  currency: "USD",                       // string | null — override user default
  notes: "Prefers invoices by 5th",     // string | null — private
  paymentScore: 5.0,                    // number 1–10 (auto-calculated)
  avgPaymentDays: 12,                   // number | null (calculated)
  totalBilled: 9800.00,                 // number
  totalPaid: 6600.00,                   // number
  portalToken: "unique-uuid-token",     // string — client portal access
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 📄 Subcollection: `users/{userId}/invoices/{invoiceId}`

```javascript
{
  id: "auto_generated_id",
  businessProfileId: "profile_id",      // string — ref to business_profiles
  clientId: "client_id",                // string — ref to clients
  clientSnapshot: {                     // Denormalized snapshot (Firestore best practice)
    name: "John Smith",
    email: "john@acmecorp.com",
    companyName: "Acme Corp"
  },
  invoiceNumber: "INV-015",            // string (required)
  title: "Website Design Project",      // string | null
  status: "sent",                       // string:
                                        //   'draft'|'sent'|'viewed'|'partial'|'paid'|'overdue'|'cancelled'
  currency: "USD",                      // string (required)
  subtotal: 1500.00,                    // number
  discountType: null,                   // string | null — 'percent' | 'fixed'
  discountValue: 0,                     // number
  discountAmount: 0,                    // number — calculated
  taxRate: 10,                          // number — percentage
  taxAmount: 150.00,                    // number — calculated
  total: 1650.00,                       // number (required)
  amountPaid: 0,                        // number
  amountDue: 1650.00,                   // number — calculated
  issueDate: "2026-06-01",             // string — ISO date (YYYY-MM-DD)
  dueDate: "2026-06-15",               // string — ISO date
  notes: "Net 14 payment terms",       // string | null — visible to client
  terms: "Late fee of 2% after due",   // string | null
  publicToken: "unique-uuid-token",    // string — for public URL /invoice/[token]
  pdfUrl: "https://firebase.storage/...", // string | null — GAS-generated PDF
  viewedAt: Timestamp | null,           // when client first viewed
  viewCount: 0,                         // number
  paidAt: Timestamp | null,
  reminderEnabled: true,                // boolean
  reminderCount: 0,                     // number
  lastReminderAt: Timestamp | null,
  isRecurring: false,                   // boolean
  recurringFreq: null,                  // string | null — 'weekly'|'monthly'|'quarterly'
  recurringEnd: null,                   // string | null — ISO date
  parentInvoiceId: null,               // string | null — for recurring clones
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 📄 Sub-subcollection: `users/{userId}/invoices/{invoiceId}/items/{itemId}`

```javascript
{
  id: "auto_generated_id",
  serviceId: null,                     // string | null — ref to services_catalog
  description: "Website Development",  // string (required)
  quantity: 40,                        // number
  unit: "hour",                        // string — 'hour'|'item'|'word'|'page' etc.
  unitPrice: 80.00,                    // number
  amount: 3200.00,                     // number — quantity × unitPrice
  sortOrder: 0,                        // number — display order
  createdAt: Timestamp
}
```

---

### 📄 Subcollection: `users/{userId}/payments/{paymentId}`

```javascript
{
  id: "auto_generated_id",
  invoiceId: "invoice_id",            // string — ref to invoices
  amount: 1650.00,                    // number (required)
  currency: "USD",                    // string
  paymentMethod: "bank_transfer",     // string:
                                      //   'bank_transfer'|'paypal'|'cash'|'stripe'
                                      //   |'upi'|'wise'|'razorpay'|'other'
  referenceNumber: "TXN123456",      // string | null
  notes: "Paid via NEFT",            // string | null
  paymentDate: "2026-06-14",         // string — ISO date
  recordedAt: Timestamp,
  recordedBy: "firebase_uid"         // string — who marked it
}
```

---

### 📄 Subcollection: `users/{userId}/reminder_logs/{logId}`

```javascript
{
  id: "auto_generated_id",
  invoiceId: "invoice_id",           // string
  clientEmail: "client@example.com", // string
  triggerType: "after_due",          // string:
                                     //   'before_due'|'on_due'|'after_due'|'manual'
  daysOffset: 3,                     // number — -3 = 3 days before, 7 = 7 days after
  emailSubject: "Payment Reminder: INV-015", // string
  sentAt: Timestamp,
  status: "sent",                    // string — 'sent'|'failed'|'bounced'
  gasExecutionId: "xxx"              // string | null — GAS execution ID for debugging
}
```

---

### 📄 Subcollection: `users/{userId}/services_catalog/{serviceId}`

```javascript
{
  id: "auto_generated_id",
  name: "Logo Design",               // string
  description: "Full logo package",  // string | null
  defaultRate: 500.00,               // number
  unit: "piece",                     // string
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 📄 Root Collection: `subscriptions/{userId}`

```javascript
// Separate root collection — GAS writes here from Stripe webhook
// Frontend reads here to check Pro status
{
  userId: "firebase_uid",
  stripeSubscriptionId: "sub_xxx",
  stripePriceId: "price_remindpay_pro_monthly",
  status: "active",                  // 'active'|'cancelled'|'past_due'|'trialing'
  currentPeriodStart: Timestamp,
  currentPeriodEnd: Timestamp,
  cancelAtPeriodEnd: false,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### 🔒 Firestore Security Rules (replaces Supabase RLS)

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // All subcollections: same rule
      match /{subcollection}/{docId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;

        // Invoice items: same parent rule
        match /items/{itemId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }

    // Subscriptions: user reads own, GAS (service account) writes
    match /subscriptions/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Only GAS service account can write (via REST API)
    }

    // Public invoice access (by token) — no auth required
    // Client-side: query where publicToken == token
    // Rule: allow read if the document's publicToken matches
    match /users/{userId}/invoices/{invoiceId} {
      allow read: if resource.data.publicToken != null; // Anyone with token can read
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

> **Note:** GAS-এ Firebase Admin SDK সরাসরি ব্যবহার করা যায় না।
> GAS Firestore REST API (UrlFetchApp) + Service Account JSON ব্যবহার করে লেখে।
> Firebase Admin-level writes (Stripe webhook update) GAS REST API দিয়েই হয়।

---

## 7. SCREEN-BY-SCREEN UI/UX LAYOUT {#7-ui-ux-screens}

*(Unchanged from v2 — সব screens একই থাকবে। শুধু backend calls-এর endpoint পরিবর্তন হয়েছে।)*

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

**Typography**
```
Display/Headings: "Sora" — geometric, modern, professional
Body/UI:          "Inter" — readable, clean
Numbers/Amounts:  "JetBrains Mono" — clear financial figures
```

*(সব 14টি Screen-এর wireframe v2 blueprint-এর মতোই — তাই এখানে শুধু difference mention করা হলো)*

### ⚠️ UI-তে একটাই পরিবর্তন: Loading States
GAS calls async হয় এবং Vercel-এর মতো instant না। GAS Web App URL-এ প্রথম call হলে 1-3 সেকেন্ড লাগতে পারে। তাই:
- PDF generate button-এ spinner দেখাতে হবে
- Email send button-এ "Sending..." state দেখাতে হবে
- GAS timeout 6 minutes — invoice operations সব well within limit

---

## 8. USER FLOW & JOURNEY MAP {#8-user-flow}

*(Core flow unchanged — শুধু technical layer পরিবর্তন হয়েছে)*

```
DISCOVERY → Landing Page → Signup (Firebase Auth Google OAuth)
    ↓
ONBOARDING (2 minutes)
Business info → Firestore users/{uid} তে save
    ↓
FIRST INVOICE (90 seconds)
Form fill → Firestore save → GAS call → PDF generate → Email send
    ↓
AHA MOMENT (Day 3)
GAS daily cron fires → Reminder email goes out automatically
Client pays → User marks paid → Firestore updates → Dashboard shows
    ↓
UPGRADE TRIGGER
5th invoice of month OR Pro feature attempt
    ↓
UPGRADE (30 seconds)
Upgrade page → Stripe Checkout → $1 payment →
Stripe Webhook → GAS doPost → Firestore plan = 'pro' →
Frontend Firestore listener → Pro unlocks instantly (realtime!)
```

---

## 9. PAYMENT ARCHITECTURE {#9-payment}

*(Stripe integration same — শুধু webhook receiver পরিবর্তন হয়েছে)*

### 💳 Stripe Integration Plan

**Products in Stripe**
```
Product: RemindPay Pro
Price ID: price_remindpay_pro_monthly
Amount: $100 (= $1.00 USD)
Currency: USD
Interval: monthly
```

**Stripe Webhook → GAS (নতুন)**
```
পুরনো: Stripe → Vercel /api/stripe/webhook (Serverless Function)
নতুন:  Stripe → GAS Web App URL (doPost handler)

GAS StripeWebhook.gs:
function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const event = payload.type;

  if (event === 'checkout.session.completed') {
    activateProPlan(payload.data.object);
  } else if (event === 'customer.subscription.deleted') {
    downgradeToFree(payload.data.object);
  }
  // ... etc.
}
```

**Stripe Events to Handle**
| Event | GAS Action |
|---|---|
| `checkout.session.completed` | Firestore: users/{uid}.plan = 'pro', subscriptions/{uid} create |
| `customer.subscription.updated` | Firestore: subscriptions/{uid} update status |
| `customer.subscription.deleted` | Firestore: users/{uid}.plan = 'free' |
| `invoice.payment_failed` | GAS EmailService: send "Payment failed" email to user |
| `invoice.payment_succeeded` | Firestore: extend pro period |

### 🔐 Free Tier Enforcement
```javascript
// Frontend (Firestore check before invoice create):
const user = await getDoc(doc(db, 'users', uid));
if (user.data().plan === 'free') {
  const count = user.data().invoiceCountThisMonth;
  if (count >= 5) {
    // Show upgrade modal
    return;
  }
}
// Proceed to create invoice
```

**India/Pakistan/Nepal Payment Alternative**
- Primary: Stripe (international cards)
- Fallback: Manual PayPal/Wise → GAS manually updates Firestore plan

---

## 10. GITHUB PAGES + GITHUB ACTIONS AUTO-DEPLOY (REVISED) {#10-deploy}

### 🔄 নতুন Deployment Philosophy

**পুরনো:** Push code → GitHub → Vercel auto-deploy (server-side rendering possible)
**নতুন:** Push code → GitHub → GitHub Actions → Build static export → Deploy to GitHub Pages

> ⚠️ **Important:** Next.js-কে Static Export mode-এ চালাতে হলে `next.config.js`-তে
> `output: 'export'` দিতে হবে। এর মানে:
> - কোনো Server Components (server-side) কাজ করবে না
> - সব data fetching client-side (Firebase SDK) বা build-time হবে
> - Dynamic routes (`/invoice/[token]`) Static-এ `generateStaticParams` ছাড়া কাজ করবে না
>   → এই ক্ষেত্রে client-side fetch দিয়ে সমাধান করতে হবে

### Step 1: next.config.js Setup

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static Export — GitHub Pages-এ চলার জন্য
  basePath: '',               // Custom domain থাকলে empty, না থাকলে '/remindpay'
  trailingSlash: true,        // /invoice/token/ → GitHub Pages compatibility
  images: {
    unoptimized: true,        // next/image optimization server লাগে, তাই disable
  },
}

module.exports = nextConfig;
```

### Step 2: GitHub Repository Setup

```
Repository Name: remindpay
Visibility: Private (বা Public — GitHub Pages free for both)
Main branch: main → Production (remindpay.com)
develop branch → Staging (optional)

Settings → Pages:
  Source: GitHub Actions (not branch)
  Custom Domain: remindpay.com
```

### Step 3: GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build Next.js (Static Export)
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN }}
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_PROJECT_ID }}
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET }}
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}
          NEXT_PUBLIC_GAS_WEB_APP_URL: ${{ secrets.NEXT_PUBLIC_GAS_WEB_APP_URL }}
          NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out  # Next.js static export output folder

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 4: Environment Variables (GitHub Secrets)

```
GitHub → Settings → Secrets and variables → Actions → New repository secret:

NEXT_PUBLIC_FIREBASE_API_KEY          = AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN      = remindpay-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID       = remindpay-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET   = remindpay-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 1234567890
NEXT_PUBLIC_FIREBASE_APP_ID           = 1:xxx:web:xxx
NEXT_PUBLIC_GAS_WEB_APP_URL           = https://script.google.com/macros/s/AKfy.../exec
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    = pk_live_...
NEXT_PUBLIC_APP_URL                   = https://remindpay.com
```

### Step 5: GAS Web App Deployment

```javascript
// GAS Deployment:
// Google Apps Script Editor → Deploy → New Deployment
// Type: Web App
// Execute as: Me (your Google account)
// Who has access: Anyone (Stripe webhook needs public access)
// → Copy the /exec URL → Add to GitHub Secrets as GAS_WEB_APP_URL

// GAS Code.gs main router:
function doPost(e) {
  const params = JSON.parse(e.postData.contents);
  const action = params.action;

  switch(action) {
    case 'send-invoice-email': return EmailService.sendInvoiceEmail(params);
    case 'send-reminder': return EmailService.sendReminder(params);
    case 'generate-pdf': return PdfService.generatePdf(params);
    case 'stripe-webhook': return StripeWebhook.handleEvent(params);
    default: return ContentService.createTextOutput('Unknown action');
  }
}

function doGet(e) {
  // Health check
  return ContentService.createTextOutput('RemindPay GAS is running ✅');
}
```

### Step 6: GAS Cron Setup

```javascript
// GAS ReminderCron.gs
function setupDailyTrigger() {
  // Run this function ONCE manually from GAS editor:
  ScriptApp.newTrigger('runDailyReminders')
    .timeBased()
    .everyDays(1)
    .atHour(8)  // 8 AM UTC
    .create();
}

function runDailyReminders() {
  const invoices = FirestoreService.getInvoicesNeedingReminders();
  invoices.forEach(invoice => {
    EmailService.sendReminder({
      invoiceId: invoice.id,
      userId: invoice.userId,
      clientEmail: invoice.clientSnapshot.email,
      // ...
    });
    FirestoreService.updateReminderLog(invoice.id, invoice.userId);
  });
}
```

### Step 7: Custom Domain (Cloudflare → GitHub Pages)

```
remindpay.com → Cloudflare DNS:
  CNAME  @    yourusername.github.io  (proxied)
  CNAME  www  yourusername.github.io  (proxied)

GitHub Pages Settings → Custom Domain: remindpay.com
GitHub Pages → Enforce HTTPS: ✅

SSL: Auto by GitHub Pages (Let's Encrypt) + Cloudflare
```

### Deployment Flow (চলমান)

```
Developer কোড লেখে →
git add . && git commit -m "feat: new feature" →
git push origin main →
GitHub Actions workflow trigger হয় →
Ubuntu VM-এ: npm ci → npm run build (Static Export) →
./out folder তৈরি হয় (pure HTML/CSS/JS) →
GitHub Pages-এ deploy হয় →
remindpay.com live → Total time: ~2-3 minutes
```

---

## 11. COMPLETE TO-DO TASK LIST (REVISED) {#11-todo}

### 📋 Phase 0: Account Setup

**GitHub Setup**
- [ ] GitHub account create (if needed)
- [ ] Private repository তৈরি: `remindpay`
- [ ] `.gitignore` for Next.js setup করো
- [ ] `README.md` তৈরি করো
- [ ] Branch protection: `main` branch protect করো
- [ ] GitHub Pages enable করো (Settings → Pages → GitHub Actions)

**Firebase Setup**
- [ ] Firebase Console-এ নতুন project তৈরি করো: `remindpay`
- [ ] Firebase Web App register করো → config keys copy করো
- [ ] Firebase Auth enable করো (Email/Password + Google OAuth)
- [ ] Firebase Auth-এ Authorized domain add করো: `remindpay.com` + `yourusername.github.io`
- [ ] Firestore Database তৈরি করো (Production mode)
- [ ] `firestore.rules` লেখো এবং deploy করো
- [ ] Firebase Storage enable করো + `storage.rules` setup করো
- [ ] Firebase billing: Spark plan দিয়ে শুরু করো

**Google Apps Script Setup**
- [ ] script.google.com-এ নতুন Project তৈরি করো: `RemindPay Backend`
- [ ] `Code.gs`, `EmailService.gs`, `PdfService.gs`, `ReminderCron.gs`, `StripeWebhook.gs`, `FirestoreService.gs` files তৈরি করো
- [ ] Firebase Service Account JSON তৈরি করো (IAM → Service Accounts) → GAS Script Properties-এ সংরক্ষণ করো
- [ ] GAS Web App deploy করো (Execute as: Me, Access: Anyone)
- [ ] Web App URL copy করো
- [ ] GAS Daily Trigger setup করো (`setupDailyTrigger()` একবার run করো)

**Stripe Setup**
- [ ] Stripe account তৈরি করো
- [ ] RemindPay Pro product তৈরি করো ($1/month)
- [ ] Price ID copy করো
- [ ] Stripe Webhook endpoint সেট করো → URL: GAS Web App URL
- [ ] Test mode-এ payment test করো

**Cloudflare Setup**
- [ ] Domain কিনো/transfer করো Cloudflare-এ (~$10/year)
- [ ] DNS records: CNAME → GitHub Pages
- [ ] Cloudflare proxy enable করো

**GitHub Secrets**
- [ ] সমস্ত environment variables GitHub Secrets-এ add করো (Section 10-এর list দেখো)

---

### 📋 Phase 1: Foundation (Next.js Static Setup)

**Project Bootstrap**
- [ ] `npx create-next-app@latest remindpay --typescript --tailwind --app` চালাও
- [ ] `next.config.js`-এ `output: 'export'` add করো
- [ ] shadcn/ui install করো
- [ ] Firebase SDK install করো: `npm install firebase`
- [ ] `lib/firebase/config.ts` তৈরি করো
- [ ] Firebase Auth helper functions লেখো (`lib/firebase/auth.ts`)
- [ ] Firestore helper functions লেখো (`lib/firebase/firestore.ts`)
- [ ] Firebase Storage helper লেখো (`lib/firebase/storage.ts`)
- [ ] GAS API client লেখো (`lib/gas/client.ts`)

**Auth & Onboarding**
- [ ] Login/Signup page (Firebase Google OAuth + Email)
- [ ] Auth state listener setup করো (onAuthStateChanged)
- [ ] Protected route middleware (client-side, localStorage token check)
- [ ] Onboarding flow 3 steps — Firestore-এ save
- [ ] Post-signup redirect logic

**GitHub Actions**
- [ ] `.github/workflows/deploy.yml` তৈরি করো
- [ ] Test push করো → GitHub Pages-এ deploy verify করো
- [ ] Custom domain test করো

---

### 📋 Phase 2: Core Features

**Invoice System**
- [ ] Invoice create form
- [ ] Live preview component (client-side React state)
- [ ] Invoice number auto-generation (Firestore transaction দিয়ে atomic counter)
- [ ] Line items CRUD (subcollection `/items`)
- [ ] Tax + discount calculation logic
- [ ] Invoice save to Firestore (`users/{uid}/invoices/{id}`)
- [ ] GAS call → generate PDF → Firebase Storage upload → URL save in Firestore
- [ ] GAS call → send invoice email (HTML template via MailApp)
- [ ] Public invoice page (`/invoice/[token]` — client-side Firestore query by publicToken)
- [ ] Invoice list page (Firestore realtime listener)
- [ ] Invoice detail page
- [ ] Invoice edit
- [ ] Invoice status update (Firestore update)
- [ ] Invoice duplicate
- [ ] Invoice delete/cancel

**Client Management**
- [ ] Client list (`users/{uid}/clients` collection)
- [ ] Add/edit client form
- [ ] Client detail page (invoice history from Firestore query)
- [ ] Client portal (public page → query by portalToken)
- [ ] Client payment score calculation (Firestore Cloud Function বা client-side)

**Reminder System**
- [ ] Reminder settings page (save to `users/{uid}` document)
- [ ] GAS ReminderCron.gs — Firestore REST API query লেখো
- [ ] GAS EmailService.gs — HTML email templates (3 types)
- [ ] GAS Reminder Log → Firestore update (`users/{uid}/reminder_logs`)
- [ ] Manual "Send Now" button → GAS doPost call
- [ ] WhatsApp copy button (client-side formatted text)

**Dashboard**
- [ ] Stat cards (Firestore realtime queries)
- [ ] Revenue chart (Recharts — Firestore aggregation query)
- [ ] Recent invoices widget

**Analytics**
- [ ] Analytics page (Firestore queries + client-side calculation)
- [ ] Revenue trend chart
- [ ] Client leaderboard
- [ ] Payment status pie chart
- [ ] Reminder effectiveness stats

**Settings**
- [ ] Business profile form (Firestore update)
- [ ] Logo upload (Firebase Storage → URL save)
- [ ] Color picker + template picker

**Payments (Stripe)**
- [ ] Upgrade page UI
- [ ] Stripe.js Checkout session (direct API call from frontend)
- [ ] GAS StripeWebhook.gs — doPost handler লেখো
- [ ] Stripe-এ Webhook URL = GAS Web App URL সেট করো
- [ ] Pro feature gating (Firestore `users/{uid}.plan` check)
- [ ] Free tier invoice counter (Firestore atomic increment)
- [ ] Stripe Customer Portal link (billing management)

---

### 📋 Phase 3: Polish & Launch

*(v2-এর মতোই — dark mode, mobile responsive, empty states, loading states, toast notifications, confetti, 5 PDF templates, Sentry, Privacy Policy, Terms)*

**Testing (নতুন focus)**
- [ ] GAS functions manually test করো (GAS Editor → Run button)
- [ ] GAS Reminder Cron manually trigger করো → Email পৌঁছায় কিনা দেখো
- [ ] Stripe Webhook GAS-এ পৌঁছায় কিনা test করো (Stripe Test mode → Trigger event)
- [ ] Firebase Security Rules test করো (Firebase Emulator Suite)
- [ ] GitHub Actions deploy pipeline test করো (PR তৈরি করো → preview দেখো)
- [ ] Static Export build-এ কোনো server-side code নেই verify করো
- [ ] Mobile test, cross-browser test

---

## 12. STEP-BY-STEP BUILD GUIDE (REVISED) {#12-build-guide}

### 📅 8-Day Build Plan (GAS + Firebase + GitHub Pages)

---

**DAY 0 — Accounts & Setup (2-3 hours, no coding)**

```
Morning:
□ GitHub account → repo "remindpay" (private) তৈরি করো
□ Firebase Console → new project "remindpay"
□ Firebase Auth enable করো (Email + Google)
□ Firestore Database তৈরি করো
□ Firebase Storage enable করো
□ Firebase Web config keys copy করো

Afternoon:
□ GAS নতুন Project তৈরি করো (script.google.com)
□ Firebase Service Account তৈরি করো → JSON download করো
□ GAS Script Properties-এ Service Account JSON store করো
□ GAS Web App deploy করো → URL copy করো
□ GAS Daily Trigger setup করো (setupDailyTrigger() run করো)
□ Stripe account → product তৈরি ($1/mo) → Webhook URL = GAS URL
□ Domain কিনো → Cloudflare-এ add করো
□ GitHub Secrets-এ সব keys add করো

Result: সব accounts ready। GAS live। Firebase ready। ✅
```

---

**DAY 1 — Project Foundation + Auto-Deploy**

```
Tasks:
□ Next.js 14 + TypeScript + Tailwind bootstrap করো
□ next.config.js: output: 'export' add করো
□ shadcn/ui install + configure করো
□ Firebase SDK install করো
□ lib/firebase/ folder — config, auth, firestore, storage helpers লেখো
□ lib/gas/client.ts — GAS fetch wrapper লেখো
□ Firebase Auth: Login page (Google OAuth + Email)
□ Onboarding flow (3 steps) → Firestore save
□ Dashboard shell (sidebar + layout)
□ .github/workflows/deploy.yml লেখো
□ GitHub Pages settings configure করো
□ Push to GitHub → Verify GitHub Actions deploys successfully
□ Custom domain verify করো

End of Day 1: Auth কাজ করছে, onboarding কাজ করছে, 
              GitHub push → auto-deploy confirmed ✅
```

---

**DAY 2 — Invoice Core + Firestore**

```
Tasks:
□ Firestore Security Rules লেখো + deploy করো
□ Invoice create form (সব fields)
□ Live preview component (React state sync)
□ Line items add/edit/remove (subcollection)
□ Tax + discount calculation (client-side)
□ Invoice save to Firestore (users/{uid}/invoices/{id})
□ Invoice number auto-generate (Firestore transaction + atomic counter)
□ Invoice list page (realtime listener)
□ Invoice detail page
□ Public invoice page (/invoice/[token] — query by publicToken, no auth)

End of Day 2: Invoice তৈরি, সংরক্ষণ, দেখা যাচ্ছে। Core loop কাজ করছে।
```

---

**DAY 3 — GAS Email + PDF**

```
Tasks:
□ GAS EmailService.gs লেখো:
  - sendInvoiceEmail(params) — HTML invoice notification
  - sendReminder(params) — HTML reminder email
  - MailApp.sendEmail() দিয়ে send করো
□ Email HTML templates (3 types: invoice sent, reminder, overdue)
□ GAS PdfService.gs লেখো:
  - HTML invoice template string নাও (frontend থেকে pass হবে)
  - DriveApp দিয়ে Google Doc/HTML → PDF convert করো
  - Firebase Storage REST API দিয়ে PDF upload করো
  - Public download URL return করো
□ Frontend: GAS call করো → PDF URL পাও → Firestore-এ save করো
□ Invoice send button: GAS email call করো
□ PDF download button: Firebase Storage URL ব্যবহার করো

End of Day 3: Email পাঠানো যাচ্ছে (GAS), PDF তৈরি হচ্ছে (GAS)।
```

---

**DAY 4 — Client Management + GAS Reminder Cron**

```
Tasks:
□ Client list page (Firestore realtime)
□ Add/edit client form
□ Client detail page (invoice history)
□ Client portal (/portal/[token])
□ Services catalog (add/use in invoice)
□ GAS ReminderCron.gs লেখো:
  - FirestoreService.gs: Firestore REST API দিয়ে query করো
  - getInvoicesNeedingReminders() function
  - Trigger condition logic (before/on/after due)
  - EmailService.sendReminder() call করো
  - Reminder log Firestore-এ update করো
□ GAS Daily Trigger verify করো (test manually)
□ Reminder settings page (Firestore save)
□ Manual "Send Reminder" button → GAS doPost call
□ WhatsApp copy button

End of Day 4: Client management complete। Reminders auto-fire করছে।
```

---

**DAY 5 — Dashboard + Analytics**

```
Tasks:
□ Dashboard stat cards (Firestore aggregation queries)
□ Revenue chart (6-month — Recharts)
□ Recent invoices widget
□ Analytics page:
  - KPI cards
  - Revenue trend chart
  - Client leaderboard
  - Payment status pie chart
  - Reminder effectiveness stats
□ Monthly summary calculation (client-side from Firestore data)

End of Day 5: Data visualization সম্পূর্ণ। User তাদের value দেখতে পারছে।
```

---

**DAY 6 — Stripe + Pro Features**

```
Tasks:
□ Upgrade page UI
□ Stripe.js integration (Stripe.redirectToCheckout)
□ GAS StripeWebhook.gs লেখো:
  - doPost(e) event parser
  - checkout.session.completed → Firestore plan update
  - subscription.deleted → Firestore downgrade
  - payment_failed → GAS email to user
□ Stripe webhook: verify event (signature check in GAS)
□ Frontend Pro gating: Firestore plan check করো
□ Free tier: invoice counter check করো (Firestore atomic increment)
□ Billing settings: Stripe Customer Portal link
□ Test Stripe payment end-to-end (test mode)
□ Verify Firestore updates after webhook

End of Day 6: $1/month subscription কাজ করছে। 
              Stripe → GAS → Firestore → Frontend realtime update।
```

---

**DAY 7 — Polish + Templates**

```
Tasks:
□ 5 PDF invoice templates (GAS PdfService HTML templates)
□ Dark mode
□ সব empty states
□ সব loading skeletons
□ Toast notifications
□ Mobile responsive check + fixes
□ Error boundaries
□ Form validation improvements
□ Privacy Policy + Terms pages (static pages)
□ Sentry setup (frontend error tracking)
□ CSV export (client-side, from Firestore data)

End of Day 7: Production-quality app।
```

---

**DAY 8 — Test + Launch**

```
Morning - Testing:
□ Full flow test (signup → invoice → GAS email → GAS reminder → Stripe payment)
□ GAS functions test (Editor → Run each function manually)
□ Stripe Webhook test (Stripe Dashboard → Send test event → GAS → Firestore update verify)
□ Firebase Security Rules test (Firebase Emulator Suite)
□ GitHub Actions pipeline test (একটা test PR তৈরি করো)
□ iPhone + Android test
□ 5 beta user-কে দাও → feedback নাও
□ Critical bugs fix করো

Afternoon - Launch:
□ Stripe live mode-এ switch করো
□ Final git push → GitHub Actions → auto-deploy
□ Custom domain live verify করো
□ GAS Production deployment re-deploy করো
□ Product Hunt prep
□ Reddit/Twitter/LinkedIn launch posts
□ Freelancer Facebook groups-এ post করো
□ 20 Upwork freelancers-কে DM করো

End of Day 8: LIVE। Real users আসছে। $1/month collect হচ্ছে।
```

---

## 13. GO-TO-MARKET STRATEGY {#13-gtm}

*(Unchanged from v2)*

### 📣 Launch Channels

**Week 1 — Warm Channels**
- Personal network: 20 freelancer friends → feedback নাও
- Discord servers: Indie Hackers, r/SideProject, Freelancer groups
- Facebook Groups: "Freelancers in [Country]" groups (11 countries)

**Week 2 — Content Channels**
- Reddit: r/freelance, r/Upwork, r/freelancers, r/digitalnomad
- Twitter/X: Thread "I built an invoice tool for $0 in 8 days"
- LinkedIn: Target freelancers in target countries

**Week 3 — Community**
- Product Hunt launch (Tuesday = best day)
- Hacker News: Show HN post
- IndieHackers.com project page

**Message Templates**

English:
> "Tired of chasing clients for payment? RemindPay creates professional invoices in 90 seconds and automatically follows up — so you never have to feel awkward asking for your money again. Free to start, Pro is just $1/month. [link]"

Hindi/Urdu:
> "Client को payment के लिए follow up करना awkward लगता है? RemindPay automatic reminder भेजता है — आपको कुछ नहीं करना। Free में शुरू करें, Pro सिर्फ $1/month।"

---

## 14. REVENUE PROJECTION {#14-revenue}

*(Unchanged from v2)*

| Month | Free Users | Pro Users | MRR | Notes |
|---|---|---|---|---|
| Month 1 | 50 | 5 | $5 | Soft launch |
| Month 2 | 120 | 15 | $15 | Word of mouth |
| Month 3 | 300 | 40 | $40 | PH launch boost |
| Month 6 | 800 | 120 | $120 | SEO kicking in |
| Month 12 | 2,500 | 400 | $400 | Organic growth |
| Month 18 | 6,000 | 1,000 | $1,000 | **$1K MRR milestone** |
| Month 24 | 15,000 | 3,000 | $3,000 | **$36K ARR** |

---

## 15. RISK & MITIGATION (REVISED) {#15-risk}

| Risk | Probability | Mitigation |
|---|---|---|
| GAS execution timeout (6 min limit) | Low | Invoice operations সব < 30 seconds। PDF generation < 1 min। Problem নেই। |
| GAS daily email limit (20K/day) | Very Low | 20K emails/day = 20,000 users। এতদিনে paid plan নেওয়া better। |
| GAS Web App URL change on redeploy | Medium | GAS redeployment-এ URL change হয় না। শুধু "New Deployment" করলে নতুন URL আসে। Always "Manage Deployments" → update করো। |
| GitHub Pages static limitation | Medium | Server-side rendering দরকার হলে: Dynamic routes client-side handle করো। `/invoice/[token]` page: client-side Firestore query। |
| Firebase Spark plan limits | Low | 50K reads/day, 20K writes/day। Early stage-এ যথেষ্ট। Usage বাড়লে Blaze (pay-as-you-go) upgrade করো — $15-25/month at scale। |
| Firebase Security Rules misconfiguration | Medium | Firebase Emulator Suite দিয়ে rules test করো। Public invoice read rule সঠিকভাবে লেখো। |
| Stripe Webhook GAS verification | Medium | GAS-এ Stripe signature verification implement করো (HMAC check)। Secret GAS Script Properties-এ store করো। |
| Competition (Wave, FreshBooks) | High | Price moat ($1 vs $17+), simplicity, speed |
| Reminder emails spam-এ যাওয়া | Medium | GAS-এর Gmail account properly configure করো। SPF/DKIM: Gmail automatically handles। Custom "From" domain: Gmail alias setup করো। |
| PayPal/Stripe unavailable (PK, NP) | Medium | Manual Pro: user PayPal-এ $1 পাঠায় → GAS manually Firestore update করে। |
| GAS Service Account security | Low | Service Account JSON শুধু GAS Script Properties-এ রাখো। GitHub-এ commit করো না। |

---

## 🏁 FINAL SUMMARY

```
Product:    RemindPay — Invoice + Auto Reminder SaaS
Target:     Freelancers in 11 countries
Pricing:    Free (5 invoices) + $1/month Pro (unlimited + automation)

New Stack (v3):
  Frontend:   Next.js 14 Static Export → GitHub Pages
  Deploy:     GitHub Actions (push → auto-build → auto-deploy)
  Database:   Firebase Firestore (NoSQL, realtime)
  Auth:       Firebase Authentication (Google OAuth + Email)
  Storage:    Firebase Storage (logos, PDFs)
  Backend:    Google Apps Script (GAS) Web App
  Email:      GAS + MailApp/Gmail API (replaces Resend)
  PDF:        GAS + DriveApp (replaces React PDF)
  Cron:       GAS Time-based Triggers (replaces Vercel Cron)
  Webhook:    GAS doPost (replaces Supabase Edge Functions)
  Payments:   Stripe (unchanged)
  DNS/CDN:    Cloudflare (unchanged)

Build Time: 8 days
Cost:       $0/month until meaningful scale
Goal:       $5/month in 2 weeks → $1,000/month in 18 months

GAS একাই 5টা কাজ করছে:
  ১. Backend API (Vercel Serverless-এর বিকল্প)
  ২. Email Engine (Resend-এর বিকল্প)
  ৩. PDF Generator (React PDF-এর বিকল্প)
  ৪. Cron Scheduler (Vercel Cron-এর বিকল্প)
  ৫. Stripe Webhook Receiver (Supabase Edge Functions-এর বিকল্প)

The $1 price is the moat.
The automation is the value.
The simplicity is the product.
GAS is the engine. Firebase is the brain. GitHub Pages is the home.
```

---

*Blueprint revised by: Lead Architect + Senior Engineer Strategist*
*RemindPay v3.0 — May 2026 | Stack: GAS + Firebase + GitHub Pages*
