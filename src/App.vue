<template>
  <div
    class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300"
  >
    <Navbar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>
