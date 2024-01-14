<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-md shadow-md">
      <h1 class="text-3xl font-bold mb-4">{{ `Error - ${statusCode}` }}</h1>
      <p class="text-lg">{{ message }}</p>
      <div class="m-6">
        <router-link
          to="/"
          class="bg-[#f9e009] text-[#414b5b] px-4 py-2 rounded"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ErrorProps } from '../types/types'

withDefaults(defineProps<ErrorProps>(), {
  title: 'Not Found',
  message: "We're sorry, but this page doesn't exist.",
  statusCode: 404,
})
</script>
