import { t as e } from "./Icon-DNHgaxbw.mjs";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/Button/Button.tsx
var r = ({ color: r = "red", title: i, icon: a, type: o = "button", isSmall: s, isFull: c, isDisabled: l, ariaLabel: u, ...d }) => {
	let f = l ? "cu-button--disabled" : `cu-button--${r}`;
	return /* @__PURE__ */ n("button", {
		type: o,
		"aria-label": u ?? i,
		className: `cu-button ${f} ${s ? "cu-button--small" : ""} ${c ? "cu-button--full" : ""}`.trim(),
		disabled: l,
		...d,
		children: [a && /* @__PURE__ */ t(e, {
			className: "cu-icon",
			name: a,
			size: s ? 16 : 20
		}), i]
	});
};
//#endregion
export { r as t };
