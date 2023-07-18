<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

const userToken = useCookie('token')
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase

const { userData } = storeToRefs(useUserStore())
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

setLoading(true)

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
      setLoading(false)
    }
  } catch (error: any) {
    console.log(error.response)
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
</script>

<template>
  <main class="pb-20">
    <div v-if="!isLoading">
      <p v-if="isLimited" class="mt-10 text-center text-xl">已達免費帳號上限</p>
      <p v-else class="mt-10 text-center text-xl">免費試用中</p>
      <p class="mt-2 text-center">目前已經問了 {{ chatCount }} / 5 題</p>
    </div>

    <ChatWindow :chat-count="chatCount" :is-limited="isLimited" :get-chat-count="getChatCount" />
  </main>
</template>
