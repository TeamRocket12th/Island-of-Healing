<script setup lang="ts">
import FollowingList from '~/containers/FollowingList.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
</script>
<template>
  <section>
    <FollowingList />
  </section>
</template>

<style scoped></style>
