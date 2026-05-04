import { t as e } from "../_shared/useLinkContext-C5AE1VVc.mjs";
import { t } from "../_shared/Icon-DNHgaxbw.mjs";
import { t as n } from "../_shared/styles-CgdEW3wH.mjs";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/data/FooterData.ts
var a = "Carleton University acknowledges the location of its campus on the traditional, unceded territories of the Algonquin Anishinàbeg nation", o = {
	phone: "613-520-2600",
	phoneHref: "tel:+1-613-520-2600",
	contactHref: "https://carleton.ca/about/contact/",
	address: "1125 Colonel By Drive, Ottawa, ON, K1S 5B6, Canada"
}, s = [
	{
		name: "Facebook",
		href: "https://www.facebook.com/carletonuniversity",
		icon: "facebook"
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/carleton_u",
		icon: "instagram"
	},
	{
		name: "X (Twitter)",
		href: "https://twitter.com/@Carleton_U",
		icon: "x-twitter"
	},
	{
		name: "YouTube",
		href: "https://www.youtube.com/user/carletonuvideos",
		icon: "youtube"
	},
	{
		name: "LinkedIn",
		href: "https://www.linkedin.com/school/carleton-university",
		icon: "linkedin"
	}
], c = [
	[{
		heading: "Admissions",
		links: [
			{
				name: "Undergraduate",
				href: "https://admissions.carleton.ca/"
			},
			{
				name: "Graduate",
				href: "https://graduate.carleton.ca/"
			},
			{
				name: "International",
				href: "https://admissions.carleton.ca/applicant-type/international-applicants/"
			},
			{
				name: "Professional Development",
				href: "https://carleton.ca/future-edge/"
			},
			{
				name: "Financial Aid",
				href: "https://carleton.ca/awards/"
			},
			{
				name: "Campus Tours",
				href: "https://admissions.carleton.ca/campustours/"
			},
			{
				name: "Initiatives",
				href: "https://carleton.ca/cie/"
			}
		]
	}],
	[{
		heading: "Academics",
		links: [
			{
				name: "Schedules & Dates",
				href: "https://carleton.ca/academics/schedules-dates/"
			},
			{
				name: "Brightspace",
				href: "https://brightspace.carleton.ca/"
			},
			{
				name: "Library",
				href: "https://library.carleton.ca/"
			},
			{
				name: "Support Services",
				href: "https://carleton.ca/academics/support/"
			},
			{
				name: "Calendars",
				href: "https://calendar.carleton.ca/"
			},
			{
				name: "Carleton Online",
				href: "https://carleton.ca/online/"
			},
			{
				name: "Future Learning Lab",
				href: "https://carleton.ca/tls/future-learning-lab/"
			}
		]
	}],
	[{
		heading: "Students",
		links: [
			{
				name: "Career Services",
				href: "https://carleton.ca/career/"
			},
			{
				name: "Dept & Faculties",
				href: "https://carleton.ca/academics/"
			},
			{
				name: "Student Email",
				href: "https://carleton.ca/ccs/all-services/email/carleton-student-email/"
			},
			{
				name: "Housing",
				href: "https://housing.carleton.ca/"
			},
			{
				name: "Registrar's Office",
				href: "https://carleton.ca/registrar/"
			},
			{
				name: "Registration",
				href: "https://carleton.ca/registrar/registration/"
			},
			{
				name: "ITS Help Centre",
				href: "https://carleton.ca/its/help-centre/"
			}
		]
	}],
	[{
		heading: "Campus",
		links: [
			{
				name: "Campus Map",
				href: "https://carleton.ca/campus/map/"
			},
			{
				name: "Directions",
				href: "https://carleton.ca/campus/directions/"
			},
			{
				name: "Events",
				href: "https://events.carleton.ca/"
			},
			{
				name: "Parking",
				href: "https://carleton.ca/parking/"
			},
			{
				name: "Safety",
				href: "https://carleton.ca/safety/"
			},
			{
				name: "Dining Services",
				href: "https://dining.carleton.ca/"
			},
			{
				name: "Clubs & Societies",
				href: "https://www.cusaclubs.ca/"
			}
		]
	}],
	[{
		heading: "Ravens",
		links: [
			{
				name: "Giving to Carleton",
				href: "https://futurefunder.carleton.ca/"
			},
			{
				name: "Athletics & Recreation",
				href: "https://athletics.carleton.ca/"
			},
			{
				name: "GoRavens Varsity",
				href: "https://goravens.ca/"
			}
		],
		media: {
			src: n.ravensLogo,
			alt: "Carleton Ravens",
			href: "https://goravens.carleton.ca",
			width: 64
		}
	}]
], l = {
	standard: c,
	athletics: [
		[{
			heading: "Fitness",
			links: [
				{
					name: "Fitness Centre",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/fitness-centre/"
				},
				{
					name: "Group Fitness Programs",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/"
				},
				{
					name: "Drop-in Group Fitness",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/cu-fit/"
				},
				{
					name: "Instructional Programs",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/instructional/"
				},
				{
					name: "Pilates",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/pilates-memberships/"
				},
				{
					name: "Senior Ravens",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/senior-ravens/"
				},
				{
					name: "Personal Training",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/personal-training-pt/"
				}
			]
		}],
		[{
			heading: "Aquatics",
			links: [
				{
					name: "Pool Information",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/"
				},
				{
					name: "Pool Schedule",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/pool-schedule/"
				},
				{
					name: "Children's Aquatics",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/childrens-program/"
				},
				{
					name: "Adult Programs",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/aquatics-adult-programs/"
				},
				{
					name: "Lifesaving & Leadership",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/lifesaving-certification-and-first-aid-programs/"
				},
				{
					name: "First Aid & CPR",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/lifesaving-certification-and-first-aid-programs/"
				}
			]
		}],
		[{
			heading: "Facilities",
			links: [
				{
					name: "Discover Our Facilities",
					href: "https://athleticsupgrade.carleton.ca/students/facilities/"
				},
				{
					name: "Facility Rentals",
					href: "https://rec.carleton.ca/Facility"
				},
				{
					name: "Policies & Procedures",
					href: "https://athleticsupgrade.carleton.ca/students/facilities/"
				}
			]
		}, {
			heading: "About Us",
			links: [
				{
					name: "Memberships",
					href: "https://athleticsupgrade.carleton.ca/community/fitness/memberships-passes/"
				},
				{
					name: "Inclusive Programs",
					href: "https://athleticsupgrade.carleton.ca/community/adaptive/"
				},
				{
					name: "Job Opportunities",
					href: "https://athleticsupgrade.carleton.ca/community/employment-opportunities/"
				}
			]
		}],
		[{
			heading: "Camps",
			links: [
				{
					name: "Summer Camps",
					href: "https://athleticsupgrade.carleton.ca/community/camps-and-childrens-programs/summer-camps/"
				},
				{
					name: "Holiday Camps",
					href: "https://athleticsupgrade.carleton.ca/community/camps-and-childrens-programs/holiday-camps/"
				},
				{
					name: "March Break Camps",
					href: "https://athleticsupgrade.carleton.ca/community/camps-and-childrens-programs/march-break-camps/"
				},
				{
					name: "Lifesaving Camps",
					href: "https://athleticsupgrade.carleton.ca/community/aquatics/summer-aquatic-camps/"
				},
				{
					name: "Junior Ravens",
					href: "https://athleticsupgrade.carleton.ca/community/camps-and-childrens-programs/junior-ravens-programs/"
				}
			]
		}, {
			heading: "Adult Leagues",
			links: [{
				name: "Browse All Leagues",
				href: "https://athleticsupgrade.carleton.ca/community/leagues/"
			}]
		}],
		[{
			heading: "Students",
			links: [
				{
					name: "Your Student Membership",
					href: "https://athleticsupgrade.carleton.ca/students/student-member/"
				},
				{
					name: "Drop-in (Campus Rec)",
					href: "https://athleticsupgrade.carleton.ca/students/campus-rec/"
				},
				{
					name: "Intramurals",
					href: "https://athleticsupgrade.carleton.ca/students/leagues-intramurals/intramurals/"
				}
			]
		}, {
			heading: "Carleton University",
			links: [
				{
					name: "Visit Carleton.ca",
					href: "https://carleton.ca"
				},
				{
					name: "About Carleton",
					href: "https://carleton.ca/about/"
				},
				{
					name: "Undergraduate Admissions",
					href: "https://admissions.carleton.ca/"
				}
			]
		}]
	],
	futureFunder: c
}, u = ({ type: c = "standard", acknowledgment: u = a, contact: d = o, social: f = s, logoSrc: p = n.cuLogoColorVerticalOutlined, logoAlt: m = "Logo of Carleton University", privacyHref: h = "https://carleton.ca/privacy/privacy-notices/general-notice-of-collection-use-and-disclosure/", accessibilityHref: g = "https://carleton.ca/accessibility/", copyrightHref: _ = "https://library.carleton.ca/copyright-carleton" }) => {
	let v = e(), y = l[c], b = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ i("footer", {
		className: `cu-footer cu-footer--${c}`,
		"aria-labelledby": "cu-footer-heading",
		children: [/* @__PURE__ */ r("h2", {
			id: "cu-footer-heading",
			className: "sr-only",
			children: "Footer"
		}), /* @__PURE__ */ i("div", {
			className: "cu-footer__inner",
			children: [
				/* @__PURE__ */ r("div", {
					className: "cu-footer__acknowledgment",
					children: /* @__PURE__ */ r("p", { children: u })
				}),
				/* @__PURE__ */ r("div", {
					className: "cu-footer__columns",
					children: y.map((e, t) => /* @__PURE__ */ r("div", {
						className: "cu-footer__column",
						children: e.map((e, t) => /* @__PURE__ */ i("div", {
							className: "cu-footer__column-group",
							children: [
								/* @__PURE__ */ r("h3", {
									className: "cu-footer__column-heading",
									children: e.heading
								}),
								/* @__PURE__ */ r("ul", {
									className: "cu-footer__column-list",
									children: e.links.map((e, t) => /* @__PURE__ */ r("li", {
										className: "cu-footer__column-item",
										children: /* @__PURE__ */ r(v, {
											href: e.href,
											className: "cu-footer__column-link",
											children: e.name
										})
									}, t))
								}),
								e.media && (e.media.href ? /* @__PURE__ */ r(v, {
									href: e.media.href,
									className: "cu-footer__column-media",
									style: { width: e.media.width },
									children: /* @__PURE__ */ r("img", {
										src: e.media.src,
										alt: e.media.alt
									})
								}) : /* @__PURE__ */ r("img", {
									className: "cu-footer__column-media",
									src: e.media.src,
									alt: e.media.alt,
									style: { width: e.media.width }
								}))
							]
						}, t))
					}, t))
				}),
				/* @__PURE__ */ i("div", {
					className: "cu-footer__contact",
					children: [
						/* @__PURE__ */ i("p", {
							className: "cu-footer__contact-lead",
							children: [
								"Contact us by",
								" ",
								d.phoneHref && /* @__PURE__ */ r(v, {
									href: d.phoneHref,
									className: "cu-footer__contact-link",
									children: "phone"
								}),
								d.phoneHref && d.contactHref && " or ",
								d.contactHref && /* @__PURE__ */ r(v, {
									href: d.contactHref,
									className: "cu-footer__contact-link",
									children: "email"
								})
							]
						}),
						/* @__PURE__ */ r("p", {
							className: "cu-footer__contact-address",
							children: d.address
						}),
						/* @__PURE__ */ r("ul", {
							className: "cu-footer__social",
							children: f.map((e) => /* @__PURE__ */ r("li", {
								className: "cu-footer__social-item",
								children: /* @__PURE__ */ i(v, {
									href: e.href,
									className: "cu-footer__social-link",
									children: [/* @__PURE__ */ r("span", {
										className: "sr-only",
										children: e.name
									}), /* @__PURE__ */ r(t, {
										name: e.icon,
										size: 24
									})]
								})
							}, e.name))
						})
					]
				}),
				/* @__PURE__ */ i("div", {
					className: "cu-footer__logo-links",
					children: [/* @__PURE__ */ r("img", {
						className: "cu-footer__logo",
						src: p,
						alt: m
					}), /* @__PURE__ */ i("ul", {
						className: "cu-footer__meta",
						children: [
							/* @__PURE__ */ r("li", {
								className: "cu-footer__meta-item",
								children: /* @__PURE__ */ r(v, {
									href: h,
									className: "cu-footer__meta-link",
									children: "Privacy Policy"
								})
							}),
							/* @__PURE__ */ r("li", {
								className: "cu-footer__meta-item",
								children: /* @__PURE__ */ r(v, {
									href: g,
									className: "cu-footer__meta-link",
									children: "Accessibility"
								})
							}),
							/* @__PURE__ */ r("li", {
								className: "cu-footer__meta-item",
								children: /* @__PURE__ */ i(v, {
									href: _,
									className: "cu-footer__meta-link",
									children: ["© Copyright ", b]
								})
							})
						]
					})]
				})
			]
		})]
	});
};
//#endregion
export { u as FooterStandard };
