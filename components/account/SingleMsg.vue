<script setup lang="ts">
defineProps({
  message: {
    type: Object as () => MyMsg,
    required: true
  }
})

const emits = defineEmits(['back-to-list'])
const backToList = (value: boolean) => {
  emits('back-to-list', value)
}
</script>
<template>
  <div class="bg-sand-100">
    <div class="mb-8 flex items-center justify-between bg-sand-200 px-4 py-[10px] text-primary">
      <span class="cursor-pointer" @click="backToList(false)">
        <Icon name="ic:outline-arrow-back" size="24" />
      </span>
      <p class="font-medium text-primary">{{ message.name }}</p>
      <span>
        <Icon name="material-symbols:delete-outline" size="24" />
      </span>
    </div>
    <div class="mb-8 flex items-center gap-2 px-4">
      <div class="h-[35px] w-[35px] overflow-hidden rounded-full">
        <img :src="message.imgUrl" alt="avatar" />
      </div>
      <p class="text-sm font-medium text-primary">{{ message.name }}</p>
    </div>
    <p class="px-4">{{ message.canMessage }}</p>
  </div>
</template>

<style scoped></style>
