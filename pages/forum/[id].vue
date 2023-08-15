<script setup lang="ts">
import TopicSidebar from '~/containers/TopicSidebar.vue'
</script>
<template>
  <section class="container">
    <div class="grid grid-cols-12 gap-6 pb-36 pt-10">
      <div class="col-span-full lg:col-span-8">
        <TopicDetail />
        <RecTopicCard />
      </div>
      <div class="hidden md:col-span-3 md:col-start-10 lg:block">
        <TopicSidebar />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
