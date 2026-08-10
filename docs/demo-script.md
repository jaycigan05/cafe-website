# Pawfee Café — 12-Minute Demo Script

**Format key for every section below:**
- 🎬 **Do this** — what to click/show on screen before or while you talk
- 🎙️ **Say this** — the narration to read out loud (adjust to your own voice, don't read it robotically)
- ⏱️ Running time shown is a target, not a hard cutoff — a few seconds either way per section is fine as long as you land near 12:00 total

**Before you hit record:**
- Have the site open in a real browser tab at the **public GitHub Pages / hosting link** (not `file://` and not `localhost`) — the rubric checks the link is "functional and public."
- Open a second tab already logged out (clear `localStorage`, or use a private/incognito window) so the Register demo starts clean.
- Have DevTools ready to open (F12 / Cmd+Opt+I) but closed at the start.
- Do one full run-through without recording first — 12 minutes is tight, and you don't want to be discovering a slow page load or a forgotten click mid-take.

---

## 0:00–0:40 — Intro (40s)

🎬 **Do this:** Start on the Home page, fully loaded, at a normal desktop
window size. Face camera/mic if you're using a webcam overlay, otherwise
just start narrating over the screen.

🎙️ **Say this:**
> "Hi, I'm Jayci, and this is Pawfee Café — a dog-friendly café website my
> team and I built for our Web Fundamentals project. It's five pages plus
> four individual portfolios, built entirely with vanilla HTML, CSS and
> JavaScript — no frameworks. Over the next 12 minutes I'll walk through
> the four main JavaScript features, all four portfolio pages, and show
> the site responding across desktop, tablet and mobile."

---

## 0:40–1:30 — Home page tour (50s)

🎬 **Do this:** Scroll slowly down the Home page. Point out, in order: the
hero video, the "Our Story" photo slider (let it auto-advance once, then
click the next-arrow to show manual control), the menu highlights, the
review teaser, the resident-dogs teaser. Click the **day/night theme
toggle** once here so the rest of the demo can casually reference it later.

🎙️ **Say this:**
> "The homepage sets up what the café is about — dogs are treated as
> customers here, not an afterthought. This 'Our Story' photo slider
> auto-advances, but it's also fully controllable — next arrow, dots, and
> it even pauses if you tab into it with a keyboard instead of a mouse.
> And here's our day/night theme toggle — it's saved across page loads,
> and every colour on the site is built to react to it correctly, which
> turned out to be a much bigger job than it sounds."

---

## 1:30–3:00 — 🟢 JS Feature 1: Menu page (1:30)

🎬 **Do this:** Navigate to Menu. Demo, in this order:
1. Click 2–3 category chips (Mains, Pasta & Pizza, etc.) to show filtering.
2. Type a dish or ingredient name into the search box.
3. Open the sort dropdown **with the mouse**, then close it, then **Tab**
   to it and open/navigate it with the **arrow keys and Enter** to show
   it's keyboard accessible.
4. Toggle **Human ⇄ Dog** to swap the whole grid to the paw menu.
5. Point at a "Top Seller" badge.

🎙️ **Say this:**
> "The Menu page is our first big JavaScript feature — everything here is
> rendered from a data array, not hardcoded HTML. Category filters and
> live search both update the grid instantly. The sort dropdown is a
> custom control, not a native select, so it needed its own keyboard
> support — arrow keys to move, Enter to pick, Escape to close — which I
> just demoed working without touching the mouse. And this Human/Dog
> toggle swaps the entire menu, including a separately-computed Top Seller
> ranking, over to the dog-safe paw menu."

---

## 3:00–4:20 — 🟢 JS Feature 2: Reviews page (1:20)

🎬 **Do this:** Navigate to Reviews. Scroll to the submission form. Type a
name, pick a star rating, type review text (show the character counter
ticking up), submit. Point out the new card appearing at the top and the
success popup. Close the popup. Scroll up to the star-rating filter
dropdown and pick a rating to filter the wall down. **Refresh the page**
and scroll back down to show the submitted review is still there.

🎙️ **Say this:**
> "On Reviews, visitors can filter the review wall by star rating, and
> submit their own review through this form — character count is live,
> capped at 500. Submitting adds the card instantly and pops up a
> confirmation dialog... and because it's saved to the browser's local
> storage, if I refresh the page — the review is still here. No backend,
> but it persists like one would."

---

## 4:20–5:40 — 🟢 JS Feature 3: Team page (1:20)

🎬 **Do this:** Navigate to Team. Click a staff card with the mouse to
open the detail modal, scroll it to show the task/feature list, close it
(button or Escape). Then **Tab** to a different staff card and press
**Enter** to open it via keyboard, to demonstrate accessibility. Scroll
down to the resident dogs grid and point out it's a full grid of cards.

🎙️ **Say this:**
> "The Team page's cards are clickable — or keyboard-operable, like this —
> Tab to a card, Enter opens it, Escape closes it and returns focus to
> where you were. Each one opens a modal with that person's role, their
> specific tasks and features for the project, and a link to their
> portfolio. Below that, all thirty resident dogs are generated dynamically
> from a single data array in JavaScript, not typed out by hand."

---

## 5:40–7:10 — 🟢 JS Feature 4: Register / Login (1:30)

🎬 **Do this:** Navigate to Register. Click "Create Account," try
submitting the form **empty first** to show inline validation errors
appearing. Fill in valid details (including a deliberately weak password
first to show the strength requirement, then fix it) and submit — show
the success screen. Go back, click "Login," log in with the account you
just created, show the login success screen. Optionally show one wrong-
password attempt to show the login error message.

🎙️ **Say this:**
> "Register/Login is the feature I personally built. It's a three-step
> flow with a visual progress indicator. Validation runs per field — empty
> fields, name format, Malaysian phone number format, password strength,
> age 18-plus — each with its own inline error message. There's no real
> backend, so accounts are simulated through local storage, but the whole
> loop works: I can register... and log straight back in with those same
> credentials. And if I get the password wrong — it tells me clearly,
> instead of failing silently."

---

## 7:10–9:10 — Portfolio pages, all four (2:00)

🎬 **Do this:** Go to Team page, click into each of the four staff
portfolio links in turn (or navigate directly). Spend roughly 30 seconds
each — scroll through About/Education/Skills/Projects, and for pages that
have one, briefly point at the print stylesheet (`Ctrl/Cmd+P` to open the
print preview for **one** of them, then close it — don't actually print).

🎙️ **Say this (adjust names to whoever's is on screen):**
> "Each of us also has an individual portfolio. This is mine — education,
> skills, project highlights, and a Recent Activity section with extended
> write-ups for things like SEED and ETHGlobal. And every portfolio also
> has its own print stylesheet — if I open print preview here, the
> navbar and footer disappear and it reflows into a clean, printable
> layout." *(demonstrate on one page)*
>
> "Here's Jian Jia's — Home and Team page owner, with his own education
> timeline and project cards. Mae Ann's, who built the Reviews page.
> And Xiao Yan's, who built the whole Menu system."

---

## 9:10–10:00 — Day/night theme, revisited (50s)

🎬 **Do this:** Pick 2 pages you haven't shown in dark mode yet (e.g. Menu
and one portfolio). Toggle dark mode on each, scroll briefly to show text
still reads clearly against the new backgrounds.

🎙️ **Say this:**
> "Quickly revisiting the theme toggle — it's not just a colour filter,
> every page was individually checked so text stays readable against its
> background in both themes, including inside components like the menu
> cards and the portfolio pages."

---

## 10:00–11:20 — Responsive layout across 3 viewports (1:20)

🎬 **Do this:** Open DevTools (F12), open the device toolbar / responsive
mode (Ctrl+Shift+M in Chrome). Set the viewport to:
1. **Desktop (~1440px)** — briefly show the current layout as a baseline.
2. **Tablet (~768px, e.g. iPad)** — show the Menu or Team page's grid
   reflowing to fewer columns.
3. **Mobile (~375px, e.g. iPhone SE/12)** — show the hamburger menu
   appearing, click it open/closed, and scroll a page (Register works
   well here) to show the single-column stacked layout.

🎙️ **Say this:**
> "Finally, responsiveness. I've got Chrome DevTools' device toolbar open
> here. At desktop width, the menu and team grids run multiple columns.
> Dropping to tablet width, ... they reflow to fewer columns. And at
> mobile width, the navbar collapses into this hamburger menu — opens,
> closes — and every page, including forms like Register, stacks into a
> single column with no horizontal scrolling anywhere."

---

## 11:20–12:00 — Closing (40s)

🎬 **Do this:** Return to the Home page at normal desktop size. Optionally
show the URL bar / repository link on screen.

🎙️ **Say this:**
> "That's Pawfee Café — four JavaScript-driven pages, four portfolios, a
> site-wide day/night theme, and a fully responsive, accessible layout,
> all in plain HTML, CSS and JavaScript. The live site and source code are
> both linked in the description. Thanks for watching."

---

## Timing summary

| Section | Duration | Cumulative |
|---|---|---|
| Intro | 0:40 | 0:40 |
| Home page tour | 0:50 | 1:30 |
| Menu (JS feature 1) | 1:30 | 3:00 |
| Reviews (JS feature 2) | 1:20 | 4:20 |
| Team (JS feature 3) | 1:20 | 5:40 |
| Register/Login (JS feature 4) | 1:30 | 7:10 |
| Portfolio pages ×4 | 2:00 | 9:10 |
| Day/night theme | 0:50 | 10:00 |
| Responsive/DevTools ×3 viewports | 1:20 | 11:20 |
| Closing | 0:40 | 12:00 |

## Recording checklist

- [ ] Public link is live and works in a fresh/incognito tab (no login state carried over)
- [ ] All 4 JS features demoed: Menu, Reviews, Team, Register/Login
- [ ] All 4 portfolios shown on screen
- [ ] All 3 viewports shown via DevTools device toolbar (or real devices)
- [ ] Narration audible throughout — no silent stretches
- [ ] Final render is at or under 12:00
- [ ] Video link set to public/unlisted (not private) before submitting
