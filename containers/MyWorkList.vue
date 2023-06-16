<script setup lang="ts">
const articles = [
  {
    id: 1,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    collectNum: 324,
    publishDate: '2023-05-27',
    commentNum: 58
  },
  {
    id: 2,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    collectNum: 324,
    publishDate: '2023-05-27',
    commentNum: 58
  },
  {
    id: 3,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    collectNum: 324,
    publishDate: '2023-05-27',
    commentNum: 58
  },
  {
    id: 4,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    collectNum: 324,
    publishDate: '2023-05-27',
    commentNum: 58
  },
  {
    id: 5,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    collectNum: 324,
    publishDate: '2023-05-27',
    commentNum: 58
  },
  {
    id: 6,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    collectNum: 324,
    publishDate: '2023-05-27',
    commentNum: 58
  }
]
</script>
<template>
  <div class="mb-[200px]">
    <MyArticleTableTab />
    <MyArticleTable :table-data="articles" />
  </div>
</template>

<style scoped></style>
