<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'

const { selectedCharacter } = storeToRefs(useChatCharacters())

defineProps({
  chatMessages: {
    type: Object,
    default: () => {}
  },
  answer: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <ul v-if="selectedCharacter">
    <li v-for="(message, index) in chatMessages.clientMsgs" :key="index">
      <img
        v-if="message.role === 'assistant'"
        class="mb-1 w-10 rounded-lg"
        :src="selectedCharacter.imgUrl"
      />
      <p class="flex" :class="message.role === 'assistant' ? 'chat-start' : 'chat-end justify-end'">
        <span class="chat-bubble mb-5 bg-gray-700">{{ message.content }}</span>
      </p>
    </li>
    <li v-if="answer">
      <img class="mb-1 w-10 rounded-lg" :src="selectedCharacter.imgUrl" />
      <p class="chat-start">
        <span class="chat-bubble bg-gray-700">{{ answer.content }}</span>
      </p>
    </li>
  </ul>
</template>

<style scoped></style>
