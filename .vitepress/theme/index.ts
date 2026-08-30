// Палитра сайта — как у самого lazyvimx: catppuccin, тёмная — macchiato.
import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/macchiato/blue.css";
import "./custom.css";

import { h } from "vue";

import DemoTabs from "./DemoTabs.vue";
import NeoTreeHeader from "./NeoTreeHeader.vue";
import VimStatusline from "./VimStatusline.vue";

export default {
	extends: DefaultTheme,

	// Статуслайн живёт вне потока страницы — слотом в самый низ layout,
	// шапка дерева — над навигацией сайдбара.
	Layout: () =>
		h(DefaultTheme.Layout, null, {
			"layout-bottom": () => h(VimStatusline),
			"sidebar-nav-before": () => h(NeoTreeHeader),
		}),

	enhanceApp({ app }) {
		app.component("DemoTabs", DemoTabs);
	},
};
