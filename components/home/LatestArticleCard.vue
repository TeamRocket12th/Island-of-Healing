<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'

const { userData } = storeToRefs(useUserStore())
const articles = ref<ArticleCard[]>([])
const { formatDate } = useDateFormat()

const { data } = await useFetch<ApiResponse>('/api/allarticles', {
  headers: {
    'Content-type': 'application/json'
  },
  method: 'POST',
  body: {
    Page: 1,
    UserId: userData.value.id || '0'
  }
})

if (data.value!.StatusCode === 200) {
  articles.value = data.value!.LatestArticleData
} else {
  console.log(data.value!._data.Message)
}

const formatTitle = (title: string) => {
  if (title.length > 17) {
    return title.substring(0, 17) + '...'
  }
  return title
}
</script>
<template>
  <section class="container mb-6">
    <div class="mb-6 flex items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <h2 class="font-serif-tc text-4xl font-bold text-primary">最新文章</h2>
        <div class="h-[0.5px] w-[150px] bg-primary"></div>
      </div>
    </div>

    <ul class="mb-3 grid-cols-12 gap-4 md:grid">
      <li
        v-for="article in articles"
        :key="article.Id"
        class="mb-3 flex h-auto grow flex-col p-4 md:col-span-6 lg:col-span-4"
      >
        <div class="flex w-full justify-between">
          <div class="flex flex-col">
            <div class="mb-1 flex">
              <h3 class="font-serif-tc font-semibold text-primary">{{ article.Category }}</h3>
            </div>
            <p class="mb-3 font-serif-tc text-sm font-light text-[#828282] sm:text-primary-dark">
              {{ formatDate(article.Initdate) }}
            </p>
          </div>
        </div>
        <NuxtLink :to="`/article/${article.Id}`">
          <div class="flex h-[400px] flex-col">
            <div class="mb-3 h-[267px] max-w-full overflow-hidden">
              <img
                :src="article.ArticleImgUrl ? article.ArticleImgUrl : '/default-article-cover.jpg'"
                alt="article-cover"
                class="h-full w-full object-cover duration-500 hover:scale-105"
              />
            </div>
            <h4 class="mb-3 font-serif-tc text-xl font-bold text-primary">
              {{ formatTitle(article.Title) }}
            </h4>
            <p class="flex-grow font-light text-primary-dark">{{ article.Summary }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>

    <div class="flex justify-center">
      <NuxtLink to="/article" class="font-serif-tc text-xl font-semibold text-primary">
        <div class="flex items-center">
          <span class="border-b border-primary">更多文章</span>
          <Icon name="ic:outline-keyboard-arrow-right" size="24" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
