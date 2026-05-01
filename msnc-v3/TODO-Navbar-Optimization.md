# Navbar Optimization TODO

## Plan (based on Navbar.tsx analysis)

**Current State:**
- Dropdown menus have Lucide icons for each NavItem
- "What We Do" group has generic labels: "Adult Learning Pathways", "Youth Development", "Mentorship" (hrefs don't match actual pages)

**Changes:**
1. [x] Removed all `icon` from NAV_GROUPS items
2. [x] Updated "What We Do" labels/hrefs to exact programs
   | Current | New |
   |---------|-----|
   | Adult Learning Pathways → /programs/adult-learning | "High School Support" → /programs/high-school-support |
   | Youth Development → /programs/youth | "Adult Learning Pathways" → /programs/adult-learning-pathways |
   | Mentorship → /programs/mentorship | "Workshops & Community" → /programs/workshops-community |

**Files:**
- msnc-v3/src/components/layout/Navbar.tsx (main)
- Verify actual program slugs from pages

**Status:** Ready for edits after confirmation

