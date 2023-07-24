<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'
import { useUserStore } from '~/stores/user'

const { apiBase, userToken } = useApiConfig()

const { userData } = storeToRefs(useUserStore())

const isChatCountLoading = ref(false)

const chatCount = ref(0)
const isLimited = ref(false)

useSeoMeta({ title: 'AI相談室' })
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
useHead({ title: 'AI相談室' })

const { selectCharacterId } = useChatCharacters()
const { id } = useRoute().params
selectCharacterId(id as string)
</script>

<template>
  <main class="pb-20">
    <section>
      <div class="min-h-16 mt-4">
        <div v-if="userData.myPlan === 'free' && !isChatCountLoading">
          <p v-if="isLimited" class="text-center text-xl text-primary">已達免費帳號上限</p>
          <p v-else class="text-center text-xl text-primary">免費試用中</p>
          <p class="mt-2 text-center text-primary">目前已使用 {{ chatCount }} / 5 次</p>
        </div>
      </div>

      <ChatWindow
        :chat-count="chatCount"
        :is-limited="isLimited"
        :get-chat-count="getChatCount"
        :increase-chat-count="increaseChatCount"
      />
    </section>
  </main>
</template>

<style scoped></style>
