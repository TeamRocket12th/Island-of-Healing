<script setup lang="ts">
import TopicList from '~/containers/TopicList.vue'

useSeoMeta({ title: '島民集會所｜論壇' })
</script>

<template>
  <div class="container h-full items-center justify-center">
    <div class="mb-6 hidden h-full w-full sm:block">
      <NuxtImg src="/forum-banner.png" alt="forum-banner" />
    </div>
    <TopicList />
  </div>
</template>

<style scoped></style>
