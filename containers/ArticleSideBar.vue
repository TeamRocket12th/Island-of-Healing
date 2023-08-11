<script setup lang="ts">
const { searchArticle } = useSearch()
</script>
<template>
  <div class="p-3">
    <h3 class="mb-3 font-serif-tc text-xl font-bold leading-normal text-primary">文章搜尋</h3>
    <SearchInput class="mb-11" :search-fn="searchArticle" />
    <TrendingList />
  </div>
</template>

<style scoped></style>
