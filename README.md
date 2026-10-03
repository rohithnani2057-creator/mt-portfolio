# Portfolio: Rohith Kodapaka

A single-page personal portfolio for a Splunk Administrator / SIEM Engineer. Plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies except Google Fonts.

- **Published copy:** https://claude.ai/artifact/AVgJAqQh7H12BGiaX7rWiC (single inline file, private until shared)
- **Self-hosted copy:** this folder

---

## 1. Files

| File | Purpose |
|---|---|
| `index.html` | Page structure and content, meta tags |
| `style.css` | All styling, animations, responsive and print rules |
| `script.js` | Scroll reveals, counter, typing title, tracking widgets, terminal simulation |
| `og-image.png` | 1200x630 social preview image |
| `README.md` | This document |

The published claude.ai version is one file with the CSS and JS inlined, because published pages can only load scripts from a short list of approved hosts.

## 2. Quick start

1. Keep all files in one folder.
2. Open `index.html` in a browser to preview locally.
3. Upload the folder to any static host (see section 10).

## 3. Page structure (top to bottom)

1. **Background layer** (`.bg`): three blurred, drifting circles.
2. **Tracking layer:** `.cursor-glow` (cursor effect), `.prog` (scroll bar), `.hud` (scan chip).
3. **Nav:** "RK" logo and links to Skills, Playbooks, Experience, Contact, and My Resume. My Resume opens an in-page PDF viewer with a download button.
4. **Hero** (`header.hero`): "Open to opportunities" tag, name, typing title, summary, contact and experience links.
5. **Stats** (`.stats`): 5+ years, SHC + IDXC, Splunk ES, AWS · GCP.
6. **Skills** (`#skills`): six cards with chips.
7. **Platform playbooks** (`#playbooks`): three interactive workflow cards.
8. **SPL explorer** (`#spl-explorer`): selectable example queries.
9. **Experience** (`#experience`): Wipro, LTIMindtree, Hallmark Global Technologies.
10. **Education:** B.Sc. Multimedia.
11. **Contact** (`#contact`): location and email.
10. **Footer.**

## 4. Design system

### Colors (CSS variables on `:root`)

| Variable | Light | Dark | Use |
|---|---|---|---|
| `--bg` | #f7f6f2 | #0e1113 | Page background |
| `--card` | #fff | #161a1d | Card background |
| `--ink` | #16181d | #eef0f2 | Main text |
| `--mute` | #5b6070 | #9aa3ad | Secondary text |
| `--line` | #e2e0d8 | #262c31 | Borders |
| `--acc` | #0f766e | #4fd1c0 | Accent (teal) |
| `--accbg` | #d9f0ec | #12332f | Accent tint |

Dark mode follows the visitor's system setting. You can force a theme by adding `data-theme="light"` or `data-theme="dark"` to the `<html>` tag. Red `#e5484d` is used for alert accents (radar blips, HUD dot, scan bar end).

### Typography
- Headings: **Sora** (600, 700). Body: **Inter** (400, 500). Both from Google Fonts with system fallbacks.
- The hero name is `clamp(38px, 8vw, 72px)`.
- The terminal and HUD use the system monospace stack (`ui-monospace, Menlo, Consolas`).

### Layout
- Content width: 960px (1080px at 1200px and up), with 20px side padding.
- Skill cards: `repeat(auto-fit, minmax(min(100%, 270px), 1fr))`, so they wrap automatically and never overflow on narrow phones.

## 5. Animations

| Effect | How |
|---|---|
| Hero entrance | `rise` keyframe on tag, name, summary, buttons with staggered delays (0, .12, .26, .4s) |
| Tag pulse | `pulse` keyframe, box-shadow ring |
| Shimmer title | Gradient background clipped to text (`background-clip:text`), `shine` keyframe slides it |
| Scroll reveal | `.reveal` elements start hidden under `.js`, get `.in` when 12% visible (IntersectionObserver). Delay `--d` = `(index % 3) * 0.09s` |
| Counter | "5+" counts 0 to 5 over 1.4s using `requestAnimationFrame` |
| Hover | Cards and stats lift 4px with teal border and glow, chips tint, buttons lift 2px |
| Background | `drift` keyframe, 22s / 28s / 34s durations, staggered delays |
| Radar | `spin` (5s linear) on the sweep group, `ping` fade on blips |
| Typing title | JS loop: type 75ms/char, hold 1.8s, delete 35ms/char, pause 350ms, next role; starts after 0.9s |

**Safety nets:**
- The hidden starting state only applies when the `js` class is present on `<html>`, so content stays visible if JavaScript fails.
- `@media (prefers-reduced-motion: reduce)` turns off all animations and transitions and shows static content.

### Threat radar
- Inline SVG, viewBox 200x200: three rings, crosshair, 45-degree sweep wedge rotating around (100,100), five blips (two red).
- Labeled "simulated".

## 7. Tracking elements

All run locally in the visitor's browser. Nothing is collected, stored or sent.

| Element | Behavior |
|---|---|
| Scan bar (`.prog`) | 3px bar at the top; `scaleX(scrollTop / (scrollHeight - clientHeight))` |
| Scan HUD (`.hud`) | Bottom-left chip: `SCAN n% \| x/5 SECTIONS`. A section counts once it is 20% visible. Tracked sections: `header.hero`, every `section`, `.contact` |
| Nav highlight | Observer with `rootMargin: -40% 0px -55% 0px` toggles `.on` on the link for the section crossing mid-screen |
| Cursor spotlight (`.spot`) | 460px radial glow easing toward the mouse (12% of remaining distance per frame). Only on devices with a mouse (`pointer:fine`) and without reduced motion |

## 8. Responsive behavior

| Condition | Changes |
|---|---|
| Viewport meta | `viewport-fit=cover`, safe-area insets on padding and HUD |
| 1200px and up | Wider container, roomier hero, larger intro |
| Up to 768px | Stats 2x2, terminal and radar stack, smaller headings and spacing |
| Up to 520px | Nav stacks, buttons full width, tighter cards and timeline |
| `hover: none` (touch) | Hover lifts disabled |
| All sizes | `overflow-wrap:anywhere` on long text, `max-width:100%` on images/SVG |

## 9. Print / Save as PDF

Press Ctrl/Cmd+P and choose "Save as PDF". The print stylesheet:
- Forces a white background and dark text, A4 with 14mm margins.
- Hides nav, buttons, tag, stats, terminal, radar, HUD, scan bar, spotlight and footer.
- Shows the hero, skills in a 2-column grid, experience, education and contact.
- Prevents cards and job entries splitting across pages.
- A `beforeprint` listener replaces a half-typed title with the full "Splunk & SIEM Engineer".

This is a portfolio printout, not a replacement for your ATS-friendly resume PDF.

## 10. Hosting

**GitHub Pages:** create a repo, upload the files to the top level, then Settings > Pages > branch `main`, root folder. Live at `https://<username>.github.io/<repo>/`.

**Netlify:** drag the folder onto app.netlify.com/drop.

**Cloudflare Pages:** create a project, "Upload assets", upload the folder.

Custom domains can be connected on all three by pointing DNS at the host.

### Social preview (LinkedIn, WhatsApp, X)
`index.html` includes description, Open Graph and Twitter tags. **After hosting, search `index.html` for `YOUR-SITE-URL` and replace it with your real address** (with trailing slash), in `og:url`, `og:image` and `twitter:image`. Previews won't show the image until you do. LinkedIn caches previews; use linkedin.com/post-inspector to refresh.

## 11. Editing guide

| To change | Where |
|---|---|
| Accent color, backgrounds | Variables at the top of `style.css` |
| Name, summary, buttons | Hero block in `index.html` |
| Stats boxes | `.stats` block in `index.html` |
| Rotating titles | `roles` array in `script.js` |
| Terminal query | `spl` string in `script.js` |
| Terminal messages | `msgs` array in `script.js` |
| Skill cards and chips | `#skills` block |
| Jobs and bullets | `#experience` block (`.job` entries, `<li>` bullets) |
| Email | `data-u` (before the @) and `data-d` (domain) on the two links with `data-u`: hero button and contact button |
| Location | `#contact` block |
| Counter target | `5*p` in the counter code in `script.js` and the `5+` text |
| Typing speed | Numbers in the typing IIFE (75, 35, 1800, 350) |
| Fonts | Google Fonts `<link>` in `<head>` and the `Sora` / `Inter` names in `style.css` |

**Script layout (`script.js`):** four self-contained functions.
1. Scroll reveals and the counter.
2. Typing title (and `beforeprint` handler).
3. Tracking widgets, cursor spotlight, terminal simulation.
4. Email assembly (builds the `mailto:` links from the `data-` attributes).

**Gotcha:** all three share one page scope. Give new variables unique names, because a name clash (`ty`) once overwrote the terminal's typing function and left it blank.

## 12. Content sources and decisions

- All experience, skills and education come from the resume PDF. No metrics or numbers were invented.
- Phone number is intentionally left off; only the email is shown. The email is assembled by JavaScript at load time from `data-u` / `data-d` attributes, so it does not appear as plain text in the page source. With JavaScript off, visitors see `name [at] domain [dot] com`. This deters simple scrapers, not determined ones.
- The Figma community template was not accessible, so it was not followed. Praveen Manchi's portfolio (praveenmanchi.art) was reviewed for ideas only; none of its content, copy or design was reproduced.
- Bullets added to Wipro and LTIMindtree were drawn from the resume, not new claims.
- Name is rendered in capitals (ROHITH KODAPAKA) in the heading, footer and page title.

## 13. Testing performed

Headless Chromium (Playwright):
- Widths 320, 390, 768, 1280px: no horizontal overflow, no JavaScript errors.
- Scroll tracker, nav highlight, counter and terminal streaming verified.
- Print layout rendered to A4 PDF (two pages) and inspected, then re-tested after the extra bullets and cyber widgets were added. That retest found the "Experience" heading stranded at the bottom of page 1; fixed so jobs can split across pages while headings stay with their content.
- Email links checked with JavaScript on (real `mailto:` links) and off (`[at]`/`[dot]` fallback).
- Bug found and fixed: variable name clash breaking the terminal.

## 14. Known limitations / not yet verified

- Sora and Inter were not seen loading (sandbox blocked Google Fonts); fallback fonts were tested.
- LinkedIn/WhatsApp link previews are untested.
- The page has no analytics.
- Not tested in Safari or Firefox; uses standard features (IntersectionObserver, CSS variables, `background-clip:text`, `env()` insets).

## 15. Change log

1. Built base portfolio: hero, stats, skills, experience, education, contact, dark mode.
2. Added entrance, scroll, counter and hover animations.
3. Added typing title and animated background.
4. Added responsive breakpoints and narrow-screen fixes.
5. Tested at four widths.
6. Changed heading font to Sora.
7. Name set to all capitals.
8. Added print stylesheet.
9. Added two bullets each to Wipro and LTIMindtree.
10. Added terminal, radar, scan bar, HUD, nav highlight, cursor spotlight.
11. Split into `index.html`, `style.css`, `script.js`.
12. Added description, Open Graph and Twitter tags plus `og-image.png`.
13. Wrote this documentation.
14. Obfuscated the email address; re-tested print and fixed an orphaned heading.
