<script setup lang="ts">
const { isMobile, checkIsMobile } = useFadeUpOnMobile()

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
const images = ref([
  { src: 'landingpage/article-list', alt: '建立個人品牌' },
  { src: 'landingpage/creators', alt: '增加曝光機會' },
  { src: 'landingpage/forum', alt: '開起論壇話題互動' },
  { src: 'landingpage/writer-backstage', alt: '數據分析儀表板管理' }
])

const currentIndex = ref(0)
const progressss = ref()
onMounted(() => {
  progressss.value = setInterval(() => {
    // 更新照片索引
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }, 3000)
})
</script>

<template>
  <div class="bg-sand-100 px-10 py-10 pb-0 sm:pb-20 lg:px-0 lg:pb-10">
    <div class="container">
      <div class="flex flex-col md:flex-row">
        <div
          class="mb-4 flex flex-col md:mb-0 md:w-1/2"
          :data-aos="isMobile ? 'fade-up' : 'fade-right'"
        >
          <h3 class="mb-5 text-[40px] font-bold text-primary">在 小島聊癒所 創作，你可以...</h3>

          <ul class="mb-8">
            <li v-for="(image, index) in images" :key="index" class="mb-6 flex items-center">
              <Icon
                class="mr-2"
                name="ic:outline-check-circle"
                size="20"
                :class="currentIndex === index ? 'text-primary-dark' : 'text-sand-300'"
              />

              <p class="text-xl font-medium text-primary-dark 3xl:text-2xl">{{ image.alt }}</p>
            </li>
          </ul>
        </div>
        <div
          class="image-slider flex w-full justify-end md:w-1/2"
          :data-aos="isMobile ? 'fade-up' : 'fade-left'"
          data-aos-anchor-placement="center-bottom"
        >
          <transition-group name="fade-in-out" tag="div" class="flex items-center">
            <div v-for="(image, index) in images" :key="index" class="h-[300px] lg:h-[510px]">
              <img
                v-if="currentIndex === index"
                :src="`/${image.src}.png`"
                :alt="image.alt"
                class="slider-image"
              />
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-in-out-enter-active,
.fade-in-out-leave-active {
  transition: opacity 0.5s;
}

.fade-in-out-enter,
.fade-in-out-leave-to {
  opacity: 0;
}

.slider-image {
  max-width: 100%;
  height: auto;
}
</style>
