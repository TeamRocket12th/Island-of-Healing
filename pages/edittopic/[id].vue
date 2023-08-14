<script setup>
import { useTopic } from '~/stores/topic'

const { apiBase } = useApiConfig()
const route = useRoute()
const htmlContent = ref('')
const conversationData = ref({})
const topicUse = useTopic()

useSeoMeta({ title: '編輯話題' })
definePageMeta({
  layout: 'postlayout'
})
// 取得單篇話題資訊
const getTopicDetail = async () => {
  try {
    const res = await $fetch(`${apiBase}/readconversation/${route.params.id}`)
    if (res.StatusCode === 200) {
      console.log(res)
      conversationData.value = res.ConversationData
      htmlContent.value = res.ConversationData.Content
      topicUse.topic.Title = res.ConversationData.Title
      topicUse.topic.Tags = res.ConversationData.Tags
      topicUse.topic.Summary = res.ConversationData.Summary
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(getTopicDetail)

const settingShow = ref(false)
const rulesShow = ref(false)

const settingUse = (value) => {
  settingShow.value = value
}
const contentUse = (content) => {
  topicUse.topic.Content = content
}

const ruleUse = (value) => {
  rulesShow.value = value
}

const handleResize = () => {
  if (typeof document !== 'undefined') {
    if (window.innerWidth > 767) {
      document.body.style.overflow = settingShow.value ? 'hidden' : 'auto'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
}

watch(settingShow, handleResize)

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<template>
  <div>
    <template v-if="htmlContent !== ''">
      <TopicEditor
        :html-content="htmlContent"
        @post-upload="settingUse"
        @post-rules="ruleUse"
        @article-content="contentUse"
      />
      <TopicSetting
        v-if="settingShow"
        :conversation-data="conversationData"
        @post-upload="settingUse"
      />
      <Transition>
        <PostRules v-if="rulesShow" @post-rules="ruleUse" />
      </Transition>
    </template>
  </div>
</template>
