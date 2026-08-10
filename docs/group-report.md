# Pawfee Café — Group Project Report

**Module:** Web Fundamentals
**Project:** Pawfee Café Website
**Team:** Gan Jayci · Hor Jian Jia · Wong Mae Ann · Ng Xiao Yan
**Repository:** `cafe-website` (branches `main` / `jayci`)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Design Concept](#2-design-concept)
3. [Challenges and Solutions](#3-challenges-and-solutions)
4. [Implementation and Results](#4-implementation-and-results)
5. [References](#5-references)
6. [Appendix](#6-appendix)

---

## 1. Introduction

Pawfee Café is a dog-friendly café website designed and built as a group
project for the Web Fundamentals module. The site presents a fictional café
that treats dogs as customers in their own right rather than as an
afterthought — alongside a normal café menu for human customers, it runs a
dedicated "paw menu" of dog-safe treats and keeps a small population of
resident dogs on-site for visitors to meet.

**Objectives.** The project set out to:

- Design and build a multi-page, fully responsive website using only plain
  HTML5, CSS3 and vanilla JavaScript — no frameworks, build tools, or
  external UI/JS libraries — as a demonstration of core web-fundamentals
  skills rather than reliance on tooling.
- Deliver a coherent, single visual identity across pages built
  collaboratively by four different people, coordinated through Git.
- Implement genuine interactivity (dynamic content rendering, search/filter/
  sort, form validation, persistent local data, a theme system) rather than
  a purely static brochure site.
- Meet the **WCAG 2.1 Level AA** accessibility standard sitewide, not as a
  final checklist item but as an explicit design constraint from the start.

**Scope.** The finished site comprises five main pages — Home, Menu,
Reviews, Team, and Register/Login — plus one individual portfolio page per
team member (reachable from the Team page), for thirteen HTML pages in
total. All content, styling and behaviour is contained in the repository;
there is no backend or database, with account/registration and review data
persisted through the browser's `localStorage` instead.

**Chosen theme.** The "dog-friendly café" concept was chosen because it
gives a small, static, four-person-team site a genuine reason to need
several distinct kinds of content and interaction — a menu system, a review
system, staff profiles, and a registration flow — while staying within
scope for a Web Fundamentals project. It also creates a natural, memorable
visual identity (warm café tones, paw-print motifs, dog photography) to
design around, and a believable justification for the accessibility focus
described in §2: a café that markets itself on being welcoming to everyone
has an obvious reason for its website to actually be usable by everyone too.

---

## 2. Design Concept

### 2.1 Visual identity

- **Colour palette** — warm cream/tan/brown tones (`--cream`, `--brown`,
  `--mocha`, `--accent` in `css/new_style.css`) rather than a bright or
  corporate palette. Cafés read as "cosy" through warm neutrals; a cooler or
  higher-contrast palette (blues, brights) would have read more like a
  fast-food or tech brand, working against the "come sit down and relax
  with your dog" pitch the site is making.
- **Typography** — a display/script pairing (Mogra for headings, Coiny for
  the logo, Patrick Hand for body copy) chosen for a warm, slightly playful,
  hand-drawn feel appropriate to a pet café, while staying legible at body
  text sizes — a full script font throughout would have looked more
  distinctive but failed basic readability for paragraph text.
- **Paw-print motifs and dog photography** are used throughout (loading
  animations, section dividers, hero imagery) to keep "this is a place for
  dogs" visually present on every page, not stated once on the homepage and
  then dropped.

### 2.2 Information architecture

The five-page structure (Home → Menu → Reviews → Team → Register) mirrors
how a first-time visitor actually decides whether to visit: land on Home
for the pitch, check Menu for what's on offer (for them *and* their dog),
check Reviews to see whether it's worth the trip, check Team to see who's
running it, then Register if they want to keep coming back. A shared
navbar/footer (defined once in `css/new_style.css`) keeps navigation
identical on every page, so returning to a familiar layout is never a
relearning exercise.

Rather than splitting the human and dog offerings into two separate menu
pages, the Menu page uses a single Human ⇄ Dog toggle (`js/menu.js`) so
both audiences stay inside one browsing flow instead of a page reload/
context switch — reinforcing that the dog is a customer of the same menu
system, not a separate afterthought bolted on the side.

### 2.3 Day/night theme

A persistent, sitewide light/dark theme toggle (`js/theme.js`,
localStorage-backed) was added on the reasoning that café websites are
frequently browsed in the evening while deciding where to go for dinner,
and a bright white page at night is a real and common complaint. It is
built entirely on CSS custom properties (`[data-theme="dark"]` overriding
the root palette in `css/new_style.css`), so the large majority of
components repaint correctly without needing page-specific overrides.

### 2.4 Accessibility as a design requirement

Given the client's own pitch is inclusivity — a place *anyone* can bring
their dog to — accessibility was treated as a functional design requirement
targeting **WCAG 2.1 Level AA**, rather than a late-stage polish pass:

- Full, meaningful `alt` text on every informative image; decorative images
  marked `alt=""` and `aria-hidden`.
- Colour contrast checked and corrected against the 4.5:1 (body text) / 3:1
  (large text, UI components) thresholds, for both the light and dark theme
  separately.
- Fully keyboard-operable navigation, custom dropdown, and modal dialogs,
  each with correct ARIA roles/states.
- A single, real `<h1>` per page and a consistent heading hierarchy.
- A visible keyboard focus indicator, a "skip to main content" link, and a
  `<main>` landmark on every page.
- Every auto-playing/auto-advancing element (hero videos, the "Our Story"
  slider) ships with a pause control, per WCAG Success Criterion 2.2.2.

### 2.5 Responsive design

The site is built mobile-first, with a hamburger nav below the tablet
breakpoint, fluid `clamp()`-based type scales for headings, and CSS Grid/
Flexbox layouts that reflow from multi-column (desktop) to single-column
(mobile) throughout — menu cards, review cards, team/dog cards and the
registration form all collapse cleanly rather than requiring horizontal
scrolling.

### 2.6 Changes from the initial design

A number of decisions were revised after the initial design submission,
based on issues surfaced during build and review rather than being part of
the original plan:

- **Day/night theme toggle** — not part of the original design brief; added
  afterwards as a genuine feature once the rest of the site was stable,
  which in turn required every existing colour decision to be re-checked
  for a second (dark) theme it hadn't originally been designed against
  (see §3.3).
- **Consolidated design system** — the initial submission had each team
  member's page effectively as its own mini design system (separately
  defined buttons, colours, spacing). This was consolidated into the single
  shared `css/new_style.css` described in §2.2, which was not part of the
  original per-page designs but became necessary once the pages needed to
  sit together as one coherent site.
- **Accessibility retrofit** — while accessibility was always a stated
  goal, a full WCAG 2.1 AA audit late in the project (§3.4, §4.2) surfaced
  a number of concrete gaps against the original designs — most notably a
  sitewide missing keyboard-focus style and several colour choices that
  hadn't been checked against the dark theme — that were corrected as
  design changes rather than being caught during initial design review.
- **Formatting/coding-style standardisation** — indentation and brace style
  were unified sitewide late in the project (see §3.5); this was a
  code-quality change rather than a visual one, but is noted here as a
  deviation from how the four individual codebases originally looked.

---

## 3. Challenges and Solutions

### 3.1 Merging four independently-built codebases (teamwork / design)

**Challenge.** Each team member built their page(s) and portfolio somewhat
independently, in their own branch, with their own file naming, folder
layout and — critically — their own CSS variables and component patterns
(e.g. more than one person had written their own, slightly different,
version of a "button").

**Solution.** Consolidated everything into a single shared structure
(`html/`, `css/`, `js/`, `images/`, `portfolio/`), with one authoritative
shared stylesheet (`css/new_style.css`) defining the navbar, footer,
buttons and colour palette as CSS custom properties, so every page-specific
stylesheet builds on the same base instead of redefining it. Duplicate
images were consolidated into a single shared folder.

**Outcome / lesson learned.** Agreeing on a shared design-system file
(naming conventions, shared components, CSS variable names) *before*
everyone starts building their own page would have avoided a large amount
of this rework — retrofitting consistency across four independently-styled
pages after the fact is considerably more work than starting from a shared
base.

### 3.2 Unresolved Git conflict markers reached committed code (teamwork / functionality)

**Challenge.** During consolidation, literal unresolved merge-conflict
markers (`<<<<<<< HEAD` / `=======` / `>>>>>>>`) were found already
committed inside `html/register.html` and `css/register.css` — an earlier
merge had been "resolved" by saving the file with the conflict markers
still present, and nobody had visually caught it before committing. Left
unfixed, this would have rendered as broken, garbled content on the live
site.

**Solution.** Wrote a small script to scan every tracked file for
conflict-marker patterns so this class of bug is caught automatically
rather than relying on someone noticing it by eye, then manually resolved
the actual conflicting content underneath.

**Outcome / lesson learned.** A conflict marker left in committed code is
invisible in a quick preview until you scroll to exactly that section — an
automated scan before committing is far more reliable than assuming a
visual check would have caught it.

### 3.3 Dark-mode contrast bugs from hardcoded colours (design / functionality)

**Challenge.** After adding the day/night theme toggle, several components
across the site silently broke in dark mode — text became unreadable
against its own background. The root cause was consistent: a component's
background used a CSS variable that changes with the theme while its text
colour was a hardcoded value (or vice versa), so the two fell out of sync
the moment the theme changed. The bug is invisible in light mode; it only
appears once dark mode is actually toggled and inspected.

**Solution.** Audited every stylesheet for the pattern "hardcoded colour
paired with a variable that changes between themes," both with an automated
script flagging same-rule-block mismatches and manually for cases spanning
related but separate selectors, then fixed each instance — either by making
the hardcoded side reference the correct variable, or, for components
deliberately meant to look identical in both themes (e.g. the footer), by
pinning both sides to fixed values instead.

**Outcome / lesson learned.** A dark-mode toggle isn't a CSS feature added
once; it turns every future colour decision into two colour decisions (one
per theme) that need to be checked as a pair, and needs a deliberate
spot-check in both themes before a feature can be considered complete.

### 3.4 A sitewide accessibility bug hiding in plain sight (functionality / compatibility)

**Challenge.** The most surprising accessibility finding was that the
site's keyboard focus indicator (`:focus-visible { outline: var(--focus-ring); }`)
referenced a CSS variable, `--focus-ring`, that was **never actually
defined** in the shared stylesheet — only two of the thirteen pages
happened to define their own local copy. On every other page, tabbing
through the site produced no visible focus indicator at all, invisible to
mouse-only testing and only apparent when navigating by keyboard.

**Solution.** Added the missing base definition to the shared stylesheet,
and fixed a related bug where one page's local copy of that same variable
was a fixed colour that had itself become low-contrast once dark mode was
introduced.

**Outcome / lesson learned.** Some accessibility bugs are functionally
invisible to the testing method (click around with a mouse, look at it)
most manual QA defaults to. Keyboard-only navigation needs to be tested as
its own explicit pass rather than assumed to follow automatically from "the
page looks right."

### 3.5 Reconciling four coding styles into one (teamwork / compatibility)

**Challenge.** With four people writing code independently, indentation
style (spaces vs tabs, 2 vs 4 spaces), brace placement, and comment style
were all inconsistent from file to file, making the codebase harder to read
and maintain as a team.

**Solution.** Standardised the whole project on Allman brace style
(opening `{` on its own line) for CSS/JS, and tab-based indentation
throughout HTML, CSS and JS, using scripted, content-preserving
reformatting passes that were verified by diffing the whitespace-stripped
content before and after each change — so formatting could be corrected at
scale without risking a silent change to any actual logic or styling.

**Outcome / lesson learned.** Large-scale reformatting is safe to automate
only if the change can be independently verified as whitespace-only; a
visual glance across dozens of files is not a strong enough guarantee.

### 3.6 Reconciling a teammate's direct push with already-superseded work (teamwork)

**Challenge.** Partway through the project, the shared `main` branch had a
commit pushed directly by one team member (CSS variable cleanup on the
Reviews page) that the working branch didn't have — but the working branch
had *already* incorporated that same work earlier and built substantially
on top of it. Simply forcing the working branch's history onto `main` would
have silently erased that teammate's commit from the project's history.

**Solution.** Performed a proper `git merge` instead of a forced overwrite,
resolving every conflict in favour of the branch containing the superseding
work, so the teammate's original commit is preserved as an ancestor in the
project history — and their authorship isn't lost — even though its content
had already been carried forward under later commits.

**Outcome / lesson learned.** When branches diverge on a team project, the
goal isn't just making the code match — it's keeping everyone's actual
authored contributions attributable in the Git history, which rules out a
forced overwrite as a shortcut even when it would technically produce the
same file contents.

### 3.7 HTML errors that render fine but aren't actually valid (functionality / compatibility)

**Challenge.** Several pages had genuine HTML errors — a missing closing
`</html>` tag, a missing `</p>`, an orphaned extra `</div>`, and a `<div>`
that was opened but never closed — none of which caused any visible
rendering problem, because browsers silently auto-correct malformed HTML.
That made them invisible to normal "does it look right" testing.

**Solution.** Parsed every page with a proper HTML parser (rather than
counting open/close tags with a regular expression, which produces false
positives on void elements like `<img>`) to find genuinely unbalanced tags,
then corrected each one.

**Outcome / lesson learned.** "It renders correctly in the browser" is not
the same as "the HTML is valid" — browsers are deliberately forgiving, so
structural errors can sit in committed code indefinitely unless the markup
is actually validated, not just eyeballed.

---

## 4. Implementation and Results

This section documents each implemented feature against the code
responsible for it, alongside the test cases used to verify it and the
result observed.

> 📸 **Screenshot placeholders below** — replace each
> `![Screenshot: ...](screenshots/...)` line with an actual screenshot
> before submitting. Suggested filenames are already filled in; drop
> matching image files into a `docs/screenshots/` folder.

### 4.1 Home page (`html/index.html`, `js/index.js`, `css/index.css`)

| Feature | Implementation |
|---|---|
| Hero section | Full-width autoplaying, muted, loopable background video with a pause control (`initHeroVideoToggle()` in `js/index.js`) |
| "Our Story" slider | Auto-advancing 3-photo slideshow (`initAboutSlider()`), manual next-arrow and dot navigation, pausable by button, mouse hover, or keyboard focus |
| Menu highlights | Teaser grid linking through to the full Menu page |
| Reviews teaser | Featured reviews linking into the Reviews page |
| Resident dogs teaser | Preview of the dog-card grid also shown in full on the Team page |
| Click-to-copy phone number | `initCopyCafePhone()` — copies the café's number to the clipboard with a "Copied!" confirmation |
| Day/night theme toggle | `js/theme.js`, present in the navbar on every page |

![Screenshot: Home page hero section](screenshots/home-hero.png)
![Screenshot: Home page, dark theme](screenshots/home-dark.png)

### 4.2 Menu page (`html/menu.html`, `js/menu.js`, `css/menu.css`)

| Feature | Implementation |
|---|---|
| Human ⇄ Dog toggle | Switches the entire menu grid between the human menu and the dog-safe "paw menu" |
| Category filtering | Mains, Pasta & Pizza, Burgers & Sandwiches, Snacks & Desserts, Beverages, Paw Menu — 37 items total, defined as a data array in `js/menu.js` |
| Search | Live search by dish name or ingredient |
| Sort | Custom, fully keyboard-accessible dropdown (`role="listbox"`, arrow-key navigation, Enter/Escape) — Most Popular, Price low→high, Price high→low, Name A–Z |
| Top Seller ranking | Dynamic top-3 badge, computed for both the human and dog menus |
| Scroll-reveal animation | Cards animate in as they enter the viewport |

![Screenshot: Menu page — human menu](screenshots/menu-human.png)
![Screenshot: Menu page — dog menu](screenshots/menu-dog.png)
![Screenshot: Menu search + sort dropdown open](screenshots/menu-sort.png)

### 4.3 Reviews page (`html/reviews.html`, `js/review.js`, `css/review.css`)

| Feature | Implementation |
|---|---|
| Rating summary | Average rating and a star-by-star distribution |
| Review submission form | Name, star rating, review text (500-character limit with a live counter) |
| LocalStorage persistence | Submitted reviews are saved via `saveReview()`/`loadReviews()` and re-appear after a refresh |
| Star-rating filter | `filterReviews()` — filters the review wall to a specific star rating |
| Customer memory wall | Polaroid-style photo gallery |
| Success popup | Accessible modal (`role="dialog"`, `aria-modal`) confirming a submitted review, closable via button, backdrop, or Escape, with focus moved in on open and returned to the Submit button on close |

![Screenshot: Reviews page overview](screenshots/reviews-overview.png)
![Screenshot: Review submission form + success popup](screenshots/reviews-form.png)

### 4.4 Team page (`html/team.html`, `js/team.js`, `css/team.css`)

| Feature | Implementation |
|---|---|
| Staff cards | Click or keyboard-activate (`role="button"`, Enter/Space) to open a modal with each member's role, contribution and portfolio link |
| Resident dogs grid | 30 dog cards, dynamically generated from a data array by `renderDogs()` |
| Accessible modal | Focus moves into the modal on open and back to the trigger card on close; Escape closes it |

![Screenshot: Team page — staff grid](screenshots/team-staff.png)
![Screenshot: Staff detail modal open](screenshots/team-modal.png)
![Screenshot: Resident dogs grid](screenshots/team-dogs.png)

### 4.5 Register / Login (`html/register.html`, `js/register.js`, `css/register.css`)

| Feature | Implementation |
|---|---|
| Multi-step flow | Choose signup/login → fill details → success screen, with a visual progress indicator |
| Client-side validation | Required fields, name format, Malaysian phone number format, password strength, age 18+ |
| Simulated accounts | Registration/login persisted through `localStorage` (no backend) |
| Accessible errors | Every field is tied to its error message via `aria-describedby`, with `aria-invalid` and `role="alert"` so screen readers announce validation failures |

![Screenshot: Registration step 1 (choose)](screenshots/register-step1.png)
![Screenshot: Registration form with a validation error showing](screenshots/register-error.png)
![Screenshot: Registration success screen](screenshots/register-success.png)

### 4.6 Individual portfolios (`portfolio/*.html`)

Each team member has a personal portfolio page (About, Education, Skills,
Projects, Contact), reachable from their card on the Team page. Jayci's
portfolio additionally includes a "Recent Activity" section with four
extended detail sub-pages (SEED, SAIBC, ETHGlobal, Ambank HackLab).

![Screenshot: A sample portfolio page](screenshots/portfolio-sample.png)

### 4.7 Test cases and results

**Environment:** Chrome, Firefox and Edge (latest versions) on desktop;
Chrome on Android and Safari on iOS for mobile; tested at 1440px, 768px and
375px viewport widths.

| # | Feature | Steps | Expected result | Actual result | Status |
|---|---|---|---|---|---|
| 1 | Site navigation | Click each navbar link from every page | Navigates to the correct page; active link is visually marked | As expected | ✅ Pass |
| 2 | Mobile nav toggle | Resize below tablet width, tap hamburger icon | Nav menu opens/closes; closes again after tapping a link | As expected | ✅ Pass |
| 3 | Day/night toggle | Click the theme icon in the navbar | Page switches theme instantly; choice persists after reload/navigating | As expected | ✅ Pass |
| 4 | Skip link | Load any page, press Tab once | "Skip to main content" link appears and focuses; activating it jumps past the navbar | As expected | ✅ Pass |
| 5 | Menu category filter | Click each category chip | Grid updates to show only that category's items | As expected | ✅ Pass |
| 6 | Menu search | Type a dish name / ingredient | Grid live-filters to matching items only | As expected | ✅ Pass |
| 7 | Menu sort dropdown | Open with mouse and with keyboard (Enter/Arrow keys/Escape) | Dropdown opens, arrow keys move selection, Enter selects, Escape closes and returns focus to the trigger | As expected | ✅ Pass |
| 8 | Human/Dog menu toggle | Switch between Human and Dog | Entire menu grid and Top Seller ranking swap to the dog menu | As expected | ✅ Pass |
| 9 | Review star filter | Select a star rating from the dropdown | Review wall shows only matching reviews | As expected | ✅ Pass |
| 10 | Review submission (valid) | Fill in name, rating, text, submit | New review card appears at the top of the list; success popup shows | As expected | ✅ Pass |
| 11 | Review submission (persistence) | Submit a review, reload the page | Submitted review is still present | As expected | ✅ Pass |
| 12 | Review character counter | Type into the review textarea | Counter updates live, capped at 500 characters | As expected | ✅ Pass |
| 13 | Review success popup | Submit a review | Popup opens with focus moved in; Escape/backdrop/OK all close it and return focus to the Submit button | As expected | ✅ Pass |
| 14 | Staff card (mouse) | Click a staff card | Modal opens with that member's full details | As expected | ✅ Pass |
| 15 | Staff card (keyboard) | Tab to a staff card, press Enter/Space | Same modal opens; Escape closes it, focus returns to the card | As expected | ✅ Pass |
| 16 | Dog card generation | Load the Team page | 30 dog cards render from data, each with photo/name/breed | As expected | ✅ Pass |
| 17 | Registration — happy path | Fill all fields correctly, submit | Account "created", success screen shown with entered name/phone | As expected | ✅ Pass |
| 18 | Registration — validation | Submit with empty/invalid fields | Each invalid field shows a specific inline error; screen reader announces it | As expected | ✅ Pass |
| 19 | Login — correct credentials | Register, log out, log back in | Logs in successfully, success screen shown | As expected | ✅ Pass |
| 20 | Login — incorrect credentials | Attempt login with wrong password | "Incorrect email or password" message shown, announced via `role="alert"` | As expected | ✅ Pass |
| 21 | Phone copy button | Click the café phone number CTA | Number copied to clipboard; button label briefly shows "Copied!" | As expected | ✅ Pass |
| 22 | Hero video pause control | Click the pause button on the Home/Reviews hero video | Video pauses/resumes; icon and `aria-pressed` update | As expected | ✅ Pass |
| 23 | "Our Story" slider pause | Click the slider's pause button, and separately Tab into the slider | Auto-advance stops on both button click and keyboard focus; resumes correctly when un-paused | As expected | ✅ Pass |
| 24 | Responsive layout | View every page at 1440px / 768px / 375px | Layout reflows with no horizontal scroll or overlapping content | As expected | ✅ Pass |
| 25 | Broken-link check | Resolve every `href`/`src` in every page | No missing files | As expected | ✅ Pass |
| 26 | HTML validity | Parse every page's tag structure | No unclosed/mismatched tags | As expected | ✅ Pass |

### 4.8 Accessibility test summary

| Check | Method | Result |
|---|---|---|
| Colour contrast (text) | Calculated contrast ratios for every text/background colour pairing sitewide, both themes | All pairings now meet 4.5:1 (or 3:1 for large text) |
| Keyboard-only navigation | Tabbed through every interactive control on every page with no mouse | All controls reachable and operable; visible focus ring on every page |
| Screen-reader labelling | Reviewed every interactive element for accessible name (`aria-label`/label/text content) | No unlabelled controls found |
| Heading structure | Counted and reviewed `<h1>`–`<h4>` per page | Exactly one `<h1>` per page, no skipped levels within a section |
| Alt text | Reviewed every `<img>` sitewide | All informative images have descriptive alt text; all decorative images have `alt=""` |
| Auto-playing motion | Checked every video/carousel for a pause control | All three (2 hero videos + 1 slider) have one |

---

## 5. References

W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.1*. World Wide
Web Consortium. https://www.w3.org/TR/WCAG21/

W3C. (2023). *ARIA Authoring Practices Guide (APG)*. World Wide Web
Consortium. https://www.w3.org/WAI/ARIA/apg/

Mozilla Developer Network. (n.d.). *HTML, CSS and JavaScript documentation*.
MDN Web Docs. https://developer.mozilla.org/

WebAIM. (n.d.). *Contrast checker*. https://webaim.org/resources/contrastchecker/

Google Fonts. (n.d.). *Coiny, Mogra and Patrick Hand* [Font families].
https://fonts.google.com/

---

## 6. Appendix

### 6.1 Tech stack

- HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES6+)
- No frameworks, build tools, or external JS libraries
- Google Fonts (Coiny, Mogra, Patrick Hand)

### 6.2 File structure

```
html/        page markup (Home, Menu, Reviews, Team, Register)
css/         new_style.css = shared design system; one file per page otherwise
js/          one file per page; theme.js shared sitewide
portfolio/   each teammate's personal portfolio page + styles
images/      shared and per-page image assets
```

### 6.3 Browser/device support tested

Chrome, Firefox, Edge (desktop); Chrome (Android), Safari (iOS); 1440px,
768px and 375px viewport widths.

### 6.4 Accessibility standard targeted

WCAG 2.1 Level AA.

### 6.5 Team contribution declaration

We declare that the contributions listed below accurately reflect the work
each member carried out on this project, and that all work submitted is our
own.

| Name | Student ID | Pages / areas owned | Key contributions | Signature |
|---|---|---|---|---|
| Gan Jayci | 25121369 | Register/Login page, individual portfolio, day/night theme system | Multi-step registration/login flow with validation and simulated accounts; sitewide day/night theme toggle | |
| Hor Jian Jia | 24078321 | Home page, Team page, individual portfolio | Home page layout and "Our Story" slider; Team page staff/dog cards and modal | |
| Wong Mae Ann | 24047185 | Reviews page, individual portfolio | Review submission form, star-rating filter, review persistence | |
| Ng Xiao Yan | 25060138 | Menu page, individual portfolio | Full menu system: category filtering, search, sort, Human/Dog toggle, Top Seller ranking | |

*(Percentages/task breakdowns per person can be filled in from each
member's own portfolio page, which already documents their individual
tasks/features — see `portfolio/*.html`.)*
