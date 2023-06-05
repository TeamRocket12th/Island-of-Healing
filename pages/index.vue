<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '~/stores/count'
const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <div class="mt-8 flex flex-col items-center">
    <h1 class="text-3xl font-semibold text-indigo-400">Hello</h1>
    <p class="mt-4 text-5xl font-bold text-gray-600">
      專題開始了！<Icon name="ant-design:aliwangwang-outlined" color="black" />
    </p>
    <div class="mt-4 flex items-center gap-6">
      <p>你的分數：{{ count }}</p>
      <button class="btn" @click="increment">
        <Icon name="ri:bard-fill" size="30" />
      </button>
    </div>
  </div>
</template>
