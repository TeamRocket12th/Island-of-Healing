<script setup lang="ts">
import MsgCenter from '~/containers/MsgCenter.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
</script>
<template>
  <section class="pb-[181px] pt-16 sm:border-t sm:border-primary lg:pt-10">
    <MsgCenter />
  </section>
</template>

<style scoped></style>
