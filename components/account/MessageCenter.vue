<script setup lang="ts">
const { data: messages, error } = getMockData<Message>('account', 'messages')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}

const messageId = ref(1)
const renderMessage = (message: Message) => {
  messageId.value = message.id
}
</script>
<template>
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
</template>

<style scoped>
.active {
  background-color: #796959;
}
.active h3 {
  color: white;
}
</style>
