<script setup>
import { storeToRefs } from 'pinia'
import { useChatCharacters } from '~/stores/characters'
import { useUserStore } from '~/stores/user'
import { useLoading } from '~/stores/loading'

const { setChatLoading } = useLoading()

const { userData } = storeToRefs(useUserStore())
const { apiBase, userToken } = useApiConfig()

const props = defineProps({
  chatCount: {
    type: Number,
    required: true,
    default: 0
  },
  isLimited: {
    type: Boolean,
    required: true,
    default: false
  },
  getChatCount: {
    type: Function,
    required: true
  },
  increaseChatCount: {
    type: Function,
    required: true
  }
})

// 記錄AI聊天次數+1
const saveChatCount = async () => {
  if (!userToken.value || userData.value.myPlan !== 'free') {
    return
  }
  try {
    const res = await $fetch(`${apiBase}/useaitimes/add`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      },
      method: 'PUT'
    })
    console.log(res)
    if (res.StatusCode === 200) {
      console.log(res)
      props.increaseChatCount()
    }
  } catch (error) {
    console.log(error.response)
  }
}

const { selectedCharacter } = storeToRefs(useChatCharacters())

const answer = ref(null)
const question = ref('')

const chatMessages = {
  clientMsgs: selectedCharacter.value.clientMsgs,
  serverMsgs: selectedCharacter.value.serverMsgs
}

// ChatGpt Stream模式(逐字回覆)，部署到vercel不支援
// const askQuestion = async () => {
//   if (props.isLimited) {
//     alert('已達免費帳號上限')
//     return
//   }

//   if (!question.value) {
//     alert('請先輸入問題')
//     return
//   }
//   setLoading(true)
//   saveChatCount()
//   chatMessages.clientMsgs.push({
//     role: 'user',
//     content: question.value
//   })
//   question.value = ''
//   const stream = await getAnswer({ messages: chatMessages })
//   answer.value = {
//     role: 'assistant',
//     content: ''
//   }
//   useChatStream({
//     stream,
//     onChunk: ({ data }) => {
//       answer.value.content += data
//     },
//     onReady: () => {
//       chatMessages.clientMsgs.push(answer.value)
//       answer.value = null
//       setLoading(false)
//     }
//   })
// }

const getResponse = async (chatmsgs) => {
  setChatLoading(true)
  try {
    const res = await $fetch('/api/sendmsg', {
      method: 'POST',
      body: JSON.stringify({ messages: chatmsgs })
    })
    if (res.ok) {
      answer.value = res.message
      chatMessages.clientMsgs.push(answer.value)
      answer.value = null
    }
  } catch (error) {
    console.log(error.response)
  } finally {
    setChatLoading(false)
  }
}

const sendQuestion = () => {
  if (props.isLimited) {
    alert('已達免費帳號上限')
    return
  }

  if (!question.value) {
    alert('請先輸入問題')
    return
  }

  saveChatCount()
  chatMessages.clientMsgs.push({
    role: 'user',
    content: question.value
  })
  question.value = ''
  console.log(chatMessages)
  getResponse(chatMessages)
}

const handleEnterKey = (event) => {
  if (event.isComposing) {
    return
  }
  if (event.key === 'Enter') {
    sendQuestion()
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
  <div class="animate-fadein container">
    <div class="grid-cols-12 sm:grid">
      <div class="col-span-8 col-start-3">
        <div class="relative rounded-md">
          <!-- Message container -->
          <div
            id="message-container"
            ref="scrollContainer"
            class="h-[400px] overflow-y-scroll sm:p-4"
          >
            <ChatBubbles :chat-messages="chatMessages" :answer="answer" />
          </div>
          <!-- Input form -->
          <div class="absolute -bottom-12 flex w-full items-center justify-center">
            <div class="relative w-full">
              <input
                v-model.trim="question"
                type="text"
                class="w-full rounded-md border-none px-4 py-2 placeholder:text-sand-300 focus:outline-secondary disabled:opacity-90"
                placeholder="說點什麼吧？"
                @keydown.enter="handleEnterKey"
              />
              <button
                class="absolute right-0 h-full w-[50px] rounded-r-md py-1 text-secondary hover:bg-secondary hover:text-white disabled:hover:bg-transparent disabled:hover:text-secondary"
                :disabled="isLimited"
                @click="getResponse"
              >
                <Icon name="material-symbols:send-outline" size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.animate-fadein {
  animation-name: fadein;
  animation-duration: 0.6s;
  animation-fill-mode: both;
}
</style>
