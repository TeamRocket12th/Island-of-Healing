<script setup lang="ts"></script>
<template>
  <div class="flex justify-between border border-[#D9D9D9] py-[10px] pl-8 pr-4">
    <div class="flex items-center">
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
    <button type="button" class="rounded border border-[#828282] px-3 text-[#828282]">
      全部刪除
    </button>
  </div>
</template>

<style scoped></style>
