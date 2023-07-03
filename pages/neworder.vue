<script setup lang="ts">
const orderStatus = ref(false)
const orderForm = (value: boolean) => {
  orderStatus.value = value
}
</script>

<template>
  <main class="bg-sand-100 pb-[190px]">
    <OrderForm class="relative" @custom-order="orderForm" />
    <OrderConfirm v-if="orderStatus" @custom-order="orderForm" />
  </main>
</template>

<style scoped></style>
