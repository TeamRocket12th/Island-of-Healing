<script setup lang="ts">
const hotTopicList = [
  {
    title: '探索情緒的四個迷思',
    writer: '奧斯丁',
    date: '2023-05-23  '
  },
  {
    title: '轉化焦慮為生活的優勢',
    writer: '艾蜜莉',
    date: '2023-05-23  '
  },
  {
    title: '走出青鳥症候群，活出真實而有意義的生活',
    writer: '卡夫卡',
    date: '2023-05-23  '
  },
  {
    title: '行動力的關鍵：三個方法提升自我效能',
    writer: '莉莉安',
    date: '2023-05-23  '
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
      <h5 class="inline cursor-pointer border-b border-primary font-medium">
        {{ hotTopic.title }}
      </h5>
      <div class="mt-2 flex font-light">
        <p>{{ hotTopic.writer }}</p>
        ·
        <p>{{ hotTopic.date }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
