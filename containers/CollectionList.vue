<script setup lang="ts">
const { data: collectedArticles, error } = getMockData<Article>('account', 'collection')

if (error.value) {
  console.error('Error fetching data: ', error.value)
}
</script>
<template>
  <div class="mb-[213px] border-primary bg-sand-100 sm:border">
    <h2 class="mb-10 pl-10 pt-10 font-serif-tc text-2xl font-bold text-primary">我的收藏</h2>
    <ClientOnly>
      <CollectionCard :collected-articles="collectedArticles" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
