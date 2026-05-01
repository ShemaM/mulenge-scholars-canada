# Contact Form Success Message Optimization

## Plan
Current: Static "Message Sent! Thank you for your inquiry. We'll respond within 24-48 hours." in ContactClient.tsx + en/fr.json
- Static showSuccess state (no auto-hide)
- Not context-aware (subject/type)

**Changes:**
1. [ ] Add auto-dismiss timer (10s)
2. [ ] Context-aware message based on form subject:
   | Subject | en Message | fr Message |
   |---------|------------|------------|
   | general | "Thanks for reaching out! We'll reply to your inquiry within 24 hours." | "Merci de nous avoir contactés ! Nous répondrons sous 24h." |
   | support | "Support request received! Our team will review and reply within 48 hours." | "Demande de soutien reçue ! Réponse sous 48h." |
   | partnership | "Partnership inquiry noted. Executive team will contact you within 2 business days." | "Demande de partenariat notée. Contact sous 2 jours ouvrables." |
   | volunteer | "Volunteer application received. We'll review your experience and reply soon." | "Candidature bénévole reçue. Réponse bientôt." |
3. [ ] Add subtle exit animation

**Files:**
- msnc-v3/src/app/[locale]/(frontend)/contact/ContactClient.tsx
- msnc-v3/src/messages/en.json (ContactPage.form.success)
- msnc-v3/src/messages/fr.json

Ready to implement

