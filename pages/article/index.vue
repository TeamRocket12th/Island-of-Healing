<script setup>
import ArticleList from '~/containers/ArticleList.vue'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
</script>

<template>
  <div>
    <ArticleList title="最新文章" />
    <ArticleList title="精選文章" />
    <ArticleList title="你可能會喜歡" />
    <ArticleSideBar />
  </div>
</template>

<style scoped></style>
