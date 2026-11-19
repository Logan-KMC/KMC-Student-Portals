## Slice: 37-Day student portal - fresh-eyes review
- Reviewer: fresh reviewer, did not build it
- Date: 2026-11-19
- Method: read portal.html, README.md, PLAN.md line by line; extracted `safeUrl` and `videoInfo` into node and fed them real-world URL shapes; served a scratch copy (sample URLs filled in, plus a copy with the paste block duplicated) on 127.0.0.1 and drove it in a browser with JS probes. portal.html and README.md were not edited.

### Break attempts
1. **Tried: open Calendar, then fire one `resize` event (what a phone fires when its toolbar hides, on rotation, or when a host iframe resizes) -> calendar iframe RELOADS.** Counted iframe `load` events: `loadsAfterOpen: 1`, `loadsAfterOneResize: 2`. Cause: the resize handler (lines 499-504) calls `place()`, which always does `panel.parentNode.removeChild(panel)` (line 409) and re-inserts it (line 414). Detaching an iframe destroys its page; detaching a `<video>` pauses it. A student halfway through filling in the booking form, or watching a tutorial, loses it on any resize, even when the row did not change.
2. **Tried: paste the block twice on one page (dup.html) -> second copy is blank.** Probe: `rootCount: 2, childCounts: [3, 0]`. Both scripts call `document.getElementById("kmc-hub")` (line 251), which returns the first div, so copy 2 re-renders copy 1 and leaves its own div empty. GHL users commonly make a desktop-only and a mobile-only copy of an element; if the first one is the hidden one, the visible one shows nothing. Panel id `kmc-hub-panel` (line 355) also collides.
3. **Tried: inject typical builder/theme element-level CSS (`p{font-family;letter-spacing}`, `svg{fill}`, `button{text-transform;font-weight}`) -> all three leak in.** Probe: `.kmc-sub` font became `"Comic Sans MS"` with `letterSpacing: 2px`; icon `svgFill: rgb(255,0,0)` (icons turn into filled blobs); tile blurb `textTransform: uppercase`, `fontWeight: 700`. Cause: `fill="none"` is only a presentation attribute (line 279), which any author CSS beats; `.kmc-sub`, `.kmc-empty`, `.kmc-foot` (lines 54, 162, 163) never set `font-family`/`letter-spacing`, so a direct `p{}` rule beats inheritance; `.kmc-tile` (62-73) never sets `text-transform`, `letter-spacing`, `font-weight`. The scoping keeps styles from leaking OUT (verified, every rule is under `#kmc-hub`), but does not stop them leaking IN.
4. **Tried: video URL shapes through `videoInfo` (node) ->**
   - `youtube.com/watch?si=abc&v=ID`, `youtu.be/ID?si=..&t=10`, `/shorts/ID?feature=share`, `m.youtube.com`: all convert correctly. `&t=42s` start time is dropped.
   - `youtube.com/live/ID` -> falls through to raw `youtube.com/live/ID` iframe, which YouTube refuses to frame (blank box).
   - `vimeo.com/123456789/abcdef1234` (unlisted, the normal way course videos are shared) -> `player.vimeo.com/video/123456789?autoplay=1`. **Hash dropped**; Vimeo refuses unlisted videos without `?h=abcdef1234`. Line 290.
   - `vimeo.com/channels/x/123` -> raw vimeo.com page in iframe, refused.
   - `loom.com/share/<32hex>?sid=abc` -> correct. `loom.com/share/Weekly-Update-<32hex>` (title-slug form) -> `loom.com/embed/Weekly`, broken. Line 292, `[\w]+` stops at the first hyphen.
   - GHL media `...filesafe.space/.../abc.mp4` -> `<video>`, correct.
   - `drive.google.com/file/d/ID/view` -> raw `/view` iframe, which Drive refuses (blank).
   - GHL calendar `https://api.leadconnectorhq.com/widget/booking/XXXX` -> passes `safeUrl`, iframed, correct.
   - The GHL calendar EMBED CODE (`<iframe src="..." ...>`, which is what GHL's Share dialog hands you) -> `safeUrl` = false -> tile silently stays "Link needed" (hidden at launch). Fails safe, but README never tells the non-coder which link to copy.
5. **Tried: `safeUrl` / `esc` with hostile input -> safe.** `javascript:alert(1)`, a URL with a space, and `https://ex.com/"onerror=x` all return `""`. Every attribute and text interpolation goes through `esc` (lines 324-343, 365-371, 459-460). No injection path found.
6. **Tried: contrast of every text/indicator pair (node, WCAG formula) ->** focus ring paraiba `#2FCFC0` vs moonstone **1.74:1**, vs white **1.94:1** (needs 3:1, line 100). White on pink `#F01878` button at 16px/600 **4.11:1** (needs 4.5:1 below 18.66px bold; lines 135-141). Others pass: blurb 7.19, chip 7.62, needed-tile text 5.02, footer 5.02.
7. **Tried: font sizes vs the 16px body rule ->** `.kmc-blurb` measured `14px` (line 85); it is the tile's explanatory sentence ("Send a video for editing"), so it is body text. Chip 12px (95), footer 12px (164), eyebrow 13px (44) are labels.
8. **Tried: 360px viewport ->** no horizontal scroll with the shipped content (`scrollWidth 360`, also 360 with Tutorials open). Panel landed after the correct row (`panelAfter: "Tutorials"`, row 2). Tiles of unequal height (row 1 = 160px, row 2 = 210px) still detected correctly because grid items share a row-start `offsetTop`. One long unbreakable label pushed the page to `scrollWidth 473`: no `overflow-wrap` on `.kmc-label` / `.kmc-vitem span`.
9. **Tried: 742px viewport (3-column band, 4 tiles) ->** Calendar panel inserted after "Submit My Video", i.e. end of row 1. Odd-count row detection works.
10. **Tried: Escape with focus on `<body>` (what happens after a mouse click in Safari/Firefox on Mac, which do not focus buttons on click) -> panel stays open** (`stillOpen: true`). Listener is on `root` only (line 490). PLAN journey step 2 promises Escape closes it.
11. **Tried: screen-reader semantics ->** disclosure tiles carry `aria-haspopup="true"` (line 343, probe confirmed `["true",null,null,"true"]`), which means "menu" and makes screen readers announce "menu button" for something that is a region, not a menu. `aria-expanded` / `aria-controls` / focus-return on close are correct. Playing video is shown only by a class (`is-playing`, line 381), no `aria-pressed`/`aria-current`.
12. **Tried: script never runs (GHL strips it, or the non-coder leaves out a comma, which README section 1-2 invites them to edit) ->** the paste block contains only an empty `<div id="kmc-hub"></div>` (line 189), so the student sees nothing at all and the owner gets no clue why. A JS syntax error in PORTAL kills the whole IIFE.
13. **Tried: README "Alternative: host portal.html ... iframe ... works on its own" (README line 49) ->** the host iframe has a fixed height in GHL; opening Calendar adds a ~1057px panel (measured `panelHeight: 1057.6`), which gets clipped or double-scrolls. No auto-height messaging exists. Also, target `_blank` links can be blocked if the embed iframe is sandboxed without `allow-popups`. "Works on its own" overstates it.
14. **Tried: README GHL placement claims (README lines 44-45) ->** "Custom JS/HTML (Code)" element is plausible for Funnel/Website pages. "course page" is not verified: GHL membership lesson content is a rich-text editor and may not offer a Code element or may strip `<script>`. Not checkable from here; flagged rather than assumed.
15. **Tried: pink count per view ->** only `.kmc-btn` ("Open full screen") is pink, only inside calendar/embed panels, and only one panel opens at a time. Passes. Tap targets: tiles 140-160px, close 44px, button 44px, video rows 48px. Passes.

### Must-fix
1. **Resize reloads the calendar and stops the video** (lines 409, 499-504). Verified: one `resize` -> iframe load count 1 -> 2. Only move the panel when the computed insertion point actually changes; otherwise just update the caret `left`.
2. **Second paste on the same page renders blank** (lines 189, 251, 355). Verified `childCounts: [3, 0]`. Find the root via `document.currentScript` (its previous sibling) or give each paste a unique id, and derive the panel id from it.
3. **Host-page element CSS leaks in** (lines 279, 54/162/163, 62-73). Verified: icons go solid (`svg{fill}`), subtitle/footer pick up the page's `p` font and letter-spacing, tile text picks up `button` uppercase/bold. Add `#kmc-hub svg{fill:none;stroke:currentColor}` and set `font-family`, `letter-spacing`, `text-transform`, `font-weight`, `line-height` explicitly on every text class (or a scoped reset on `#kmc-hub *`).
4. **Focus ring fails non-text contrast** (line 100): 1.74:1 on moonstone, 1.94:1 on white; needs 3:1. Use onyx/sapphire ring on light surfaces (paraiba is fine on the onyx header).
5. **Pink button text fails contrast** (lines 135-141): white on `#F01878` = 4.11:1 at 16px/600. Make it large text (>=19px, weight 700, which needs only 3:1) or darken the pink fill.
6. **Body text under 16px** (line 85): `.kmc-blurb` is 14px. Raise to 16px.
7. **Wrong ARIA role announcement** (line 343): remove `aria-haspopup="true"`; the disclosure pattern is `aria-expanded` + `aria-controls`, already present.
8. **Unlisted Vimeo and slugged Loom links break** (lines 290, 292). Keep the Vimeo hash as `?h=HASH`; for Loom, capture the trailing 32-hex id rather than the first `\w+` run. (Verified in node: `vimeo.com/123456789/abcdef1234` -> no `h=`; `loom.com/share/Weekly-Update-<id>` -> `/embed/Weekly`.)
9. **Blank box when the script does not run** (line 189). Put a visible fallback inside `#kmc-hub` (e.g. "Portal is loading. If this stays, the settings have a typo or this element does not allow scripts.") that the script overwrites. This is the only signal a non-coder gets after a missing comma or a script-stripping GHL element.
10. **README overstates and under-instructs** (README lines 9, 26, 44, 49):
    - Section 3 "Alternative ... The whole file works on its own that way" is not true at a fixed iframe height (panel ~1057px). Either give the required height and say the dropdown will scroll inside, or drop the alternative.
    - Say which calendar link to paste (the plain `https://api.leadconnectorhq.com/widget/booking/...` link, not the embed code), and that pasting embed code leaves the tile on "Link needed".
    - "course page" is unverified; say "Funnel or Website page", or confirm the Code element exists on course lessons first.
    - Videos line should say unlisted Vimeo/YouTube Live/Google Drive need the share form the code supports (or will after fix 8).

### Nice-to-have
- Escape does nothing when focus is on `<body>` (verified, line 490). Listen on `document` while a panel is open.
- YouTube `&t=` start time dropped; `youtube.com/live/ID` not converted; Google Drive `/view` not converted to `/preview` (lines 287-295). Generic fallback (line 295) iframes pages that refuse framing and shows a blank box. Show an "Open video" link for unknown hosts instead.
- Long unbreakable label or video title causes horizontal scroll (verified 473px at 360). Add `overflow-wrap:anywhere; min-width:0` to `.kmc-label`, `.kmc-blurb`, `.kmc-vitem span`.
- Layout uses viewport media queries (lines 168-182), so in a narrow GHL column on a desktop screen it still forces 4 columns (about 70px each in a 360px column). Container queries would follow the element width.
- Playing video is not announced (line 381); add `aria-current="true"` or `aria-pressed`. `aria-live` on the player box (line 373) announces nothing useful.
- Portal adds its own `<h1>` (line 325) to a GHL page that likely already has one.
- `scrollIntoView({block:"nearest"})` on a panel taller than the viewport scrolls the clicked tile out of view (line 478).
- Loom embed has no autoplay, so it needs a second tap (line 293).
- Keyboard tab order: the panel comes after all remaining tiles in the row, not directly after the tile that opened it.
- Chip 12px, footer 12px, eyebrow 13px: labels, but small.

- Status (reviewer, before fixes): NOT DONE (pending must-fixes)

## Fixes and re-test (builder, 2026-11-19)

Tested on a local copy with stand-in links (example.com / example.org, a public CC0 mp4, sample Vimeo/Loom/YouTube links), plus a "hostile host" copy with injected page CSS (`p{font-family:Comic Sans;letter-spacing:3px;font-size:11px} button,a{text-transform:uppercase;font-weight:900} svg{fill:red} h2{font-size:60px;color:red}`) and the paste block included twice.

1. Resize reloads the calendar -> panel only moves when its row changes. Re-test: calendar open, resize fired, iframe load count 0, same iframe node.
2. Double paste leaves the second copy blank -> each script claims the first unfilled `#kmc-hub` (`data-kmc-ready`), and each copy gets its own panel id. Re-test: childCounts [3,3].
3. Host CSS leaks in -> scoped shield on `#kmc-hub *` (font, size, weight, spacing, case, color inherit) plus `#kmc-hub svg{fill:none}`. Re-test under hostile CSS: subtitle Geist/normal/18px, label none/600, svg fill none, title Moonstone (not red).
4. Focus ring contrast -> Sapphire #087F7B on light surfaces; the close button on the dark header keeps Paraiba.
5. Pink button contrast -> 19px / 700 (WCAG large text, 4.1:1 against the 3:1 minimum); Geist 700 added to the font load.
6. Blurb 14px -> 16px (re-test: computed 16px).
7. aria-haspopup removed.
8. Vimeo unlisted -> `?autoplay=1&h=HASH`; titled Loom links -> the 32-hex id. Re-test outputs: `player.vimeo.com/video/123456789?autoplay=1&h=abc123def4`, `loom.com/embed/0123456789abcdef0123456789abcdef`, YouTube `?si=` -> nocookie embed, mp4 -> `<video>`.
9. Silent blank on script failure -> visible fallback message inside the div. Re-test: settings with a missing comma show "If you can see this message, the student portal did not load..."
10. README -> says which calendar link to copy (plain link, not embed code), lists the working video link forms, marks course pages as untested, and recommends against the iframe option.

Nice-to-have done too: overflow-wrap on labels and titles (re-test: no horizontal scroll at 360px with a 60-character unbroken title), Escape listens on the document, the header is h2 (no second h1 on the page).
Still open (nice-to-have): YouTube start times, YouTube Live and Drive links, layout following screen width rather than GHL column width, Loom autoplay.

Real path still UNTESTED: inside an actual GHL Custom JS/HTML element with the real calendar, scripts, form and video links. That needs the real links and happens before launch.

Status: DONE
