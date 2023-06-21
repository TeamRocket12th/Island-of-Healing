<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  middleware: [isWriter],
  pageName: 'drafts',
  layout: 'userlayout',
  requiredAuth: true
})

const { nowPage } = usePageName()

const { data: articles, error } = getMockData<ArticleSummary>('mywork')
if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="mb-[200px] rounded-lg bg-white px-10 pb-20 pt-20">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">我的草稿</h2>
      <div class="flex items-center">
        <NuxtLink to="/" class="mr-4 rounded-[4px] bg-[#9F9F9F] px-4 py-2 text-white">
          <div class="flex items-center"><Icon name="ic:outline-plus" size="20" /> 新增文章</div>
        </NuxtLink>
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
