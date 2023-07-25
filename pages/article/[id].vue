<script setup>
import { storeToRefs } from 'pinia'
import ArticleSideBar from '~/containers/ArticleSideBar.vue'
import { useArticle } from '~/stores/article'

const { articleTitle } = storeToRefs(useArticle())

useSeoMeta({ title: () => `小島聊癒所` })

watch(articleTitle, (newTitle) => {
  useSeoMeta({ title: () => `${newTitle}` })
})
</script>

<template>
  <section class="bg-sand-100 pb-6">
    <div class="container">
      <div class="grid-cols-12 gap-6 border-primary pt-10 sm:border-t-[0.5px] md:grid">
        <div class="col-span-full lg:col-span-7 lg:col-start-2">
          <ArticleDetail />
        </div>
        <div class="hidden md:col-span-3 md:col-start-10 lg:block">
          <ArticleSideBar />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
