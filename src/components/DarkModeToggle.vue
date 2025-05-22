<template>
  <button
    @click="toggleDarkMode"
    class="rounded-full px-4 py-2 bg-gray-200 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-100 transition"
  >
    {{ isDark ? "🌙 Dark" : "☀️ Light" }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDark = ref(false);

function toggleDarkMode() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

onMounted(() => {
  const stored = localStorage.getItem("theme");
  isDark.value = stored === "dark";
  document.documentElement.classList.toggle("dark", isDark.value);
});
</script>
