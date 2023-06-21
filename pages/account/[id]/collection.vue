<script setup lang="ts">
import CollectionList from '~/containers/CollectionList.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
</script>
<template>
  <div>
    <CollectionList />
  </div>
</template>

<style scoped></style>
