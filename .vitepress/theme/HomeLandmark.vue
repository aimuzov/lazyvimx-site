<!-- У страниц документации есть <main>, а у лендинга нет: тема рисует
его отдельным компонентом без ориентира. Скринридер в итоге не может
перескочить к содержимому — размечаем контейнер ролью вручную.

Компонент живёт в слоте лендинга, так что на доках не сработает и
второго main не появится. -->
<script setup>
import { onMounted } from "vue";

onMounted(() => document.getElementById("VPContent")?.setAttribute("role", "main"));
</script>

<template><span hidden /></template>
