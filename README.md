# Palm Gardens at PX — bilingual landing page (AR / EN)

Layout follows the solanaeast.org structure: hero with contact card, two products, filterable units grid, townhouse-vs-villa comparison, installment calculator, lifestyle, numbers, masterplan, why-now, developer, gallery, FAQ, lead section, price-list popup (55% scroll or 16 s, once per session), floating WhatsApp / call / email, cookie banner, legal modals in the footer.

Palette: ink #063d4c / #05596f, sand #ecdfc4, gold #b28a45 / #e8c88a, paper #f7f3ea. Fonts: Noto Kufi Arabic (titles), IBM Plex Sans Arabic (body), Archivo (numbers + eyebrows).

Unit data and prices: `lib/content.ts` → `units`. Page copy: same file, `ar` and `en`.

Routes
- `/` — Arabic (RTL), `lang="ar-EG"`
- `/en` — English (LTR)
- `/ar` redirects to `/`

## Run

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # or: npm run build && npm start
```

Set before going live
- `NEXT_PUBLIC_SITE_URL` — real domain (used for canonicals, OG, sitemap). Also replace `www.example.com` in `public/sitemap.xml` and `public/robots.txt`.
- `NEXT_PUBLIC_WEB3FORMS_KEY` — Web3Forms access key. Leads go to the email tied to that key (use leads@grandeur-spaces.com or the one you choose).
- `NEXT_PUBLIC_GADS_ID` + `NEXT_PUBLIC_GADS_FORM_LABEL` / `_WA_LABEL` / `_CALL_LABEL` — Google Ads tag and conversion labels (optional). Form, WhatsApp and call clicks fire conversions automatically once set.

Contact used on the page: 01027709029 (tel + WhatsApp `wa.me/201027709029`).

## Keyword placement

| Keyword group | Where it sits |
|---|---|
| بالم هيلز PX / Palm Hills PX | `<title>`, meta description, hero paragraph, H2 "وحدات وأسعار بالم هيلز PX", masterplan H2, FAQ, JSON-LD |
| بالم جاردنز PX / Palm Gardens at PX | H1, products H2, why-now H2, gallery H2, footer brand |
| تاون هاوس بالم هيلز / townhouses for sale | hero paragraph, products card, units filter + cards, compare H2 |
| فيلات بالم هيلز PX / villas for sale | hero paragraph, products card, units cards (Type 1/3/4/5), compare H2 |
| أسعار بالم هيلز PX / Palm Hills PX prices | units H2, unit cards, compare table, calculator |
| تقسيط بالم هيلز / installment plan | hero stats, products stats, calculator H2, FAQ |
| إطلالة على الأهرامات / pyramid view | hero paragraph, masterplan text, why-now card, FAQ |

Image alt text carries the project name in both languages.

## Notes
- Prices come from the PX factsheet and are shown as indicative. Type 3 / Type 4 show the factsheet average (39M / 37M); the summary post lists Type 3 at 38.8M and Corner at 34.5M. Confirm before launch.
- Phase 1 villas are sold out and are mentioned only as history.
- Images are the renders + masterplan you supplied. Unit card images are assigned generically; swap `img` per unit in `lib/content.ts`.
- Agent disclosure: Grandeur Spaces, authorized sales agent for Palm Hills.
