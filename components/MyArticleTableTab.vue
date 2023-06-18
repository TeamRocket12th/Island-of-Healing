<script setup lang="ts">
defineProps<{ nowPage: string }>()
</script>
<template>
  <div class="flex justify-between border border-[#D9D9D9] py-[10px] pl-8 pr-4">
    <div v-if="nowPage === 'articleList'" class="flex items-center">
      <span class="mr-11 px-2">全部</span>
      <div
        class="mr-3 flex cursor-pointer items-center rounded border border-[#7B7B7B] px-3 py-[2px] text-[#7B7B7B]"
      >
        <span>選擇分類</span>
        <Icon name="ic:outline-keyboard-arrow-down" size="24" />
      </div>
      <div
        class="flex cursor-pointer items-center rounded border border-[#7B7B7B] px-3 py-[2px] text-[#7B7B7B]"
      >
        <span>選擇時間</span>
        <Icon name="ic:outline-keyboard-arrow-down" size="24" class="text-[#7B7B7B]" />
      </div>
    </div>
    <div v-if="nowPage === 'progress'">
      <ul class="flex gap-8">
        <li>全部</li>
        <li>待審核</li>
        <li>審核中</li>
        <li>審核結果</li>
      </ul>
    </div>
    <div v-if="nowPage === 'drafts'">
      <span class="mr-11 px-2">全部</span>
    </div>
    <div v-if="nowPage === 'dashboard'" class="flex w-full items-center justify-between">
      <span class="mr-11 font-medium">貼文分析</span>
      <div class="flex gap-3">
        <div
          class="flex cursor-pointer items-center rounded-lg border border-[#828282] px-2 py-1 text-sm text-[#828282]"
        >
          選擇年份<Icon name="ic:round-arrow-drop-down" size="24" />
        </div>
        <div
          class="flex cursor-pointer items-center rounded-lg border border-[#828282] px-2 py-1 text-sm text-[#828282]"
        >
          選擇月份<Icon name="ic:round-arrow-drop-down" size="24" />
        </div>
      </div>
    </div>
    <button
      v-if="nowPage !== 'dashboard'"
      type="button"
      class="rounded border border-[#828282] px-3 text-[#828282]"
    >
      全部刪除
    </button>
  </div>
</template>

<style scoped></style>
