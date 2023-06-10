<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="container mb-16 3xl:pl-[300px] 3xl:pr-[300px]">
    <h2 class="mb-6 text-2xl font-bold">{{ title }}</h2>
    <AritcleCard />
  </div>
</template>

<style scoped></style>
