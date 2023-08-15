<script setup lang="ts">
const { isMobile, checkIsMobile } = useFadeUpOnMobile()

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
</script>
<template>
  <section class="container pt-10 sm:pt-[120px]">
    <h2
      class="mb-5 text-center text-4xl font-bold text-primary md:text-5xl"
      data-aos-delay="600"
      data-aos="zoom-in"
    >
      專注寫作，輕鬆建立個人品牌和讀者群
    </h2>
    <p
      class="mb-9 text-center font-[350px] text-primary md:text-2xl"
      data-aos-delay="1000"
      data-aos="zoom-in"
    >
      我們致力於提供一個讓你發揮創作潛能的 寫作文章平台。
    </p>
    <div class="text-center">
      <NuxtLink
        to="/become_creater/steps"
        class="mx-auto mb-9 flex h-[60px] w-[137px] items-center justify-center rounded bg-secondary px-4 py-3 text-2xl text-white hover:bg-btn-hover active:bg-btn-active"
        data-aos-delay="1400"
        data-aos="zoom-in"
        >開始使用</NuxtLink
      >
    </div>
    <div class="flex flex-wrap justify-center pb-20 lg:pb-[200px] xl:flex-nowrap">
      <div
        class="relative w-full lg:w-2/3 2xl:w-[60%] 3xl:w-2/3"
        data-aos-delay="2200"
        :data-aos="isMobile ? 'zoom-in' : 'zoom-in'"
      >
        <img src="/landingpage/bg-desktop.png" alt="desktop" class="lg:h-[420px] xl:h-[520px]" />
        <img
          src="/landingpage/bg-iphone.png"
          alt="phone"
          class="absolute bottom-0 w-1/5 xl:h-[340px]"
        />
      </div>
      <div
        class="w-full text-center lg:w-1/3 lg:text-left lg:first-letter:w-1/3 2xl:w-[30%]"
        :data-aos-delay="isMobile ? null : '2600'"
        :data-aos="isMobile ? 'zoom-in' : 'fade-left'"
      >
        <div class="mb-9 md:mb-5 xl:mb-11">
          <h4 class="mb-1 text-2xl font-medium text-primary">AI 推薦導流</h4>
          <p class="font-light text-primary-dark">
            AI 聊天室向用戶推薦個人化文章內容，有效地提升使用者的黏著性。
          </p>
        </div>
        <div class="mb-9 md:mb-5 xl:mb-11">
          <h4 class="mb-1 text-2xl font-medium text-primary">SEO 曝光推廣</h4>
          <p class="font-light text-primary-dark">
            針對平台的網站進行優化，關鍵字研究、優化網站結構和內容、提高在搜尋引擎中的排名。
          </p>
        </div>
        <div class="mb-9 md:mb-5 xl:mb-11">
          <h4 class="mb-1 text-2xl font-medium text-primary">數據分析和個性化推薦</h4>
          <p class="font-light text-primary-dark">
            利用數據分析技術，了解用戶的喜好和行為模式，向用戶提供相關和感興趣的內容。
          </p>
        </div>
        <div>
          <h4 class="text-2xl font-medium text-primary">多平台同步</h4>
          <p class="font-light text-primary-dark">
            支持多平台同步，方便你在不同設備上無縫切換，讓你可以隨時隨地進行寫作。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
