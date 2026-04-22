import { createContext as e, useContext as t } from "react";
import { jsx as n } from "react/jsx-runtime";
//#region src/components/Article/Article.tsx
var r = ({ children: e, content: t }) => t ? /* @__PURE__ */ n("article", { dangerouslySetInnerHTML: { __html: t } }) : /* @__PURE__ */ n("article", { children: e }), i = ({ children: e, isSticky: t, topSpace: r = 0 }) => /* @__PURE__ */ n("aside", {
	className: "relative cu-aside cu-prose",
	children: t ? /* @__PURE__ */ n("div", {
		className: "sticky",
		style: { top: `${r}px` },
		children: e
	}) : e
}), a = ({ children: e, className: t }) => /* @__PURE__ */ n("body", {
	className: t || "",
	children: e
}), o = ({ children: e, isFirst: t = !1 }) => /* @__PURE__ */ n("div", {
	className: t ? "is-first" : void 0,
	children: e
});
o.displayName = "Column.Content";
//#endregion
//#region src/utils/propClasses.tsx
var s = {
	aligncontent: "aligncontent",
	alignwide: "alignwide",
	alignfull: "alignfull"
}, c = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	"1/3": "one-third",
	"2/3": "two-thirds"
}, l = ({ children: e, cols: t = "1" }) => /* @__PURE__ */ n("div", {
	className: `cu-column cu-column--${c[t]}`,
	children: e
}), u = Object.assign(l, { Content: o });
l.displayName = "Column";
//#endregion
//#region src/components/Main/Main.tsx
var d = ({ children: e }) => /* @__PURE__ */ n("main", { children: /* @__PURE__ */ n("div", {
	className: "alignfull has-global-padding is-layout-constrained",
	children: e
}) }), f = ({ children: e, as: t = "section", isGrey: r, maxWidth: i = "aligncontent" }) => /* @__PURE__ */ n(t, {
	className: `cu-section cu-section--${r ? "grey" : "white"} ${i ? s[i] : ""} has-global-padding is-layout-constrained`,
	children: e
}), p = e((e) => /* @__PURE__ */ n("a", { ...e })), m = () => t(p), h = ({ text: e, href: t, rounded: r = "md", color: i = "grey", ...a }) => {
	let o = m(), s = `cu-badge cu-badge--${i} cu-badge--radius-${r}`;
	return t ? /* @__PURE__ */ n(o, {
		href: t,
		className: s,
		...a,
		children: e
	}) : /* @__PURE__ */ n("span", {
		className: s,
		...a,
		children: e
	});
}, g = (e, t, n, r) => {
	let i = {};
	return e !== void 0 && (i.top = `${e}px`), t !== void 0 && (i.right = `${t}px`), n !== void 0 && (i.bottom = `${n}px`), r !== void 0 && (i.left = `${r}px`), i;
}, _ = ({ children: e, isAbsolute: t = !1, top: r = 0, right: i, bottom: a, left: o = 0 }) => /* @__PURE__ */ n("div", {
	className: "cu-badge-group",
	style: t ? {
		position: "absolute",
		...g(r, i, a, o)
	} : {},
	children: e
}), v = ({ component: e, children: t }) => /* @__PURE__ */ n(p.Provider, {
	value: e,
	children: t
});
//#endregion
export { r as Article, i as Aside, h as Badge, _ as BadgeGroup, a as Body, u as Column, v as LinkProvider, d as Main, f as Section };
