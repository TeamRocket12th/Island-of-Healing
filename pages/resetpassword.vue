<script setup lang="ts">
definePageMeta({
  requiredAuth: true
})
useSeoMeta({ title: '重設密碼' })
</script>

<template>
  <section>
    <ResetPasswordForm />
  </section>
</template>

<style scoped></style>
