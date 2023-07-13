<script setup lang="ts">
import { useLoading } from '~/stores/loading'

const { setLoading } = useLoading()

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
const followingWriters = ref([])

setLoading(true)
// 取得個人追蹤作家列表
const getFollowingList = async () => {
  if (!userToken.value) {
    alert('請先登入')
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
onMounted(getFollowingList)
</script>
<template>
  <div class="mb-52 border-primary bg-sand-100 pb-24 pt-10 md:border md:px-10">
    <h2
      class="mb-14 text-center font-serif-tc text-2xl font-bold leading-normal text-primary md:text-left"
    >
      我的追蹤
    </h2>
    <WriterCardWide :writer-info="followingWriters" />
  </div>
</template>

<style scoped></style>
