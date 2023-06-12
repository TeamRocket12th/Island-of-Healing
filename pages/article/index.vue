<script setup>
import ArticleList from '~/containers/ArticleList.vue'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
</script>

<template>
  <div class="container grid grid-cols-12">
    <div class="col-span-9">
      <ArticleList title="最新文章" />
      <ArticleList title="精選文章" />
      <ArticleList title="你可能會喜歡" />
    </div>
    <div class="col-span-3">
      <ArticleSideBar />
    </div>
  </div>
</template>

<style scoped></style>
