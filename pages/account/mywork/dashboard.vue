<script setup lang="ts">
import isWriter from '~/middleware /isWriter'
import MyWorkList from '~/containers/MyWorkList.vue'
definePageMeta({
  middleware: [isWriter],
  layout: 'userlayout'
})
</script>
<template>
  <div>
    <h2 class="text-2xl font-bold">後台數據</h2>
    <MyWorkList />
  </div>
</template>

<style scoped></style>
