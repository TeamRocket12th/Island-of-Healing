<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'

const { toastText } = storeToRefs(useToast())
</script>

<template>
  <p
    data-aos="fade-left"
    class="fade-element w-36 rounded bg-secondary py-3 pl-2 text-sm text-white duration-700 sm:w-[322px] lg:h-[44px] lg:w-[348px]"
  >
    {{ toastText }}
  </p>
</template>

<style scoped></style>
