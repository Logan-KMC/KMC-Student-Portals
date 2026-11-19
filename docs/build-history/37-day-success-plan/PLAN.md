# Build Plan: 37-Day Success Plan Student Portal

## End state (as if it already works)
A 37-Day Success Plan student opens one page inside GoHighLevel and sees a short branded header and a row of icon tiles. One tap gets them where they need to go. The Calendar and Tutorials tiles open a dropdown right under the tile (the live calendar, or a short list of videos that play in place). Scripts and Submit My Video open the script page or the video submission form in a new tab. Students stop searching emails and asking in chat for links: everything for the program is one click from one page.

## The one job
Get a student to the right resource in one click.

## Does NOT do
- Logins, progress tracking, or storing anything about the student
- Hold the content itself (scripts and the form live where they already live; the page links to them)
- Serve other programs yet. The tile list is a plain settings block so a second program is a copy of the file with a new tile list.

## The journey
1. First moment: header "37-Day Success Plan, Student Portal" and 4 tiles: Calendar, Scripts, Submit My Video, Tutorials.
2. Tap Calendar: the dropdown opens under it with the live GHL calendar plus "open full screen". Tap again or press Escape to close.
3. Tap Tutorials: the dropdown lists the videos. Tap one and it plays in the dropdown.
4. Tap Scripts or Submit My Video: it opens in a new tab (inside a GHL frame a new tab is the safe choice).
5. Only one dropdown is open at a time.

## How it is built
- One self-contained `portal.html`. All styles and scripts are inside it, kept under `#kmc-hub` so they cannot clash with GHL's page.
- Paste it into a GHL **Custom HTML / Code** element (preferred), or host it and iframe it.
- Every link, label and video lives in ONE settings block (`PORTAL`) at the top of the script. Adding a tile means adding one entry.
- Missing links: while `setupMode` is true, a tile with no link shows "Link needed". When it is false, that tile is hidden. Links are never invented.
- Brand: Onyx Editorial (Moonstone ground, Onyx header, Cormorant Garamond plus Geist, Pink Sapphire on one action per view), matching the existing calendar panel.

## Slices, in build order
1. [ ] Walking skeleton: settings block, tile grid, dropdown open and close, link tiles open in a new tab
2. [ ] Calendar dropdown (iframe plus full-screen link)
3. [ ] Tutorials dropdown (video list plus in-place player for YouTube, Vimeo, Loom and GHL-hosted mp4)
4. [ ] Design and mobile pass
5. [ ] Fresh-eyes break pass, written to VERIFICATION.md

## Needed from the owner before launch
- Calendar link
- Scripts page link
- Video submission form link
- Tutorial video titles and links
