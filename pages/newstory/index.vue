<script setup lang="ts">
import isWriter from '~/middleware/isWriter'
import postArticleSent from '~/containers/PostArticleSent.vue'

definePageMeta({
  layout: 'postlayout',
  middleware: [isWriter],
  requiredAuth: true
})

useHead({ title: '新增文章' })
</script>

<template>
  <div>
    <postArticleSent />
  </div>
</template>

<style scoped></style>
