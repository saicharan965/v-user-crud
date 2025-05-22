<template>
  <div class="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Edit User" : "Add User" }}
    </h2>
    <form @submit.prevent="submit">
      <label class="block mb-2">
        Name:
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
      </label>
      <label class="block mb-4">
        Email:
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
        />
      </label>
      <div class="flex justify-between">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {{ isEdit ? "Update" : "Add" }}
        </button>
        <button
          type="button"
          @click="cancel"
          class="text-gray-600 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter, useRoute } from "vue-router";

interface Form {
  id?: number;
  name: string;
  email: string;
}

const router = useRouter();
const route = useRoute();
const store = useUserStore();

const isEdit = ref(false);
const form = ref<Form>({ name: "", email: "" });

onMounted(() => {
  if (route.params.id) {
    // Edit mode
    isEdit.value = true;
    const id = Number(route.params.id);
    const user = store.getUserById(id);
    if (user) {
      form.value = { ...user };
    } else {
      alert("User not found");
      router.push("/users");
    }
  }
});

function submit() {
  if (isEdit.value) {
    store.updateUser(form.value as any);
  } else {
    // Generate a new ID (max existing + 1)
    const maxId = store.users.reduce((max, u) => (u.id > max ? u.id : max), 0);
    const newUser = { ...form.value, id: maxId + 1 };
    store.addUser(newUser as any);
  }
  router.push("/users");
}

function cancel() {
  router.push("/users");
}
</script>
