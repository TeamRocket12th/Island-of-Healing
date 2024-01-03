<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'
import { useLoading } from '~/stores/loading'

const { chatLoading } = storeToRefs(useLoading())

const { selectedCharacter } = storeToRefs(useChatCharacters())

defineProps({
  chatMessages: {
    type: Object,
    default: () => {}
  },
  answer: {
    type: Object,
    default: () => {}
  },
  recArticles: {
    type: Array as PropType<RecArticles[]>,
    default: () => []
  },
  recIntro: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div v-if="selectedCharacter">
    <div class="mb-2 flex items-center gap-2">
      <NuxtImg width="40" height="40" class="mb-1 rounded-full" :src="selectedCharacter.imgUrl" />
      <p class="text-xl text-primary">{{ selectedCharacter.name }}</p>
    </div>
    <div class="chatbubble-bg chat-bubble mb-6 text-primary-dark">
      <p class="mb-1">{{ recIntro }}</p>
      <ul>
        <li v-for="article in recArticles" :key="article.id" class="mb-1">
          <NuxtLink :to="article.url" class="underline">
            {{ article.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <ul>
      <li v-for="(message, index) in chatMessages.clientMsgs" :key="index">
        <p
          class="flex"
          :class="message.role === 'assistant' ? 'chat-start' : 'chat-end justify-end'"
        >
          <span class="chatbubble-bg chat-bubble mb-10 text-primary-dark">{{
            message.content
          }}</span>
        </p>
      </li>
      <li v-if="answer">
        <p class="chat-start">
          <span class="chatbubble-bg chat-bubble text-primary-dark">{{ answer.content }}</span>
        </p>
      </li>
      <li v-if="chatLoading">
        <span class="loading loading-dots loading-sm text-secondary"></span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.chatbubble-bg {
  border-radius: 4px;
  background: linear-gradient(133deg, #fff 0%, rgba(255, 255, 255, 0.33) 100%);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
}
</style>
