import "react";
import { jsx as e } from "react/jsx-runtime";
//#region src/components/Aside/Aside.tsx
var t = ({ children: t, isSticky: n, topSpace: r = 0 }) => /* @__PURE__ */ e("aside", {
	className: "relative cu-aside cu-prose",
	children: n ? /* @__PURE__ */ e("div", {
		className: "sticky",
		style: { top: `${r}px` },
		children: t
	}) : t
});
//#endregion
export { t as Aside };
