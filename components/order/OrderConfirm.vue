<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePaymentStore } from '~/stores/payment'

const { selectedOrder, paymentData, customerData } = storeToRefs(usePaymentStore())
const { createOrder } = usePaymentStore()

const emits = defineEmits(['custom-order', 'get-result'])
const sendOrder = (value: Boolean) => {
  emits('custom-order', value)
}

const form = ref<HTMLFormElement | null>(null)

const handleSubmit = async () => {
  await createOrder(customerData.value)
  if (paymentData.value && form.value) {
    form.value.submit()
  }
}
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="sendOrder(false)"
  >
    <div class="mb-10 mt-10 w-[945px] rounded-lg">
      <div class="relative rounded-lg bg-white shadow">
        <Icon
          name="ic:twotone-close"
          size="24"
          class="absolute right-0 top-0 mr-6 mt-6 cursor-pointer text-primary"
          @click="sendOrder(false)"
        />
        <h2 class="py-14 text-center font-serif-tc text-2xl font-bold text-primary">結帳確認</h2>
        <div class="mx-6 rounded border-[0.5px] border-secondary p-3">
          <h3 class="mb-2 text-2xl font-medium text-primary">結帳金額</h3>
          <div class="flex justify-between border-b-[0.5px] border-secondary py-2">
            <h4 class="font-medium text-primary">方案名稱</h4>
            <div class="flex gap-14 font-medium text-primary">
              <span>售價</span>
              <span>折扣</span>
              <span>實付價格</span>
            </div>
          </div>
          <div class="mb-[15px] flex justify-between border-b-[0.5px] border-secondary py-2">
            <p class="text-secondary">{{ selectedOrder.planName }}</p>
            <div class="mr-2 flex gap-44 text-secondary sm:gap-[160px]">
              <span>{{ selectedOrder.price }}</span>
              <span>{{ selectedOrder.price }}</span>
            </div>
          </div>
        </div>
        <div class="m-6 rounded border-[0.5px] border-secondary pb-12 pl-3 pr-[136px] pt-3">
          <h3 class="mb-2 text-2xl font-medium text-primary">付款資訊</h3>
          <div class="flex justify-between">
            <div>
              <h4 class="my-2 font-medium text-primary">付款方式</h4>
              <span class="text-secondary">信用卡</span>
            </div>
            <div>
              <h4 class="my-2 font-medium text-primary">顧客資訊</h4>
              <div>
                <p class="mb-1 text-secondary">聯絡人：{{ customerData.nickName }}</p>
                <p class="mb-1 text-secondary">聯絡信箱：{{ customerData.email }}</p>
                <p class="text-secondary">聯絡電話：{{ customerData.phone }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-3 px-6 pb-16">
          <form
            ref="form"
            name="Newebpay"
            method="post"
            action="https://ccore.newebpay.com/MPG/mpg_gateway"
            @submit.prevent="handleSubmit"
          >
            <!-- 設定 hidden 可以隱藏不用給使用者看的資訊 -->
            <!-- 藍新金流商店代號 -->
            <input
              id="MerchantID"
              type="hidden"
              name="MerchantID"
              :value="paymentData.MerchantID"
            />
            <!-- 交易資料透過 Key 及 IV 進行 AES 加密 -->
            <input id="TradeInfo" type="hidden" name="TradeInfo" :value="paymentData.TradeInfo" />
            <!-- 經過上述 AES 加密過的字串，透過商店 Key 及 IV 進行 SHA256 加密 -->
            <input id="TradeSha" type="hidden" name="TradeSha" :value="paymentData.TradeSha" />
            <!-- 串接程式版本 -->
            <input id="Version" type="hidden" name="Version" :value="paymentData.Version" />
            <input
              type="button"
              value="返回修改"
              class="mr-3 cursor-pointer rounded border px-6 py-[7px] text-secondary duration-100 hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
              @click="sendOrder(false)"
            />
            <!-- 直接執行送出 -->
            <input
              type="submit"
              value="確認付款"
              class="cursor-pointer rounded border px-6 py-[7px] text-secondary duration-100 hover:bg-btn-hover hover:text-white active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
