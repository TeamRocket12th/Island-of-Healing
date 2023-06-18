<script setup lang="ts">
const orderStatus = ref(false)
const orderForm = (value: boolean) => {
  orderStatus.value = value
}
</script>

<template>
  <main>
    <OrderForm class="relative" @custom-order="orderForm" />
    <OrderConfirm v-show="orderStatus" @custom-order="orderForm" />
    <AlertModal />
  </main>
</template>

<style scoped></style>
