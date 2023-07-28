<script setup lang="ts">
const treandingArticles = [
  {
    id: 56,
    title: '探索情緒的四個迷思',
    writer: '奧斯汀',
    createdDate: '2023-07-12'
  },
  {
    id: 57,
    title: '轉化焦慮為生活的優勢',
    writer: '艾蜜莉',
    createdDate: '2023-07-12'
  },
  {
    id: 59,
    title: '走出青鳥症候群，活出真實而有意義的生活',
    writer: '卡夫卡',
    createdDate: '2023-07-12'
  },
  {
    id: 60,
    title: '行動力的關鍵：三個方法提升自我效能',
    writer: '莉莉安',
    createdDate: '2023-07-12'
  }
]
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
