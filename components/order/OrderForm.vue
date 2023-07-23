<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { usePaymentStore } from '~/stores/payment'

const userStore = useUserStore()
const { userData } = storeToRefs(userStore)
const route = useRoute()

const { selectedOrder, customerData } = storeToRefs(usePaymentStore())
const { getCustomerInfo } = usePaymentStore()

const customerInputs = ref<CustomerData>({
  nickName: userData.value.nickName,
  email: userData.value.email,
  phone: '',
  planId: Number(route.query.id)
})

console.log(customerData.value)
const emits = defineEmits(['custom-order', 'get-customer-data', 'get-payment-data'])
const sendOrder = (value: boolean, data: CustomerData) => {
  emits('custom-order', value)
  getCustomerInfo(data)
}
</script>

<template>
  <section class="container">
    <div class="grid grid-cols-1 border border-primary bg-white px-10 pb-14 pt-10 md:grid-cols-12">
      <div class="mb-10 md:col-span-7 md:mb-0 md:mr-6">
        <h2 class="mb-10 font-serif-tc text-2xl font-bold text-primary">顧客資料</h2>
        <form class="rounded border-[0.5px] border-secondary px-6 py-[26px]">
          <div>
            <label for="name" class="mb-2 block text-primary-dark">顧客名稱:</label>
            <input
              id="name"
              v-model="customerInputs.nickName"
              type="text"
              name="name"
              required
              class="mb-5 block w-full rounded border border-secondary px-3 py-2 focus:outline-secondary"
            />
          </div>
          <div>
            <label for="email" class="mb-2 block text-primary-dark">電子郵件:</label>
            <input
              id="email"
              v-model="customerInputs.email"
              type="email"
              name="email"
              required
              class="mb-5 block w-full rounded border border-secondary px-3 py-2 focus:outline-secondary"
            />
          </div>
          <div>
            <label for="phone" class="mb-2 block text-primary-dark">電話號碼:</label>
            <input
              id="phone"
              v-model="customerInputs.phone"
              type="tel"
              name="phone"
              maxlength="10"
              required
              class="block w-full rounded border border-secondary px-3 py-2 focus:outline-secondary"
            />
          </div>
        </form>
      </div>
      <div
        class="rounded border-[0.5px] border-secondary pb-10 pl-6 pr-6 md:col-span-5 md:pb-[204px]"
      >
        <div class="mb-11 pt-6">
          <p
            class="mb-4 border-b-[0.5px] border-primary pb-6 font-serif-tc text-2xl font-bold text-primary"
          >
            訂單明細
          </p>
          <p class="mb-6 text-xl font-medium text-primary-dark">
            {{ selectedOrder.planName }}
          </p>
          <div class="mb-16 flex items-center justify-between">
            <span class="font-medium text-primary-dark">TW ${{ selectedOrder.price }}</span>
            <span class="font-light text-primary-dark">售價</span>
          </div>
          <span
            class="block border-b-[0.5px] border-primary pb-6 text-right text-xl font-bold text-primary-dark"
            >TW ${{ selectedOrder.price }}</span
          >
        </div>
        <div class="px-16">
          <button
            type="button"
            class="block w-full rounded border bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            @click="sendOrder(true, customerInputs)"
          >
            同意並送出
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
