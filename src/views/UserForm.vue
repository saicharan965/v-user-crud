<!-- src/views/UserForm.vue -->
<template>
  <div class="p-6 max-w-xl mx-auto">
    <UserForm :user="user" @submit="handleSubmit" @cancel="handleCancel" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import UserForm from "@/components/UserForm.vue";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const id = Number(route.params.id);
const user = computed(() => store.getUserById(id) ?? null);

function handleSubmit(formData: { name: string; email: string }) {
  if (user.value) {
    // Edit user
    store.updateUser({ ...user.value, ...formData });
  } else {
    // Add new user with new ID
    const maxId = store.users.reduce((max, u) => (u.id > max ? u.id : max), 0);
    store.addUser({ id: maxId + 1, ...formData });
  }
  router.push("/users");
}

function handleCancel() {
  router.push("/users");
}
</script>
