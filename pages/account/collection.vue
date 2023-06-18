<script setup lang="ts">
import auth from '~/middleware /auth'
import CollectionList from '~/containers/CollectionList.vue'

definePageMeta({
  middleware: [auth],
  layout: 'userlayout'
})
</script>
<template>
  <div>
    <CollectionList />
  </div>
</template>

<style scoped></style>
