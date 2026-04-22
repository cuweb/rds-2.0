import { n as e } from "../propClasses-BYwQ18j0.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/Section/Section.tsx
var n = ({ children: n, as: r = "section", isGrey: i, maxWidth: a = "aligncontent" }) => /* @__PURE__ */ t(r, {
	className: `cu-section cu-section--${i ? "grey" : "white"} ${a ? e[a] : ""} has-global-padding is-layout-constrained`,
	children: n
});
//#endregion
export { n as Section };
