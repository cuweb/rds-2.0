import "react";
import { jsx as e } from "react/jsx-runtime";
//#region src/components/BadgeGroup/BadgeGroup.tsx
var t = (e, t, n, r) => {
	let i = {};
	return e !== void 0 && (i.top = `${e}px`), t !== void 0 && (i.right = `${t}px`), n !== void 0 && (i.bottom = `${n}px`), r !== void 0 && (i.left = `${r}px`), i;
}, n = ({ children: n, isAbsolute: r = !1, top: i = 0, right: a, bottom: o, left: s = 0 }) => /* @__PURE__ */ e("div", {
	className: "cu-badge-group",
	style: r ? {
		position: "absolute",
		...t(i, a, o, s)
	} : {},
	children: n
});
//#endregion
export { n as BadgeGroup };
