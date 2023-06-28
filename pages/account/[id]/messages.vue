<script setup lang="ts">
import MessageDetail from '~/components/account/MessageDetail.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
</script>
<template>
  <div>
    <div class="grid grid-cols-12 py-16 text-primary lg:py-20">
      <MessageCenter />
      <MessageDetail />
    </div>
  </div>
</template>

<style scoped></style>
