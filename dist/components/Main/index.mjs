import "react";
import { jsx as e } from "react/jsx-runtime";
//#region src/components/Main/Main.tsx
var t = ({ children: t, hasPadding: n = !0 }) => /* @__PURE__ */ e("main", {
	className: `cu-main ${n ? "cu-main--padding" : ""}`,
	children: /* @__PURE__ */ e("div", {
		className: "alignfull has-global-padding is-layout-constrained",
		children: t
	})
});
//#endregion
export { t as Main };
