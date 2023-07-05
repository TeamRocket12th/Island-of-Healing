<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  layout: 'postlayout',
  middleware: [isWriter],
  requiredAuth: true
})

useHead({ title: '新增文章' })

const settingShow = ref()
const rulesShow = ref()
const articleTitle = ref('')
const settingUse = (value: boolean) => {
  settingShow.value = value
}
const titleUse = (title: string) => {
  articleTitle.value = title
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}
</script>

<template>
  <div>
    <div class="bg-sand-100">
      <PostEditor @post-upload="settingUse" @article-title="titleUse" @post-rules="ruleUse" />
      <PostSetting v-if="settingShow" @post-upload="settingUse" />
      <PostRules v-if="rulesShow" @post-rules="ruleUse" />
    </div>
  </div>
</template>

<style scoped></style>
