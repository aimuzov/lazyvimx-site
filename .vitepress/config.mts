import { defineConfig } from "vitepress";

// Контент страниц генерирует scripts/sync-docs.mjs из репозитория lazyvimx —
// править тексты нужно там, здесь только оболочка сайта.

const github = "https://github.com/aimuzov/lazyvimx";

const sidebarEn = [
	{
		text: "Guide",
		items: [
			{ text: "🚀 Getting Started", link: "/getting-started" },
			{ text: "🧩 Extras", link: "/extras" },
			{ text: "⚙️ Configuration", link: "/configuration" },
			{ text: "⌨️ Keybindings", link: "/keybindings" },
			{ text: "❓ FAQ", link: "/faq" },
			{ text: "🔧 Troubleshooting", link: "/troubleshooting" },
		],
	},
	{
		text: "Reference",
		items: [
			{ text: "🏗️ Architecture", link: "/architecture" },
			{ text: "🔌 API", link: "/api" },
		],
	},
];

const sidebarRu = [
	{
		text: "Руководство",
		items: [
			{ text: "🚀 Быстрый старт", link: "/ru/getting-started" },
			{ text: "🧩 Экстры", link: "/ru/extras" },
			{ text: "⚙️ Настройка", link: "/ru/configuration" },
			{ text: "⌨️ Кеймапы", link: "/ru/keybindings" },
			{ text: "❓ FAQ", link: "/ru/faq" },
			{ text: "🔧 Решение проблем", link: "/ru/troubleshooting" },
		],
	},
	{
		text: "Справочник",
		items: [
			{ text: "🏗️ Архитектура", link: "/ru/architecture" },
			{ text: "🔌 API", link: "/ru/api" },
		],
	},
];

export default defineConfig({
	title: "lazyvimx",
	description: "An enhancement layer on top of LazyVim: 50 optional extras and 39 plugin overrides",
	cleanUrls: true,

	// Весь сайт набран JetBrains Mono — как код в самом Neovim.
	head: [
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
		[
			"link",
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400..800;1,400..800&display=swap",
			},
		],
	],
	lastUpdated: true,
	sitemap: { hostname: "https://lazyvimx.aimuzov.online" },
	// README описывает сам репозиторий сайта — это не страница.
	srcExclude: ["README.md"],

	locales: {
		root: {
			label: "English",
			lang: "en",
			themeConfig: {
				sidebar: sidebarEn,
			},
		},
		ru: {
			label: "Русский",
			lang: "ru",
			link: "/ru/",
			description: "Слой улучшений поверх LazyVim: 50 опциональных экстр и 39 оверрайдов плагинов",
			themeConfig: {
				sidebar: sidebarRu,
				outline: { label: "На этой странице" },
				docFooter: { prev: "Предыдущая", next: "Следующая" },
				lastUpdatedText: "Обновлено",
				darkModeSwitchLabel: "Тема",
				sidebarMenuLabel: "Меню",
				returnToTopLabel: "Наверх",
			},
		},
	},

	themeConfig: {
		siteTitle: "~/lazyvimx",
		externalLinkIcon: true,
		socialLinks: [{ icon: "github", link: github }],
		search: { provider: "local" },
	},
});
