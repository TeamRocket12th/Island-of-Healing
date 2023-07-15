<script setup lang="ts">
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
    // 停止之前的圈圈动画
    // clearInterval(progress)

    // // 播放当前圈圈动画
    // playCircleProgress(currentIndex.value)

    // 更新索引
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }, 3000)
})

// const playCircleProgress = (index: number) => {
//   const circles = [circleProgress1, circleProgress2, circleProgress3, circleProgress4]
//   const currentCircle = circles[index]

//   if (!currentCircle || !currentCircle.value) {
//     return
//   }

//   const progressEnd = 100
//   const speed = 30

//   let progressStart = 1
//   const progress = setInterval(() => {
//     progressStart++
//     console.log(progressStart)
//     currentCircle.value.style.background = `conic-gradient(#5f4681 ${
//       progressStart * 3.6
//     }deg, #dedede 0deg)`

//     if (progressStart === progressEnd) {
//       clearInterval(progress)
//     }
//   }, speed)
// }

// const progressEnd = 100
// const speed = 30

// const circleProgress1 = ref<HTMLElement | null>(null)
// const circleProgress2 = ref<HTMLElement | null>(null)
// const circleProgress3 = ref<HTMLElement | null>(null)
// const circleProgress4 = ref<HTMLElement | null>(null)

// const data = ref({
//   progressStart: 1
// })

// const progress = setInterval(() => {
//   data.value.progressStart++
//   console.log(data.value.progressStart)
//   circleProgress1.value.style.background = `conic-gradient(#5f4681 ${
//     data.value.progressStart * 3.6
//   }deg, #dedede 0deg)`
//   circleProgress2.value.style.background = `conic-gradient(#5f4681 ${
//     data.value.progressStart * 3.6
//   }deg, #dedede 0deg)`
//   circleProgress3.value.style.background = `conic-gradient(#5f4681 ${
//     data.value.progressStart * 3.6
//   }deg, #dedede 0deg)`
//   circleProgress4.value.style.background = `conic-gradient(#5f4681 ${
//     data.value.progressStart * 3.6
//   }deg, #dedede 0deg)`
//   if (data.value.progressStart === progressEnd) {
//     clearInterval(progress)
//   }
// }, speed)
</script>

<template>
  <div class="bg-sand-100 px-10 py-10 pb-0 sm:pb-20 lg:px-0 lg:pb-10">
    <div class="container">
      <div class="flex flex-col md:flex-row">
        <div class="mb-4 flex flex-col md:mb-0 md:w-1/2" data-aos="fade-right">
          <h3 class="mb-5 text-[40px] font-bold text-primary">在 小島聊癒所 創作，你可以...</h3>

          <ul class="mb-8">
            <li class="mb-6 flex items-center">
              <Icon class="mr-2" name="ic:outline-check-circle" size="20" />
              <!-- <div class="flex w-6 items-center justify-center p-1"> 
               <ClientOnly>
                  <div
                    ref="circleProgress1"
                    class="circle relative h-3 w-3 items-center justify-center rounded-full bg-slate-500"
                  ></div
                ></ClientOnly> 
               </div> -->
              <p class="text-xl font-medium text-primary-dark 3xl:text-2xl">建立個人品牌</p>
            </li>
            <li class="mb-6 flex items-center">
              <Icon class="mr-2" name="ic:outline-check-circle" size="20" />
              <!-- <div class="flex w-6 items-center justify-center p-1">  <ClientOnly>
                  <div
                    ref="circleProgress2"
                    class="circle relative h-3 w-3 items-center justify-center rounded-full bg-slate-500"
                  ></div
                ></ClientOnly> 
               </div> -->
              <p class="text-xl font-medium text-primary-dark 3xl:text-2xl">增加曝光機會</p>
            </li>
            <li class="mb-6 flex items-center">
              <Icon class="mr-2" name="ic:outline-check-circle" size="20" />
              <!-- <div class="flex w-6 items-center justify-center p-1"
                <ClientOnly>
                  <div
                    ref="circleProgress3"
                    class="circle relative h-3 w-3 items-center justify-center rounded-full bg-slate-500"
                  ></div
                ></ClientOnly>
              </div> -->
              <p class="text-xl font-medium text-primary-dark 3xl:text-2xl">開起論壇話題互動</p>
            </li>
            <li class="mb-6 flex items-center">
              <Icon class="mr-2" name="ic:outline-check-circle" size="20" />
              <!-- <div class="flex w-6 items-center justify-center p-1"> <ClientOnly>
                  <div
                    ref="circleProgress4"
                    class="circle relative h-3 w-3 items-center justify-center rounded-full bg-slate-500"
                  ></div
                ></ClientOnly> 
              </div> -->
              <p class="text-xl font-medium text-primary-dark 3xl:text-2xl">數據分析儀表板管理</p>
            </li>
          </ul>
        </div>
        <div
          class="image-slider flex w-full justify-end md:w-1/2"
          data-aos="fade-left"
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
.circle {
  background: conic-gradient(#5f4681 3.6deg, #dedede 0deg);
  align-items: center;
  justify-content: center;
  position: relative;
}

.circle::before {
  content: '';
  position: absolute;
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: #faf9f3;
  top: 16%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
}

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
