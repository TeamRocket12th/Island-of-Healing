<script setup lang="ts">
const hotTopicList = [
  {
    title: '探索情緒的四個迷思',
    writer: '豬排飯',
    date: '2023-08-09',
    Id: 9
  },
  {
    title: '轉化焦慮為生活的優勢',
    writer: '餛飩麵',
    date: '2023-08-09',
    Id: 10
  },
  {
    title: '走出青鳥症候群，活出真實而有意義的生活',
    writer: '章魚燒',
    date: '2023-08-09',
    Id: 11
  },
  {
    title: '行動力的關鍵：三個方法提升自我效能',
    writer: '匿名',
    date: '2023-08-09',
    Id: 15
  }
]
</script>
<template>
  <div class="mb-4 text-xl font-bold text-primary">熱門話題</div>
  <ul>
    <li
      v-for="(hotTopic, index) in hotTopicList"
      :key="index"
      class="border-b border-primary/10 py-3 text-primary"
    >
      <NuxtLink :to="`/forum/${hotTopic.Id}`">
        <h5 class="inline cursor-pointer border-b border-primary font-medium">
          {{ hotTopic.title }}
        </h5>
      </NuxtLink>
      <div class="mt-2 flex font-light">
        <p>{{ hotTopic.writer }}</p>
        ·
        <p>{{ hotTopic.date }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
