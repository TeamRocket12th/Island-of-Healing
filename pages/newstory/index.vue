<script setup lang="ts">
import isWriter from '~/middleware/isWriter'

definePageMeta({
  title: '新增文章',
  middleware: [isWriter],
  requiredAuth: true
})

const settingShow = ref()
const articleTitle = ref('')
const settingUse = (value: boolean) => {
  settingShow.value = value
  console.log(value)
}
const titleUse = (title: string) => {
  console.log(title)
  articleTitle.value = title
}
</script>

<template>
  <div class="bg-sand-100">
    <PostEditor @post-upload="settingUse" @article-title="titleUse" />
    <PostSetting v-show="settingShow" @post-upload="settingUse" />
  </div>
</template>

<style scoped></style>
