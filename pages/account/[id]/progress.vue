<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  title: '審核進度',
  pageName: 'progress',
  middleware: [isWriter],
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '審核進度' })

const { nowPage } = usePageName()
const { searchArticle } = useSearch()
</script>
<template>
  <div class="mb-40 border-primary bg-sand-100 px-10 pb-20 pt-10 lg:border">
    <div class="mb-6 items-center justify-between md:flex">
      <h2 class="mb-16 font-serif-tc text-2xl font-bold text-primary">審核進度</h2>
      <div class="flex items-center">
        <SearchInput :search-fn="searchArticle" />
      </div>
    </div>
    <div>
      <MyArticleTableTab :now-page="nowPage" />
      <MyArticleTable :now-page="nowPage" />
    </div>
  </div>
</template>

<style scoped></style>
