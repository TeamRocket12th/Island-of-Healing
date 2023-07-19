<script setup lang="ts">
const { formatDate } = useDateFormat()
defineProps({
  orderData: {
    type: Array as () => PastOrder[],
    required: true,
    default: () => []
  }
})
</script>
<template>
  <div v-if="orderData.length > 0" class="md:hidden">
    <ul
      v-for="(order, index) in orderData"
      :key="index"
      class="mb-6 flex w-full flex-col rounded border border-secondary bg-white p-3 shadow-[0_2px_20px_2px_rgba(0,0,0,0.07)]"
    >
      <li class="mb-3 text-xl text-primary-dark">{{ formatDate(order.PaidDate) }}</li>
      <li class="mb-2 text-primary-dark">
        <span class="text-primary">訂單編號 : </span> {{ order.MerchantOrderNo }}
      </li>
      <li class="mb-2 text-primary-dark">
        <span class="text-primary">訂單類別 : </span> {{ order.PlanName }}
      </li>
      <li class="mb-4 text-primary-dark">
        <span class="text-primary">付款方式 : </span> {{ order.PaymentMethod }}
      </li>
      <li class="mb-3 h-[1px] border-b border-secondary"></li>
      <li class="flex justify-end text-primary-dark">
        <span class="mr-1">價格 $ </span> {{ order.PlanPrice }}
      </li>
    </ul>
  </div>
  <table
    v-if="orderData.length > 0"
    class="hidden w-full table-fixed border border-slate-300 text-center md:table"
  >
    <thead class="bg-[#EEEAE1]">
      <tr class="text-center text-[16px] font-normal text-primary">
        <th class="border border-slate-300 py-3">日期</th>
        <th class="border border-slate-300 py-3">訂單編號</th>
        <th class="border border-slate-300 py-3">訂閱類別</th>
        <th class="border border-slate-300 py-3">價格</th>
        <th class="border border-slate-300 py-3">付款方式</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(order, index) in orderData"
        :key="index"
        class="text-center text-[16px] text-primary-dark"
      >
        <td class="py-3">{{ formatDate(order.PaidDate) }}</td>
        <td class="py-3">{{ order.MerchantOrderNo }}</td>
        <td class="py-3">{{ order.PlanName }}</td>
        <td class="py-3">${{ order.PlanPrice }}</td>
        <td class="py-3">{{ order.PaymentMethod }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else class="text-center text-2xl text-primary">目前沒有訂單紀錄</div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #eeeae1;
}
</style>
