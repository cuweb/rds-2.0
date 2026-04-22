import { t as e } from "../propClasses-BYwQ18j0.js";
import "react";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/Column/ColumnContent.tsx
var n = ({ children: e, isFirst: n = !1 }) => /* @__PURE__ */ t("div", {
	className: n ? "is-first" : void 0,
	children: e
});
n.displayName = "Column.Content";
//#endregion
//#region src/components/Column/Column.tsx
var r = ({ children: n, cols: r = "1" }) => /* @__PURE__ */ t("div", {
	className: `cu-column cu-column--${e[r]}`,
	children: n
}), i = Object.assign(r, { Content: n });
r.displayName = "Column";
//#endregion
export { i as Column };
