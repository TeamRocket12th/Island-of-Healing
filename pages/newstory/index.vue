<script setup lang="ts">
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
