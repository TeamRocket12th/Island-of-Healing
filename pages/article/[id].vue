<script setup>
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
</script>

<template>
  <main class="bg-sand-100 pb-6">
    <section class="container">
      <div class="grid-cols-12 gap-6 border-t border-primary pt-10 md:grid">
        <div class="col-span-full lg:col-span-7 lg:col-start-2">
          <ArticleDetail />
        </div>
        <div class="hidden md:col-span-3 md:col-start-10 lg:block">
          <ArticleSideBar />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
