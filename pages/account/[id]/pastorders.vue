<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '歷史訂單' })

const { apiBase, userToken } = useApiConfig()
const { isLoading } = storeToRefs(useLoading())
const { setLoading } = useLoading()

const orderData = ref<PastOrder[]>([])

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
      orderData.value = res.OrdersData
    }
  } catch (error: any) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

setLoading(true)
onMounted(getPastorders)
</script>
<template>
  <div>
    <div class="mb-40 border-primary bg-sand-100 px-10 pb-24 pt-10 sm:border">
      <h2 class="mb-14 font-serif-tc text-2xl font-bold text-primary 3xl:mb-10">歷史訂單</h2>
      <div v-if="isLoading"><LoadingItem /></div>
      <PastOrders v-else :order-data="orderData" />
    </div>
  </div>
</template>

<style scoped></style>
