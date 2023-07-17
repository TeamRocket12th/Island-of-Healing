<script setup lang="ts">
import isWriter from '~/middleware/isWriter'
definePageMeta({
  middleware: [isWriter],
  pageName: 'dashboard',
  layout: 'userlayout',
  requiredAuth: true
})

const { nowPage } = usePageName()
</script>
<template>
  <div class="mb-40 border border-primary bg-white px-10 pt-10">
    <h2 class="mb-10 font-serif-tc text-2xl font-bold leading-normal">後台數據</h2>
    <div>
      <MyDashboard />
      <div class="mb-28 pb-14">
        <MyArticleTableTab :now-page="nowPage" />
        <MyArticleTable :now-page="nowPage" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
