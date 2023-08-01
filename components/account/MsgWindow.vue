<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMsgs } from '~/stores/mymsgs'

const { userMsgs, msgIndex, msgsNum, selectedMsg, selectedMsgId } = storeToRefs(useMsgs())
const { readMyMsg } = useMsgs()

const formattedMsg = computed(() => {
  return selectedMsg.value!.NotificationContent.replace(/&nbsp;/g, '\n')
})

const readPrevMsg = () => {
  if (msgIndex.value > 0) {
    msgIndex.value -= 1
    selectedMsgId.value = userMsgs.value[msgIndex.value].Id
    if (!userMsgs.value[msgIndex.value].IsRead) {
      readMyMsg(selectedMsgId.value)
    }
  }
}

const readNextmsg = () => {
  if (msgIndex.value < msgsNum.value - 1) {
    msgIndex.value += 1
    selectedMsgId.value = userMsgs.value[msgIndex.value].Id
    if (!userMsgs.value[msgIndex.value].IsRead) {
      readMyMsg(selectedMsgId.value)
    }
  }
}

// 顯示文章連結
const msgType = ref(0)
const showArticleLink = ref(false)
watchEffect(() => {
  if (userMsgs.value.length > 0 && selectedMsg.value) {
    msgType.value = selectedMsg.value!.NotificationContentId
    msgType.value === 1 || msgType.value === 2
      ? (showArticleLink.value = true)
      : (showArticleLink.value = false)
  }
})

// 刪除訊息確認Modal
const emits = defineEmits(['open-confirm'])
const openConfirm = (value: boolean, id: number) => {
  emits('open-confirm', value, id)
}
</script>
<template>
  <div v-if="selectedMsg" class="border-[0.5px] border-secondary bg-sand-100 pb-[390px]">
    <div class="flex justify-end border-b-[0.5px] border-secondary bg-sand-200 py-3">
      <p class="mr-3 text-primary">第{{ msgIndex + 1 }}個，共{{ msgsNum }}個。</p>
      <div class="mr-6 flex items-center justify-between gap-3">
        <button
          type="button"
          class="text-primary disabled:cursor-auto disabled:opacity-60"
          :disabled="msgIndex === 0"
          @click="readPrevMsg"
        >
          <Icon name="mdi:chevron-left" size="24" />
        </button>
        <button
          type="button"
          class="cursor-pointer text-primary disabled:cursor-auto disabled:opacity-60"
          :disabled="msgIndex === msgsNum - 1"
          @click="readNextmsg"
        >
          <Icon name="mdi:chevron-right" size="24" />
        </button>
        <button
          type="button"
          class="cursor-pointer text-primary"
          @click="openConfirm(true, selectedMsgId)"
        >
          <Icon name="material-symbols:delete-outline" size="24" />
        </button>
      </div>
    </div>
    <div class="mb-[102px] ml-6 mt-6 flex items-center gap-2">
      <div class="h-[35px] w-[35px] overflow-hidden rounded-full">
        <img src="/logo.svg" alt="logo" />
      </div>
      <p class="font-medium text-primary">{{ selectedMsg!.Name }}</p>
    </div>
    <p class="mb-8 flex justify-center font-light text-primary-dark">
      {{ formattedMsg }}
    </p>
    <p class="text-center text-xl font-normal">
      <NuxtLink
        v-if="showArticleLink"
        :to="`/article/${selectedMsg.FollowedWriterNewArticleId}`"
        class="ml-2 underline"
      >
        {{ selectedMsg.FollowedWriterNewArticleTitle }}
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped></style>
