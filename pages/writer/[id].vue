<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const { isLogin, userData } = storeToRefs(userStore)

const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const route = useRoute()
const writerInfo = ref<WriterInfo | null>(null)
const writerWorks = ref<WriterWork[]>([])

const getWriterInfo = async () => {
  const userId = isLogin.value ? userData.value.id : '0'
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writerarticles/${route.params.id}/${userId}`)
    console.log(res)
    if (res.StatusCode === 200) {
      writerInfo.value = res.WriterData
      writerWorks.value = res.ArticlesData
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(getWriterInfo)
</script>

<template>
  <main class="bg-sand-100 pb-40">
    <section v-if="writerInfo" class="container grid-cols-12 gap-6 pb-[188px] pt-[60px] lg:grid">
      <div class="lg:col-span-4">
        <WriterCard :writer-info="writerInfo" :get-writer-info="getWriterInfo" />
      </div>
      <div class="lg:col-span-8">
        <WriterWorkCard :writer-works="writerWorks" />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
