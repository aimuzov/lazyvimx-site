// Тянет документацию из репозитория lazyvimx и раскладывает по страницам
// сайта. Источник истины — md-файлы там; здесь только адаптация: другие
// имена файлов, ссылки на код уходят на GitHub, языковые подсказки
// выпиливаются — их заменяет переключатель локали.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const github = "https://github.com/aimuzov/lazyvimx";

// Локальная рабочая копия удобнее для разработки; в CI её нет — клонируем.
function findSource() {
	const local = process.env.LAZYVIMX_DIR || resolve(root, "../lazyvimx");

	if (existsSync(join(local, "docs/EXTRAS.md"))) return local;

	const cache = join(root, ".cache/lazyvimx");
	rmSync(cache, { recursive: true, force: true });
	mkdirSync(dirname(cache), { recursive: true });
	// Актуальные доки живут в develop: main отстаёт до ближайшего релиза.
	execFileSync("git", ["clone", "--depth", "1", "--branch", "develop", `${github}.git`, cache], { stdio: "inherit" });

	return cache;
}

// [источник, страница EN, страница RU]
const pages = [
	["README", "getting-started.md", "ru/getting-started.md"],
	["docs/EXTRAS", "extras.md", "ru/extras.md"],
	["docs/CONFIGURATION", "configuration.md", "ru/configuration.md"],
	["docs/KEYBINDINGS", "keybindings.md", "ru/keybindings.md"],
	["docs/FAQ", "faq.md", "ru/faq.md"],
	["docs/TROUBLESHOOTING", "troubleshooting.md", "ru/troubleshooting.md"],
	["docs/ARCHITECTURE", "architecture.md", "ru/architecture.md"],
	["docs/API", "api.md", "ru/api.md"],
];

const nameMap = {
	EXTRAS: "extras",
	CONFIGURATION: "configuration",
	KEYBINDINGS: "keybindings",
	FAQ: "faq",
	TROUBLESHOOTING: "troubleshooting",
	ARCHITECTURE: "architecture",
	API: "api",
	README: "getting-started",
};

function transform(text) {
	// Блок «Русская версия/English version» — на сайте есть переключатель.
	text = text.replace(/> \[!TIP\]\n> \*\*🇷🇺[^\n]*\n\n/g, "");
	text = text.replace(/> \[!TIP\]\n> \*\*🇬🇧[^\n]*\n\n/g, "");

	// Хвосты вида «([🇬🇧](docs/X.md))» в списках ссылок.
	text = text.replace(/ \(\[🇷🇺\]\([^)]*\)\)/g, "");
	text = text.replace(/ \(\[🇬🇧\]\([^)]*\)\)/g, "");

	// Бейджи из шапки README дублируют hero лендинга.
	text = text.replace(/<div align="center">[\s\S]*?<\/div>\n\n/, "");

	// Взаимные ссылки доков — на страницы сайта (в своей локали).
	for (const [upper, lower] of Object.entries(nameMap)) {
		for (const prefix of ["docs/", "./", ""]) {
			text = text.replaceAll(`(${prefix}${upper}.ru.md`, `(./${lower}.md`);
			text = text.replaceAll(`(${prefix}${upper}.md`, `(./${lower}.md`);
		}
	}
	text = text.replaceAll("(../README.ru.md", "(./getting-started.md");
	text = text.replaceAll("(../README.md", "(./getting-started.md");

	// GitHub кладёт эмодзи заголовка в слаг, VitePress выбрасывает; явный
	// якорь без эмодзи делает ссылки одинаковыми там и тут.
	text = text.replace(/^## (\p{Extended_Pictographic}️?) (.+)$/gmu, (_, emo, name) => {
		const slug = name.toLowerCase().replaceAll(".", "").replace(/\s+/g, "-");
		return `## ${emo} ${name} {#${slug}}`;
	});
	text = text.replace(/\]\(#\p{Extended_Pictographic}️?-/gu, "](#");

	// Каждая демо-гифка существует в двух палитрах; какая видна —
	// решает CSS по классу темы (см. custom.css).
	text = text.replace(
		/!\[([^\]]*)\]\((https:\/\/raw\.githubusercontent\.com\/aimuzov\/lazyvimx\/assets\/demo\/[a-z0-9-]+)\.gif\)/g,
		'<p><img class="gif-dark" loading="lazy" src="$2.gif" alt="$1"><img class="gif-light" loading="lazy" src="$2-light.gif" alt="$1"></p>',
	);

	// Всё, что живёт только в репозитории, — на GitHub.
	text = text.replaceAll("(../lua/", `(${github}/blob/main/lua/`);
	text = text.replaceAll("(./lua/", `(${github}/blob/main/lua/`);
	text = text.replaceAll("(lua/", `(${github}/blob/main/lua/`);
	text = text.replaceAll("(../examples/", `(${github}/tree/main/examples/`);
	text = text.replaceAll("(examples/", `(${github}/tree/main/examples/`);
	text = text.replaceAll("(../CONTRIBUTING", `(${github}/blob/main/CONTRIBUTING`);
	text = text.replaceAll("(../CHANGELOG.md", `(${github}/blob/main/CHANGELOG.md`);
	text = text.replaceAll("(CHANGELOG.md", `(${github}/blob/main/CHANGELOG.md`);
	text = text.replaceAll("(./)", `(${github}/tree/main/docs)`);

	return text;
}

const src = findSource();
mkdirSync(join(root, "ru"), { recursive: true });

for (const [source, en, ruPage] of pages) {
	const enText = readFileSync(join(src, `${source}.md`), "utf8");
	const ruText = readFileSync(join(src, `${source}.ru.md`), "utf8");

	writeFileSync(join(root, en), transform(enText));
	writeFileSync(join(root, ruPage), transform(ruText));
	console.log(`synced: ${en}, ${ruPage}`);
}
