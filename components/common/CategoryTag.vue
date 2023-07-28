<script setup lang="ts">
defineProps({
  tags: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div>
    <ul class="flex gap-2">
      <li
        v-for="(tag, index) in tags"
        :key="index"
        class="rounded-md border border-assistant bg-assistant px-4 py-1 text-sm text-white"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
