<script setup lang="ts"></script>
<template>
  <div class="w-full bg-white">
    <h2 class="mb-10 pl-10 pt-10 text-[24px] font-bold">你的方案</h2>
    <div class="px-[330px] pb-[100px]">
      <div class="border-1 flex justify-center border border-black p-[114px]">
        <div class="w-full text-center">
          <h3 class="mb-6 border-b-2 border-dashed border-black pb-2 text-[36px]">年付$50</h3>
          <div class="mb-3 flex items-center justify-center">
            <Icon name="mdi:check-circle-outline" size="22" />
            <p class="ml-[6px]">無限制閱讀所有文章，離線收看。</p>
          </div>
          <p class="mb-9 underline decoration-1 underline-offset-4">進一步了解你的方案</p>
          <h4 class="mb-2 text-[24px]">付款</h4>
          <p class="mb-3 text-[14px] leading-[150%]">
            你的下一張帳單日期為 2024/05/27 <br />價格為 NT$50。
          </p>
          <p class="mb-11 underline decoration-1 underline-offset-4">更新付款方式</p>
          <button class="btn h-[44px] w-[148px] bg-[#828282] text-white hover:bg-slate-500">
            變更方案
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
