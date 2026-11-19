# 37-Day Student Portal: how to use it

> **The live copy now lives in the GitHub repo `Logan-KMC/KMC-Student-Portals`** (local folder `~/Sites/KMC-Student-Portals`, file `37-day-success-plan.html`). Make edits there and push, and GHL picks them up automatically. The `portal.html` in this folder is the working draft from the first build. Don't edit it, or the two copies will drift apart.

`portal.html` is a one-page student hub: a header and a row of icon tiles. Calendar and Tutorials open a dropdown right under the tile. Scripts and Submit My Video open in a new tab.

You never need to touch the design. Everything you edit is in one box at the top of the script called `PORTAL`.

## 1. Where to paste the links

Open `portal.html` and find the section that starts with `SETTINGS`. Each tile is one line. Paste the web address between the quote marks after `url:`.

A finished link tile:

```
{ icon:"script", label:"Scripts", blurb:"Your word-for-word scripts", type:"link", url:"https://example.com/scripts" },
```

A finished Tutorials tile with two videos:

```
{ icon:"play", label:"Tutorials", blurb:"Short how-to videos", type:"videos", videos:[
    { title:"Welcome - start here", url:"https://www.youtube.com/watch?v=XXXXXXXXXXX" },
    { title:"How to post your video", url:"https://vimeo.com/123456789" }
] },
```

**Which calendar link:** in GHL go to Calendars, find the calendar, open its share or embed option, and copy the plain link that starts with `https://` (it usually looks like `https://api.leadconnectorhq.com/widget/booking/...`). Do not paste the embed code (the block that starts with `<iframe` or `<script`). The page only accepts a plain link, so pasting embed code leaves the tile on "Link needed".

**Video links that work:**
- YouTube: the normal watch link, a `youtu.be` share link, or a Shorts link
- Vimeo: `vimeo.com/123456789`, or for an unlisted video the full link with the extra code, `vimeo.com/123456789/abc123def4`
- Loom: the share link (`loom.com/share/...`)
- A direct video file ending in .mp4, .webm or .mov (for example a video uploaded to GHL's Media library)

Google Drive and YouTube Live links may show a blank box. Use one of the forms above instead.

Only paste real links. If you do not have one yet, leave the quotes empty (`""`) and the tile shows "Link needed".

Keep the commas between tiles and between videos, and keep the quote marks.

## 2. How to add a tile

Copy one whole tile line, paste it under the last tile, and change the words:

- `icon`: calendar, film, script, upload, play, link, book, chat, star, folder, check
- `label`: the name on the tile
- `blurb`: the short line under it
- `type`: `"link"` (opens in a new tab), `"calendar"` (dropdown with the calendar), `"videos"` (dropdown with a video list), `"embed"` (dropdown showing any web page), or `"voomly"` (dropdown that plays one Voomly video)
- For a `"voomly"` tile, `url` is the Voomly share link (`https://share.voomly.com/v/...`). Add `ratio:` with the `data-ratio` number from Voomly's embed code so the player is the right shape. Example: `{ icon:"film", label:"How to Film Videos", blurb:"Watch before you record", type:"voomly", url:"https://share.voomly.com/v/XXXX", ratio:1.683333 },`
- `url`: the address

Make sure the tile before it ends with a comma.

## 3. How to put it in GoHighLevel

1. In GHL, open the Funnel or Website page where students should land.
2. Add a **Custom JS/HTML** (Code) element.
3. In `portal.html`, copy everything between `<!-- ===== COPY FROM HERE INTO GHL ===== -->` and `<!-- ===== COPY TO HERE ===== -->`. Do not copy the markers or anything outside them.
4. Paste it into the Code element, save, then preview the page.

If the preview shows "If you can see this message, the student portal did not load", the code did not run. Usually a comma or quote mark in the settings went missing. Compare your edit with the examples above.

**Course (Memberships) pages:** not tested yet. A course lesson may not offer a Code element, or may strip scripts. Use a Funnel or Website page first. If it has to live inside the course, test it there before students see it.

**Iframe option (not recommended):** you could host `portal.html` and show it in an iframe, but an iframe has a fixed height. An open calendar is about 1,050px tall, so it gets cut off or scrolls inside the frame. Pasting into a Code element avoids this.

## 4. Before launch

Set `setupMode: false`. Tiles that still have no link will then be hidden, so students only see tiles that work. While it is `true`, missing tiles show a dashed "Link needed" box so you can see what is left.

Then test every tile once: open the calendar, play a video, and click Scripts and Submit My Video.

## 5. A version for another program

1. Copy `portal.html` and give it a new name.
2. Change `eyebrow` (the small line above the title) and the title pieces.
3. Replace the tile list with that program's tiles and links.

Nothing else needs to change.
