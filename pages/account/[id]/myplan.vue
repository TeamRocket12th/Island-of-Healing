<script setup lang="ts">
definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
const modalUse = ref(false)
const showCancelModal = (value: boolean) => {
  modalUse.value = value
}
const hideCancelModal = (value: boolean) => {
  modalUse.value = value
}
</script>
<template>
  <div>
    <PlanManagement class="relative" @plan-cancel="showCancelModal" />
    <CancelPlan v-if="modalUse" @plan-cancel="hideCancelModal" />
  </div>
</template>

<style scoped></style>
