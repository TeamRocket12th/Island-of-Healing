<script setup lang="ts">
const { apiBase } = useApiConfig()
const router = useRouter()

const conversationsArr = ref<TopicData[]>([])

const selectedCategory = ref('解憂相談室')
const toggleshowCategory = ref(false)
const ConversationsCategoryId = ref<number>(1)
const toggleCategory = (status: boolean) => {
  toggleshowCategory.value = status
}
const selectCategory = (category: string) => {
  selectedCategory.value = category
  switch (category) {
    case '解憂相談室':
      ConversationsCategoryId.value = 1
      break
    case '愛情相談室':
      ConversationsCategoryId.value = 4
      break
    case '靈魂相談室':
      ConversationsCategoryId.value = 6
      break
    case '職場相談室':
      ConversationsCategoryId.value = 7
      break
    default:
      ConversationsCategoryId.value = 1
      break
  }
  getSpTopic(1, ConversationsCategoryId.value)
}

const nowPage = ref<number>(1)
const allPages = ref<number | null>(null)
const TotalConversations = ref<number>(200)
const CategoryDescription = ref<string>('有什麼話就在這裡說說，說說之後 也許所有事情都會更好一點。')

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
      if (res.TotalPages === 0) {
        allPages.value = 1
      } else {
        allPages.value = res.TotalPages
      }
      conversationsArr.value = res.ConversationsData
      TotalConversations.value = res.TotalConversations
      CategoryDescription.value = res.CategoryDescription
      ConversationsCategoryId.value = category
    }
  } catch (error: any) {
    console.log(error.response)
  }
}
const handleReading = (page: number) => {
  getSpTopic(page, ConversationsCategoryId.value)
}
onMounted(() => getSpTopic(1, 1))
const topicPage = (id: number) => {
  router.push(`/forum/${id}`)
}
const { searchTopic } = useSearch()
</script>

<template>
  <div>
    <div class="dropdown mb-5">
      <label
        tabindex="0"
        class="btn flex justify-between rounded border-secondary bg-white"
        @click="toggleCategory(true)"
      >
        <span class="text-lg font-normal text-secondary">{{ selectedCategory }}</span>
        <Icon name="material-symbols:arrow-drop-down" size="24" class="text-primary" />
      </label>
      <ul
        v-if="toggleshowCategory"
        tabindex="0"
        class="dropdown-content menu rounded-box w-full border-secondary bg-base-100 p-2 shadow"
        @click="toggleCategory(false)"
      >
        <li>
          <a
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('解憂相談室')"
            >解憂相談室</a
          >
        </li>
        <li>
          <a
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('愛情相談室')"
            >愛情相談室</a
          >
        </li>
        <li>
          <a
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('靈魂相談室')"
            >靈魂相談室</a
          >
        </li>
        <li>
          <a
            class="text-primary hover:bg-secondary hover:text-white"
            @click="selectCategory('職場相談室')"
            >職場相談室</a
          >
        </li>
      </ul>
    </div>
    <div class="mb-[52px] flex items-center justify-between">
      <div class="text-primary-dark">
        <p class="mb-1">{{ TotalConversations }} 篇文章</p>
        <p>{{ CategoryDescription }}</p>
      </div>
      <NuxtLink to="/newtopic">
        <button class="flex rounded bg-secondary px-3 py-2 text-white">
          <Icon name="material-symbols:add" size="24"></Icon>
          <p>發表貼文</p>
        </button>
      </NuxtLink>
    </div>
    <div class="flex justify-between">
      <div class="flex gap-3">
        <button
          type="button"
          class="rounded border border-secondary px-2 py-1 text-secondary duration-300 hover:bg-secondary hover:text-white"
        >
          全部
        </button>
        <button
          type="button"
          class="rounded border border-secondary px-2 py-1 text-secondary duration-300 hover:bg-secondary hover:text-white"
        >
          最新
        </button>
        <button
          type="button"
          class="rounded border border-secondary px-2 py-1 text-secondary duration-300 hover:bg-secondary hover:text-white"
        >
          熱門
        </button>
        <button
          type="button"
          class="rounded border border-secondary px-2 py-1 text-secondary duration-300 hover:bg-secondary hover:text-white"
        >
          精選
        </button>
      </div>
      <SearchInput
        class="hidden sm:block"
        search-place-holder="話題搜尋"
        :search-fn="searchTopic"
      />
    </div>
    <ul>
      <li v-for="(topic, index) in conversationsArr" :key="index" class="border-b py-6">
        <div class="flex gap-6" @click="topicPage(topic.Id)">
          <div class="h-[150px] w-[220px] bg-[#D9D9D9]"></div>
          <div>
            <div class="mb-2 flex items-center gap-1">
              <div class="h-4 w-4 rounded-full bg-[#D9D9D9]"></div>
              <p class="text-sm text-primary-dark">{{ topic.PosterNickName }}</p>
            </div>
            <h3 class="mb-4 text-2xl text-primary">{{ topic.Title }}</h3>
            <p class="text-primary-dark">{{ topic.Summary }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="col-span-9 flex items-center justify-center pb-[233px] pt-20">
      <button
        :disabled="nowPage === 1"
        class="btn-page flex h-[38px] w-[38px] items-center justify-center border border-sand-200 bg-white text-secondary hover:bg-secondary hover:text-white disabled:text-btn-disabled disabled:hover:bg-white"
        @click="handleReading(nowPage - 1)"
      >
        <span>
          <Icon name="material-symbols:chevron-left" size="24" />
        </span>
      </button>

      <button
        v-for="(p, index) in allPages"
        :key="index"
        class="btn-page flex h-[38px] w-[35px] items-center justify-center border-b border-r border-t border-sand-200 px-4 py-3 hover:bg-secondary hover:text-white"
        :class="nowPage === p ? 'bg-secondary text-white' : 'bg-white text-secondary'"
        @click="handleReading(p)"
      >
        {{ p }}
      </button>
      <button
        :disabled="nowPage === allPages"
        class="btn-page flex h-[38px] w-[38px] items-center justify-center border-b border-r border-t border-sand-200 bg-white text-secondary hover:bg-secondary hover:text-white disabled:text-btn-disabled disabled:hover:bg-white"
        @click="handleReading(nowPage + 1)"
      >
        <span>
          <Icon name="material-symbols:chevron-right" size="24" />
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
