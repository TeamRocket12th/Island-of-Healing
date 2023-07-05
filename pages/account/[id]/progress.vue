<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  title: '審核進度',
  pageName: 'progress',
  middleware: [isWriter],
  layout: 'userlayout',
  requiredAuth: true
})

const { nowPage } = usePageName()
const { data: articles, error } = getMockData<ArticleSummary>('account', 'mywork')
if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="mb-40 border-primary bg-sand-100 px-10 pb-20 pt-10 lg:border">
    <div class="mb-6 items-center justify-between md:flex">
      <h2 class="mb-16 font-serif-tc text-2xl font-bold">審核進度</h2>
      <div class="flex items-center">
        <SearchInput />
      </div>
    </div>
    <div>
      <MyArticleTableTab :now-page="nowPage" />
      <MyArticleTable :table-data="articles" :now-page="nowPage" />
    </div>
  </div>
</template>

<style scoped></style>
