<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="container mb-16">
    <h2 class="mb-6 text-2xl font-bold">{{ title }}</h2>
    <ArticleCard />
  </div>
</template>

<style scoped></style>
