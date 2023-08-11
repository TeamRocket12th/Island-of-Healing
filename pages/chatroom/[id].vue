<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'
import { useUserStore } from '~/stores/user'

const { apiBase, userToken } = useApiConfig()

const { userData } = storeToRefs(useUserStore())

const isChatCountLoading = ref(false)

const chatCount = ref(0)
const isLimited = ref(false)

watchEffect(() => {
  if (userData.value.myPlan === 'free' && chatCount.value === 5) {
    isLimited.value = true
  } else {
    isLimited.value = false
  }
})

// 取得AI聊天次數
const getChatCount = async () => {
  if (!userToken.value || userData.value.myPlan !== 'free') {
    return
  }
  isChatCountLoading.value = true
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/useaitimes/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    console.log(res)
    if (res.StatusCode === 200) {
      chatCount.value = res.UserAITimes
    }
  } catch (error: any) {
    console.log(error.response)
  } finally {
    isChatCountLoading.value = false
  }
}
useSeoMeta({
  title: '開始聊天'
})

// 在次數小於5時，不用重新get
const increaseChatCount = () => {
  if (chatCount.value < 5) {
    chatCount.value++
  } else {
    getChatCount()
  }
}

onMounted(getChatCount)

definePageMeta({
  layout: 'chatlayout',
  requiredAuth: true
})

const { selectCharacterId } = useChatCharacters()
const { id } = useRoute().params
selectCharacterId(id as string)

const openVideo = ref(false)
const closeVideo = (value: boolean) => {
  openVideo.value = value
}
</script>

<template>
  <main class="pb-20">
    <section>
      <div class="min-h-16 mt-4">
        <!-- <div v-if="userData.myPlan === 'free' && !isChatCountLoading">
          <p v-if="isLimited" class="text-center text-xl text-primary">已達免費帳號上限</p>
          <p v-else class="text-center text-xl text-primary">免費試用中</p>
          <p class="mt-2 text-center text-primary">目前已使用 {{ chatCount }} / 5 次</p>
        </div> -->
        <div class="text-center">
          <p class="mb-4 text-center text-xl text-primary">
            不好意思！ 目前員工休假中，暫不開放聊天...😅
          </p>
          <button
            type="button"
            class="inline-block rounded-md bg-secondary px-2 py-1 font-light text-white hover:bg-btn-hover"
            @click="openVideo = true"
          >
            觀看Demo影片
          </button>
        </div>
      </div>

      <ChatWindow
        :chat-count="chatCount"
        :is-limited="isLimited"
        :get-chat-count="getChatCount"
        :increase-chat-count="increaseChatCount"
      />
      <ChatVideo v-if="openVideo" @close-video="closeVideo" />
    </section>
  </main>
</template>

<style scoped></style>
