<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <AritcleCard />
  </div>
</template>

<style scoped></style>
