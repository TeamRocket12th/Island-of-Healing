<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
import { useToast } from '~/stores/toast'
import userOnly from '~/middleware/userOnly'

const { apiBase, userToken } = useApiConfig()
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()
const { showToast } = storeToRefs(useToast())

definePageMeta({
  middleware: [userOnly],
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '成為作家' })
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
    <div v-if="isLoading" class="pb-20"><LoadingItem /></div>
    <BewriterForm v-else :get-status="getStatus" :get-application="getApplyForWriterProgress" />
    <div class="fixed right-10 top-52 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
  </div>
</template>

<style scoped></style>
