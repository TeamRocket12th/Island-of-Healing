<script setup lang="ts">
defineProps({
  message: {
    type: Object as () => MyMsg,
    required: true
  },
  msgsNum: {
    type: Number,
    required: true
  },
  msgNo: {
    type: Number,
    required: true
  }
})
</script>
<template>
  <div class="border-[0.5px] border-secondary bg-sand-100 pb-[390px]">
    <div
      class="items-centbg-error flex justify-end border-b-[0.5px] border-secondary bg-sand-200 p-3"
    >
      <p class="mr-3">第{{ msgNo + 1 }}個，共{{ msgsNum }}個。</p>
      <div class="mr-6 flex">
        <Icon name="mdi:chevron-left" size="22" class="cursor-pointer text-[#1C1B1F]" />
        <Icon name="mdi:chevron-right" size="22" class="cursor-pointer text-[#1C1B1F]" />
      </div>
      <Icon
        name="material-symbols:delete-outline"
        size="22"
        class="cursor-pointer text-[#1C1B1F]"
      />
    </div>
    <div class="mb-[102px] ml-6 mt-6 flex items-center gap-2">
      <div class="h-[35px] w-[35px] overflow-hidden rounded-full">
        <img :src="message.imgUrl" alt="avatar" />
      </div>
      <p>{{ message.name }}</p>
    </div>
    <p class="mb-8 flex justify-center font-light text-primary-dark">
      {{ message.canMessage }}
    </p>
  </div>
</template>

<style scoped></style>
