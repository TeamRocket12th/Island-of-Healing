<script setup lang="ts">
const articles = [
  {
    id: 74,
    type: '個人成長',
    title: '重建內在力量：創傷後的成長與自我照顧的關鍵',
    imgUrl: '/articlecover/cover9.jpg',
    content:
      '在人生的旅程中，我們可能會遭遇各種創傷和挑戰，這些經歷可能對我們的身心造成傷害和影響。然而，即...'
  },
  {
    id: 73,
    type: '日常練習',
    title: '走出情緒低潮：五個簡單行動陪你重拾積極心態',
    imgUrl: '/articlecover/cover10.jpg',
    content:
      '在生活的旅途中，我們都會遇到情緒低潮的時刻。這些時刻讓我們感到沮喪、無助和失去方向。...'
  },
  {
    id: 72,
    type: '情緒察覺',
    title: '靜心與自我觀察：放鬆心靈的四個方法面對過度思考',
    imgUrl: '/articlecover/cover11.jpg',
    content:
      '在這個繁忙的現代生活中，我們往往被過度思考和內心的嘈雜聲所困擾。這些思緒無法停止地盤旋在我們的...'
  }
]
const formatTitle = (title: string) => {
  if (title.length > 18) {
    return title.substring(0, 18) + '...'
  }
  return title
}
</script>
<template>
  <section class="bg-sand-100 py-[84px] sm:bg-sand-200">
    <div class="container">
      <div class="mb-6 flex items-center gap-2 px-4">
        <h2 class="font-serif-tc text-4xl font-bold text-primary">精選文章</h2>
        <div class="h-[0.5px] w-[150px] bg-primary"></div>
      </div>
      <ul class="mb-3 grid-cols-12 sm:grid">
        <li v-for="article in articles" :key="article.id" class="col-span-4 p-4">
          <NuxtLink :to="`/article/${article.id}`">
            <div class="relative">
              <div class="mb-2 overflow-hidden">
                <NuxtImg
                  format="avif"
                  loading="lazy"
                  width="407"
                  :src="article.imgUrl"
                  alt="article-cover"
                  class="h-[260px] duration-500 hover:scale-105 sm:h-[110px] md:h-[140px] lg:h-[190px] xl:h-[260px]"
                />
              </div>
              <span
                class="absolute top-0 h-8 w-[74px] bg-assistant p-1 font-serif-tc font-semibold text-sand-100"
                >{{ article.type }}</span
              >
            </div>
            <div>
              <div class="mb-2 flex">
                <p class="mb-3 font-serif-tc text-xl font-bold text-primary">
                  {{ formatTitle(article.title) }}
                </p>
              </div>
              <p class="font-light text-primary-dark">
                {{ article.content }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/article" class="font-serif-tc text-xl font-semibold text-primary">
        <div class="flex items-center justify-center">
          <span class="border-b border-primary">更多文章</span>
          <Icon name="ic:outline-keyboard-arrow-right" size="24" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
<style scoped>
@media (min-width: 640px) {
  li:first-child {
    border-right: 0.5px solid #4e2a09;
  }
  li:last-child {
    border-left: 0.5px solid #4e2a09;
  }
}
</style>
