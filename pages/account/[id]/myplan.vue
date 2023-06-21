<script setup lang="ts">
import auth from '~/middleware/auth'

definePageMeta({
  middleware: [auth],
  layout: 'userlayout'
})
</script>
<template>
  <div><PlanManagement /></div>
</template>

<style scoped></style>
