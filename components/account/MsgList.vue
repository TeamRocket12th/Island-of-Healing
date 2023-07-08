<script setup lang="ts">
const props = defineProps({
  messages: {
    type: Array as () => MyMsg[],
    default: () => [],
    required: true
  }
})

const showSmWindow = ref(false)
const selectedId = ref(props.messages[0].id)
console.log(selectedId.value)

const emits = defineEmits(['get-msg', 'toggle-smwindow'])
const selectMsg = (id: number) => {
  selectedId.value = id
  showSmWindow.value = true
  emits('get-msg', id)
  emits('toggle-smwindow', showSmWindow.value)
}
</script>
<template>
  <div class="text-primary lg:mr-6 lg:border-b lg:border-[#CDCDCD]">
    <h2 class="mb-6 text-center font-serif-tc text-2xl font-bold lg:mb-14 lg:text-left">
      我的訊息
    </h2>
    <ul>
      <li
        v-for="message in messages"
        :key="message.id"
        :class="{ active: message.id === selectedId }"
        class="cursor-pointer px-6 active:bg-[#CDCDCD]"
        @click="selectMsg(message.id)"
      >
        <div class="relative flex justify-center py-3">
          <div
            v-if="message.read"
            class="absolute left-[-20px] top-1/2 h-4 w-4 translate-y-[-50%] rounded-lg bg-secondary"
          ></div>
          <div class="h-[48px] w-[48px] overflow-hidden rounded-full">
            <img :src="message.imgUrl" alt="avatar" />
          </div>
          <div class="ml-2 w-[85%]">
            <div class="flex justify-between">
              <p class="font-medium" :class="{ active: message.id === selectedId }">
                {{ message.name }}
              </p>
              <p class="text-sm" :class="{ active: message.id === selectedId }">
                {{ message.date }}
              </p>
            </div>
            <div class="flex justify-between text-primary-dark">
              <p class="font-light" :class="{ active: message.id === selectedId }">
                {{ message.canMessage }}
              </p>
              <span class="text-[#1C1B1F]" :class="{ active: message.id === selectedId }">
                <Icon name="mdi:dots-horizontal" size="25" />
              </span>
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
  color: white;
}
</style>
