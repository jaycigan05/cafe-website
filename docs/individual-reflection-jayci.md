# Individual Reflection — Gan Jayci

**Module:** Web Fundamentals
**Project:** Pawfee Café Website

---

It was my responsibility to make the register/login page for this project. I started constructing
my own portfolio and about the time that everyone else had stabilized on their themes, I picked
up the job of day/night theme editor with my own themes. Initially the project had a modest
size but eventually it expanded to rewriting four peoples' code into one, consistent site and
performing a full accessibility audit of each webpage.

I created a three-step flow that visualizes progress on the Register/Login page, appearing as
a progress bar that keeps track of the user's progress through a three-step sequence (signup/login
→ fill details → success screen). Required fields are also validated in the field and I added some
restrictions: Phone number validation, Password strength validation and Age-18 restriction. For
the purpose of this project there will be no back end, so I used the local storage to maintain the
simulated accounts.

The best thing I got was the day/night thing. A single <html> data-theme attribute, which relies
on CSS custom properties, could re-render pretty much the entire page without needing to
re-render each element individually. The user's choice is also stored in local storage, so it stays
applied across visits. I started off thinking that nothing of such magnitude would change but it
was a lifeline and formed the core of everything I did with color throughout the site plus a lot
of what I did later.

Found some contrast bugs on all pages. Some changed background colour without changing text
colour (or vice versa) and corrected about a dozen of these. It expanded into a complete audit
for WCAG 2.1 AA, missing alt attributes, responsive problems and colour-contrast sitewide fixes
were just a few of the issues that were identified. I also fixed a bug where the keyboard focus
indicator was being removed silently, because eleven of our thirteen pages depended on a CSS
variable that was never defined. I even found and fixed some HTML validity issues; I found one
<div> tag that wasn't closed by anyone, because browsers don't throw errors unless it's not valid.

This, of course, made me go out of my comfort zone, which was 'make it look right'. To take a
different approach to a design system than just a list of colours: consider it as a set of variables
and dependencies; consider keyboard and screen-reader users as a first consideration, not an
afterthought. The other big lesson was Git: making sensible commits and not pushing over
another player's head without knowing what has been done since, making the commit history
what it is, a record of what happened and who did it, not just make the files match. That's a
technique that will be used on all future projects.

The "soft" side was uncomfortable but still quite the important side. The reason why I had to
change code that didn't belong to me was because of this. It had been independently developed
by 4 different people.

That being said, what was not the greatest success was a lack of structure from the outset, and
therefore merge conflicts and four different coding styles were found. My top tips would be to
agree on common CSS variables, defaults, naming, and a shared accessibility checklist, and to
conduct regular audits, instead of waiting to do one big audit at the end.
