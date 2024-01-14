<template>
  <div
    class="min-w-full min-h-screen font-sans text-sm antialiased text-center bg-cover bg-center"
    v-bind:style="{ backgroundImage: `url(${bgPath})` }"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line import/no-unresolved
import bgPath from '@/assets/images/rickmorty-bgg.jpg'
</script>
