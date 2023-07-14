<script setup>
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'

const { selectedCharacter } = storeToRefs(useChatCharacters())

const answer = ref(null)
const question = ref('')

const chatMessages = {
  clientMsgs: selectedCharacter.value.clientMsgs,
  serverMsgs: selectedCharacter.value.serverMsgs
}

const askQuestion = async () => {
  if (!question.value) {
    alert('請先輸入問題')
    return
  }
  chatMessages.clientMsgs.push({
    role: 'user',
    content: question.value
  })
  question.value = ''
  const stream = await getAnswer({ messages: chatMessages })
  answer.value = {
    role: 'assistant',
    content: ''
  }
  useChatStream({
    stream,
    onChunk: ({ data }) => {
      answer.value.content += data
    },
    onReady: () => {
      chatMessages.clientMsgs.push(answer.value)
      answer.value = null
    }
  })
}

const handleEnterKey = (event) => {
  if (event.isComposing) {
    return
  }
  if (event.key === 'Enter') {
    askQuestion()
  }
}

const scrollContainer = ref(null)

const scrollToBottom = () => {
  scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
}
onUpdated(() => {
  scrollToBottom()
})
</script>

<template>
  <section class="container py-10">
    <div class="grid-cols-12 sm:grid">
      <div class="col-span-8 col-start-3">
        <div class="relative rounded-md">
          <!-- Message container -->
          <div
            id="message-container"
            ref="scrollContainer"
            class="h-[500px] overflow-y-scroll sm:p-4"
          >
            <ChatBubbles :chat-messages="chatMessages" :answer="answer" />
          </div>
          <!-- Input form -->
          <div class="absolute -bottom-12 flex w-full items-center justify-center">
            <div class="relative w-full">
              <input
                v-model.trim="question"
                type="text"
                class="w-full rounded-md border border-secondary px-4 py-2 placeholder:text-sand-300 focus:outline-secondary"
                placeholder="說點什麼吧？"
                @keydown.enter="handleEnterKey"
              />
              <button
                class="absolute right-0 h-full w-[50px] rounded-r-md py-1 text-secondary hover:bg-secondary hover:text-white"
                @click="askQuestion"
              >
                <Icon name="material-symbols:send-outline" size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
