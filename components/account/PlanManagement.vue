<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
const emits = defineEmits(['plan-cancel'])
const cancelPlan = (value: boolean) => {
  emits('plan-cancel', value)
}
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

const allPlans = ref([
  {
    sub: 'free',
    name: '免費專案'
  },
  {
    sub: 'monthly',
    name: '月付讀到飽專案'
  },
  {
    sub: 'yearly',
    name: '年付讀到飽專案'
  }
])

const otherPlans = allPlans.value.filter((plan) => plan.sub !== userData.value.myPlan)
console.log(otherPlans)

const renderPlan = (plan: string) => {
  switch (plan) {
    case 'free':
      return '免費專案'
    case 'monthly':
      return '月付讀到飽專案'
    case 'yearly':
      return '年付讀到飽專案'
    default:
      return '免費專案'
  }
}

const myPlan = computed(() => {
  return renderPlan(userData.value.myPlan)
})
</script>
<template>
  <div class="mb-[147px] grid grid-cols-12 border border-primary bg-sand-100">
    <h2 class="col-span-2 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">變更訂閱</h2>
    <div class="grid-start-3 col-span-8 px-3 py-32">
      <div class="mb-[27px] border border-secondary bg-white p-4">
        <h3 class="mb-5 text-xl font-medium text-primary">目前方案</h3>
        <div class="flex justify-between text-primary-dark">
          <p>{{ myPlan }}</p>
          <ul v-if="userData.myPlan !== 'free'" class="list-disc">
            <li class="mb-2">下次扣款日：2023/07/04</li>
            <li class="mb-[14px]">閱讀權限至：2023/07/04</li>
          </ul>
        </div>
        <div class="mb-4 border-[0.5px] border-secondary"></div>
        <div class="flex justify-end">
          <button class="border-b border-primary text-primary" @click="cancelPlan(true)">
            取消訂閱
          </button>
        </div>
        <div v-if="false" class="flex justify-between">
          <p class="text-sand-300">已退訂</p>
          <button class="border-primary text-primary">重新訂閱</button>
        </div>
      </div>
      <div class="border border-secondary bg-white p-4">
        <h3 class="mb-5 text-xl font-medium text-primary">可用方案</h3>
        <p class="mb-3 text-primary-dark">年付讀到飽專案</p>
        <div class="mb-[10px]">
          <NuxtLink to="/plans" class="border-b border-primary text-primary">瞭解更多</NuxtLink>
        </div>
        <div class="flex justify-end">
          <NuxtLink to="/neworder" class="rounded bg-secondary px-3 py-2 text-white"
            >選擇方案</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
