<script setup lang="ts">
import auth from '~/middleware /auth'

definePageMeta({
  middleware: [auth],
  layout: 'userlayout'
})
</script>
<template>
  <div></div>
</template>

<style scoped></style>
