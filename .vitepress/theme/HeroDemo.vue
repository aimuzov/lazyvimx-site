<!-- Запись под hero лендинга: раньше это была гифка фоном в CSS, почти
мегабайт и самый долгий элемент первого экрана. Теперь mp4, а место
держит постер первого кадра — двадцать килобайт.

Записей две, по одной на палитру, но адреса им проставляет скрипт после
монтирования — и только видимой. Разметкой тут не обойтись: скрытую
картинку браузер не грузит, а вот <video> с src качает независимо от
display, и в сеть уходили обе записи разом. -->
<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";

import { demoSource, demoUnreachable } from "./demo-source.js";

const { isDark } = useData();
const root = ref(null);

// Единственный слот перед hero рендерится снаружи него, а запись должна
// лежать под градиентом и текстом — переставляем внутрь сами. До этого
// момента она стоит на том же месте абсолютом от .VPHome, так что
// перестановка не мигает.
onMounted(() => {
	document.querySelector(".VPHome .VPHero")?.prepend(root.value);
	load();
});

// Палитру переключают на ходу, а запасной вход включается при ошибке —
// оба случая меняют адрес видимой записи.
watch([isDark, demoSource], () => nextTick(load));

function load() {
	// Тему на <html> ставит инлайн-скрипт темы ещё до гидрации, так что
	// видимая запись определяется по вычисленным стилям, а не по догадке
	// о палитре.
	const all = [...(root.value?.querySelectorAll("video") ?? [])];
	const shown = all.find((v) => getComputedStyle(v).display !== "none");
	if (!shown) return;

	// Палитру успевают переключить и во время гидрации: без этого адрес
	// остался бы и на записи другой темы, а значит уехал бы в сеть.
	for (const v of all) if (v !== shown) v.removeAttribute("src");

	const theme = shown.classList.contains("hero-light") ? "-light" : "";
	const src = `${demoSource.value}/hero${theme}.mp4`;
	if (shown.src === src) return;

	shown.poster = `${demoSource.value}/hero${theme}-poster.webp`;
	shown.src = src;
	shown.play().catch(() => {});
}
</script>

<template>
	<div ref="root" class="hero-demo">
		<video
			v-for="theme in ['', '-light']"
			:key="theme"
			:class="theme ? 'hero-light' : 'hero-dark'"
			width="1200"
			height="604"
			muted
			loop
			playsinline
			preload="none"
			aria-hidden="true"
			@error="demoUnreachable"
		/>
	</div>
</template>
