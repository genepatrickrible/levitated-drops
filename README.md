# Aerodynamically Levitated Nanofluid Drops: project page

Source for the project landing page:

> **Shape, oscillation modes, and orientation dynamics of aerodynamically levitated nanofluid drops**
> Rible, Raza, Traynor, Watkins, Sebek, Bottoms, Truscott, Dickerson.
> *Physical Review Fluids* **11**, 053604 (2026). DOI: [10.1103/s7rj-swb3](https://doi.org/10.1103/s7rj-swb3)

Live at **https://genepatrickrible.github.io/levitated-drops/**.

Built as a static page (Bulma, Font Awesome, Academicons via CDN) in the style of the
Nerfies academic project-page template. No build step; the repo serves directly from
GitHub Pages.

## Repository layout

```
levitated-drops/
├── index.html              single-page site
├── robots.txt              allows all crawlers, points at sitemap
├── sitemap.xml             one-URL sitemap for Search Console
├── static/
│   ├── css/index.css       custom styles on top of Bulma
│   ├── js/index.js         dropdown + clipboard for the Cite button
│   ├── images/             figure PNGs (and PDF originals), teaser GIF, OG image
│   └── videos/             reserved for future local clips
└── .nojekyll               disables Jekyll so static/ serves verbatim
```

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Wired links

| Button | Destination |
| ------ | ----------- |
| Paper (PDF) | dickersonlab.com hosted PDF |
| DOI | https://doi.org/10.1103/s7rj-swb3 |
| Code | https://github.com/genepatrickrible/Aerodynamic-levitation-of-nanofluid-drops |
| Data (Zenodo) | https://doi.org/10.5281/zenodo.17488370 |
| Video | https://www.youtube.com/playlist?list=PLaxoeadWOB0pN0QxObsl6vmfSh9PKcmg2 |
| Slides | https://doi.org/10.5281/zenodo.20493438 |

## Still to do

The only placeholder left on the page is the optional **voice-over walkthrough** video
(4th tile in the Supplementary videos grid). Either upload the clip, copy the
11-character YouTube ID from the watch URL, and replace the `YOUTUBE_ID` token in
`index.html`; or delete that `<div class="column is-half">...</div>` block to drop the
tile entirely.

## SEO

The page ships with:
- 20 Google Scholar `citation_*` meta tags (one per author plus journal metadata).
- A Schema.org `ScholarlyArticle` JSON-LD block.
- Canonical URL, keywords, author, and Google Search Console verification tags.
- A 1200x630 static PNG (`teaser-social.png`) for Open Graph and Twitter card previews.
- `sitemap.xml` and `robots.txt` at the repo root.

After pushing changes, the live site rebuilds in about a minute. To submit updates to
Google: Search Console, Sitemaps, resubmit `sitemap.xml`.

## Integrations

### Schedule a meeting (Google Calendar Appointment Scheduling)
The **Schedule** button in the hero opens a Google Calendar booking page where
visitors pick a slot and fill an intake form; a calendar invite is sent
automatically. To change availability or intake fields, edit the appointment
schedule at calendar.google.com. To swap the URL, edit the single `href` in
`index.html` under the Schedule `link-block`.

### Community hub (GitHub Discussions + Giscus)
The **Discussion** button in the hero links to the repo's Discussions tab.
The bottom of the page embeds a Giscus comment widget backed by the same
Discussions: comments left on the page become threads in the Announcements
category. Configuration is in the `<script src="https://giscus.app/client.js" ...>`
block at the bottom of `index.html`; regenerate at giscus.app if the repo or
category ever changes.

## Credits

Page template adapted from [Nerfies](https://github.com/nerfies/nerfies.github.io),
used under [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/).
