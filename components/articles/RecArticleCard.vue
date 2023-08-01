<script setup lang="ts">
const { data: recArticles } = useFetch('/api/recArticles')
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
