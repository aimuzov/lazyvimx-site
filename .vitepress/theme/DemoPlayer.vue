<!-- Демо-запись экстры: mp4 вместо гифки — вдвое легче при том же
качестве. Палитра берётся у темы, поэтому в разметке один <video>, а не
пара скрытых друг за другом. Тейпы, у которых записан ещё и вариант без
экстры, получают табы «До | После».

Гифки никуда не делись: их показывает GitHub в README и EXTRAS.md, где
<video> не проигрывается. Здесь же — только mp4. -->
<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

import { demoSource, demoUnreachable } from "./demo-source.js";

const props = defineProps({
	name: String,
	alt: String,
	before: Boolean,
	width: { type: Number, default: 1200 },
	height: { type: Number, default: 604 },
});

const { lang, isDark } = useData();

const labels = computed(() => (lang.value === "ru" ? ["До", "После"] : ["Before", "After"]));
const showBefore = ref(false);

const src = computed(() => {
	const before = showBefore.value ? "-before" : "";
	const theme = isDark.value ? "" : "-light";
	return `${demoSource.value}/${props.name}${before}${theme}.mp4`;
});

const video = ref(null);
const visible = ref(false);
let observer;

// У <video> нет loading="lazy", так что ленивость держим сами: пока
// запись за экраном, у неё нет даже src — браузеру нечего скачивать.
onMounted(() => {
	if (!video.value) return;

	observer = new IntersectionObserver(
		([entry]) => {
			visible.value = entry.isIntersecting;
			if (entry.isIntersecting) play();
			else video.value?.pause();
		},
		{ rootMargin: "200px" },
	);

	observer.observe(video.value);
});

onBeforeUnmount(() => observer?.disconnect());

// Смена темы или таба меняет файл — <video> нужно перезарядить руками.
watch(src, () => {
	if (!visible.value || !video.value) return;
	video.value.load();
	play();
});

function play() {
	// Автоплей отклоняют по разным причинам (экономия батареи, политика
	// браузера) — это не ошибка страницы, показываем как есть.
	video.value?.play().catch(() => {});
}

// Запись не доехала — уходим на запасной вход CDN. Адрес сменится,
// watch выше перезарядит <video>. Если и там ошибка, адрес останется
// прежним и второго круга не будет.
</script>

<template>
	<div class="demo-player">
		<div v-if="before" class="demo-tabs-bar">
			<button :class="{ active: showBefore }" type="button" @click="showBefore = true">{{ labels[0] }}</button>
			<button :class="{ active: !showBefore }" type="button" @click="showBefore = false">{{ labels[1] }}</button>
		</div>
		<p>
			<video
				ref="video"
				:src="visible ? src : undefined"
				:width="width"
				:height="height"
				:aria-label="`${alt}: ${name}`"
				:style="{ aspectRatio: `${width} / ${height}` }"
				muted
				loop
				playsinline
				preload="none"
				@error="demoUnreachable"
			/>
		</p>
	</div>
</template>
