# EFT — Excellent Flight Technology website

Multi-page, bilingual (EN / 中文) marketing site for a drone manufacturer.
Open `EFT Website.html` to run the working prototype (hash routing, no build step).
Every component, page and data file maps one-to-one to the React + Vite + TS + Tailwind production layout below.

## File tree

```
eft/
├── EFT Website.html        entry (fonts, hero preload, script order)
├── README.md
├── img/                    images — swap files here (→ /public/images)
└── src/
    ├── config.js           brand, contact, theme tokens, NAV, store menu, FOOTER, STATS   (→ src/config/site.ts)
    ├── data.js             ASSETS map, hero slides, scenarios, PRODUCTS, NEWS, DOWNLOADS, TIMELINE (→ src/data/*.ts)
    ├── i18n.js             UI strings, en + zh                                             (→ src/locales/{en,zh}.json)
    ├── styles.css          design tokens + component styles                                (→ tailwind.config.ts + index.css)
    ├── components.jsx      Button, Pill, Img, Reveal, SectionHeading, Navbar, Footer, SearchOverlay,
    │                       ImageCard, ProductCard, StatBand, TabCarousel, Breadcrumbs, PageHero, CTABand, ContactForm
    ├── home.jsx            Hero + Home sections 1–5
    ├── pages.jsx           Category (Agri/Industry/Training), Product, Support, About, News, Article, Contact, 404
    └── app.jsx             ROUTES table, per-page SEO/OG meta, theme injection, language persistence
```

## Routes
`/` · `/agriculture` · `/industry` · `/training` · `/product/:id` · `/support` · `/about` · `/news` · `/news/:id` · `/contact` · anything else → 404.

## How to edit
| Task | Where |
|---|---|
| **Nav items** | `config.js → nav[]`. Add, remove, rename or reorder `{ label:{en,zh}, path, children? }`. `children` gives you a dropdown. |
| **Add a page** | Write the component in `pages.jsx`, add one `{ match, render, seo }` line to `ROUTES` in `app.jsx`, and optionally add a `nav[]` entry. |
| **Add a product** | Push an object into `PRODUCTS` in `data.js` with `category`, `sub` (drones/frames/payloads), `img` slot, `specs` and `features`. It appears automatically in the category grid, search and related lists, and gets a detail page. |
| **Change colours** | `config.js → theme`. These values are written to CSS variables when the app boots. |
| **Brand / phone / address** | `config.js → brand`, `contact`, `copyright`. |
| **Stats** | `config.js → stats[]` (value, suffix, label). |
| **Swap an image** | Drop the file into `img/`, then edit that slot's `src`, `w/h`, `focal` (object-position) and `alt` in `data.js → ASSETS`. |
| **Language** | Use the switcher in the navbar or footer; the choice is saved to `localStorage("eft-lang")`. UI strings are in `i18n.js`; content strings are inline `{en, zh}` objects. |

## Image credits & status
Licensing limits on drone imagery meant only a few free (CC0, public domain or royalty-free) images were available. Several slots therefore reuse images and need client photos before launch.

| Slot | File | Credit / source | License | Status |
|---|---|---|---|---|
| heroAgri | ag-field.jpg | needpix.com | CC0 | verify (1280px, under the 2400px target; the visible drone brand must be checked) |
| heroIndustry | airborne.jpg | PublicDomainPictures.net "Airborne Drone" | CC0 | verify |
| heroTraining | forest-drone.jpg | PickPik | PickPik free | needs-client-photo (728px) |
| scnAgri | rice-drone.jpg | IRRI via PICRYL | Public Domain | verify |
| scnIndustry | white-drone.jpg | PickPik | PickPik free | needs-client-photo |
| scnTraining | quad-sky.jpg | PublicDomainPictures.net "Phantom 4 Drone" | CC0 | verify (consumer drone) |
| productA/B/C | drone-isolated / airborne / quad-sky | PxHere, PublicDomainPictures | CC0 | needs-client-photo: **replace with client product renders** (transparent PNG/WebP preferred) |
| stats | propeller.jpg | NegativeSpace "Drone Propeller Close Up" | CC0 | final |
| news, about | engineers.jpg | U.S. Army Research Lab via PICRYL | Public Domain | verify / needs-client-photo |
| contact | office.jpg | PublicDomainPictures.net "Modern White Office Interior" | CC0 | verify |
| corn | corn.jpg | PublicDomainPictures.net | CC0 | final |

Production: export each slot as AVIF/WebP at 640/1280/2400w with a JPG fallback, and fill in `srcset` in `ASSETS`.
