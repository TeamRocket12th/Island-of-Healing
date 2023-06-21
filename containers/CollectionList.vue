<script setup lang="ts">
const { data: collectedArticles, error } = getMockData<Article>('collection')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="bg-white p-10">
    <h2 class="mb-10 text-2xl font-bold">我的收藏</h2>
    <ClientOnly>
      <CollectionCard :collected-articles="collectedArticles" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
