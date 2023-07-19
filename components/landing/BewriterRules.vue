<script setup lang="ts">
const steps = {
  step1: {
    id: 1,
    title: '成為會員',
    content: ['提供必要的個人電子郵件和密碼。', '完成註冊程序，建立您的使用者帳戶。']
  },
  step2: {
    id: 2,
    title: '登入帳號，進入會員設定頁面',
    content: ['在個人設定選項中，選擇成為作家。']
  },
  step3: {
    id: 3,
    title: '完成基本資料後送出審核',
    content: [
      '在成為作家身份選項中，填寫您的基本資料、寫作經驗等。',
      '確保提供的資料是正確和完整的。',
      '上傳您的作品供審核參考。'
    ]
  },
  step4: {
    id: 4,
    title: '等待審核通知',
    content: [
      '審核流程可能需要 3-5 個工作天，請耐心等待。',
      '您將在審核結果出爐後收到通知，通常是透過電子郵件或 使用者帳戶的訊息系統。',
      '審核通過，您將獲得作家身份，並能夠開始寫作！',
      '審核不通過，您將收到相關說明或建議，以幫助您提升作 家身份的申請。'
    ]
  }
}

const step = ref('step1')
const currentStep = ref(1)

const nextStep = () => {
  const currentStepIndex = Object.keys(steps).indexOf(step.value)
  const nextStepIndex = currentStepIndex + 1
  if (nextStepIndex < Object.keys(steps).length) {
    step.value = Object.keys(steps)[nextStepIndex]
  }
  if (currentStep.value < 4) {
    currentStep.value++
  }
}
const backStep = () => {
  const currentStepIndex = Object.keys(steps).indexOf(step.value)
  const prevStepIndex = currentStepIndex - 1
  if (prevStepIndex >= 0) {
    step.value = Object.keys(steps)[prevStepIndex]
  }
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

watch(step, (newStep) => {
  step.value = newStep
})

const imageUrl = computed(() => `/landingpage/rules/${step.value}.png`)
</script>
<template>
  <div class="container pb-16 pt-10 md:pb-[168px] md:pt-[94px]">
    <div class="flex border-sand-300 md:border-[0.5px]">
      <div class="w-full px-6 pb-10 md:w-[55%] md:pb-12 md:pt-24">
        <h2 class="mb-8 block text-center text-2xl font-bold text-primary md:hidden">
          {{ `申請作家身份流程 (${currentStep}/4)` }}
        </h2>
        <h3
          class="mb-2 block w-full pl-1 text-center text-base font-medium text-primary-dark md:text-left md:text-xl"
        >
          {{ steps[step as keyof typeof steps].title }}
        </h3>
        <div class="item-center flex flex-wrap justify-center md:hidden">
          <ul class="mb-5 list-disc pl-5 text-base text-primary-dark">
            <li v-for="item in steps[step as keyof typeof steps].content" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="mb-5 overflow-y-hidden md:h-[250px] lg:h-[350px] xl:h-[430px] 2xl:h-[460px]">
          <img :src="imageUrl" alt="成為作家" class="w-full 2xl:h-[460px]" />
        </div>
        <div class="flex justify-end">
          <button
            class="rounded px-5 py-2 text-secondary hover:bg-secondary hover:text-white"
            @click="backStep"
          >
            返回
          </button>
          <button
            v-if="currentStep !== 4"
            class="ml-4 rounded bg-secondary px-3 py-2 text-white"
            @click="nextStep"
          >
            下一步
          </button>
          <NuxtLink to="/signup"
            ><button
              v-if="currentStep === 4"
              class="ml-4 rounded bg-secondary px-2 py-2 text-white"
              @click="nextStep"
            >
              開始註冊
            </button>
          </NuxtLink>
        </div>
      </div>
      <div class="hidden w-[45%] border-l-[0.5px] border-sand-300 px-6 py-12 md:block">
        <h2 class="mb-8 text-center text-2xl font-bold text-primary">申請作家身份流程</h2>
        <ul>
          <li v-for="(stepKey, index) in steps" :key="index" :class="['flex', 'gap-4']">
            <div class="flex h-36 w-8 flex-wrap justify-center">
              <div>
                <div
                  :class="[
                    'flex',
                    'h-8',
                    'w-8',
                    'items-center',
                    'justify-center',
                    'rounded-full',
                    {
                      'bg-secondary': currentStep >= stepKey.id,
                      'bg-sand-300': currentStep < stepKey.id
                    }
                  ]"
                >
                  <Icon
                    v-if="currentStep >= stepKey.id"
                    name="material-symbols:check-small"
                    size="24"
                    class="text-white"
                  />
                  <p v-else class="text-white">{{ stepKey.id }}</p>
                </div>
              </div>
              <div class="h-[112px] w-[2px] bg-sand-300"></div>
            </div>
            <div
              :class="{
                'text-secondary': currentStep >= stepKey.id,
                'opacity-20': currentStep < stepKey.id,
                'text-primary-dark': currentStep < stepKey.id
              }"
            >
              <h4 class="text-base font-medium">{{ stepKey.title }}</h4>
              <ul class="list-disc pl-5 text-base">
                <li v-for="item in stepKey.content" :key="item">{{ item }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
