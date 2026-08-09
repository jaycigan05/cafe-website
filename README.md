# Pawfee Café ☕🐾

A dog-friendly café website built for our Web Fundamentals group assignment.
Plain HTML, CSS and JavaScript — no frameworks or libraries.

## Pages

| Page | File | Owner |
|---|---|---|
| Home | `html/index.html` | Hor Jian Jia |
| Menu | `html/menu.html` | Ng Xiao Yan |
| Reviews | `html/reviews.html` | Wong Mae Ann |
| Team | `html/team.html` | Hor Jian Jia |
| Register / Login | `html/register.html` | Gan Jayci |

Each team member also has their own portfolio page under `portfolio/`.

## Team

- **Gan Jayci** — Register page, individual portfolio, day/night theme
- **Hor Jian Jia** — Home page, Team page, individual portfolio
- **Wong Mae Ann** — Reviews page, individual portfolio
- **Ng Xiao Yan** — Menu page, individual portfolio

## Running it

No build step needed — just open `html/index.html` in a browser, or serve
the folder with any static server, e.g.:

```bash
python3 -m http.server
```

then visit `http://localhost:8000/html/index.html`.

## Structure

```
html/        page markup
css/         new_style.css = shared styles (navbar, footer, buttons, colours)
             everything else = one page's own styles
js/          one file per page, theme.js is shared
portfolio/   each teammate's personal portfolio page
images/      site + portfolio images
```

## Features

- Fully responsive layout
- Day/night theme toggle (saved across visits)
- Dynamic menu with search, filter and sort
- Review submission form with local storage persistence
- Accessible: keyboard navigation, ARIA labels, alt text throughout
