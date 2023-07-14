<script setup lang="ts">
const route = useRoute()
console.log(route.query.status)

onMounted(() => {
  if (route.query.status === 'success') {
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
