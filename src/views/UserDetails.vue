<template>
  <transition name="slide">
    <div
      class="drawer fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 shadow-lg z-50 p-6 overflow-y-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold">User Details</h3>
        <button @click="$emit('close')" class="text-red-500">Close</button>
      </div>

      <div v-if="user" class="space-y-2">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <div v-else>
        <p>User not found.</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";

const props = defineProps<{ userId: number }>();
const emit = defineEmits(["close"]);

const store = useUserStore();

const user = computed(
  () => store.users.find((u) => u.id === props.userId) || null
);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
