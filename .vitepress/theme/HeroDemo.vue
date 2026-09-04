<!-- Запись под hero лендинга: раньше это была гифка фоном в CSS, почти
мегабайт и самый долгий элемент первого экрана. Теперь mp4, а место
держит постер первого кадра — двадцать килобайт.

Записей две, по одной на палитру. Скрытую браузер не грузит, а класс
темы стоит на <html> ещё до гидрации — значит с первого байта видно,
какую из них качать. -->
<script setup>
import { onMounted, ref } from "vue";

import { demoBase } from "./demo-base.js";

const root = ref(null);

// Единственный слот перед hero рендерится снаружи него, а запись должна
// лежать под градиентом и текстом — переставляем внутрь сами. До этого
// момента она стоит на том же месте абсолютом от .VPHome, так что
// перестановка не мигает.
onMounted(() => document.querySelector(".VPHome .VPHero")?.prepend(root.value));
</script>

<template>
	<div ref="root" class="hero-demo">
		<video
			v-for="theme in ['', '-light']"
			:key="theme"
			:class="theme ? 'hero-light' : 'hero-dark'"
			:src="`${demoBase}/hero${theme}.mp4`"
			:poster="`${demoBase}/hero${theme}-poster.webp`"
			width="1200"
			height="604"
			autoplay
			muted
			loop
			playsinline
			aria-hidden="true"
		/>
	</div>
</template>
