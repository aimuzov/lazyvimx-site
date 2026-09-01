<!-- Метки на видимых ссылках, как прыжки flash.nvim: набранная часть
гаснет, оставшаяся ведёт к переходу. -->
<script setup>
defineProps({ items: Array, typed: String });
</script>

<template>
	<div class="vim-hints" aria-hidden="true">
		<span
			v-for="item in items"
			v-show="item.label.startsWith(typed)"
			:key="item.label"
			class="hint"
			:style="{ top: `${item.rect.top}px`, left: `${item.rect.left}px` }"
		>
			<span class="done">{{ typed }}</span>{{ item.label.slice(typed.length) }}
		</span>
	</div>
</template>
