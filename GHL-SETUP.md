# Putting a portal into GoHighLevel (GHL)

This is the tested recipe. Use it for every new portal, module or product. Everything here was proven on the 37-Day Success Plan course lesson on 2026-11-19.

There are two kinds of GHL page, and they need different setups.

| Where the portal goes | What you paste |
|---|---|
| A **Funnel or Website page** | Only the embed code (step A) in a Custom JS/HTML (Code) element. Scripts run there, so the box sizes itself. |
| A **course lesson** (Memberships) | The embed code in the lesson (step A), plus the course CSS (step B), plus the course JS (step C). |

---

## A. The embed code (goes in the lesson, or the Code element)

For a new program, copy `37-day-success-plan-EMBED.html` and change two things: the `src` link (to the new portal file) and the `id` (in both places, so it's unique, for example `kmc-portal-boss`).

```html
<iframe
  id="kmc-portal-37-day"
  src="https://logan-kmc.github.io/KMC-Student-Portals/37-day-success-plan.html"
  title="37-Day Success Plan Student Portal"
  style="width: 100%; height: 760px; border: 0; display: block;"
></iframe>
<script>
(function () {
  var frame = document.getElementById("kmc-portal-37-day");
  window.addEventListener("message", function (e) {
    if (!frame || e.source !== frame.contentWindow || e.origin !== "https://logan-kmc.github.io") { return; }
    var d = e.data || {};
    if (d.type === "kmc-hub-height" && d.height > 0) {
      frame.style.height = d.height + "px";
      if (window.parent !== window) { window.parent.postMessage({ type: "kmc-portal-height", height: d.height }, "*"); }
    }
    if (d.type === "kmc-hub-scroll") {
      var y = frame.getBoundingClientRect().top + window.pageYOffset + (d.top || 0);
      if (y < window.pageYOffset || y > window.pageYOffset + window.innerHeight * 0.6) {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  });
})();
</script>
```

## B. Course Custom CSS field (course lessons only)

Paste this in the course's **Custom CSS** field. It works for every portal; nothing in it is program-specific.

```css
/* Let the lesson box grow to fit the portal (GHL locks it at 600px with a scrollbar) */
.lessonRoot .post-description-container {
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
}

/* Hide the left lesson menu so only the portal shows */
.lessonRoot #category-list,
.lessonRoot :has(#category-list):not(:has(.post-details, .main-section, .post-body, #post-description)) {
  display: none !important;
}
.lessonRoot :has(> * #category-list, > #category-list) > :not(:has(#category-list)) {
  width: 100% !important;
  max-width: 100% !important;
  flex: 1 1 100% !important;
  grid-column: 1 / -1 !important;
  margin-left: 0 !important;
}
```

Hiding the menu applies to **every lesson in that course**. Only use the menu part when the course is just the portal. If the course has other lessons students click between, leave the menu part out.

## C. Course Custom JS field (course lessons only)

Paste the contents of `ghl-course-custom-js.js` in the course's **Custom JS** field, below anything already there. It works for every portal.

## After pasting

Save, then refresh the page with **Ctrl+Shift+R**. Changes to a portal's `.html` file show up in GHL within a few minutes, with no re-pasting.

---

## Why it's set up this way (lessons learned)

- **GHL lesson text does not run scripts.** The `<script>` part of the embed code is ignored inside a lesson, so the course JS field (step C) does the resizing instead. On Funnel/Website pages the embed's own script works.
- **GHL locks the lesson text box at 600px tall** (`.post-description-container`, scrolling). That caused the "portal is cut off" problem. Step B's first rule removes the lock.
- **The embed code goes in the lesson, never in the CSS field.** The CSS field ignores HTML.
- **When guessing at GHL's layout fails twice, look at the real page.** The fix came from reading the live lesson page, not from more guesses.
- **The calendar tile** scales a 1180px-wide calendar down to fit, so Monday to Friday stay on one line. Below 560px wide it switches to the phone layout.
