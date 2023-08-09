<script setup lang="ts">
const { searchTopic } = useSearch()
</script>

<template>
  <div class="px-3 py-10">
    <div class="mb-3 text-xl font-bold text-primary">話題搜尋</div>
    <SearchInput :search-fn="searchTopic" class="mb-10" />
    <TrendingTopics />
  </div>
</template>

<style scoped></style>
