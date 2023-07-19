<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { usePaymentStore } from '~/stores/payment'

const { selectedOrder, customerData } = storeToRefs(usePaymentStore())

const { formatDate } = useDateFormat()

const emits = defineEmits(['plan-cancel'])
const cancelPlan = (value: boolean) => {
  emits('plan-cancel', value)
}
const userStore = useUserStore()
const { userData } = storeToRefs(userStore)

const allPlans = ref([
  {
    id: 1,
    sub: 'monthly',
    name: '月付讀到飽專案'
  },
  {
    id: 2,
    sub: 'yearly',
    name: '年付讀到飽專案'
  }
])

const otherPlans = computed(() => {
  return allPlans.value.filter((plan) => plan.sub !== userData.value.myPlan)
})

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

const selectedName = ref('')
const myPlan = computed(() => {
  selectedName.value = renderPlan(userData.value.myPlan)
  return renderPlan(userData.value.myPlan)
})

const props = defineProps({
  renewMembership: {
    type: Boolean,
    default: true
  },
  endDate: {
    type: String,
    default: ''
  }
})

const selected = () => {
  selectedOrder.value.planName = selectedName.value
  // console.log(selectedOrder.value.planName)
  if (selectedOrder.value.planName === '月付讀到飽專案') {
    selectedOrder.value.price = 120
    customerData.value.planId = 1
    console.log('selected month')
  } else {
    selectedOrder.value.price = 1200
    customerData.value.planId = 2
    console.log('selected year')
    console.log(customerData.value.planId)
  }
}
const selectedOtherPlans = (otherplan: string) => {
  selectedOrder.value.planName = otherplan

  if (selectedOrder.value.planName === '月付讀到飽專案') {
    selectedOrder.value.price = 120
    customerData.value.planId = 1

    console.log('selectedother month')
    console.log(customerData.value.planId)
  } else {
    selectedOrder.value.price = 1200
    customerData.value.planId = 2
    console.log('selectedother year')
  }
}
</script>
<template>
  <div class="mb-[147px] grid grid-cols-12 border border-primary bg-sand-100">
    <h2 class="col-span-2 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">變更訂閱</h2>
    <div class="grid-start-3 col-span-8 px-3 py-32">
      <div class="mb-7 min-h-[192px] border border-secondary bg-white p-4">
        <h3 class="mb-5 text-xl font-medium text-primary">目前方案</h3>
        <div class="flex justify-between text-primary-dark">
          <p>{{ myPlan }}</p>
          <ul v-if="userData.myPlan !== 'free'" class="list-disc">
            <li v-if="props.renewMembership" class="mb-2">
              下次扣款日：{{ formatDate(props.endDate) }}
            </li>
            <li class="mb-[14px]">閱讀權限至：{{ formatDate(props.endDate) }}</li>
          </ul>
        </div>
        <div class="mb-4 h-[0.5px] w-full bg-secondary"></div>
        <div v-if="!props.renewMembership" class="flex justify-end" @click="selected">
          <NuxtLink
            to="/neworder"
            class="rounded bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            >選擇方案</NuxtLink
          >
        </div>
      </div>
      <div
        v-for="plan in otherPlans"
        :key="plan.id"
        class="min-h-48 mb-7 border border-secondary bg-white p-4"
      >
        <h3 class="mb-5 text-xl font-medium text-primary">可用方案</h3>
        <p class="mb-3 text-primary-dark">{{ plan.name }}</p>
        <div v-if="plan.sub !== userData.myPlan" class="mb-[10px]">
          <NuxtLink to="/plans" class="border-b border-primary text-primary">瞭解更多</NuxtLink>
        </div>
        <div
          v-if="plan.sub !== userData.myPlan"
          class="flex justify-end"
          @click="selectedOtherPlans(plan.name)"
        >
          <NuxtLink
            to="/neworder"
            class="rounded bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            >選擇方案</NuxtLink
          >
        </div>
      </div>
      <div
        v-if="userData.myPlan !== 'free'"
        class="mb-7 min-h-[192px] border border-secondary bg-white p-4"
      >
        <h3 class="mb-5 text-xl font-medium text-primary">可用方案</h3>
        <p class="mb-3 text-primary-dark">免費方案</p>
        <div class="flex justify-end">
          <button
            v-if="props.renewMembership"
            class="border-b border-primary text-primary"
            @click="cancelPlan(true)"
          >
            取消訂閱
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
