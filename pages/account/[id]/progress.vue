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
  <div class="mb-[200px] rounded-lg bg-white px-10 pb-20 pt-20">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">審核進度</h2>
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
