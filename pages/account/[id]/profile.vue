<script setup lang="ts">
definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '會員設定' })
</script>
<template>
  <div><ProfileForm /></div>
</template>

<style scoped></style>
