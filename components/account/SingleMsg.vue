<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMsgs } from '~/stores/mymsgs'
const { selectedMsg, selectedMsgId } = storeToRefs(useMsgs())
const { delMyMsg } = useMsgs()

const emits = defineEmits(['back-to-list'])
const backToList = (value: boolean) => {
  emits('back-to-list', value)
}
</script>
<template>
  <div class="bg-sand-100">
    <div class="mb-8 flex items-center justify-between bg-sand-200 px-4 py-[10px] text-primary">
      <span class="cursor-pointer" @click="backToList(false)">
        <Icon name="ic:outline-arrow-back" size="24" />
      </span>
      <p class="font-medium text-primary">{{ selectedMsg!.Name }}</p>
      <span @click="delMyMsg(selectedMsgId)">
        <Icon name="material-symbols:delete-outline" size="24" />
      </span>
    </div>
    <div class="mb-8 flex items-center gap-2 px-4">
      <div class="h-[35px] w-[35px] overflow-hidden rounded-full">
        <img src="/logo.svg" alt="logo" />
      </div>
      <p class="text-sm font-medium text-primary">{{ selectedMsg!.Name }}</p>
    </div>
    <p class="px-4">{{ selectedMsg!.NotificationContent }}</p>
  </div>
</template>

<style scoped></style>
