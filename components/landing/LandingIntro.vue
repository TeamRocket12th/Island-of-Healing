<script setup lang="ts"></script>
<template>
  <section class="container">
    <h2 class="mb-5 text-center text-4xl font-bold text-primary md:text-5xl">
      專注寫作，輕鬆建立個人品牌和讀者群
    </h2>
    <p class="mb-9 text-center font-[350px] text-primary md:text-2xl">
      我們致力於提供一個讓你發揮創作潛能的 寫作文章平台。
    </p>
    <div class="text-center">
      <button class="mb-9 rounded bg-secondary px-4 py-3 text-2xl text-white">
        <NuxtLink to=""></NuxtLink>開始使用
      </button>
    </div>
    <div class="flex flex-wrap justify-center pb-20 lg:pb-[200px] xl:flex-nowrap">
      <div class="relative w-full lg:w-2/3">
        <img src="~/assets/images/landingpage/bg-desktop.png" alt="" />
        <img
          src="~/assets/images/landingpage/bg-iphone.png"
          alt=""
          class="absolute bottom-0 w-1/5"
        />
      </div>
      <div class="w-full text-center lg:w-1/3 lg:text-left">
        <div class="mb-9 md:mb-6">
          <h4 class="mb-1 text-2xl text-primary">AI 推薦導流</h4>
          <p class="font-light text-primary-dark">
            AI 聊天室向用戶推薦個人化文章內容，有效地提升使用者的黏著性。
          </p>
        </div>
        <div class="mb-9 md:mb-6">
          <h4 class="mb-1 text-2xl text-primary">SEO 曝光推廣</h4>
          <p class="font-light text-primary-dark">
            針對平台的網站進行優化，關鍵字研究、優化網站結構和內容、提高在搜尋引擎中的排名。
          </p>
        </div>
        <div class="mb-9 md:mb-6">
          <h4 class="mb-1 text-2xl text-primary">數據分析和個性化推薦</h4>
          <p class="font-light text-primary-dark">
            利用數據分析技術，了解用戶的喜好和行為模式，向用戶提供相關和感興趣的內容。
          </p>
        </div>
        <div>
          <h4 class="text-2xl text-primary">多平台同步</h4>
          <p class="font-light text-primary-dark">
            支持多平台同步，方便你在不同設備上無縫切換，讓你可以隨時隨地進行寫作。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
