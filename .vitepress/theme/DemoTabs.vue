<!-- Табы «До | После» вместо одиночной гифки: те же сценарии записаны
дважды — с экстрой и без неё. Пары тёмная/светлая остаются внутри,
видимой парой управляет тема (см. custom.css). -->
<script setup>
import { computed, ref } from "vue";
import { useData } from "vitepress";

const props = defineProps({ name: String, alt: String });

const base = "https://raw.githubusercontent.com/aimuzov/lazyvimx/assets/demo";
const { lang } = useData();

const labels = computed(() => (lang.value === "ru" ? ["До", "После"] : ["Before", "After"]));
const showBefore = ref(false);

const suffix = computed(() => (showBefore.value ? "-before" : ""));
</script>

<template>
	<div class="demo-tabs">
		<div class="demo-tabs-bar">
			<button :class="{ active: showBefore }" type="button" @click="showBefore = true">{{ labels[0] }}</button>
			<button :class="{ active: !showBefore }" type="button" @click="showBefore = false">{{ labels[1] }}</button>
		</div>
		<p>
			<img class="gif-dark" loading="lazy" :src="`${base}/${name}${suffix}.gif`" :alt="alt" />
			<img class="gif-light" loading="lazy" :src="`${base}/${name}${suffix}-light.gif`" :alt="alt" />
		</p>
	</div>
</template>
