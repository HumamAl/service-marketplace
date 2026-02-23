# Domain Knowledge Brief — European Premium Wellness & Personal Services Marketplace

## Sub-Domain Classification

**Premium on-demand personal wellness marketplace** targeting urban professionals across major European cities. The platform connects vetted, independent wellness providers (massage therapists, life coaches, breathwork facilitators, tantric practitioners, relationship therapists, intimacy coaches, body-positive personal trainers, somatic therapists) with clients seeking discreet, high-quality experiences. Tier: mid-to-premium market (€80–€350/session). City-based, GDPR-compliant, subscription model for providers (€99/mo), commission-free repeat bookings.

This is the European equivalent of Airbnb meets Calendly for the emerging premium "wellbeing economy" — a fast-growing category that sits between traditional health services and luxury personal experience marketplaces.

---

## Entity Names (10+ realistic names)

### Provider / Business Names (European premium aesthetic)
1. Vera Holmstrom — Somatic Release & Breathwork, Stockholm
2. Isabelle Marchand — Intimacy & Relationship Coaching, Paris
3. Luca Ferrante — Deep Tissue Massage & Fascia Therapy, Milan
4. Annika Brandt — Trauma-Informed Body Therapy, Berlin
5. Dmitri Volkov — Men's Wellness Coaching & Energy Work, Amsterdam
6. Sofia Reyes Montoya — Holistic Pelvic Therapy, Barcelona
7. Markus Steiner — Tantric Wellbeing & Mindfulness, Vienna
8. Nathalie Dubois — Somatic Breathwork & Nervous System Reset, Paris
9. Eleni Papadopoulos — Fertility Wellness & Women's Health, Amsterdam
10. Jonas Lindqvist — Executive Burnout Recovery Coaching, Copenhagen
11. Chiara Esposito — Prenatal Massage & Postpartum Recovery, Milan
12. Adriaan van der Berg — Trauma-Sensitive Yoga & Bodywork, Amsterdam
13. Katja Novak — Conscious Touch Therapy, Vienna
14. Pere Gimenez — Masculine Embodiment Coaching, Barcelona
15. Maja Svensson — Women's Empowerment & Sensuality Coaching, Stockholm

### Platform / Brand Names (how similar platforms present themselves)
- Serene (serene.eu)
- Luminae
- Velvet Wellness
- Nuvola Connect
- Grove Health
- Aure Platform

### Client First Names (typical urban European clientele)
- Emma, Laura, Martina, Anke, Saoirse, Ingrid, Valentina, Chloe
- Thomas, Julien, Florian, Henrik, Marco, Oliver, Sander, Michal

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Session price (60 min) | €65 | €130 | €320 | Higher in Zurich/Amsterdam/Paris vs Prague/Vienna. Tantric/intimacy coaching commands premium. Source: personaltrainingbarcelona.com, physicum.nl, industry surveys |
| Provider monthly revenue (active) | €1,200 | €3,800 | €9,400 | Varies by city, specialty, and avg 2-3 sessions/day. Source: PayScale, coach income surveys |
| Repeat booking rate (same provider, 90 days) | 38% | 62% | 79% | Premium services with deep client relationships trend higher. Source: meevo.com |
| Provider response time to inquiry | 4 min | 22 min | 3.2 hrs | Platforms with auto-reply / calendar integration are fastest. Source: Ruler Analytics benchmarks |
| Average provider rating | 4.1 | 4.6 | 5.0 | Providers below 4.3 typically flagged or suspended. Skewed toward high (selection bias). Source: Treatwell benchmarks |
| Monthly bookings per active provider | 8 | 24 | 47 | Outliers are celebrity coaches doing workshops. Source: estimated from €99/mo subscription viability |
| Client no-show rate | 4% | 9% | 18% | Higher for first-time bookings. Drops significantly with card-on-file + reminder flow. Source: wellnessliving.com, theraplatform.com |
| Client cancellation rate (within 24 hrs) | 6% | 13% | 22% | Higher in winter months. Late cancellations charged 50% by most premium providers. Source: Tebra/wellnessliving data |
| Provider profile gallery images | 2 | 6 | 14 | Profiles with 6+ images get 3x more inquiries (industry observation) |
| Client acquisition time (first contact to booked) | 8 min | 37 min | 4 hrs | AI concierge platforms drastically reduce this. Source: Ruler Analytics / Signpost |
| Provider subscription churn (monthly) | 3% | 7% | 14% | Drops significantly after 3+ completed bookings. Source: SaaS marketplace benchmarks |
| AI match score (concierge algorithm) | 61% | 78% | 96% | Computed from specialty match + availability + location + past ratings |
| Platform gross booking value (weekly, mid-size city) | €8,400 | €23,600 | €61,000 | Estimated from 180-500 weekly bookings × avg session price |

---

## Industry Terminology Glossary (12+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Somatic therapy | Body-based approach to healing trauma — works through physical sensations, breath, and movement rather than talk-based therapy alone | Provider specialty tag; filtering in search |
| Breathwork | Intentional breathing techniques (e.g., holotropic, pranayama) used for nervous system regulation, emotional release, or peak state induction | Service category; session type label |
| Tantric wellness | Holistic modality drawing from Tantra philosophy — not inherently sexual; focuses on energy, presence, connection, and embodiment | Sensitive category requiring age verification and discreet mode on platform |
| Embodiment coaching | Coaching approach focused on bringing awareness to physical sensations and body patterns, not just thoughts. Used for confidence, sexuality, and identity work | Service category |
| Availability window | Provider-defined time blocks when they are open for booking, configurable per day/week in their profile calendar | Core scheduling concept |
| Quick Exit | UI safety feature — pressing ESC (or clicking the button) immediately navigates the user's browser to a neutral page (e.g., Google Weather) and clears session history. Common on sites serving sensitive personal service categories. | Privacy feature; required on discreet-mode platforms |
| Discreet Mode | Client-facing toggle that hides the platform's branding in the browser tab, uses a decoy favicon, and suppresses billing descriptor details on credit card statements | Privacy & safety feature |
| Verified Provider | Provider who has passed identity check (government ID + selfie), background screen, and certification review. Badge displayed on profile. | Trust signal; filter option |
| AI Concierge | In-app chatbot that asks a client a few preference questions (vibe, goal, budget, location, gender preference) and returns ranked provider matches | Core matching feature |
| Booking Hold | Temporary reservation of a time slot (typically 15-30 min) while a client completes payment or confirmation. Prevents double-booking. | Scheduling system term |
| Ghosting | When a provider or client accepts a booking but stops responding. Platform flags and can auto-cancel after 2 hrs of no response. | Edge case / policy term |
| Session Note | Short encrypted post-session summary a provider can write for continuity of care. Visible only to that client. Optional but builds retention. | Feature in provider dashboard |
| Dispute Window | 48-hour period after a session during which a client can raise an issue. Platform holds payment release during this window. | Payment / trust feature |
| Geo-match | Algorithm that ranks providers by travel distance from client's detected or entered location | Search/filter concept |
| Top Provider | Badge earned by providers with 4.8+ rating, 15+ verified reviews, and <5% cancellation rate over trailing 90 days | Gamification / trust signal |

---

## Common Workflows

### Workflow 1: Client Discovery & Booking
1. Client lands on platform (or is geo-redirected to city landing page)
2. AI concierge dialog opens: asks goal, service type, gender preference, budget, timezone
3. Algorithm returns top 3-5 provider matches with match % score
4. Client browses provider profile: photo gallery, bio, specialties, calendar availability, reviews
5. Client selects time slot from live availability calendar (30-min grid)
6. Booking Hold placed (15-min timer shown)
7. Client completes payment (card on file or one-time entry, stored via Stripe)
8. Booking Confirmed — both parties receive encrypted confirmation with meeting link or address (private)
9. Provider responds to confirm within 2 hours (or auto-confirmed if provider has instant-book enabled)
10. 24-hr reminder sent to both parties

### Workflow 2: Provider Onboarding & Verification
1. Provider applies via sign-up form (name, city, specialty, sample photos, certifications)
2. Platform sends identity verification request (Onfido or Stripe Identity)
3. Provider uploads government ID + selfie
4. Manual review by platform trust team (1-3 business days)
5. Provider sets up profile: bio, service menu with pricing, gallery, availability calendar
6. Provider selects subscription tier (Standard €99/mo or Elite €199/mo with featured placement)
7. First booking arrives — platform holds payment in escrow, releases 48 hrs post-session
8. After 5 completed sessions: Verified Provider badge unlocked

### Workflow 3: Dispute & Cancellation
1. Client cancels within 24 hrs of session → 50% charge applied, provider paid 50%
2. Client no-shows → Full session price charged, provider paid 100%
3. Provider cancels within 6 hrs → Client refunded 100%, provider gets a cancellation mark
4. Client raises dispute within 48-hr window → Platform Support contacts both parties
5. If unresolved in 72 hrs → Platform arbitrates and applies standard ruling
6. Repeated disputes → Provider review triggered; possible suspension

---

## Common Edge Cases

1. **Timezone mismatch**: Client in Berlin books a provider in Amsterdam — both in CET, but a client traveling from London might book with UK time misunderstanding. Platform must surface "Your local time: 14:00 | Provider local time: 15:00 (CET)" warnings.
2. **Provider ghost after acceptance**: Provider accepts booking but becomes unresponsive. After 2 hrs without response to booking confirmation, system auto-escalates.
3. **Duplicate bookings**: Provider has external calendar (Google Calendar, iCal) not synced — client books a slot that is actually filled. Platform must show "Calendar not synced" warning.
4. **Privacy mode failure**: Client in Discreet Mode shares a screenshot of the platform accidentally — platform watermarks thumbnails and obscures provider contact info until session confirmed.
5. **Overdue provider review**: Provider has outstanding unreviewed sessions older than 7 days — clients are reminded but often don't review. Incomplete review records affect trust score calculations.
6. **Suspended provider with active bookings**: Provider account suspended (policy violation) mid-cycle when they have 3+ upcoming bookings. Platform must notify clients and offer rebooking or refund.
7. **Multi-language friction**: Paris provider listing is in French only; German-speaking client from Zurich inquires. Platform auto-translates bio but nuanced service descriptions lose meaning. "Körperarbeit" (bodywork in German) has no precise French equivalent.
8. **VAT compliance**: Providers in Germany (19% VAT), France (20% TVA), Spain (21% IVA) must have valid tax registrations. Platform must generate compliant invoices per jurisdiction.
9. **Zero availability window**: New provider set up profile but forgot to open their calendar — appears in search results but all slots show "No availability." First-time setup error.
10. **Outlier high-value provider**: A celebrity wellness coach with 200+ reviews charges €380/session — significantly above platform average. Appears as an outlier in analytics but inflates aggregate revenue metrics.

---

## What Would Impress a Domain Expert

1. **The Treatwell/Fresha commission distinction matters**: Top platforms in Europe (Treatwell) charge 35% commission on new client bookings but 0% on returning clients. The €99/mo subscription with 0% commission model this platform uses is intentionally designed to compete with this — providers keep 100% of every booking after the flat monthly fee. A domain expert would notice this positioning immediately.

2. **GDPR "right to erasure" in a marketplace**: When a client requests data deletion (Art. 17 GDPR), the platform cannot simply delete their account if there are outstanding payments, active disputes, or session records within the legal retention period (typically 5-7 years for financial records in Germany). The platform must partially anonymize records — replace personal identifiers with tokens but retain transaction data. This is a nuanced technical requirement that most generic platforms get wrong.

3. **Somatic and intimacy services have different legal classifications by country**: In Germany, "Körpertherapie" is unregulated but some practices overlap with physiotherapy (which requires licensing). In the Netherlands, tantric massage exists in a gray area between wellness and adult services. The platform must maintain jurisdiction-aware service taxonomy — same service can be listed differently in different countries.

4. **Calendar availability is the #1 provider complaint on existing platforms**: Most providers use Google Calendar or iCal externally. Two-way sync (not just read, but write-back) is the feature that determines whether a provider stays on the platform or abandons it for direct booking. Providers hate double-booking. Any demo showing calendar sync and conflict detection would resonate immediately.

5. **Trust signal hierarchy in premium personal services**: In this category, the review score matters less than: (a) verified identity, (b) how many repeat clients they have (% of bookings that are returning clients), and (c) how long they've been active on platform. A provider with 4.7 stars and 3 months on platform feels less trustworthy than one with 4.5 stars and 18 months and 80% repeat clientele. Surfacing "78% repeat client rate" is more powerful than showing the star count alone.

---

## Common Systems & Tools Used

| Tool / Platform | Purpose | Used By |
|----------------|---------|---------|
| **Calendly** | External scheduling reference point — many providers use it before joining marketplace | Providers (pre-platform) |
| **Mindbody** | Industry-standard booking/CRM for wellness studios — marketplace competes with this | Larger wellness studios |
| **Fresha** | Free marketplace + software for beauty/wellness — main competitor at lower tier | Comparison point |
| **Treatwell** | Premium marketplace with 50,000+ European salons — direct competitor for provider acquisition | Comparison point |
| **Stripe Identity** | Provider ID verification (selfie + document check) | Platform trust/ops team |
| **Onfido** | Alternative KYC provider used by fintech and marketplace platforms in Europe | Platform trust/ops team |
| **Brevo (formerly Sendinblue)** | European GDPR-compliant email marketing — often preferred over Mailchimp by EU startups | Marketing ops |
| **Intercom / Crisp** | In-app chat for AI concierge layer and support | Platform product |
| **Stripe** | Payments, subscription billing, escrow holds, payout to providers | Platform payments |
| **iCal / Google Calendar API** | Two-way calendar sync for provider availability | Provider tools |

---

## Geographic / Cultural Considerations

### City-Specific Pricing Norms (per 60-min session)
- **Zurich / Geneva**: €180–€320 (highest cost of living in Europe; CHF/EUR parity)
- **Amsterdam / Copenhagen / Stockholm**: €120–€220
- **Paris / Milan / Berlin**: €90–€180
- **Barcelona / Vienna**: €75–€160
- **Prague / Warsaw**: €55–€110 (emerging market; growing demand but lower price ceiling)

### Language & Locale
- Provider bios: offered in local language + English. English is the shared lingua franca for the platform UI.
- Date format: DD/MM/YYYY (not MM/DD). Use 24-hour clock (14:30, not 2:30 PM) — this is standard across Europe.
- Currency: EUR for all Eurozone cities. CHF for Zurich/Geneva. SEK for Stockholm. DKK for Copenhagen. GBP for any UK expansion.
- VAT rates differ: Germany 19%, France 20%, Spain 21%, Netherlands 21%, Austria 20%, Sweden 25%, Switzerland 7.7% (non-EU).

### GDPR-Specific Requirements
- **Consent management**: Cookie consent banner required on all pages. Cannot pre-tick marketing consent.
- **Data residency**: User data must be stored on EU servers (AWS Frankfurt, Google europe-west1, etc.). No US-only hosting.
- **Right to access**: Users can request full data export within 30 days of request.
- **Right to erasure**: Partial anonymization when financial records must be retained.
- **Data Protection Officer (DPO)**: Required for platforms processing sensitive personal data at scale (Art. 37 GDPR).
- **Sensitive category data**: Health-related services and intimacy coaching are "special category data" under Art. 9 — requires explicit consent beyond standard privacy policy agreement.
- **Cookie-free analytics**: Many EU-focused platforms use Plausible or Fathom instead of Google Analytics to avoid GDPR friction.

---

## Data Architect Notes

### Entity Names to Use Per Dataset

**Providers array** (15-18 items):
- Use names from the provider list above (Vera Holmstrom, Isabelle Marchand, Luca Ferrante, etc.)
- Spread across: Berlin (3), Amsterdam (3), Paris (3), Barcelona (2), Vienna (2), Stockholm (2), Milan (2), Copenhagen (1)
- Mix genders approximately 60% female / 40% male (reflects actual wellness provider demographics)
- Each provider has: specialties (2-3 from the taxonomy below), subscriptionTier ("standard" | "elite"), verifiedStatus, calendarSyncStatus, matchScore

**Service categories / specialties** (use these exact strings):
- "Somatic Therapy"
- "Breathwork & Nervous System"
- "Tantric Wellness"
- "Intimacy Coaching"
- "Trauma-Informed Bodywork"
- "Prenatal & Postpartum"
- "Executive Burnout Coaching"
- "Deep Tissue Massage"
- "Embodiment Coaching"
- "Women's Wellness"
- "Men's Embodiment"
- "Fascia Release"
- "Relationship Therapy"
- "Conscious Touch"

**Bookings array** (20+ items):
- Status labels: `"confirmed"` | `"pending_provider"` | `"completed"` | `"cancelled_client"` | `"cancelled_provider"` | `"no_show"` | `"disputed"`
- Include at least: 2 no_shows, 1 disputed, 3 cancelled_client, 2 cancelled_provider
- Session prices: range from €85 (Prague, standard) to €310 (Zurich, elite provider)
- Booking dates: last 60 days, with ~4-6 upcoming (next 30 days)

**Client names** (use realistic European first + last names):
- Emma Laurent, Thomas Bergmann, Saoirse Callahan, Valentina Greco, Oliver Hoffmann,
- Chloe Petit, Henrik Andersen, Martina Ruiz, Florian Schmitt, Ingrid Lindberg,
- Marco Rossi, Anke Bauer, Julien Mercier, Laura van Dijk, Michal Novak

**Reviews array** (15-20 items):
- Ratings: NOT uniform. Distribution: 5 stars (55%), 4 stars (30%), 3 stars (12%), 2 stars (3%)
- Text reviews in English (some with "(translated from German)" tag for realism)
- Include 1-2 reviews with a provider flag/response

**Analytics / KPIs** (for dashboard):
- Total active providers: 147 (across 8 cities)
- Total bookings this month: 1,843
- Platform GMV this month: €238,900
- Average session price: €128.70
- Top city by bookings: Amsterdam (312), Berlin (287), Paris (241)
- AI concierge match rate: 73.4% (% of concierge sessions that result in booking)
- Provider subscription MRR: €14,553

### Field Values / Ranges
- `sessionDuration`: 45 | 60 | 90 | 120 (minutes)
- `sessionPrice`: €65–€320 (use decimals: €127.50, €94.00, €185.00)
- `providerRating`: 3.8–5.0 (mostly 4.3–4.9; a few outliers at 3.8-4.1 for "flagged" state)
- `repeatClientRate`: 28%–82% (string "28%" stored as number 0.28)
- `responseTimeMinutes`: 4–187 (use specific numbers, not round: 14, 37, 91, 187)
- `totalReviews`: 3–214 (new providers have 3-12; established have 50-214)
- `completedSessions`: 12–847 (new: 12-45; mid: 80-250; established: 300-847)

### Date Patterns
- Availability calendar: weekly recurring patterns (Mon-Fri for most, some weekends)
- Sessions: mostly weekday afternoons (14:00-20:00) and weekend mornings (09:00-13:00)
- No-shows cluster: Monday mornings and Friday evenings
- Cancellations spike: first week of each month (payday pressure), holiday weekends
- Provider subscription renewal: 1st of each month
