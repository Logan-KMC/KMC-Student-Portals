# KMC Student Portals

One portal page per program, served by GitHub Pages and embedded in GoHighLevel.

| Program | Live page | GHL embed code |
|---|---|---|
| 37-Day Success Plan | https://logan-kmc.github.io/KMC-Student-Portals/37-day-success-plan.html | `37-day-success-plan-EMBED.html` |

## Putting a portal in GHL

1. Open the program's `-EMBED.html` file and copy everything in it.
2. In GHL, add a **Custom JS/HTML** (Code) element to the page and paste it in.
3. Save and preview. The portal resizes itself, so dropdowns (calendar, videos) are never cut off.

Changes published here show up in GHL automatically after a minute or two. You never need to re-paste the embed code.

## Changing links, icons or wording

Open the program's `.html` file and edit only the `SETTINGS` block near the top of the script:

- **`url`**: paste the link between the quotes. Leave it as `""` if you don't have it yet.
- **`setupMode`**: `true` shows a dashed "Link needed" box on icons with no link. Set it to `false` before launch, so those icons are hidden.
- **Adding an icon**: copy one tile line and change its words. Keep the commas between tiles.

Tile types:

| Type | What it does |
|---|---|
| `link` | Opens the link in a new tab |
| `calendar` | Dropdown with a calendar page inside |
| `embed` | Dropdown with any web page inside |
| `voomly` | Dropdown that plays one Voomly video. `url` is the share link; `ratio` comes from Voomly's embed code. |
| `videos` | Dropdown list of YouTube, Vimeo, Loom or .mp4 videos that play in place |

## A portal for another program

1. Copy `37-day-success-plan.html` and rename it for the program, for example `boss-program.html`.
2. Change `eyebrow`, the title pieces and the tiles.
3. Copy `37-day-success-plan-EMBED.html` to a matching `-EMBED.html` file. In it, change the `src` link to the new file name, and change the `id` in both places so it is unique.
4. Add a row to the table above.

## Rules

- No passwords, client data or private links in this repo. It is public, and anything in it can be seen by anyone.
- Never invent a link. If you don't have it, leave the quotes empty.

## Portal inside a GHL course lesson

Course lessons put the embed code inside their own fixed-size box, which cuts the portal off and adds a scrollbar. To make the box fit the portal:

1. Paste the program's `-EMBED.html` code into the lesson as usual.
2. Paste everything in `ghl-course-custom-js.js` into the course's **Custom JS** field.

The box then grows and shrinks with the portal, so Mark As Complete sits below it.
