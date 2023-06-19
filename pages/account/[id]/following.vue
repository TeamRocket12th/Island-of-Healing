<script setup lang="ts">
import auth from '~/middleware /auth'
import FollowingList from '~/containers/FollowingList.vue'

definePageMeta({
  middleware: [auth],
  layout: 'userlayout'
})
</script>
<template>
  <section>
    <FollowingList />
  </section>
</template>

<style scoped></style>
