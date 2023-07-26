<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { isLogin, userData } = storeToRefs(useUserStore())
const userId = userData.value.id
const { isMobile, checkIsMobile } = useFadeUpOnMobile()

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobile)
})
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    }
  ],
  script: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js',
      async: true
    }
  ]
})

const faqItems = ref([
  {
    id: 1,
    question: '要如何觀看解鎖文章？',
    answer: '請先註冊成為會員，登入後在閱讀方案中，選擇適合您的閱讀方案，進行訂閱付款流程。',
    isActive: false
  },
  {
    id: 2,
    question: '我可以使用哪些支付工具訂閱？',
    answer: '我們只提供信用卡付款服務。',
    isActive: false
  },
  {
    id: 3,
    question: '海外讀者也可以訂閱嗎？',
    answer: '可以，我們歡迎所有地區的使用者。',
    isActive: false
  }
])

const toggleClass = (item: any) => {
  item.isActive = !item.isActive
}
</script>

<template>
  <section class="bg-gradient-to-b from-[#FAF9F3] to-[#FFFFFF]">
    <div class="container py-10 lg:py-[100px] xl:py-[124px]">
      <h3
        data-aos-delay="600"
        data-aos="zoom-in"
        class="mb-4 text-center text-4xl font-bold leading-[54px] text-primary 3xl:mb-8 3xl:text-[64px]"
      >
        <div class="lg:inline">享⁠受⁠零⁠廣⁠告⁠干⁠擾⁠的</div>
        <div class="lg:inline">⁠閱讀⁠體⁠驗</div>
      </h3>
      <p
        data-aos-delay="1000"
        data-aos="zoom-in"
        class="a mb-8 px-12 text-center text-primary lg:text-2xl"
      >
        讓我們一起啟程，發現內在的力量和自由，愛上生活的潛力。
      </p>
      <NuxtLink
        to="#section_plan"
        data-aos-delay="1200"
        data-aos="zoom-in"
        class="mx-auto mb-10 flex h-[60px] w-[130px] items-center justify-center rounded bg-secondary text-2xl font-normal text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white xl:mb-[84px] 3xl:mb-[84px]"
      >
        開始使用
      </NuxtLink>
      <img
        data-aos-delay="1800"
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        src="~/assets/images/plancard/work-work-from-home-01.svg"
        class="mx-auto w-[402px] xl:w-[600px]"
        alt="subplan-pic"
      />
    </div>
  </section>
  <section class="bg-white">
    <section class="container py-10 pb-[100px] lg:py-[100px] xl:py-[124px]">
      <h3
        :data-aos="isMobile ? 'fade-up' : 'fade-right'"
        class="mb-10 text-center text-4xl font-bold leading-[54px] text-primary 3xl:mb-8 3xl:text-5xl"
      >
        加入會員有什麼好處？
      </h3>
      <ul
        class="grid grid-flow-col grid-rows-3 gap-4 lg:grid-rows-1 3xl:gap-[110px]"
        :data-aos="isMobile ? 'fade-up' : 'fade-left'"
      >
        <li class="flex flex-col items-center justify-between">
          <div class="relative h-[300px] w-[330px]">
            <img
              src="~/assets/images/plancard/creator-1.svg"
              alt="membership"
              class="absolute bottom-0 mb-3"
            />
          </div>
          <p class="text-xl font-bold text-primary" data-aos="fade-up">
            ⁠零⁠廣⁠告⁠干⁠擾⁠的⁠閱讀⁠體⁠驗
          </p>
        </li>
        <li class="flex flex-col items-center justify-between">
          <div class="relative h-[300px] w-[330px]">
            <img
              src="~/assets/images/plancard/creator-2.svg"
              alt="membership"
              class="absolute bottom-0 mb-3"
            />
          </div>
          <p class="text-xl font-bold text-primary" data-aos="fade-up">無限使用AI相談室</p>
        </li>
        <li class="flex flex-col items-center justify-between">
          <div class="relative h-[300px] w-[330px]">
            <img
              src="~/assets/images/plancard/creator-3.svg"
              alt="membership"
              class="absolute bottom-0 mb-3"
            />
          </div>
          <p class="text-xl font-bold text-primary" data-aos="fade-up">提供交流和支持的社群</p>
        </li>
      </ul>
    </section>
  </section>
  <section id="section_plan" class="container py-10 lg:py-[100px] xl:py-[124px]">
    <div class="mb-10 text-center lg:mb-20" data-aos="fade-up">
      <h2 class="mb-4 text-4xl font-bold text-primary 3xl:text-5xl">選擇適合你的閱讀方案</h2>
      <h3 class="text-secondary">
        <div class="lg:inline">在你的移動設備、電腦和其他裝置上盡情</div>
        <div class="lg:inline">閱讀，完全不受限。</div>
      </h3>
    </div>
    <div class="flex flex-col-reverse gap-6 md:grid md:grid-cols-12">
      <div
        :data-aos="isMobile ? 'fade-up' : 'fade-right'"
        class="col-span-full flex h-[560px] flex-col items-center justify-center rounded-lg bg-white text-primary shadow md:col-span-6 lg:col-span-5 lg:col-start-2 xl:col-span-4 xl:col-start-3"
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
        <NuxtLink
          :to="isLogin ? `/account/${userId}/myplan` : '/signup'"
          class="btn h-[38px] w-[68%] border-secondary bg-white text-secondary hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white 3xl:w-[286px]"
        >
          立即訂閱
        </NuxtLink>
      </div>
      <div
        :data-aos="isMobile ? 'fade-up' : 'fade-left'"
        class="shadow-top col-span-full flex h-[560px] flex-col items-center justify-center rounded-lg bg-white text-primary md:col-span-6 lg:col-span-5 lg:col-start-7 xl:col-span-4"
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
        <NuxtLink
          :to="isLogin ? `/account/${userId}/myplan` : '/signup'"
          class="btn h-[38px] w-[68%] bg-secondary text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white 3xl:w-[286px]"
        >
          立即訂閱
        </NuxtLink>
      </div>
    </div>
  </section>
  <section class="bg-white">
    <section class="container py-10 pb-[100px] lg:py-[100px] xl:py-[124px]" data-aos="fade-up">
      <h3
        class="mb-10 text-center text-4xl font-bold leading-[54px] text-primary 3xl:mb-8 3xl:text-5xl"
      >
        FAQ
      </h3>
      <ul class="mx-auto flex w-[402px] flex-col lg:w-[872px]">
        <li
          v-for="item in faqItems"
          :key="item.id"
          :class="{
            'border-[rgb(78 42 9 0.2)] flex flex-col justify-between border-b text-primary': true,
            active: item.isActive
          }"
          class="cursor-pointer"
          @click="toggleClass(item)"
        >
          <div class="flex items-center justify-between">
            <p class="py-4 leading-8">{{ item.question }}</p>
            <Icon
              :name="item.isActive ? 'ic:baseline-minus' : 'ic:baseline-plus'"
              size="25"
              class="ease-in"
            />
          </div>
          <div class="pb-3">
            <p
              class="show flex items-center pl-4"
              :class="item.isActive ? 'h-10 opacity-100' : 'h-0 opacity-0'"
            >
              {{ item.answer }}
            </p>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.shadow {
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.05), 0px 1px 20px 0px rgba(0, 0, 0, 0.05);
}
.shadow-top {
  box-shadow: 0px 2px 20px 2px rgba(0, 0, 0, 0.05), 0px 1px 20px 0px rgba(0, 0, 0, 0.05),
    0px 8px 0px 0px #796959 inset;
}
.show {
  transition: all 0.5s;
}
</style>
