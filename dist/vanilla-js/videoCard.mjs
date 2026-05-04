var i = "data-rds-video-card-wired", n = (t, r, a, l) => {
  const e = document.createElement("iframe");
  e.className = "cu-card__figure-iframe", e.src = r, e.title = l || "Video player", e.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen", e.setAttribute("allowfullscreen", ""), a.replaceWith(e), t.classList.add("cu-card__figure--playing"), t.dispatchEvent(new CustomEvent("rds:video-play", {
    bubbles: !0,
    detail: {
      embedUrl: r,
      provider: t.getAttribute("data-provider")
    }
  }));
}, c = (t) => {
  const r = t.getAttribute("data-fallbacks");
  if (!r) return;
  const a = r.split(",").map((e) => e.trim()).filter(Boolean);
  let l = 0;
  t.addEventListener("error", () => {
    l >= a.length || (t.src = a[l++]);
  });
}, o = (t) => {
  const r = t.getAttribute("aria-label");
  return r && r.replace(/^Play video:\s*/i, "").trim() || null;
}, s = (t) => {
  if (t.hasAttribute(i)) return;
  t.setAttribute(i, "");
  const r = t.getAttribute("data-embed-url"), a = t.querySelector(".cu-card__figure-link"), l = a ? o(a) : null;
  t.querySelectorAll("img[data-fallbacks]").forEach((e) => c(e)), !(!a || !r) && a.addEventListener("click", (e) => {
    e.metaKey || e.ctrlKey || e.shiftKey || "button" in e && e.button === 1 || (e.preventDefault(), n(t, r, a, l));
  });
}, d = (t = document) => {
  t.querySelectorAll("[data-rds-video-card]").forEach((r) => s(r));
};
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => d()) : d());
export {
  d as initVideoCards
};
