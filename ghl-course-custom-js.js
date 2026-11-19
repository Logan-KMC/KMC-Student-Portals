/* KMC portal: make the lesson box fit the portal (course Custom JS) */
(function () {
  if (window.__kmcPortalFit) { return; }
  window.__kmcPortalFit = true;
  window.addEventListener("message", function (e) {
    var d = e.data || {};
    if (d.type !== "kmc-portal-height" || !(d.height > 0)) { return; }
    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i];
      if (f.contentWindow !== e.source) { continue; }
      var set = function (el, k, v) { el.style.setProperty(k, v, "important"); };
      set(f, "height", d.height + "px"); set(f, "position", "static"); set(f, "width", "100%");
      var p = f.parentElement;
      for (var n = 0; n < 4 && p && !p.matches(".lessonRoot, body"); n++) {
        set(p, "height", "auto"); set(p, "max-height", "none"); set(p, "min-height", "0");
        set(p, "padding-top", "0"); set(p, "aspect-ratio", "auto"); set(p, "overflow", "visible");
        p = p.parentElement;
      }
    }
  });
})();
