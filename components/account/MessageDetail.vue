<script setup lang="ts">
const { data: messages, error } = getMockData<Message>('account', 'messages')
if (error.value) {
  console.error('Error fetching data: ', error.value)
}
const name = ref('告解室基哥')
const id = ref(1)
const props = defineProps({
  messageInfo: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <div
    class="col-span-12 hidden border border-[#CDCDCD] bg-sand-100 pb-[390px] lg:col-span-8 lg:block"
  >
    <div class="items-centbg-error flex justify-end border-b border-[#CDCDCD] bg-sand-200 p-3">
      <p class="mr-3">第{{ props.messageInfo.id }}個，共{{ messages.length }}個。</p>
      <div class="mr-6 flex">
        <Icon name="mdi:chevron-left" size="22" class="cursor-pointer text-[#1C1B1F]" />
        <Icon name="mdi:chevron-right" size="22" class="cursor-pointer text-[#1C1B1F]" />
      </div>
      <Icon name="ic:sharp-delete-outline" size="22" class="cursor-pointer text-[#1C1B1F]" />
    </div>
    <div class="mb-[102px] ml-6 mt-6 flex items-center">
      <div class="h-[35px] w-[35px] rounded-full bg-[#D9D9D9]"></div>
      <h4 class="ml-2">{{ props.messageInfo.name }}</h4>
    </div>
    <p class="mb-8 flex justify-center leading-6">
      嗨！ {{ props.messageInfo.email }}，<br />
      最近過得好嗎！<br />
      我是告解室管理員，很高興你打開了這封信！<br />
      提醒您，您已經3個月沒變更密碼囉！為了您的帳戶安全，建議您 <br />
      快去變更吧！
    </p>
    <button
      class="btn mx-auto flex h-[40px] w-[94px] justify-center bg-secondary text-white hover:bg-primary"
    >
      立即變更
    </button>
  </div>
</template>
