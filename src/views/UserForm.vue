<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1 w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white">Name</label>
      <input v-model="form.name" type="text" required  />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1 w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white">Email</label>
      <input v-model="form.email" type="email" required  />
    </div>
    <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
      {{ isEdit ? "Update User" : "Create User" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { User } from "../models/user.model";

const props = defineProps<{
  user?: User;
  onSubmit: (data: UserFormInput) => void;
}>();

const isEdit = !!props.user;
const form = reactive<UserFormInput>({
  name: props.user?.name ?? "",
  email: props.user?.email ?? "",
});

watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name;
      form.email = newVal.email;
    }
  }
);

type UserFormInput = {
  name: string;
  email: string;
};

function handleSubmit() {
  props.onSubmit({ ...form });
}
</script>

<style scoped>

</style>
