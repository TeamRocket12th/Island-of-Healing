<script setup lang="ts">
import FollowingList from '~/containers/FollowingList.vue'

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '我的追蹤' })
</script>
<template>
  <section>
    <FollowingList />
  </section>
</template>

<style scoped></style>
