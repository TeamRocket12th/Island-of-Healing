<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
import { useTopic } from '~/stores/topic'

const { isLoading } = storeToRefs(useLoading())
const { apiBase } = useApiConfig()
const { setLoading } = useLoading()
const topicUse = useTopic()
const route = useRoute()

useSeoMeta({ title: '搜尋結果' })

const searchTopic = ref<TopicData[]>([])
const getSearchResult = async (keyword: string) => {
  setLoading(true)
  try {
    const res: ApiResponse = await $fetch(
      `${apiBase}/searchconversation/${keyword}/${topicUse.nowPage}`
    )
    console.log(res)
    if (res.StatusCode === 200) {
      searchTopic.value = res.ConversationsData
      console.log(res.ConversationsData)
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    setLoading(false)
  }
}

watchEffect(async () => {
  if (route.query.q) {
    // clear current results
    searchTopic.value = []
    // load new results
    await getSearchResult(route.query.q as string)
  }
})
</script>

<template>
  <section>
    <div class="container h-full">
      <div class="pb-40 pt-[86px]">
        <div>
          <p class="mb-[47px] text-3xl font-medium text-primary">
            {{ `關於 「${route.query.q}」的話題` }}
          </p>
          <ul>
            <li v-for="topic in searchTopic" :key="topic.Id" class="border-b py-6">
              <TopicCard :topic="topic" />
            </li>
          </ul>
        </div>
        <div v-if="searchTopic.length === 0 && !isLoading" class="mb-40 mt-16">
          <p class="text-center text-3xl font-medium text-primary">
            沒有找到 {{ route.query.q }} 的相關結果
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
