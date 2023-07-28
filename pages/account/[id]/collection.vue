<script setup lang="ts">
import CollectionList from '~/containers/CollectionList.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '我的收藏' })
</script>
<template>
  <div>
    <CollectionList />
  </div>
</template>

<style scoped></style>
