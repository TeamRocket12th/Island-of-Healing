<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMsgs } from '~/stores/mymsgs'
import { useToast } from '~/stores/toast'

const { userMsgs, msgIndex, msgsNum, selectedMsg, selectedMsgId } = storeToRefs(useMsgs())
const { showToast } = storeToRefs(useToast())

const formattedMsg = computed(() => {
  return selectedMsg.value!.NotificationContent.replace(/&nbsp;/g, '\n')
})

const readPrevMsg = () => {
  if (msgIndex.value > 0) {
    msgIndex.value -= 1
    selectedMsgId.value = userMsgs.value[msgIndex.value].Id
  }
}

const readNextmsg = () => {
  if (msgIndex.value < msgsNum.value - 1) {
    msgIndex.value += 1
    selectedMsgId.value = userMsgs.value[msgIndex.value].Id
  }
}

// 顯示文章連結
const msgType = ref(0)
const showArticleLink = ref(false)
watchEffect(() => {
  msgType.value = selectedMsg.value!.NotificationContentId
  msgType.value === 1 ? (showArticleLink.value = true) : (showArticleLink.value = false)
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
    <!-- <template v-if="showConfirmModal">
      <ConfirmModal @close-confirm="closeConfirm">
        <template #header>
          <h2 class="text-xl text-primary">刪除訊息?</h2>
        </template>
        <template #content>
          <p class="border-b border-t border-sand-200 pb-8 pl-4 pr-4 pt-4 text-primary-dark">
            確定要刪除這則訊息嗎？
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2 p-3">
            <button
              class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
              @click="showConfirmModal = false"
            >
              取消
            </button>
            <button
              class="rounded p-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
              @click="handleDelMsg(selectedMsgId)"
            >
              確定
            </button>
          </div>
        </template>
      </ConfirmModal>
    </template> -->
    <div v-if="showToast" class="fixed right-10 top-52 z-20 3xl:right-80">
      <ToastMsg />
    </div>
  </div>
</template>

<style scoped></style>
