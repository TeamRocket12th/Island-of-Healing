<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

useSeoMeta({
  title: '小島聊癒所',
  ogDescription: '提供心靈療癒的庇護所',
  ogTitle: '小島聊癒所'
})

const latestArticles = ref<ArticleCard[]>([])
const { userData } = storeToRefs(useUserStore())

const { data, error } = await useFetch<ApiResponse>('/api/allarticles', {
  headers: {
    'Content-type': 'application/json'
  },
  method: 'POST',
  body: {
    Page: 1,
    UserId: userData.value.id || '0'
  },
  lazy: true
})

if (data.value?.StatusCode === 200) {
  latestArticles.value = data.value?.LatestArticleData
}

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
</script>

<template>
  <div>
    <BannerArea />
    <LatestArticleCard :latest-articles="latestArticles" />
    <TrendingCreater />
    <HomeArticleCard />
  </div>
</template>
