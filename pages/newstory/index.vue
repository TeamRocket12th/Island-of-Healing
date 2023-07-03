<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  title: '新增文章',
  middleware: [isWriter],
  requiredAuth: true
})

const settingShow = ref()
const rulesShow = ref()
const articleTitle = ref('')
const settingUse = (value: boolean) => {
  settingShow.value = value
  console.log(value)
}
const titleUse = (title: string) => {
  console.log(title)
  articleTitle.value = title
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}
</script>

<template>
  <div class="bg-sand-100">
    <PostEditor
      class="relative"
      @post-upload="settingUse"
      @article-title="titleUse"
      @post-rules="ruleUse"
    />
    <PostSetting v-if="settingShow" @post-upload="settingUse" />
    <PostRules v-if="rulesShow" @post-rules="ruleUse" />
  </div>
</template>

<style scoped></style>
