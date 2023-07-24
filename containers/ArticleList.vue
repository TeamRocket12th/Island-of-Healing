<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
const { isLoading } = storeToRefs(useLoading())
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
  },
  skeletonNum: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="mb-16">
    <h2 class="mb-6 font-serif-tc text-4xl font-bold leading-normal text-primary">{{ title }}</h2>
    <div>
      <ul v-if="isLoading" class="grid-cols-2 gap-6 sm:grid md:grid-cols-3">
        <li v-for="num in skeletonNum" :key="num" class="col-span-1 mb-6 border sm:mb-0">
          <ArticleCardSkeleton />
        </li>
      </ul>
      <ul v-else class="grid-cols-2 gap-6 sm:grid md:grid-cols-3">
        <li
          v-for="article in articles"
          :key="article.Id"
          class="card-shadow col-span-1 mb-6 sm:mb-0"
        >
          <ArticleCard :article="article" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(156, 163, 175, 0.1);
}
</style>
