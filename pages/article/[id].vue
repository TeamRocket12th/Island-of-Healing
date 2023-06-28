<script setup>
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
</script>

<template>
  <main class="bg-sand-100">
    <section class="container">
      <div class="grid grid-cols-12 gap-6 border-t border-primary pt-10">
        <div class="col-span-7 col-start-2">
          <ArticleDetail />
        </div>
        <div class="col-span-3 col-start-10">
          <ArticleSideBar />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
