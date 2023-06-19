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
  },
  {
    name: '作家姓名',
    id: '6',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  },
  {
    name: '作家姓名',
    id: '7',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  },
  {
    name: '作家姓名',
    id: '8',
    bio: '作家自介',
    imgUrl: 'https://picsum.photos/60'
  }
]
</script>
<template>
  <div class="mb-16 rounded-lg bg-white px-10 pb-24 pt-10">
    <h2 class="mb-14 text-2xl font-bold leading-normal">我的追蹤</h2>
    <WriterCardWide :writer-info="followingWriters" />
  </div>
</template>

<style scoped></style>
