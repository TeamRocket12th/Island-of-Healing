<script setup lang="ts">
defineProps({
  searchPlaceHolder: {
    type: String,
    default: '搜尋'
  },
  searchFn: {
    type: Function,
    required: true
  }
})
const keyWord = ref('')
</script>

<template>
  <div class="relative max-w-full bg-sand-100">
    <input
      v-model="keyWord"
      type="text"
      class="h-10 w-full rounded border border-primary bg-transparent p-[10px] pl-[38px] text-primary placeholder-sand-300 focus:outline-sand-300"
      :placeholder="searchPlaceHolder"
      @change="searchFn(keyWord)"
    />
    <Icon
      name="mdi:magnify"
      size="24"
      class="absolute left-2 top-1/2 translate-y-[-50%] text-primary"
    />
  </div>
</template>

<style scoped></style>
