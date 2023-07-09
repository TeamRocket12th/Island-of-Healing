<script setup lang="ts">
const { data: pastorders, error } = getMockData<PastOrder>('account', 'pastorders')
if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="mb-40 border-primary bg-sand-100 px-10 pb-40 pt-10 sm:border">
    <h2 class="mb-6 font-serif-tc text-2xl font-bold text-primary 3xl:mb-10">歷史訂單</h2>
    <div class="md:hidden">
      <ul
        v-for="order in pastorders"
        :key="order.orderId"
        class="mb-6 flex w-full flex-col rounded border border-secondary bg-white p-3 shadow-[0_2px_20px_2px_rgba(0,0,0,0.07)]"
      >
        <li class="mb-3 text-xl text-primary-dark">{{ order.orderDate }}</li>
        <li class="mb-2 text-primary-dark">
          <span class="text-primary">訂單編號 : </span> {{ order.orderId }}
        </li>
        <li class="mb-2 text-primary-dark">
          <span class="text-primary">訂單類別 : </span> {{ order.orderPlan }}
        </li>
        <li class="mb-4 text-primary-dark">
          <span class="text-primary">付款方式 : </span> {{ order.payment }}
        </li>
        <li class="mb-3 h-[1px] border-b border-secondary"></li>
        <li class="flex justify-end text-primary-dark">
          <span class="mr-1">價格 $ </span> {{ order.price }}
        </li>
      </ul>
    </div>

    <table class="hidden w-full table-fixed border border-slate-300 text-center md:table">
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
          v-for="order in pastorders"
          :key="order.orderId"
          class="text-center text-[16px] text-primary-dark"
        >
          <td class="py-3">{{ order.orderDate }}</td>
          <td class="py-3">{{ order.orderId }}</td>
          <td class="py-3">{{ order.orderPlan }}</td>
          <td class="py-3">${{ order.price }}</td>
          <td class="py-3">{{ order.payment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #eeeae1;
}
</style>
