<script setup lang="ts">
definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
const runtimeConfig = useRuntimeConfig()
const apiBase = runtimeConfig.public.apiBase
const userToken = useCookie('token')

const ordersData = ref([])

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
      ordersData.value = res.OrdersData
      console.log(res)
    }
  } catch (error: any) {
    console.log(error)
  }
}
onMounted(getPastorders)
</script>
<template>
  <div>
    <PastOrders :order-data="ordersData" />
  </div>
</template>

<style scoped></style>
