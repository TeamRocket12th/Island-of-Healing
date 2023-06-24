<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  articles: {
    type: Array as () => ArticleCard[],
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="mb-16">
    <h2 class="mb-6 font-serif-tc text-4xl font-bold leading-normal text-primary">{{ title }}</h2>
    <ArticleCard :articles="articles" />
  </div>
</template>

<style scoped></style>
