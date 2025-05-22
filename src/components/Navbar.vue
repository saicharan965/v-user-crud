<template>
  <nav
    class="bg-indigo-700 text-white dark:bg-gray-900 dark:text-gray-100 shadow-md"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <RouterLink to="/" class="text-xl font-bold tracking-wide">
          UserCRUD
        </RouterLink>
        <div class="space-x-4 flex items-center">
          <RouterLink to="/" class="hover:underline transition"
            >Home</RouterLink
          >
          <RouterLink to="/users" class="hover:underline transition"
            >Users</RouterLink
          >
          <RouterLink to="/users/new" class="hover:underline transition"
            >Add User</RouterLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
