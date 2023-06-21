<script setup lang="ts">
defineProps({
  writerInfo: {
    type: Array as () => Writer[],
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div>
    <ul v-if="writerInfo.length > 0" class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:px-28">
      <li
        v-for="writer in writerInfo"
        :key="writer.id"
        class="mb-6 flex items-center justify-between border border-[#CDCDCD] p-6"
      >
        <span class="flex items-center gap-2">
          <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
            <img :src="writer.imgUrl" alt="writer" />
          </div>
          <div>
            <p>{{ writer.name }}</p>
            <p>{{ writer.bio }}</p>
          </div>
        </span>
        <button class="flex items-center rounded border px-3 py-1 text-[#9F9F9F]">
          <Icon name="ic:baseline-plus" size="20" />追蹤
        </button>
      </li>
    </ul>
    <span v-else>Loading...</span>
  </div>
</template>
<style scoped></style>
