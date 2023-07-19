<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
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
    console.log(res)
    if (res.StatusCode === 200) {
      setLoading(false)
      console.log(res.Data)
      followingWriters.value = res.Data
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
setLoading(true)
onMounted(getFollowingList)
</script>
<template>
  <div
    class="relative mb-52 overflow-hidden border-primary bg-sand-100 pb-24 pt-10 md:border md:px-10"
  >
    <div id="point">
      <h2
        class="mb-14 text-center font-serif-tc text-2xl font-bold leading-normal text-primary md:text-left"
      >
        我的追蹤
      </h2>
      <div v-if="isLoading">Loading...</div>
      <WriterCardWide v-else :writer-info="followingWriters" />
    </div>
  </div>
</template>

<style scoped></style>
