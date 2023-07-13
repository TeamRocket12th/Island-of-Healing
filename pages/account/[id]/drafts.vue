<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  middleware: [isWriter],
  pageName: 'drafts',
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
      <h2 class="mb-16 font-serif-tc text-2xl font-bold">我的草稿</h2>
      <div class="flex items-center">
        <NuxtLink
          to="/newstory"
          class="mr-4 rounded-[4px] bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
        >
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
