<script setup lang="ts">
const { data: pastorders, error } = getMockData<PastOrder>('account', 'pastorders')
if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="bg-white p-10">
    <h2 class="mb-10 text-2xl font-bold">歷史訂單</h2>
    <table class="w-full table-fixed border border-slate-300 text-center">
      <thead class="bg-[#F5F5F5]">
        <tr>
          <th class="border border-slate-300 py-3">日期</th>
          <th class="border border-slate-300 py-3">訂單編號</th>
          <th class="border border-slate-300 py-3">訂閱類別</th>
          <th class="border border-slate-300 py-3">價格</th>
          <th class="border border-slate-300 py-3">付款方式</th>
          <th class="border border-slate-300 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in pastorders" :key="order.orderId">
          <td class="py-3">{{ order.orderDate }}</td>
          <td class="py-3">{{ order.orderId }}</td>
          <td class="py-3">{{ order.orderPlan }}</td>
          <td class="py-3">${{ order.price }}</td>
          <td class="py-3">{{ order.payment }}</td>
          <td class="py-3"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #f5f5f5;
}
</style>
