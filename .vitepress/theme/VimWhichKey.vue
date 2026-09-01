<!-- Панель which-key над статуслайном: продолжения набранной
последовательности, а по «?» — вся раскладка сразу. -->
<script setup>
defineProps({ panel: Object });
</script>

<template>
	<div class="vim-whichkey" aria-hidden="true">
		<div class="head">{{ panel.title }}</div>
		<!-- Заголовок группы занимает всю строку сетки, пункты текут
		     колонками под ним. -->
		<div class="groups">
			<template v-for="(group, i) in panel.groups" :key="i">
				<div v-if="group.title" class="title">{{ group.title }}</div>
				<div v-for="item in group.items" :key="item.seq" class="row">
					<span class="seq">{{ item.seq }}</span>
					<span class="arrow">→</span>
					<span class="text">{{ item.text }}</span>
				</div>
			</template>
		</div>
	</div>
</template>
