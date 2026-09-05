// Встраивает vp-icons.css в собранные страницы. Файл крохотный —
// меньше килобайта, — но отдельным запросом он блокирует отрисовку
// наравне с основным стилем: там больше времени уходит на дорогу до
// сервера, чем на сам файл.
//
// Основной style.css так не переносим: несжатым он под 130 КБ, и в
// каждой странице это перевесило бы выигрыш, а межстраничный кеш
// пропал бы совсем.

import { readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../.vitepress/dist");
const icons = join(dist, "vp-icons.css");

const css = readFileSync(icons, "utf8").trim();
const link = /<link rel="preload stylesheet" href="[^"]*vp-icons\.css" as="style">/;

function pages(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) return pages(path);
		return name.endsWith(".html") ? [path] : [];
	});
}

let count = 0;
for (const page of pages(dist)) {
	const html = readFileSync(page, "utf8");
	if (!link.test(html)) continue;

	writeFileSync(page, html.replace(link, `<style>${css}</style>`));
	count += 1;
}

rmSync(icons);
console.log(`inlined vp-icons.css: ${count} pages`);
