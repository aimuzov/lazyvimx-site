// Палитра сайта — как у самого lazyvimx: catppuccin, тёмная — macchiato.
import DefaultTheme from "vitepress/theme";
import "@catppuccin/vitepress/theme/macchiato/blue.css";
import "./custom.css";

import DemoTabs from "./DemoTabs.vue";

export default {
	extends: DefaultTheme,

	enhanceApp({ app }) {
		app.component("DemoTabs", DemoTabs);
	},
};
