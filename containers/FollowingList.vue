<script setup lang="ts">
const { data: followingWriters, error } = getMockData<Writer>('account', 'following')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="mb-16 border-primary bg-sand-100 pb-24 pt-10 md:border md:px-10">
    <h2 class="mb-14 text-center text-2xl font-bold leading-normal md:text-left">我的追蹤</h2>
    <ClientOnly>
      <WriterCardWide :writer-info="followingWriters" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
