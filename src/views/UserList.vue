<template>
  <div class="p-6">
    <h2 class="text-3xl font-semibold mb-4">Users</h2>
    <table class="min-w-full border dark:border-gray-700">
      <thead class="bg-indigo-600 text-white dark:bg-indigo-800">
        <tr>
          <th class="p-2 text-left">ID</th>
          <th class="p-2 text-left">Name</th>
          <th class="p-2 text-left">Email</th>
          <th class="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in store.users"
          :key="user.id"
          class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
          @click="openDetails(user)"
        >
          <td class="p-2">{{ user.id }}</td>
          <td class="p-2">{{ user.name }}</td>
          <td class="p-2">{{ user.email }}</td>
          <td class="p-2 space-x-2" @click.stop>
            <RouterLink
              :to="`/users/${user.id}/edit`"
              class="text-yellow-600 dark:text-yellow-400 hover:underline"
            >
              Edit
            </RouterLink>
            <button
              @click="deleteUser(user.id)"
              class="text-red-600 dark:text-red-400 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <transition name="slide">
      <div
        v-if="selectedUser"
        class="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 shadow-lg z-50 p-6 overflow-y-auto"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">User Details</h3>
          <button @click="selectedUser = null" class="text-red-500">
            Close
          </button>
        </div>
        <div class="space-y-2">
          <p><strong>ID:</strong> {{ selectedUser.id }}</p>
          <p><strong>Name:</strong> {{ selectedUser.name }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";

const store = useUserStore();
const selectedUser = ref(
  null as null | { id: number; name: string; email: string }
);

function openDetails(user: { id: number; name: string; email: string }) {
  selectedUser.value = user;
}

function deleteUser(id: number) {
  if (confirm("Are you sure you want to delete this user?")) {
    store.deleteUser(id);
    if (selectedUser.value?.id === id) selectedUser.value = null;
  }
}
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
