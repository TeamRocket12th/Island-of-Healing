<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex justify-between">
      <h2 class="text-3xl-plus font-bold text-primary">2023 相談室最新公告</h2>
      <span class="font-light text-primary-dark">2023-05-23 17:43 發表於 告解室大廳 </span>
    </div>
    <div class="border-b-[0.5px] border-primary pb-6"></div>
    <div class="my-6">
      <img src="https://picsum.photos/904/300" alt="topic-cover" class="w-full" />
    </div>
    <div class="mb-9 border-b-[0.5px] border-primary pb-20">
      v-dompurify-html="articleDetail?.Content"
    </div>
    <!--話題留言-->
    <div>
      <p class="mb-7 font-serif-tc text-2xl font-bold text-primary">留言</p>
      <TopicComment />
    </div>
  </div>
</template>

<style scoped></style>
