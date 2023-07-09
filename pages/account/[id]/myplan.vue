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
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = modalUse.value ? 'hidden' : 'auto'
  }
})
</script>
<template>
  <div>
    <PlanManagement class="relative" @plan-cancel="showCancelModal" />
    <Teleport to="body">
      <Transition>
        <CancelPlan v-if="modalUse" @plan-cancel="hideCancelModal" />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
