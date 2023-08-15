<script setup lang="ts">
const { data: treandingArticles } = useFetch('/api/trendArticles')
</script>
<template>
  <div>
    <h3 class="mb-4 font-serif-tc text-xl font-bold leading-normal text-primary">熱門文章</h3>
    <ul class="mb-3 pb-1 decoration-1 underline-offset-4">
      <li
        v-for="article in treandingArticles"
        :key="article.id"
        class="border-b border-sand-200 py-3"
      >
        <NuxtLink
          :to="`/article/${article.id}`"
          class="mb-2 block font-medium text-primary underline"
          >{{ article.title }}</NuxtLink
        >
        <div class="flex items-center text-sm font-light leading-normal text-primary-dark">
          <p>{{ article.writer }}</p>
          <span>·</span>
          <p>{{ article.createdDate }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
