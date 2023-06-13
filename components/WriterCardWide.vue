<script setup lang="ts">
type Writer = {
  name: string
  id: string
  bio: string
  imgUrl: string
}

defineProps<{ writerInfo: Writer[] }>()
</script>

<template>
  <ul>
    <li
      v-for="writer in writerInfo"
      :key="writer.id"
      class="mb-6 flex items-center justify-between border border-[#CDCDCD] p-6"
    >
      <div class="flex items-center gap-2">
        <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
          <img :src="writer.imgUrl" alt="writer" />
        </div>
        <div>
          <p>{{ writer.name }}</p>
          <p>{{ writer.bio }}</p>
        </div>
      </div>

      <button class="flex items-center rounded border px-3 py-1 text-[#9F9F9F]">
        <Icon name="ic:baseline-plus" size="20" />追蹤
      </button>
    </li>
  </ul>
</template>

<style scoped></style>
