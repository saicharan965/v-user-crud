<!-- src/components/UserForm.vue -->
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
import { ref, watch, defineProps, defineEmits } from "vue";

interface UserFormData {
  id?: number;
  name: string;
  email: string;
}

const props = defineProps<{
  user?: UserFormData | null;
}>();

const emit = defineEmits<{
  (e: "submit", formData: { name: string; email: string }): void;
  (e: "cancel"): void;
}>();

const form = ref<{ name: string; email: string }>({
  name: "",
  email: "",
});

const isEdit = ref(false);

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value.name = newUser.name;
      form.value.email = newUser.email;
      isEdit.value = true;
    } else {
      form.value.name = "";
      form.value.email = "";
      isEdit.value = false;
    }
  },
  { immediate: true }
);

function submit() {
  emit("submit", { ...form.value });
}

function cancel() {
  emit("cancel");
}
</script>
