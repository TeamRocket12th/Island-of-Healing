<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  layout: 'postlayout',
  middleware: [isWriter],
  requiredAuth: true
})

useHead({ title: '新增文章' })

const settingShow = ref(false)
const showRules = ref(false)
const articleTitle = ref('')
const settingUse = (value: boolean) => {
  settingShow.value = value
}
const titleUse = (title: string) => {
  articleTitle.value = title
}

const ruleUse = (value: boolean) => {
  showRules.value = value
}
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = showRules.value ? 'hidden' : 'auto'
  }
})
</script>

<template>
  <div>
    <div class="bg-sand-100">
      <PostEditor @post-upload="settingUse" @article-title="titleUse" @post-rules="ruleUse" />
      <PostSetting v-if="settingShow" @post-upload="settingUse" />
      <Teleport to="body">
        <PostRules v-if="showRules" @post-rules="ruleUse" />
      </Teleport>
    </div>
  </div>
</template>

<style scoped></style>
