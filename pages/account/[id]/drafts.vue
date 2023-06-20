<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  middleware: [isWriter],
  pageName: 'drafts',
  layout: 'userlayout'
})

const { nowPage } = usePageName()

const articles = [
  {
    id: 1,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    progress: '-',
    publishDate: '2023-05-27',
    permission: '所有人'
  },
  {
    id: 2,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    progress: '-',
    publishDate: '2023-05-27',
    permission: '付費會員'
  },
  {
    id: 3,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    progress: '-',
    publishDate: '2023-05-27',
    permission: '一般會員'
  },
  {
    id: 4,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    progress: '-',
    publishDate: '2023-05-27',
    permission: '付費會員'
  },
  {
    id: 5,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    progress: '-',
    publishDate: '2023-05-27',
    permission: '付費會員'
  },
  {
    id: 6,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    progress: '-',
    publishDate: '2023-05-27',
    permission: '付費會員'
  }
]
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
