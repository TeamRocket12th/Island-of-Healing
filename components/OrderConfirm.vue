<script setup lang="ts">
const userData = {
  userName: '林小明',
  userMail: 'abc0000@gmail.com',
  plan: {
    project: '月付讀到飽專案',
    paymentMethod: '信用卡',
    price: '	US $120'
  }
}
const emits = defineEmits(['custom-order'])
const sentOrder = (value: Boolean) => {
  emits('custom-order', value)
}
</script>

<template>
  <div class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
    <div class="mb-10 grid grid-cols-12 rounded-lg border-[#D9D9D9] bg-[#D9D9D9] pb-14 pt-20">
      <div class="col-span-2"></div>
      <div class="relative col-span-8 mt-20 rounded-lg border bg-white">
        <Icon
          name="ic:twotone-close"
          size="14"
          class="absolute right-0 top-0 mr-7 mt-7 cursor-pointer"
          @click="sentOrder(false)"
        />
        <h2 class="pb-6 pt-12 text-center text-[32px] font-bold">結帳確認</h2>
        <div class="m-6 overflow-x-auto border p-3">
          <table class="table">
            <thead>
              <tr>
                <th class="text-2xl text-[#828282]">結帳金額</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="w-1/3">課程名稱</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="font-bold">購買方案</td>
                <td class="font-bold">售價</td>
                <td class="font-bold">折扣</td>
                <td class="font-bold">實付價格</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th class="text-[#646161]">{{ userData.plan.project }}</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{ userData.plan.price }}</td>
                <td></td>
                <td>{{ userData.plan.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="m-6 overflow-x-auto border p-3 pb-12">
          <table class="table">
            <thead>
              <tr>
                <th class="text-2xl text-[#828282]">付款資訊</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b-0">
                <th class="w-1/3">
                  <span class="font-bold">付款方式</span>
                  <br /><span class="text-[#828282]">信用卡</span>
                </th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <span class="font-bold">顧客資訊</span><br /><span class="text-[#828282]"
                    >聯絡人：林小明</span
                  ><br /><span class="text-[#828282]">聯絡信箱：abc0000@gmail.com</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-16 flex justify-end gap-3 px-6">
          <button class="border px-6 py-[7px]" @click="sentOrder(false)">返回修改</button>
          <button class="border px-6 py-[7px]">確認付款</button>
        </div>
      </div>
      <div class="col-span-2"></div>
    </div>
  </div>
</template>

<style scoped>
.table :where(th, td, ) {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 0px;
}
</style>
