<script setup lang="ts">
const recArticles = [
  {
    id: 60,
    createdDate: '2023-07-12',
    title: '行動力的關鍵：三個方法提升自我效能',
    coverUrl: '/articlecover/cover3.jpeg',
    summary:
      '拖延症是一個常見的問題，讓我們無法有效地完成任務或達成目標。這種負面循環不僅影響我們的效率和成就，還會給我們帶來...',
    writerInfo: {
      id: 12,
      imgUrl: '/landingpage/users/user7.jpg',
      name: '莉莉安'
    }
  },
  {
    id: 57,
    createdDate: '2023-07-12',
    title: '轉化焦慮為生活的優勢',
    coverUrl: '/articlecover/cover4.jpeg',
    summary:
      '在人生的旅程中，我們都曾經歷過傷痛和創傷，這些經驗可能對我們的內在安全感造成了損害。這篇文章將探討修復式成長的概念...',
    writerInfo: {
      id: 10,
      imgUrl: '/landingpage/users/user3.jpg',
      name: '艾蜜莉'
    }
  },
  {
    id: 59,
    createdDate: '2023-07-12',
    title: '走出青鳥症候群，活出真實而有意義的生活',
    coverUrl: '/articlecover/cover2.jpeg',
    summary:
      '在現代社會中，許多人都受到所謂的「青鳥症候群」的困擾。這種症候群指的是對自己的生活和成就感到失落、無助和不滿足的感覺...',
    writerInfo: {
      id: 16,
      imgUrl: '/landingpage/users/user8.jpg',
      name: '卡夫卡'
    }
  }
]
</script>
<template>
  <ul class="mb-40">
    <li
      v-for="article in recArticles"
      :key="article.id"
      class="border-light items-center gap-6 py-6 sm:flex"
    >
      <div class="mb-4 h-[186px] w-full sm:w-[30%] md:mb-0 md:h-[152px]">
        <NuxtLink :to="`/article/${article.id}`">
          <img :src="article.coverUrl" alt="cover" class="h-full w-full object-cover" />
        </NuxtLink>
      </div>

      <div class="w-full md:w-[70%]">
        <NuxtLink :to="`/article/${article.id}`">
          <h3 class="mb-3 font-serif-tc text-xl font-bold text-primary">{{ article.title }}</h3>
        </NuxtLink>
        <p class="mb-[22px] font-light text-primary-dark">{{ article.summary }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <NuxtLink :to="`/writer/${article.writerInfo.id}`">
              <div class="flex gap-1">
                <img
                  :src="article.writerInfo.imgUrl"
                  alt="avatar"
                  class="h-6 w-6 rounded-full object-cover"
                />
                <p class="font-sm font-light text-primary-dark">{{ article.writerInfo.name }}</p>
              </div>
            </NuxtLink>
            <span class="font-light text-primary-dark">·</span>
            <span class="font-sm font-light text-primary-dark">{{ article.createdDate }}</span>
          </div>
          <div class="flex items-end gap-3">
            <span class="cursor-pointer"
              ><Icon
                name="material-symbols:bookmark-outline-rounded"
                size="16"
                class="text-sand-300"
            /></span>
            <span class="cursor-pointer"
              ><Icon
                name="material-symbols:favorite-outline-rounded"
                size="16"
                class="text-sand-300"
            /></span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.border-light {
  border-bottom: 0.5px solid rgba(78, 42, 9, 0.3);
}
</style>
