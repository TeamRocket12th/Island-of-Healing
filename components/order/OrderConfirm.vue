<script setup lang="ts">
const userData = {
  userName: '林小明',
  userMail: 'abc0000@gmail.com',
  plan: {
    project: '月付讀到飽專案',
    paymentMethod: '信用卡',
    price: '	TW $120'
  }
}
const emits = defineEmits(['custom-order', 'get-result'])
const sendOrder = (value: Boolean) => {
  emits('custom-order', value)
}
const getResult = (value: Boolean) => {
  emits('get-result', value)
}
</script>

<template>
  <div
    class="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black bg-opacity-20"
    @click.self="sendOrder(false)"
  >
    <div class="container mb-10 mt-40 grid grid-cols-12 rounded-lg">
      <div class="relative col-span-8 col-start-3 rounded-lg bg-white shadow">
        <Icon
          name="ic:twotone-close"
          size="24"
          class="absolute right-0 top-0 mr-6 mt-6 cursor-pointer text-primary"
          @click="sendOrder(false)"
        />
        <h2 class="my-[54px] text-center font-serif-tc text-2xl font-bold text-primary">
          結帳確認
        </h2>
        <div class="m-6 rounded border-[0.5px] border-secondary p-3">
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
            <p class="text-secondary">{{ userData.plan.project }}</p>
            <div class="flex gap-[126px] text-secondary">
              <span>{{ userData.plan.price }}</span>
              <span>{{ userData.plan.price }}</span>
            </div>
          </div>
        </div>
        <div class="m-6 rounded border-[0.5px] border-secondary pb-12 pl-3 pr-[136px] pt-3">
          <h3 class="mb-2 text-2xl font-medium text-primary">付款資訊</h3>
          <div class="flex justify-between">
            <div>
              <h4 class="my-2 font-medium text-primary">付款方式</h4>
              <span class="text-secondary">{{ userData.plan.paymentMethod }}</span>
            </div>
            <div>
              <h4 class="my-2 font-medium text-primary">顧客資訊</h4>
              <div>
                <p class="mb-1 text-secondary">聯絡人：{{ userData.userName }}</p>
                <p class="text-secondary">聯絡信箱：{{ userData.userMail }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-16 flex justify-end gap-3 px-6">
          <button
            class="rounded border px-6 py-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="sendOrder(false)"
          >
            返回修改
          </button>
          <button
            class="rounded border px-6 py-[7px] text-secondary duration-100 hover:bg-secondary hover:text-white"
            @click="getResult(true)"
          >
            確認付款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
