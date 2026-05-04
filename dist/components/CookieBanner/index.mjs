import { t as e } from "../_shared/useLinkContext-C5AE1VVc.mjs";
import { t } from "../_shared/Button-BTYPiMcp.mjs";
import { useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/CookieBanner/cookies.ts
var a = (e) => {
	if (typeof document > "u") return !1;
	let t = document.cookie.split(";").find((t) => t.trim().startsWith(`${e}=`));
	if (!t) return !0;
	let n = t.split("=")[1];
	return new Date(n).getTime() <= Date.now();
}, o = (e, t = 365) => {
	if (typeof document > "u") return;
	let n = /* @__PURE__ */ new Date();
	n.setTime(n.getTime() + t * 24 * 60 * 60 * 1e3), document.cookie = `${e}=true; expires=${n.toUTCString()}; path=/`;
}, s = ({ cookieName: s = "cookieConsent", message: c = "This site uses cookies to offer you a better browsing experience. Find out more on", policyHref: l = "https://carleton.ca/privacy/privacy-notices/website-privacy-notice/", policyLabel: u = "how we use cookies and how you can change your settings.", buttonLabel: d = "Ok, got it!" }) => {
	let f = e(), [p, m] = n(() => a(s));
	return p ? /* @__PURE__ */ r("div", {
		className: "cu-cookie-banner",
		role: "dialog",
		"aria-live": "polite",
		"aria-label": "Cookie notice",
		children: /* @__PURE__ */ i("div", {
			className: "cu-cookie-banner__content",
			children: [/* @__PURE__ */ i("p", {
				className: "cu-cookie-banner__message",
				children: [
					c,
					" ",
					/* @__PURE__ */ r(f, {
						href: l,
						className: "cu-cookie-banner__link",
						children: u
					})
				]
			}), /* @__PURE__ */ r("div", {
				className: "cu-cookie-banner__action",
				children: /* @__PURE__ */ r(t, {
					onClick: () => {
						o(s), m(!1);
					},
					title: d
				})
			})]
		})
	}) : null;
};
//#endregion
export { s as CookieBanner };
