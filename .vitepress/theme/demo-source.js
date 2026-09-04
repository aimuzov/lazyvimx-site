import { computed, ref } from "vue";

import { demoBase, demoFallback } from "./demo-base.js";

// Первая же запись, которая не доехала с основного входа, переключает
// на запасной все остальные разом — иначе каждая ждала бы своей ошибки.
// Обратно не возвращаемся: не дошла одна — не дойдут и другие.
const broken = ref(false);

export const demoSource = computed(() => (broken.value ? demoFallback : demoBase));

export function demoUnreachable() {
	broken.value = true;
}
