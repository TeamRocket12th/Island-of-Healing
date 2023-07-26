<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'

const { showToast } = storeToRefs(useToast())

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '會員設定' })
</script>
<template>
  <div class="mb-40 border-secondary bg-sand-100 p-10 sm:border">
    <div class="xl:grid xl:grid-cols-12">
      <h2 class="col-span-2 text-center font-serif-tc text-2xl font-bold text-primary md:text-left">
        會員設定
      </h2>
      <ProfileForm />
    </div>
    <div class="fixed right-10 top-44 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
  </div>
</template>

<style scoped></style>
