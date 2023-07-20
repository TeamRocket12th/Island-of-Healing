<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
import userOnly from '~/middleware/userOnly'

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

definePageMeta({
  middleware: [userOnly],
  layout: 'userlayout',
  requiredAuth: true
})
// 取得申請成為作家狀態
const getStatus = ref('')
const getApplyForWriterProgress = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/applyforwriterprogress/get`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      // console.log(res.WriterProgress)
      getStatus.value = res.WriterProgress
      setLoading(false)
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
setLoading(true)
onMounted(getApplyForWriterProgress)
</script>
<template>
  <div class="mb-16 border-primary bg-sand-100 sm:mb-[213px] sm:border">
    <h2 class="mb-10 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">成為作家</h2>
    <div v-if="isLoading">Loading...</div>
    <BewriterForm v-else :get-status="getStatus" />
  </div>
</template>

<style scoped></style>
