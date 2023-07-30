<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()
const { isLogin, userData } = storeToRefs(useUserStore())

const { apiBase } = useApiConfig()
const route = useRoute()
const writerInfo = ref<WriterInfo | null>(null)
const writerWorks = ref<WriterWork[]>([])
const userId = isLogin.value ? String(userData.value.id) : '0'
const writerId = route.params.id as string

const getWriterInfo = async (writerId: string, userId: string) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writerarticles/${writerId}/${userId}`)
    console.log(res)
    if (res.StatusCode === 200) {
      writerInfo.value = res.WriterData
      writerWorks.value = res.ArticlesData
    }
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

setLoading(true)
onMounted(() => {
  getWriterInfo(writerId, userId)
  useSeoMeta({
    title: () => {
      if (writerInfo.value?.NickName) {
        return `${writerInfo.value?.NickName}｜小島聊癒所`
      }
      return '小島聊癒所'
    }
  })
})
</script>

<template>
  <main class="overflow-hidden bg-sand-100 pb-40">
    <section class="container grid-cols-12 gap-6 pb-[188px] pt-[60px] lg:grid">
      <div class="lg:col-span-4">
        <WriterCardSkeleton v-if="isLoading" />
        <WriterCard
          v-if="!isLoading && writerInfo"
          :writer-info="writerInfo"
          :get-writer-info="getWriterInfo"
          :user-id="userId"
          :writer-id="writerId"
        />
      </div>
      <div class="lg:col-span-8">
        <p v-if="isLoading" class="mt-10"><LoadingItem /></p>
        <WriterWorkCard v-if="!isLoading && writerInfo" :writer-works="writerWorks" />
      </div>
      <h2 v-if="!isLoading" class="col-span-full pb-60 pt-28 text-center text-3xl text-primary">
        找不到作家
      </h2>
    </section>
  </main>
</template>

<style scoped></style>
