<script setup lang="ts">
const { data: collectedArticles, error } = getMockData<Article>('account', 'collection')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="grid grid-cols-12 border border-primary bg-sand-100">
    <h2 class="col-span-12 mb-10 grid pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">
      我的收藏
    </h2>
    <ClientOnly>
      <CollectionCard :collected-articles="collectedArticles" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
