<script setup lang="ts">
const followingWriters = [
  {
    name: '作家姓名',
    id: '1',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  },
  {
    name: '作家姓名',
    id: '2',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  },
  {
    name: '作家姓名',
    id: '3',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  },
  {
    name: '作家姓名',
    id: '4',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  },
  {
    name: '作家姓名',
    id: '5',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  }
]
</script>
<template>
  <div class="grid grid-cols-12 bg-white p-10">
    <div class="col-span-9 mr-6">
      <h2 class="mb-8 text-2xl font-bold">我的追蹤</h2>
      <WriterCardWide :writer-info="followingWriters" />
    </div>
    <div class="col-span-3 pt-[66px]">
      <div class="p-4">
        <h2 class="mb-4 pl-4 text-2xl font-medium">熱門作家</h2>
        <TrendingWriters />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
