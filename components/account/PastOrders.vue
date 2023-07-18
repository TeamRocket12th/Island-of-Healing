<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')
const { formatDate } = useDateFormat()

const OrdersData = ref([])
const getPastorders = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/userorders/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      OrdersData.value = res.OrdersData
    }
  } catch (error: any) {
    console.log(error)
  }
}
onMounted(getPastorders)
</script>
<template>
  <div class="mb-40 border-primary bg-sand-100 px-10 pb-40 pt-10 sm:border">
    <h2 class="mb-6 font-serif-tc text-2xl font-bold text-primary 3xl:mb-10">歷史訂單</h2>
    <div v-if="OrdersData.length > 0" class="md:hidden">
      <ul
        v-for="(order, index) in OrdersData"
        :key="index"
        class="mb-6 flex w-full flex-col rounded border border-secondary bg-white p-3 shadow-[0_2px_20px_2px_rgba(0,0,0,0.07)]"
      >
        <li class="mb-3 text-xl text-primary-dark">{{ formatDate(order.PaidDate) }}</li>
        <li class="mb-2 text-primary-dark">
          <span class="text-primary">訂單編號 : </span> {{ index + 1 }}
        </li>
        <li class="mb-2 text-primary-dark">
          <span class="text-primary">訂單類別 : </span> {{ order.PlanName }}
        </li>
        <li class="mb-4 text-primary-dark">
          <span class="text-primary">付款方式 : </span> {{ order.payment }}
        </li>
        <li class="mb-3 h-[1px] border-b border-secondary"></li>
        <li class="flex justify-end text-primary-dark">
          <span class="mr-1">價格 $ </span> {{ order.PaymentMethod }}
        </li>
      </ul>
    </div>
    <table
      v-if="OrdersData.length > 0"
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
          v-for="(order, index) in OrdersData"
          :key="index"
          class="text-center text-[16px] text-primary-dark"
        >
          <td class="py-3">{{ formatDate(order.PaidDate) }}</td>
          <td class="py-3">{{ index + 1 }}</td>
          <td class="py-3">{{ order.PlanName }}</td>
          <td class="py-3">${{ order.PlanPrice }}</td>
          <td class="py-3">{{ order.PaymentMethod }}</td>
        </tr>
      </tbody>
    </table>
    <span v-else> Loaging... </span>
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #eeeae1;
}
</style>
