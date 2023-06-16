<script setup lang="ts"></script>

<template>
  <div class="col-start-3 my-[200px] grid grid-cols-6">
    <div class="col-span-6 w-full gap-4 px-4 xl:col-span-4 xl:col-start-2">
      <div class="mb-16 grid grid-cols-1 text-center">
        <h2 class="mb-1 text-[32px] font-bold">選擇適合自己的閱讀方案</h2>
        <p>在你的移動設備、電腦和其他裝置上盡情閱讀，完全不受限。</p>
      </div>
      <div class="grid grid-cols-1 gap-6 text-center xl:grid-cols-2">
        <div class="flex h-[560px] flex-col items-center justify-center border border-slate-500">
          <p class="mb-1">月付</p>
          <p class="mb-6 flex h-[72px] items-center text-5xl font-bold">$120</p>
          <div class="grid grid-cols-4 3xl:gap-4">
            <div class="col-span-2 col-start-2 mb-3 flex flex-col self-start">
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>無廣告</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>支援一部裝置閱讀</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>支援離線閱讀</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>使用匿名服務</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>無限制地閱讀所有文章</p>
              </div>
            </div>
          </div>
          <button
            class="btn h-[38px] w-[68%] bg-[#6B6B6B] text-white hover:bg-slate-500 3xl:w-[286px]"
          >
            訂閱
          </button>
        </div>
        <div class="flex h-[560px] flex-col items-center justify-center border border-slate-500">
          <p class="mb-1">月付</p>
          <p class="mb-6 flex h-[72px] items-center text-5xl font-bold">$120</p>
          <div class="grid grid-cols-4 3xl:gap-4">
            <div class="col-span-2 col-start-2 mb-3 flex flex-col self-start">
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>無廣告</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>不限裝置數量閱讀</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>支援離線閱讀</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>使用匿名服務</p>
              </div>
              <div class="mb-3 flex">
                <Icon name="ic:baseline-check" size="25" class="mr-2" />
                <p>無限制地閱讀所有文章</p>
              </div>
            </div>
          </div>

          <button
            class="btn h-[38px] w-[68%] bg-[#6B6B6B] text-white hover:bg-slate-500 3xl:w-[286px]"
          >
            訂閱
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
