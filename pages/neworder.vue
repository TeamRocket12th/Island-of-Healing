<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { userData } = storeToRefs(useUserStore())
const { apiBase, userToken } = useApiConfig()
const route = useRoute()

const getUserOrder = async () => {
  if (!userToken.value) {
    return
  }
  try {
    const res: ApiResponse = await $fetch(`${apiBase}/userorderdetail/get`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userToken.value}`
      }
    })
    if (res.StatusCode === 200) {
      userData.value.myPlan = res.Plan
    }
  } catch (error: any) {
    console.log(error)
  }
}

useSeoMeta({ title: '訂單明細' })
onMounted(() => {
  if (route.query.status === 'success') {
    getUserOrder()
    orderResult.value = true
  }
})

const orderStatus = ref(false)
const orderResult = ref(false)
const orderForm = (value: boolean) => {
  orderStatus.value = value
}
const showOrderResult = (value: boolean) => {
  orderResult.value = value
}
const closeResult = (value: boolean) => {
  orderResult.value = value
}

watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = orderStatus.value || orderResult.value ? 'hidden' : 'auto'
    document.body.style.paddingRight = orderStatus.value || orderResult.value ? '15px' : '0'
  }
})
</script>

<template>
  <main class="bg-sand-100 pb-[190px]">
    <OrderForm class="relative" @custom-order="orderForm" />
    <Teleport to="body">
      <Transition>
        <OrderConfirm v-if="orderStatus" @custom-order="orderForm" @get-result="showOrderResult" />
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition>
        <OrderResult v-if="orderResult" @close-result="closeResult" />
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
