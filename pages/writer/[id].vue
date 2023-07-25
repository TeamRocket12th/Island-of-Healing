<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()
const { isLogin, userData } = storeToRefs(useUserStore())

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
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

      setLoading(false)
    }
  } catch (error) {
    console.log(error)
  }
}

setLoading(true)
onMounted(() => {
  getWriterInfo(writerId, userId)
})
useSeoMeta({ title: () => `${writerInfo.value?.NickName}｜小島聊癒所` })
</script>

<template>
  <main class="overflow-hidden bg-sand-100 pb-40">
    <div id="point" class="relative">
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
          <WriterWorkCard v-else :writer-works="writerWorks" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
