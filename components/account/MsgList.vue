<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMsgs } from '~/stores/mymsgs'

const { userMsgs, selectedMsgId } = storeToRefs(useMsgs())
const { setSelectedId, readMyMsg } = useMsgs()

const showSmWindow = ref(false)

const emits = defineEmits(['get-msg', 'toggle-smwindow', 'open-confirm'])
const selectMsg = (id: number, read: boolean) => {
  if (!read) {
    readMyMsg(id)
  }
  setSelectedId(id)
  showSmWindow.value = true
  emits('toggle-smwindow', showSmWindow.value)
}

const shortenMsg = (msg: string) => {
  const newMsg = msg.replace(/&nbsp;/g, '\n')
  return newMsg.substring(0, 20) + '...'
}

const openDelId = ref(null as number | null)
const toggleDelBtn = (id: number) => {
  openDelId.value = openDelId.value === id ? null : id
}

const { formatDate } = useDateFormat()

// 刪除訊息確認Modal
const openConfirm = (value: boolean, id: number) => {
  emits('open-confirm', value, id)
}
</script>
<template>
  <ul v-if="userMsgs.length > 0">
    <li
      v-for="message in userMsgs"
      :key="message.Id"
      :class="{ active: message.Id === selectedMsgId }"
      class="relative cursor-pointer px-6"
      @click="selectMsg(message.Id, message.IsRead)"
    >
      <div class="relative flex justify-center py-3">
        <div
          v-if="!message.IsRead"
          class="absolute left-[-20px] top-1/2 h-4 w-4 translate-y-[-50%] rounded-lg bg-secondary"
        ></div>
        <div class="h-[48px] w-[48px] overflow-hidden rounded-full">
          <img
            src="/logo.svg"
            alt="logo"
            :class="message.Id === selectedMsgId ? 'bg-sand-100' : ''"
          />
        </div>
        <div class="ml-2 w-[85%]">
          <div class="flex justify-between">
            <p class="font-medium" :class="{ active: message.Id === selectedMsgId }">
              {{ message.Name }}
            </p>
            <p class="text-sm" :class="{ active: message.Id === selectedMsgId }">
              {{ formatDate(message.InitDate) }}
            </p>
          </div>
          <div class="flex justify-between text-primary-dark">
            <p class="font-light" :class="{ active: message.Id === selectedMsgId }">
              {{ shortenMsg(message.NotificationContent) }}
            </p>
            <span
              class="text-[#1C1B1F]"
              :class="{ active: message.Id === selectedMsgId }"
              @click.stop="toggleDelBtn(message.Id)"
            >
              <Icon name="mdi:dots-horizontal" size="25" />
            </span>
          </div>
        </div>
      </div>
      <span
        v-if="openDelId === message.Id"
        class="absolute -bottom-[42px] right-0 z-10 flex w-32 items-center whitespace-nowrap border border-secondary bg-sand-100 p-2 text-secondary hover:bg-secondary hover:text-sand-100"
        @click.stop="openConfirm(true, message.Id)"
      >
        <Icon name="material-symbols:delete-outline" size="24" class="pt-[2px]" />
        刪除訊息</span
      >
    </li>
  </ul>
</template>

<style scoped>
.active {
  background-color: #796959;
  color: white;
}
</style>
