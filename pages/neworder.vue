<script setup lang="ts">
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
      <OrderConfirm v-if="orderStatus" @custom-order="orderForm" @get-result="showOrderResult" />
    </Teleport>
    <Teleport to="body">
      <OrderResult v-if="orderResult" @close-result="closeResult" />
    </Teleport>
  </main>
</template>

<style scoped></style>
