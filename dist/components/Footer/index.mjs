import { t as e } from "../_shared/useLinkContext-C5AE1VVc.mjs";
import { t } from "../_shared/styles-CgdEW3wH.mjs";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/Footer/Footer.tsx
var i = ({ logoSrc: i = t.cuLogoColorVerticalOutlined, logoAlt: a = "Logo of Carleton University", privacyHref: o = "https://carleton.ca/privacy/privacy-notices/general-notice-of-collection-use-and-disclosure/", accessibilityHref: s = "https://carleton.ca/accessibility/", copyrightHref: c = "https://library.carleton.ca/copyright-carleton" }) => {
	let l = e(), u = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ r("footer", {
		className: "cu-footer cu-footer--basic",
		"aria-labelledby": "cu-footer-heading",
		children: [/* @__PURE__ */ n("h2", {
			id: "cu-footer-heading",
			className: "sr-only",
			children: "Footer"
		}), /* @__PURE__ */ r("div", {
			className: "cu-footer__logo-links",
			children: [/* @__PURE__ */ n("img", {
				className: "cu-footer__logo",
				src: i,
				alt: a
			}), /* @__PURE__ */ r("ul", {
				className: "cu-footer__meta",
				children: [
					/* @__PURE__ */ n("li", {
						className: "cu-footer__meta-item",
						children: /* @__PURE__ */ n(l, {
							href: o,
							className: "cu-footer__meta-link",
							children: "Privacy Policy"
						})
					}),
					/* @__PURE__ */ n("li", {
						className: "cu-footer__meta-item",
						children: /* @__PURE__ */ n(l, {
							href: s,
							className: "cu-footer__meta-link",
							children: "Accessibility"
						})
					}),
					/* @__PURE__ */ n("li", {
						className: "cu-footer__meta-item",
						children: /* @__PURE__ */ r(l, {
							href: c,
							className: "cu-footer__meta-link",
							children: ["© Copyright ", u]
						})
					})
				]
			})]
		})]
	});
};
//#endregion
export { i as Footer };
