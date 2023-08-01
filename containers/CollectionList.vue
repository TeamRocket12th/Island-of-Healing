<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'

const { apiBase, userToken } = useApiConfig()
const collectedArticle = ref([])
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

// 取得個人收藏文章列表
const getCollectedArticleList = async () => {
  if (!userToken.value) {
    return
  }
  setLoading(true)
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/collectedarticles/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      collectedArticle.value = res.Data
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    setLoading(false)
  }
}
onMounted(getCollectedArticleList)
</script>
<template>
  <div class="border-primary bg-sand-100 pb-24 sm:mb-[213px] sm:border">
    <h2 class="mb-10 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">我的收藏</h2>
    <div v-if="isLoading"><LoadingItem /></div>
    <CollectionCard v-else :collected-articles="collectedArticle" />
  </div>
</template>

<style scoped></style>
