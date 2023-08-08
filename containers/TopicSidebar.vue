<script setup lang="ts">
const { searchTopic } = useSearch()
</script>

<template>
  <div>
    <SearchInput :search-fn="searchTopic" />
    <TrendingTopics />
  </div>
</template>

<style scoped></style>
