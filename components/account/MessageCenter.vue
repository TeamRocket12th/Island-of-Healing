<script setup lang="ts">
const { data: messages, error } = getMockData<Message>('account', 'messages')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}

const messageId = ref(1)
const messageName = ref()
const renderMessage = (message: Message) => {
  messageId.value = message.id
  messageName.value = message.name
}
</script>
<template>
  <div class="grid grid-cols-12 py-16 text-primary lg:py-20">
    <div class="col-span-12 lg:col-span-4 lg:mr-6 lg:border-b lg:border-[#CDCDCD]">
      <h2 class="mb-6 text-center text-2xl font-bold lg:mb-14 lg:text-left">我的訊息</h2>
      <ul>
        <li
          v-for="message in messages"
          :key="message.id"
          :class="{ active: message.id === messageId }"
          class="cursor-pointer px-6 active:bg-[#CDCDCD]"
          @mousedown="renderMessage(message)"
        >
          <div class="flex justify-center py-3">
            <div class="h-[48px] w-[48px] overflow-hidden rounded-full">
              <img :src="message.imgUrl" alt="avatar" />
            </div>
            <div class="ml-2 w-[85%]">
              <div class="flex justify-between">
                <h3 class="font-bold">{{ message.name }}</h3>
                <p>{{ message.date }}</p>
              </div>
              <div class="flex justify-between text-primary-dark">
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
    <div
      class="col-span-12 hidden border border-[#CDCDCD] bg-sand-100 pb-[390px] lg:col-span-8 lg:block"
    >
      <div class="items-centbg-error flex justify-end border-b border-[#CDCDCD] bg-sand-200 p-3">
        <p class="mr-3">第{{ messageId }}個，共{{ messages.length }}個。</p>

        <div class="mr-6 flex">
          <Icon name="mdi:chevron-left" size="22" class="cursor-pointer text-[#1C1B1F]" />
          <Icon name="mdi:chevron-right" size="22" class="cursor-pointer text-[#1C1B1F]" />
        </div>
        <Icon name="ic:sharp-delete-outline" size="22" class="cursor-pointer text-[#1C1B1F]" />
      </div>
      <div class="mb-[102px] ml-6 mt-6 flex items-center">
        <div class="h-[35px] w-[35px] rounded-full bg-[#D9D9D9]"></div>
        <h4 class="ml-2">{{ messageName }}</h4>
      </div>
      <p class="mb-8 flex justify-center leading-6">
        嗨！ {{}}，<br />
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
  </div>
</template>

<style scoped>
.active {
  background-color: #796959;
}
.active h3 {
  color: white;
}
</style>
