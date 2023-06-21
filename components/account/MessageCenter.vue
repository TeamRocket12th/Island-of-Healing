<script setup lang="ts">
const { data: messages, error } = getMockData<Message>('messages')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}

const messageId = ref(1)
const renderMessage = (message: Message) => {
  messageId.value = message.id
}
</script>
<template>
  <div class="grid grid-cols-12 p-10 3xl:px-14">
    <div class="col-span-4 mr-6 border-b border-[#CDCDCD]">
      <h2 class="mb-14 text-2xl font-bold">我的訊息</h2>
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
          :class="{ active: message.id === messageId }"
          class="cursor-pointer px-6 active:bg-[#CDCDCD]"
          @mousedown="renderMessage(message)"
        >
          <div class="flex py-3">
            <div class="h-[48px] w-[48px] overflow-hidden rounded-full">
              <img :src="message.imgUrl" alt="avatar" />
            </div>
            <div class="ml-2 w-[85%]">
              <div class="flex justify-between">
                <h3 class="font-bold">{{ message.name }}</h3>
                <p>{{ message.date }}</p>
              </div>
              <div class="flex justify-between">
                <h3 class="">{{ message.canMessage }}</h3>
                <p>
                  <Icon name="mdi:dots-horizontal" size="25" class="text-[#1C1B1F]" />
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-span-8 border border-[#CDCDCD] bg-white pb-[390px]">
      <div class="items-centbg-error flex justify-end border-b border-[#CDCDCD] p-3">
        <p class="mr-3">第{{ messageId }}個，共{{ messages.length }}個。</p>
        <div class="mr-6 flex">
          <Icon name="mdi:chevron-left" size="22" class="cursor-pointer text-[#1C1B1F]" />
          <Icon name="mdi:chevron-right" size="22" class="cursor-pointer text-[#1C1B1F]" />
        </div>
        <Icon name="ic:sharp-delete-outline" size="22" class="cursor-pointer text-[#1C1B1F]" />
      </div>
      <div class="mb-[102px] ml-6 mt-6 flex items-center">
        <div class="h-[35px] w-[35px] rounded-full bg-[#D9D9D9]"></div>
        <h4 class="ml-2">告解室管理員</h4>
      </div>
      <p class="mb-8 flex justify-center">
        嗨！ mou0429，<br />
        最近過得好嗎！<br />
        我是告解室管理員，很高興你打開了這封信！<br />
        提醒您，您已經3個月沒變更密碼囉！為了您的帳戶安全，建議您 <br />
        快去變更吧！
      </p>
      <button
        class="btn mx-auto flex h-[44px] w-[148px] justify-center bg-[#828282] text-white hover:bg-slate-500"
      >
        立即變更
      </button>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: #cdcdcd;
}
</style>
