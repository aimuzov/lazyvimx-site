<!-- Статуслайн в духе lualine внизу вьюпорта: режим меняется на VISUAL
при выделении текста, справа позиция прокрутки как позиция в файле. -->
<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useData, useRoute } from "vitepress";

const route = useRoute();
const { lang } = useData();

const visual = ref(false);
const percent = ref("Top");

const file = computed(() => {
	const path = route.path.replace(/^\/(ru\/)?/, "").replace(/\/$/, "");
	if (!path) return "~/lazyvimx/index.md";
	return `~/lazyvimx/${path.replace(/\.html$/, "")}.md`;
});

const mode = computed(() => (visual.value ? "VISUAL" : "NORMAL"));
const credit = computed(() => (lang.value === "ru" ? "сделано с ❤️ aimuzov" : "made with ❤️ by aimuzov"));

function onScroll() {
	const max = document.documentElement.scrollHeight - window.innerHeight;
	if (max <= 0) return (percent.value = "All");
	const y = window.scrollY;
	if (y <= 0) return (percent.value = "Top");
	if (y >= max - 2) return (percent.value = "Bot");
	percent.value = Math.round((y / max) * 100) + "%";
}

function onSelection() {
	visual.value = !document.getSelection()?.isCollapsed;
}

onMounted(() => {
	window.addEventListener("scroll", onScroll, { passive: true });
	document.addEventListener("selectionchange", onSelection);
	onScroll();
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
	document.removeEventListener("selectionchange", onSelection);
});
</script>

<template>
	<div class="vim-statusline" :class="{ visual }">
		<span class="mode">{{ mode }}</span>
		<!-- Глифа ветки из Nerd Font в веб-шрифте нет — пишем словами. -->
		<span class="branch">git:main</span>
		<span class="file">{{ file }}</span>
		<span class="spacer"></span>
		<span class="credit">{{ credit }}</span>
		<span class="meta">utf-8</span>
		<span class="meta">LF</span>
		<span class="percent">{{ percent }}</span>
	</div>
</template>
