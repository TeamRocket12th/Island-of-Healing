<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTopic } from '~/stores/topic'
import { useLoading } from '~/stores/loading'
const { apiBase } = useApiConfig()
const { searchTopic } = useSearch()
const topicUse = useTopic()
const { setLoading } = useLoading()
const { isLoading } = storeToRefs(useLoading())

const selectedCategory = ref('解憂相談室')
const toggleshowCategory = ref(false)
const conversationsCategoryId = ref<number>(1)
const toggleCategory = (status: boolean) => {
  toggleshowCategory.value = status
}
const selectCategory = (category: string) => {
  selectedCategory.value = category
  switch (category) {
    case '解憂相談室':
      conversationsCategoryId.value = 1
      break
    case '愛情相談室':
      conversationsCategoryId.value = 4
      topicUse.nowPage = 1
      break
    case '靈魂相談室':
      conversationsCategoryId.value = 6
      topicUse.nowPage = 1
      break
    case '職場相談室':
      conversationsCategoryId.value = 7
      topicUse.nowPage = 1
      break
    default:
      conversationsCategoryId.value = 1
      break
  }
  getSpTopic(1, conversationsCategoryId.value)
}

const allPages = ref<number>(1)
const totalConversations = ref<number>(200)

const conversations = ref<TopicData[]>([])
const scrollTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
// 瀏覽特定話題
const getSpTopic = async (nowPage: number, category: number) => {
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/readcategoryconversations`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: {
        ConversationsCategoryId: category,
        Page: nowPage
      }
    })
    if (res.StatusCode === 200) {
      scrollTop()
      allPages.value = res.TotalPages
      conversations.value = res.ConversationsData
      totalConversations.value = res.TotalConversations
      conversationsCategoryId.value = category
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    setLoading(false)
  }
}

onMounted(() => handleReading(1))
setLoading(true)

const handleReading = (page: number) => {
  getSpTopic(page, conversationsCategoryId.value)

  topicUse.nowPage = page
}
</script>

<template>
  <div class="mb-5 flex items-center justify-between sm:block">
    <div class="dropdown">
      <label
        tabindex="0"
        class="btn flex justify-between rounded border-secondary bg-white"
        @click="toggleCategory(true)"
      >
        <span class="text-normal font-normal text-secondary sm:text-lg">{{
          selectedCategory
        }}</span>
        <Icon name="material-symbols:arrow-drop-down" size="24" class="text-primary" />
      </label>
      <ul
        v-if="toggleshowCategory"
        tabindex="0"
        class="dropdown-content menu rounded-box w-full border-secondary bg-base-100 p-2 shadow"
        @click="toggleCategory(false)"
      >
        <li>
          <span
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('解憂相談室')"
            >解憂相談室</span
          >
        </li>
        <li>
          <span
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('愛情相談室')"
            >愛情相談室</span
          >
        </li>
        <li>
          <span
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('靈魂相談室')"
            >靈魂相談室</span
          >
        </li>
        <li>
          <span
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('職場相談室')"
            >職場相談室</span
          >
        </li>
      </ul>
    </div>
    <NuxtLink class="block sm:hidden" to="/newtopic">
      <button type="button" class="flex rounded bg-secondary px-3 py-2 text-white">
        <Icon name="material-symbols:add" size="24"></Icon>
        <p class="whitespace-nowrap">發表話題</p>
      </button>
    </NuxtLink>
  </div>

  <div class="mb-[52px] flex flex-wrap items-center justify-between gap-4 sm:gap-0">
    <div class="text-primary-dark">
      <p class="mb-1">{{ totalConversations }} 則話題</p>
      <p>有什麼話就在這裡說說，說說之後 也許所有事情都會更好一點。</p>
    </div>
    <NuxtLink class="hidden sm:block" to="/newtopic">
      <button class="flex rounded bg-secondary px-3 py-2 text-white">
        <Icon name="material-symbols:add" size="24"></Icon>
        <p class="whitespace-nowrap">發表話題</p>
      </button>
    </NuxtLink>
  </div>
  <div class="flex justify-end">
    <SearchInput class="hidden sm:block" search-place-holder="話題搜尋" :search-fn="searchTopic" />
  </div>
  <div v-if="isLoading" class="py-40">
    <LoadingItem />
  </div>
  <div v-else>
    <ul>
      <li v-for="topic in conversations" :key="topic.Id" class="border-b py-6">
        <TopicCard :topic="topic" />
      </li>
    </ul>
    <div class="col-span-9 flex items-center justify-center pb-[233px] pt-20">
      <button
        :disabled="topicUse.nowPage === 1"
        class="btn-page flex h-[38px] w-[38px] items-center justify-center border border-sand-200 bg-white text-secondary hover:bg-secondary hover:text-white disabled:text-btn-disabled disabled:hover:bg-white"
        @click="handleReading(topicUse.nowPage - 1)"
      >
        <span>
          <Icon name="material-symbols:chevron-left" size="24" />
        </span>
      </button>

      <button
        v-for="(p, index) in allPages"
        :key="index"
        class="btn-page flex h-[38px] w-[35px] items-center justify-center border-b border-r border-t border-sand-200 px-4 py-3 hover:bg-secondary hover:text-white"
        :class="topicUse.nowPage === p ? 'bg-secondary text-white' : 'bg-white text-secondary'"
        @click="handleReading(p)"
      >
        {{ p }}
      </button>
      <button
        :disabled="topicUse.nowPage === allPages"
        class="btn-page flex h-[38px] w-[38px] items-center justify-center border-b border-r border-t border-sand-200 bg-white text-secondary hover:bg-secondary hover:text-white disabled:text-btn-disabled disabled:hover:bg-white"
        @click="handleReading(topicUse.nowPage + 1)"
      >
        <span>
          <Icon name="material-symbols:chevron-right" size="24" />
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
