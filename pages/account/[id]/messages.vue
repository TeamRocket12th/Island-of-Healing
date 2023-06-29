<script setup lang="ts">
import MessageDetail from '~/components/account/MessageDetail.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
const messageInfo = ref({})
const getMessageInfo = (message: Message) => {
  messageInfo.value = message
}
</script>
<template>
  <div>
    <div class="grid grid-cols-12 py-16 text-primary lg:py-20">
      <MessageCenter @get-message-info="getMessageInfo" />
      <MessageDetail :message-info="messageInfo" />
    </div>
  </div>
</template>

<style scoped></style>
