<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'
import { useMsgs } from '~/stores/mymsgs'

const { msgLoading } = storeToRefs(useLoading())
const { setMsgLoading } = useLoading()

const { userMsgs, unreadMsgs } = storeToRefs(useMsgs())
const { getMyMsgs } = useMsgs()

setMsgLoading(true)
onMounted(getMyMsgs)

const showMobileMsg = ref(false)

const toggleSmwindow = (value: boolean) => {
  showMobileMsg.value = value
}

onMounted(() => {
  unreadMsgs.value = false
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
    <div v-if="!msgLoading" class="grid-cols-12 gap-12 lg:grid">
      <MsgList class="col-span-4" @toggle-smwindow="toggleSmwindow" />
      <MsgWindow v-if="userMsgs.length > 0" class="col-span-8 hidden md:block" />
      <client-only>
        <Teleport to="main">
          <SingleMsg
            v-if="showMobileMsg"
            class="absolute left-0 right-0 top-0 h-full w-full lg:hidden"
            @back-to-list="toggleSmwindow"
          />
        </Teleport>
      </client-only>
    </div>
    <p v-if="userMsgs.length === 0 && !msgLoading" class="text-center text-2xl text-primary">
      目前還沒有訊息
    </p>
  </div>
</template>
