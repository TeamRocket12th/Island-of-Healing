<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const route = useRoute()
const writerInfo = ref<WriterInfo | null>(null)

const getWriterInfo = async () => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/writer/${route.params.id}`)
    if (res.statusCode === 200) {
      writerInfo.value = res.data
      console.log(writerInfo.value)
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
        <WriterCard :writer-info="writerInfo" />
      </div>
      <div class="lg:col-span-8">
        <WriterWorkCard :writer-work="writerInfo.work" />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
