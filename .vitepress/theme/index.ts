// Палитра сайта — как у самого lazyvimx: catppuccin, тёмная — macchiato.
import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/macchiato/blue.css";
import "./custom.css";

import { h } from "vue";

import DemoPlayer from "./DemoPlayer.vue";
import HeroDemo from "./HeroDemo.vue";
import VimNav from "./VimNav.vue";
import VimStatusline from "./VimStatusline.vue";

export default {
	extends: DefaultTheme,

	// Статуслайн и хоткеи живут вне потока страницы — слотом в самый низ
	// layout. Запись под hero — слотом внутрь него самого.
	Layout: () =>
		h(DefaultTheme.Layout, null, {
			"home-hero-before": () => h(HeroDemo),
			"layout-bottom": () => [h(VimStatusline), h(VimNav)],
		}),

	enhanceApp({ app }) {
		app.component("DemoPlayer", DemoPlayer);
	},
};
