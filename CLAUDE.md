# KMC Student Portals: instructions for Claude

This repo holds Krista Mashore Coaching's student portal pages. Each program gets one HTML page. It's served by GitHub Pages and shown inside GoHighLevel (GHL) through an iframe. Anything pushed to `main` goes live at `https://logan-kmc.github.io/KMC-Student-Portals/<file>.html` within a few minutes, and GHL picks it up without re-pasting.

**This repo is PUBLIC.** No passwords, keys, client or student names, emails, phone numbers or private links. Never invent a link. If one is missing, leave it `""`.

## Read first

- `README.md`: the program table, tile types, and how to make a portal for a new program.
- `GHL-SETUP.md`: the tested recipe for getting a portal into GHL (Funnel pages vs course lessons), with every embed code, CSS and JS block, plus the lessons learned. Use these exact codes for new portals, modules and products.
- `docs/build-history/`: the plan and the fresh-eyes verification log from each build.

## Files

| File | What it is |
|---|---|
| `37-day-success-plan.html` | The 37-Day Success Plan portal (first one, built 2026-11-19). This is the master copy. |
| `37-day-success-plan-EMBED.html` | Its GHL embed code (iframe + resize listener). |
| `ghl-course-custom-js.js` | The course Custom JS that resizes the portal inside course lessons. Works for every portal. |

## How a portal page works

- Everything you edit is in the `PORTAL` settings block at the top of the script: `setupMode`, `eyebrow`, title pieces, `subtitle`, `tiles[]`, `footer`. Don't touch the design code for content changes.
- Tile types: `link` (new tab), `calendar` (dropdown, scaled to fit), `embed` (dropdown with any page plus a full-screen button), `voomly` (one Voomly video), `videos` (a list of YouTube, Vimeo, Loom or mp4 videos).
- `setupMode: true` shows dashed "Link needed" tiles. Set it to `false` before students see it, so tiles with no link are hidden.
- The portal posts its height to the parent page (`kmc-hub-height`), and the embed code or course JS resizes the iframe to match. Keep that message contract if you change either side.
- The brand is Onyx Editorial: onyx #0A2E35, emerald #164F50, sapphire #087F7B, paraiba #2FCFC0, moonstone #F5F2EB, pink #F01878 (one call to action per view), Cormorant Garamond + Geist fonts.

## 37-Day portal: open items (as of 2026-11-19)

- **Modules 1 through 4** tile: waiting on the link from Logan (`url: ""`).
- **Tutorials** tile: waiting on the video links, or a decision to hide it.
- Then set `setupMode: false`.
- Live in GHL as a course lesson, with the menu hidden. The course CSS + JS from `GHL-SETUP.md` are in place.

## Working rules

- Test changes locally first: serve the folder (`python -m http.server`) and open the page at laptop and phone width. Then push, and check the live URL.
- A new program means a new `<program>.html`, a new `<program>-EMBED.html` with a unique iframe `id`, and a row in the README table.
- Commit messages say what changed in plain words.
