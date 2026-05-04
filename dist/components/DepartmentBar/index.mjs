import { t as e } from "../_shared/useLinkContext-C5AE1VVc.mjs";
import { t } from "../_shared/Button-BTYPiMcp.mjs";
import { t as n } from "../_shared/ButtonGroup-BSqAewdB.mjs";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/DepartmentBar/DepartmentBar.tsx
var a = ({ deptName: a, buildingName: o, officeNumber: s, phone: c, email: l, buttons: u }) => {
	let d = e();
	return /* @__PURE__ */ r("aside", {
		className: "cu-department-bar",
		children: /* @__PURE__ */ i("div", {
			className: "cu-department-bar__inner",
			children: [/* @__PURE__ */ i("div", {
				className: "cu-department-bar__info",
				children: [a && /* @__PURE__ */ r("h2", {
					className: "cu-department-bar__name",
					children: a
				}), /* @__PURE__ */ i("ul", {
					className: "cu-department-bar__meta",
					children: [
						o && /* @__PURE__ */ i("li", {
							className: "cu-department-bar__meta-item",
							children: [s && `${s} `, o]
						}),
						c && /* @__PURE__ */ r("li", {
							className: "cu-department-bar__meta-item",
							children: c
						}),
						l && /* @__PURE__ */ r("li", {
							className: "cu-department-bar__meta-item",
							children: /* @__PURE__ */ r(d, {
								href: `mailto:${l}`,
								className: "cu-department-bar__email",
								children: l
							})
						})
					]
				})]
			}), u && u.length > 0 && /* @__PURE__ */ r("div", {
				className: "cu-department-bar__actions",
				children: /* @__PURE__ */ r(n, {
					align: "end",
					children: u.map((e, n) => /* @__PURE__ */ r(t, {
						title: e.title,
						color: n === 0 ? "red" : "dark-grey"
					}, e.id))
				})
			})]
		})
	});
};
//#endregion
export { a as DepartmentBar };
