<script setup lang="ts">
definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
const modalUse = ref()
const cancelModalShow = (value: boolean) => {
  modalUse.value = value
  console.log(modalUse.value)
}
const cancelModalHidden = (value: boolean) => {
  modalUse.value = value
}
</script>
<template>
  <div>
    <PlanManagement class="relative" @plan-cancel="cancelModalShow" />
    <CancelPlan v-if="modalUse" @plan-cancel="cancelModalHidden" />
  </div>
</template>

<style scoped></style>
