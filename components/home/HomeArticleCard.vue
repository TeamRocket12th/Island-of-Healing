<script setup>
const articles = [
  {
    id: 1,
    type: '個人成長',
    title: '重建內在力量：創傷後的成長與自我照顧的關鍵',
    imgUrl: 'https://picsum.photos/408/247',
    content:
      '心理學家 Amos Tversky 和 Daniel Kahneman 在 1970 年代發展出認知偏見的理論，描述因為人類對於資訊處理上有一定的限度，所以在某些情境下會難以理性及有...'
  },
  {
    id: 2,
    type: '日常練習',
    title: '走出情緒低潮：五個簡單行動陪你重拾積極心態',
    imgUrl: 'https://picsum.photos/408/247',
    content:
      '在生活的旅途中，我們都會遇到情緒低潮的時刻。這些時刻讓我們感到沮喪、無助和失去方向。然而，我們並不孤單，而是有許多簡單而有效的方法可以幫助我們走出情緒低潮，重拾積極心態。'
  },
  {
    id: 3,
    type: '情緒察覺',
    title: '靜心與自我觀察：放鬆心靈的四個方法面對過度思考',
    imgUrl: 'https://picsum.photos/408/247',
    content:
      '在這個繁忙的現代生活中，我們往往被過度思考和內心的嘈雜聲所困擾。這些思緒無法停止地盤旋在我們的頭腦中，造成焦慮和壓力。'
  }
]
</script>
<template>
  <section class="bg-sand-200 py-[84px]">
    <div class="container">
      <div class="mb-6 flex items-center gap-4 px-4">
        <h2 class="font-serif-tc text-4xl font-bold text-primary">精選文章</h2>
        <div class="h-[0.5px] w-[150px] bg-primary"></div>
      </div>
      <ul class="mb-3 grid grid-cols-12">
        <li v-for="article in articles" :key="article.id" class="col-span-4 h-[460px] p-4">
          <NuxtLink :to="`/article/${id}`">
            <div class="relative">
              <div class="mb-2">
                <img :src="article.imgUrl" alt="article-cover" class="w-full" />
              </div>
              <span
                class="absolute top-0 h-8 w-[74px] bg-assistant p-1 font-serif-tc font-semibold text-sand-100"
                >{{ article.type }}</span
              >
            </div>
            <div>
              <div class="mb-2 flex">
                <p class="mb-3 font-serif-tc text-xl font-bold text-primary">
                  {{ article.title }}
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
          <span class="border-b border-primary">閱讀更多</span>
          <Icon name="ic:outline-keyboard-arrow-right" size="24" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
<style scoped>
li:first-child {
  border-right: 0.5px solid #4e2a09;
}
li:last-child {
  border-left: 0.5px solid #4e2a09;
}
</style>
