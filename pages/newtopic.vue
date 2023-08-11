<script setup lang="ts">
import { useTopic } from '~/stores/topic'

definePageMeta({
  layout: 'postlayout'
})

useSeoMeta({ title: '發表論壇' })
const topicUse = useTopic()

const settingShow = ref(false)
const rulesShow = ref(false)

const settingUse = (value: boolean) => {
  settingShow.value = value
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}
onMounted(() => {
  topicUse.topic.Title = ''
  topicUse.topic.Tags = []
  topicUse.topic.Summary = ''
})

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
  <div class="bg-sand-100 sm:h-[1100px] md:h-fit">
    <TopicEditor @post-upload="settingUse" @post-rules="ruleUse" />
    <TopicSetting v-if="settingShow" @post-upload="settingUse" />
    <Transition>
      <PostRules v-if="rulesShow" @post-rules="ruleUse" />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
