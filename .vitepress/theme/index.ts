// Палитра сайта — как у самого lazyvimx: catppuccin, тёмная — macchiato.
import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/macchiato/blue.css";
import "./custom.css";

import { h } from "vue";

import DemoTabs from "./DemoTabs.vue";
import VimNav from "./VimNav.vue";
import VimStatusline from "./VimStatusline.vue";

export default {
	extends: DefaultTheme,

	// Статуслайн и хоткеи живут вне потока страницы — слотом в самый низ
	// layout.
	Layout: () => h(DefaultTheme.Layout, null, { "layout-bottom": () => [h(VimStatusline), h(VimNav)] }),

	enhanceApp({ app }) {
		app.component("DemoTabs", DemoTabs);
	},
};
