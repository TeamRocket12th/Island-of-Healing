<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
const collectedArticle = ref([])
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

// 取得個人收藏文章列表
const getCollectedArticleList = async () => {
  if (!userToken.value) {
    alert('請先登入')
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
    console.log(res)
    if (res.StatusCode === 200) {
      collectedArticle.value = res.Data
      setLoading(false)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
onMounted(getCollectedArticleList)
</script>
<template>
  <div class="mb-16 border-primary bg-sand-100 sm:mb-[213px] sm:border">
    <h2 class="mb-10 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">我的收藏</h2>
    <div v-if="isLoading">Loading...</div>
    <CollectionCard v-else :collected-articles="collectedArticle" />
  </div>
</template>

<style scoped></style>
