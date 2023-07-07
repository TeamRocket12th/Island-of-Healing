<script setup lang="ts">
import { useArticle } from '~/stores/article'
const articleUse = useArticle()

const settingShow = ref(false)
const rulesShow = ref(false)

const settingUse = (value: boolean) => {
  settingShow.value = value
}
const contentUse = (content: string) => {
  articleUse.article.Content = content
}

const ruleUse = (value: boolean) => {
  rulesShow.value = value
}
</script>

<template>
  <div>
    <div class="bg-sand-100 sm:h-[1100px] md:h-fit">
      <PostEditor @post-upload="settingUse" @post-rules="ruleUse" @article-content="contentUse" />
      <PostSetting v-if="settingShow" @post-upload="settingUse" />

      <PostRules v-if="rulesShow" @post-rules="ruleUse" />
    </div>
  </div>
</template>

<style scoped></style>
