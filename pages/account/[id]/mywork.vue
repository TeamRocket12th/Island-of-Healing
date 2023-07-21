<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  title: '文章列表',
  pageName: 'articleList',
  middleware: [isWriter],
  layout: 'userlayout',
  requiredAuth: true
})

const { nowPage } = usePageName()
</script>
<template>
  <div class="mb-40 border-primary bg-sand-100 pb-20 pt-10 lg:border lg:px-10">
    <div class="mb-6 items-center justify-between md:flex">
      <h2 class="mb-16 font-serif-tc text-2xl font-bold text-primary">文章列表</h2>
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
    <MyArticleTableTab :now-page="nowPage" />
    <MyArticleTable :now-page="nowPage" />
  </div>
</template>

<style scoped></style>
