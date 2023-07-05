<script setup lang="ts">
const trendingWriters = [
  {
    name: '章家齊',
    role: '心理諮商師',
    id: '1',
    imgUrl: 'https://picsum.photos/48'
  },
  {
    name: '章家齊',
    role: '心理諮商師',
    id: '2',
    imgUrl: 'https://picsum.photos/48'
  },
  {
    name: '章家齊',
    role: '心理諮商師',
    id: '3',
    imgUrl: 'https://picsum.photos/48'
  }
]
</script>
<template>
  <ul>
    <li
      v-for="writer in trendingWriters"
      :key="writer.id"
      class="flex items-center justify-between border-b border-gray-200 p-4"
    >
      <div class="flex items-center gap-2">
        <div class="h-12 w-12 overflow-hidden rounded-full">
          <img :src="writer.imgUrl" alt="writer" />
        </div>
        <div>
          <p class="font-bold">{{ writer.name }}</p>
          <p>{{ writer.role }}</p>
        </div>
      </div>
      <button class="flex items-center rounded border px-3 py-1 text-[#9F9F9F]">追蹤</button>
    </li>
  </ul>
</template>

<style scoped></style>
