<script setup lang="ts">
defineProps({
  collectedArticles: {
    type: Array as () => Article[],
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-10 col-start-2 grid">
      <ul v-if="collectedArticles.length > 0" class="mb-[106px]">
        <li v-for="article in collectedArticles" :key="article.id">
          <div class="flex w-full gap-4 p-4">
            <div class="w-1/3">
              <img :src="article.coverUrl" alt="cover" class="w-full" />
            </div>
            <div class="w-full">
              <div class="w-[90%]">
                <div class="mb-3 flex items-center gap-1">
                  <div class="h-6 w-6 rounded-full bg-primary">
                    <img src="" alt="" />
                  </div>
                  <span class="text-sm font-light">{{ article.role }}</span>
                </div>
                <h3 class="mb-2 font-serif-tc text-xl font-bold text-primary">
                  {{ article.articleTitle }}
                </h3>
                <p class="mb-2 font-light text-primary-dark">{{ article.articleSummary }}</p>
              </div>
              <div class="flex justify-between">
                <p class="font-light">{{ article.articleDate }}</p>
                <div class="flex items-center gap-1">
                  <Icon name="mdi:bookmark" size="24" class="text-secondary" />
                  <span class="font-light text-secondary">收藏</span>
                </div>
              </div>
            </div>
          </div>
          <div class="my-6 w-full border-[0.5px] border-primary border-opacity-30"></div>
        </li>
      </ul>
      <span v-else>Loading...</span>
    </div>
  </div>
</template>

<style scoped></style>
