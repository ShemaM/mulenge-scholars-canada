# TODO: HCI Refactor for Contact Page

This document outlines the Human-Computer Interaction (HCI) principles applied during the refactoring of the MSNC Contact page.

### 1. Consistency (Nielsen's Heuristics)

- **Internal Consistency**: The contact page's purpose is now singular: communication. Redundant content from the "About" page (mission, core values) has been removed, creating a clear distinction between sections.
- **External Consistency**: The bilingual toggle's behavior is consistent with the rest of the site, now managed through `next-intl`'s App Router integration for server-rendered translations and metadata.

### 2. Recognition Over Recall (Nielsen's Heuristics)

- **Simplified Choices**: The previous "Involvement Pathways" required users to recall their role (Student, Partner) to find the right channel. The new design presents a single, clear contact form and direct channels (email, phone).
- **Clear Subject Line**: The "Nature of Inquiry" dropdown has been replaced with a "Subject" field with clear, recognizable options (`General Inquiry`, `Student Support`, etc.), reducing cognitive load.

### 3. Flexibility and Efficiency of Use (Nielsen's Heuristics)

- **Multiple Channels**: Users are no longer forced to use a single form. The page now offers multiple contact methods (form, email, phone, mailing address, social media), catering to different user preferences and needs (Flexibility).
- **Accelerators**: "Skip-to" links (`#contact-form`, `#contact-details`) have been added, allowing experienced users to navigate directly to their desired section, improving efficiency.

### 4. Error Prevention (Nielsen's Heuristics)

- **Clear Fields & Placeholders**: Vague labels like "Tell us how you would like to connect" have been replaced with specific prompts ("Your Message") and descriptive placeholders. This guides users to provide the correct information and reduces submission errors.
- **Structured Subject**: The predefined subject dropdown helps prevent miscategorized inquiries, streamlining the internal response process.

### 5. Match Between System and the Real World (Nielsen's Heuristics)

- **Clear Language**: Jargon like "Dispatch Message" and "Secure Digital Terminal" has been replaced with familiar, user-centric language ("Send Message", "Send a Message").
- **Direct Feedback**: The form provides immediate, clear feedback. A success state confirms the message was sent and sets expectations for a response time ("...we'll respond within 48 hours").

### 6. Aesthetic and Minimalist Design (Nielsen's Heuristics)

- **Reduced Clutter**: By removing the "Core Values" and "Involvement Tracks" sections, the page is now focused and minimalist. The visual hierarchy clearly separates the form from alternative contact details.

### 7. Help and Documentation (Nielsen's Heuristics)

- **Clear Instructions**: The page header and form subheadings provide concise instructions and set expectations (e.g., response time), serving as minimal but effective help for the user.

### 8. HCI Refactor for High School Support & Global Components

* **Recognition Over Recall**:
  * Replaced vague "Apply Now" CTAs with descriptive labels like "Apply for Mentorship" to explicitly set expectations before the user interacts.
  * Mapped `aria-label` attributes dynamically to grid cards ("Explore [Program Title]") for clearer screen-reader pronunciation.
* **Visibility of System Status**:
  * Added success feedback handling definitions for the Newsletter sign-up within `en.json` and `fr.json` (`Subscription successful! Check your inbox.`).
* **Error Prevention & User Trust**:
  * Embedded privacy reassurance text beneath the global newsletter input ("We respect your privacy. No spam.") to mitigate hesitation when users share personal data.
* **Flexibility and Efficiency of Use**:
  * Implemented jump links (`#tutoring`, `#courses`, etc.) at the top of the High School Support modules, allowing users to bypass long scrolling. Combined with `scroll-mt-32`, this anchors perfectly beneath fixed headers.
  * Reconfigured the `EventPreview` empty state to actively re-route idle traffic to the Newsletter component or past events, rather than leaving a dead end.
* **Aesthetic & Minimalist Design**:
  * Separated dense text into icon-driven module cards (`<article>`), providing clean whitespace and immediate visual anchors (e.g. `GraduationCap` for Tutoring). 
* **Accessibility Compliance**:
  * Integrated `focus-within:ring-2` to grid cards to fulfill WCAG 2.1 AA contrast requirements for keyboard navigators.