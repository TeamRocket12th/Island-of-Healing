<script setup lang="ts"></script>

<template>
  <div class="bg-gradient-to-b from-[#FAF9F3] to-[#FFFFFF]">
    <section class="container py-10 lg:py-[100px] xl:py-[124px]">
      <h3
        class="mb-4 text-center text-4xl font-bold leading-[54px] text-primary 3xl:mb-8 3xl:text-[64px]"
      >
        <div class="lg:inline">享⁠受⁠零⁠廣⁠告⁠干⁠擾⁠的</div>
        <div class="lg:inline">⁠閱讀⁠體⁠驗</div>
      </h3>
      <p class="mb-8 px-12 text-center text-primary lg:text-2xl">
        讓我們一起啟程，發現內在的力量和自由，愛上生活的潛力。
      </p>
      <button
        class="btn-active btn mx-auto mb-10 block h-[60px] w-[180px] rounded bg-secondary px-4 py-3 text-2xl font-medium text-white hover:bg-slate-600 xl:mb-[84px] 3xl:mb-[84px]"
      >
        立即註冊體驗
      </button>
      <img
        src="~/assets/images/work-work-from-home-01.svg"
        class="mx-auto w-[402px] xl:w-[600px]"
        alt=""
      />
    </section>
  </div>
  <div class="bg-white">
    <section class="container py-10 pb-[100px] lg:py-[100px] xl:py-[124px]">
      <h3
        class="mb-10 text-center text-4xl font-bold leading-[54px] text-primary 3xl:mb-8 3xl:text-5xl"
      >
        加入會員有什麼好處？
      </h3>
      <ul class="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1 3xl:gap-[110px]">
        <li class="flex flex-col items-center justify-between">
          <div class="relative h-[300px] w-[330px]">
            <img
              src="~/assets/images/creator-1.svg"
              alt="membership"
              class="absolute bottom-0 mb-3"
            />
          </div>
          <p class="text-xl font-bold text-primary">⁠零⁠廣⁠告⁠干⁠擾⁠的⁠閱讀⁠體⁠驗</p>
        </li>
        <li class="flex flex-col items-center justify-between">
          <div class="relative h-[300px] w-[330px]">
            <img
              src="~/assets/images/creator-2.svg"
              alt="membership"
              class="absolute bottom-0 mb-3"
            />
          </div>
          <p class="text-xl font-bold text-primary">無限使用AI相談室</p>
        </li>
        <li class="flex flex-col items-center justify-between">
          <div class="relative h-[300px] w-[330px]">
            <img
              src="~/assets/images/creator-3.svg"
              alt="membership"
              class="absolute bottom-0 mb-3"
            />
          </div>
          <p class="text-xl font-bold text-primary">提供交流和支持的社群</p>
        </li>
      </ul>
    </section>
  </div>
  <div class="container py-10 lg:py-[100px] xl:py-[124px]">
    <div class="mb-10 text-center lg:mb-20">
      <h2 class="mb-4 text-4xl font-bold text-primary 3xl:text-5xl">選擇適合你的閱讀方案</h2>
      <h3 class="text-secondary">
        <div class="lg:inline">在你的移動設備、電腦和其他裝置上盡情</div>
        <div class="lg:inline">閱讀，完全不受限。</div>
      </h3>
    </div>
    <div class="flex flex-col-reverse gap-6 md:grid md:grid-cols-12">
      <div
        class="col-span-full flex h-[560px] flex-col items-center justify-center rounded-lg bg-white text-primary shadow-[0_2px_20px_2px_rgba(0,0,0,0.05)] md:col-span-6 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3"
      >
        <div class="mb-6 flex items-baseline">
          <p class="text-5xl font-bold leading-normal">$120</p>
          <p class="ml-1">/月</p>
        </div>

        <div class="grid grid-cols-4 3xl:gap-4">
          <ul class="col-span-2 col-start-2 mb-3 flex flex-col self-start text-secondary">
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>無廣告</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>支援一部裝置閱讀</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>支援離線閱讀</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>使用匿名服務</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>無限制地閱讀所有文章</p>
            </li>
          </ul>
        </div>
        <button
          class="btn h-[38px] w-[68%] bg-secondary text-white hover:bg-slate-500 3xl:w-[286px]"
        >
          立即訂閱
        </button>
      </div>
      <div
        class="shadow-top col-span-full flex h-[560px] flex-col items-center justify-center rounded-lg bg-white text-primary shadow-[0_2px_20px_2px_rgba(0,0,0,0.05)] md:col-span-6 lg:col-span-5 lg:col-start-7 xl:col-span-4"
      >
        <div class="mb-6 flex items-baseline">
          <p class="text-5xl font-bold leading-normal">$1200</p>
          <p class="ml-1">/年</p>
        </div>
        <div class="grid grid-cols-4 3xl:gap-4">
          <ul class="col-span-2 col-start-2 mb-3 flex flex-col self-start text-secondary">
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>無廣告</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>不限裝置數量閱讀</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>支援離線閱讀</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>使用匿名服務</p>
            </li>
            <li class="mb-3 flex">
              <Icon name="ic:baseline-check" size="25" class="mr-2" />
              <p>無限制地閱讀所有文章</p>
            </li>
          </ul>
        </div>
        <button
          class="btn h-[38px] w-[68%] bg-secondary text-white hover:bg-slate-500 3xl:w-[286px]"
        >
          立即訂閱
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white">
    <section class="container py-10 pb-[100px] lg:py-[100px] xl:py-[124px]">
      <h3
        class="mb-10 text-center text-4xl font-bold leading-[54px] text-primary 3xl:mb-8 3xl:text-5xl"
      >
        FAQ
      </h3>
      <ul class="mx-auto flex w-[402px] flex-col lg:w-[872px]">
        <li
          class="border-[rgb(78 42 9 0.2)] flex items-center justify-between border-b text-primary"
        >
          <p class="py-4 leading-8">要如何觀看解鎖文章？</p>
          <Icon name="ic:baseline-plus" size="25" class="" />
        </li>
        <li
          class="border-[rgb(78 42 9 0.2)] flex items-center justify-between border-b text-primary"
        >
          <p class="py-4 leading-8">我可以使用哪些支付工具訂閱？</p>
          <Icon name="ic:baseline-plus" size="25" class="" />
        </li>
        <li
          class="border-[rgb(78 42 9 0.2)] flex items-center justify-between border-b text-primary"
        >
          <p class="py-4 leading-8">海外讀者也可以訂閱嗎？</p>
          <Icon name="ic:baseline-plus" size="25" class="" />
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.shadow-top {
  box-shadow: inset 0px 8px 0px 0px rgba(121, 105, 89, 1);
}
</style>
