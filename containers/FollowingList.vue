<script setup lang="ts">
const { data: followingWriters, error } = getMockData<Writer>('account', 'following')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="mb-16 rounded-lg bg-white px-10 pb-24 pt-10">
    <h2 class="mb-14 text-2xl font-bold leading-normal">我的追蹤</h2>
    <ClientOnly>
      <WriterCardWide :writer-info="followingWriters" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
