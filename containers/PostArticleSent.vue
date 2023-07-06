<script setup lang="ts">
import { postArticle } from '~/stores/article'
const articleUse = postArticle()

const settingShow = ref(false)
const rulesShow = ref(false)

const settingUse = (value: boolean) => {
  settingShow.value = value
}
const contentUse = (content: string) => {
  articleUse.articleDetails.Content = content
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}
</script>

<template>
  <div>
    <div class="bg-sand-100">
      <PostEditor @post-upload="settingUse" @post-rules="ruleUse" @article-content="contentUse" />
      <PostSetting v-if="settingShow" @post-upload="settingUse" />

      <PostRules v-if="rulesShow" @post-rules="ruleUse" />
    </div>
  </div>
</template>

<style scoped></style>
