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
  <div class="bg-sand-100">
    <div
      class="container relative flex h-[364px] flex-col items-center justify-center px-10 pb-12 text-center lg:h-[584px]"
    >
      <h3
        class="z-10 mb-12 text-[40px] font-bold text-primary"
        :data-aos="isMobile ? 'fade-up' : 'fade-down'"
      >
        打造個人品牌，發掘內容創作的無限可能
      </h3>

      <NuxtLink
        to="/become_creater/steps"
        class="mx-auto mb-9 flex h-[60px] w-[137px] items-center justify-center rounded bg-secondary px-4 py-3 text-2xl text-white hover:bg-btn-hover active:bg-btn-active"
        data-aos="fade-up"
        >開始使用</NuxtLink
      >
      <img
        src="/landingpage/pen.png"
        alt=""
        class="absolute bottom-[170px] z-10 hidden w-[248px] lg:right-[2%] lg:block 2xl:xl:right-[10%]"
        :data-aos="isMobile ? 'fade-up' : 'fade-left'"
      />
      <img
        src="/landingpage/line.png"
        alt=""
        class="absolute bottom-[170px] z-0 hidden w-[500px] lg:right-[2%] lg:block 2xl:right-[4%]"
        :data-aos="isMobile ? 'fade-up' : 'fade-left'"
      />
      <img
        src="/landingpage/note.png"
        alt=""
        class="absolute bottom-[160px] z-0 hidden w-[383px] lg:left-[5%] lg:block 2xl:left-[12%]"
        :data-aos="isMobile ? 'fade-up' : 'fade-right'"
      />
    </div>
  </div>
</template>
<style scoped></style>
