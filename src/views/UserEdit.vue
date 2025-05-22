<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Edit User" : "Create User" }}
    </h2>
    <UserForm :user="user" :onSubmit="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import UserForm from "@/components/UserForm.vue";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const id = Number(route.params.id);
const isEdit = computed(() => !isNaN(id));
const user = computed(() => store.users.find((u) => u.id === id));

function handleSave(formData: { name: string; email: string }) {
  if (isEdit.value && user.value) {
    store.updateUser({ ...user.value, ...formData });
  } else {
    const newId = Math.max(...store.users.map((u: { id: any; }) => u.id)) + 1;
    store.addUser({ id: newId, ...formData });
  }
  router.push("/users");
}
</script>
