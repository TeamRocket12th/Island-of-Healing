<script setup lang="ts">
import isWriter from '~/middleware/isWriter'
definePageMeta({
  middleware: [isWriter],
  pageName: 'dashboard',
  layout: 'userlayout',
  requiredAuth: true
})

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const route = useRoute()
const writerStats = ref<WriterStats | null>(null)

const getWriterStats = async () => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/account/${route.params.id}/writerstats`)
    writerStats.value = res.data as WriterStats
    console.log(writerStats.value)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getWriterStats()
})

const articles = [
  {
    id: 1,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    publishDate: '2023-05-27',
    likeNum: 230,
    clickNum: 200,
    commentNum: 89
  },
  {
    id: 2,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    publishDate: '2023-05-27',
    likeNum: 230,
    clickNum: 200,
    commentNum: 89
  },
  {
    id: 3,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    publishDate: '2023-05-27',
    likeNum: 230,
    clickNum: 200,
    commentNum: 89
  },
  {
    id: 4,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    publishDate: '2023-05-27',
    likeNum: 230,
    clickNum: 200,
    commentNum: 89
  },
  {
    id: 5,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    publishDate: '2023-05-27',
    likeNum: 230,
    clickNum: 200,
    commentNum: 89
  },
  {
    id: 6,
    title: '打破 3 種常見的「認知偏見」，從自我覺察開始',
    publishDate: '2023-05-27',
    likeNum: 230,
    clickNum: 200,
    commentNum: 89
  }
]

const { nowPage } = usePageName()
</script>
<template>
  <div class="mb-40 border border-primary bg-white px-10 pt-10">
    <h2 class="mb-10 font-serif-tc text-2xl font-bold leading-normal">後台數據</h2>
    <div>
      <MyDashboard v-if="writerStats" :writer-stats="writerStats" />
      <div class="mb-28 pb-14">
        <MyArticleTableTab :now-page="nowPage" />
        <MyArticleTable :table-data="articles" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
