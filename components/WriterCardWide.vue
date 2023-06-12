<script setup lang="ts">
defineProps({
  articleDetail: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="mb-6 flex items-center justify-between border border-[#CDCDCD] p-6">
    <div class="flex items-center gap-2">
      <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
        <img src="https://picsum.photos/60" alt="writer" />
      </div>
      <div>
        <p>{{ articleDetail.writer }}</p>
        <p>{{ articleDetail.aboutMe }}</p>
      </div>
    </div>

    <button class="flex items-center rounded border px-3 py-1 text-[#9F9F9F]">
      <Icon name="ic:baseline-plus" size="20" />追蹤
    </button>
  </div>
</template>

<style scoped></style>
