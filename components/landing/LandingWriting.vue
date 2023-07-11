<script setup lang="ts"></script>
<template>
  <section class="container">
    <h3 class="mb-5 text-center text-4xl font-bold text-primary-dark md:mb-4 md:text-4xl-plus">
      強大而直觀的寫作工具
    </h3>
    <p class="mb-12 text-center text-base font-[350px] text-primary-dark md:mb-[100px] md:text-2xl">
      讓您專注於創作，輕鬆實現您的想法和故事。
    </p>
    <div class="flex flex-wrap md:flex-nowrap">
      <div class="order-2 w-full md:order-1 md:w-1/3">
        <div class="produce1 mb-11 flex w-full gap-4">
          <div class="w-1/3">
            <div
              class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[2px] border-secondary bg-sand-200"
            >
              <Icon name="material-symbols:draw" size="27" class="text-secondary" />
            </div>
          </div>
          <div>
            <h4 class="text-2xl font-bold text-primary">專注於寫作的編輯器</h4>
            <p class="font-light text-primary-dark">
              文字編輯器專為創作者而設計，旨在提供一個無干擾的寫作的空間。讓您能夠全神貫注地表達您的思想和創意。
            </p>
          </div>
        </div>
        <div class="produce2 mb-11 flex w-full gap-4">
          <div class="w-1/3">
            <div
              class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[2px] border-secondary bg-sand-200"
            >
              <Icon name="ic:outline-grid-view" size="27" class="text-secondary" />
            </div>
          </div>
          <div>
            <h4 class="text-2xl font-bold text-primary">乾淨直觀的介面</h4>
            <p class="font-light text-primary-dark">
              我們的文字編輯器採用了乾淨且直觀的用戶界面，以提供無壓力的寫作體驗。沒有繁瑣的功能和複雜的選項，只有您真正需要的工具，讓您的寫作流程更加順暢。
            </p>
          </div>
        </div>
        <div class="produce2 flex w-full gap-4">
          <div class="w-1/3">
            <div
              class="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-[2px] bg-sand-200"
            >
              <img src="~/assets/images/landingpage/markdown-icon.svg" alt="" class="" />
            </div>
          </div>
          <div>
            <h4 class="text-2xl font-bold text-primary">支援Markdown 語法</h4>
            <p class="font-light text-primary-dark">
              內置了強大的Markdown語法支援，讓您可以通過快捷鍵和簡單的指令，輕鬆編輯和格式化您的內容。
            </p>
          </div>
        </div>
      </div>
      <div class="order-1 md:order-2">影片影片影片</div>
    </div>
  </section>
</template>

<style>
/* .produce1 h4,
.produce1 p {
  animation: fontSizeChange 15s infinite;
}

.produce2 h4,
.produce2 p {
  animation: fontSizeChange 15s infinite;
  animation-delay: 5s;
}

.produce3 h4,
.produce3 p {
  animation: fontSizeChange 15s infinite;
  animation-delay: 10s;
} */

/* @keyframes fontSizeChange {
  0% {
    transform: scale(1);
  }

  33.33% {
    transform: scale(1);
  }

  66.66% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
} */
</style>
