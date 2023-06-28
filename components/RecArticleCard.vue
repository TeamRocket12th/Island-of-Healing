<script setup lang="ts">
const recArticles = [
  {
    id: '001',
    createdDate: '2023-03-20',
    title: '行動力的關鍵：三個方法提升自我效能',
    coverUrl: 'https://picsum.photos/224/152',
    summary:
      '拖延症是一個常見的問題，讓我們無法有效地完成任務或達成目標。這種負面循環不僅影響我們的效率和成就，還會給我們帶來...',
    writerInfo: {
      imgUrl: 'https://picsum.photos/24',
      name: '莉莉安'
    }
  },
  {
    id: '002',
    createdDate: '2023-03-20',
    title: '轉化焦慮為生活的優勢',
    coverUrl: 'https://picsum.photos/224/152',
    summary:
      '在人生的旅程中，我們都曾經歷過傷痛和創傷，這些經驗可能對我們的內在安全感造成了損害。這篇文章將探討修復式成長的概念...',
    writerInfo: {
      imgUrl: 'https://picsum.photos/24',
      name: '艾蜜莉'
    }
  },
  {
    id: '003',
    createdDate: '2023-03-20',
    title: '行動力的關鍵：三個方法提升自我效能',
    coverUrl: 'https://picsum.photos/224/152',
    summary:
      '在現代社會中，許多人都受到所謂的「青鳥症候群」的困擾。這種症候群指的是對自己的生活和成就感到失落、無助和不滿足的感覺...',
    writerInfo: {
      imgUrl: 'https://picsum.photos/24',
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
      class="border-light flex items-center gap-6 py-6"
    >
      <div class="h-[152px] w-[30%]">
        <img :src="article.coverUrl" alt="cover" class="h-full w-full" />
      </div>
      <div class="w-[70%]">
        <h3 class="mb-3 font-serif-tc text-xl font-bold text-primary">{{ article.title }}</h3>
        <p class="mb-[22px] font-light text-primary-dark">{{ article.summary }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1">
            <img :src="article.writerInfo.imgUrl" alt="avatar" class="h-6 w-6 rounded-full" />
            <p class="font-sm font-light text-primary-dark">{{ article.writerInfo.name }}</p>
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
