# Task Plan

## Changes Required

### 1. GlobalImpact.tsx
- [x] Remove "verified objective" span from chapter card footers
- [x] Remove bottom footer row (Vision 2030, Strategic Interconnect, values)

### 2. Hero.tsx
- [x] Remove top masthead header (org/country labels and live status badge)

### 3. GetInvolved.tsx
- [x] Remove "© 2026 MSNC Canada" from footer row

### 4. Contact.tsx
- [x] Remove "Global Channels" social card from sidebar
- [x] Remove "Network Live" label from submit row
- [x] Center the submit button
- [x] Remove bottom page footer (Global Communication Repository, Security Verified, Correspondence Archive)

### 5. en.json
- [x] submitCorrespondence -> "Send Us a Message"
- [x] givenName -> "First Name"
- [x] familyName -> "Last Name"
- [x] digitalAddress -> "Email"
- [x] contactLine -> "Phone Number"
- [x] transmitMessage -> "Send Message"

### 6. fr.json
- [x] submitCorrespondence -> "Envoyez-nous un message"
- [x] givenName -> "Prénom" (already correct)
- [x] familyName -> "Nom"
- [x] digitalAddress -> "Courriel"
- [x] contactLine -> "Numéro de téléphone"
- [x] transmitMessage -> "Envoyer le message"

### 7. impact/rebuilding-futures/page.tsx
- [x] Rewrote to MSNC design system (container-editorial, section, section-label, btn classes)
- [x] Removed all slate/blue/gray one-off colors, replaced with brand tokens
- [x] Removed manual containers (mx-auto max-w px-6) and blueprint grids
- [x] Added Next.js 15 Promise params + await params
- [x] Added canonical alternates to generateMetadata
- [x] Removed unused Layers import
- [x] Fixed testimonial map type annotations

### 8. en.json / fr.json
- [x] Added RebuildingFutures namespace with full translations

