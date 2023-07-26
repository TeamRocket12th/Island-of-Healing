<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
import { useMsgs } from '~/stores/mymsgs'
import { useToast } from '~/stores/toast'

const { msgLoading } = storeToRefs(useLoading())
const { setMsgLoading } = useLoading()

const { userMsgs, selectedMsg } = storeToRefs(useMsgs())
const { getMyMsgs, readMyMsg, delMyMsg } = useMsgs()

setMsgLoading(true)
const { showToast } = storeToRefs(useToast())

const showMobileMsg = ref(false)

const toggleSmwindow = (value: boolean) => {
  showMobileMsg.value = value
}

const showConfirmModal = ref(false)
const delId = ref(0)

const openConfirm = (value: boolean, id: number) => {
  showConfirmModal.value = value
  delId.value = id
}

const closeConfirm = (value: boolean) => {
  showConfirmModal.value = value
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = showConfirmModal.value ? 'hidden' : 'auto'
    document.body.style.paddingRight = showConfirmModal.value ? '15px' : '0'
  }
})

const handleDelMsg = () => {
  showConfirmModal.value = false
  showMobileMsg.value = false
  delMyMsg(delId.value)
}

onMounted(async () => {
  await getMyMsgs()
  if (userMsgs.value.length > 0 && userMsgs.value[0].IsRead === false && !selectedMsg.value) {
    readMyMsg(userMsgs.value[0].Id)
  }
})
</script>

<template>
  <div class="text-primary lg:mr-6">
    <h2 class="mb-6 text-center font-serif-tc text-2xl font-bold lg:mb-14 lg:text-left">
      我的訊息
    </h2>
    <div v-if="msgLoading">
      <LoadingItem />
    </div>
    <div v-if="showToast" class="fixed right-10 top-52 z-20 3xl:right-80">
      <ToastMsg />
    </div>
    <div v-if="!msgLoading" class="grid-cols-12 gap-12 lg:grid">
      <MsgList class="col-span-4" @toggle-smwindow="toggleSmwindow" @open-confirm="openConfirm" />
      <MsgWindow
        v-if="userMsgs.length > 0"
        class="col-span-8 hidden md:block"
        @open-confirm="openConfirm"
      />
      <client-only>
        <Teleport to="main">
          <SingleMsg
            v-if="showMobileMsg"
            class="absolute left-0 right-0 top-0 h-full w-full lg:hidden"
            @back-to-list="toggleSmwindow"
            @open-confirm="openConfirm"
          />
        </Teleport>
      </client-only>
    </div>
    <p v-if="userMsgs.length === 0 && !msgLoading" class="text-center text-2xl text-primary">
      目前還沒有訊息
    </p>
    <template v-if="showConfirmModal">
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
              @click="handleDelMsg"
            >
              確定
            </button>
          </div>
        </template>
      </ConfirmModal>
    </template>
  </div>
</template>
