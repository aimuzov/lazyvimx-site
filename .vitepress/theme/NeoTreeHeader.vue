<!-- Шапка панели как у neo-tree: корень дерева с путём проекта. -->
<script setup>
import { useData } from "vitepress";

const { lang } = useData();
</script>

<template>
	<div class="neo-tree-header">
		<span class="icon">📂</span>
		<span class="root">~/lazyvimx</span>
		<span class="hint">{{ lang === "ru" ? "документация" : "docs" }}</span>
	</div>
</template>
