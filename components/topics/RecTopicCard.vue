<script setup lang="ts">
const articleList = [
  {
    title: '遇到渣男',
    content:
      '擁有最寬廣的自在與支持，好想法能找到好地方發芽，於是理想不再那麼那麼遠。我們開放線上，讓你好好與自己和解。'
  },
  {
    title: '情人節如何安排？',
    content:
      '擁有最寬廣的自在與支持，好想法能找到好地方發芽，於是理想不再那麼那麼遠。我們開放線上，讓你好好與自己和解。'
  },
  {
    title: '和老闆聚餐要送禮嗎？',
    content:
      '擁有最寬廣的自在與支持，好想法能找到好地方發芽，於是理想不再那麼那麼遠。我們開放線上，讓你好好與自己和解。'
  }
]
</script>

<template>
  <h3 class="mb-6 font-serif-tc text-2xl font-bold text-primary">你可能會喜歡的話題</h3>
  <ul>
    <li
      v-for="(article, index) in articleList"
      :key="index"
      class="border-b border-primary/10 text-primary"
    >
      <h4 class="mb-[14px] cursor-pointer pt-6 text-xl font-bold">{{ article.title }}</h4>
      <div class="flex justify-between pb-6">
        <p class="w-2/3 cursor-pointer font-light">
          {{ article.content }}
        </p>
        <div class="flex w-1/3 items-end justify-end font-light text-primary-dark">
          <span> 2023-05-23 </span>
          <span class="ml-3"><Icon name="mdi:message-reply-outline" size="16" /></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>
