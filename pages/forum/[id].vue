<script setup lang="ts">
import TopicSidebar from '~/containers/TopicSidebar.vue'
</script>
<template>
  <section class="container">
    <div class="grid grid-cols-12 gap-6 pt-10">
      <div class="col-span-8 p-10">
        <TopicDetail />
        <RecTopicCard />
      </div>
      <div class="col-span-3 col-start-10">
        <TopicSidebar />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
