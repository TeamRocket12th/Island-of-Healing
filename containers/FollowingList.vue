<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const { apiBase, userToken } = useApiConfig()
const followingWriters = ref([])

// 取得個人追蹤作家列表
const getFollowingList = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/followedwriter/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      followingWriters.value = res.Data
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    setLoading(false)
  }
}
setLoading(true)
onMounted(getFollowingList)
</script>
<template>
  <div
    class="relative mb-52 overflow-hidden border-primary bg-sand-100 pb-24 pt-10 md:border md:px-10"
  >
    <h2
      class="mb-14 text-center font-serif-tc text-2xl font-bold leading-normal text-primary md:text-left"
    >
      我的追蹤
    </h2>
    <div v-if="isLoading"><LoadingItem /></div>
    <WriterCardWide v-else :writer-info="followingWriters" />
  </div>
</template>

<style scoped></style>
