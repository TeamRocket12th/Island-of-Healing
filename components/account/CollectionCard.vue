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
          <div class="block w-full gap-4 p-0 sm:flex sm:p-4">
            <div class="mb-4 w-full sm:m-0 sm:w-1/2 md:w-1/3">
              <img :src="article.coverUrl" alt="cover" class="w-full" />
            </div>
            <div class="w-full">
              <div class="sm:w-[90%]">
                <div class="articleRole mb-3 flex items-center gap-1">
                  <div class="h-6 w-6 rounded-full bg-primary">
                    <img src="" alt="" />
                  </div>
                  <span class="text-sm font-light">{{ article.role }}</span>
                </div>
                <h3 class="mb-4 font-serif-tc text-xl font-bold text-primary sm:mb-2">
                  {{ article.articleTitle }}
                </h3>
                <p class="mb-5 font-light text-primary-dark sm:mb-2">
                  {{ article.articleSummary }}
                </p>
              </div>
              <div class="tableCollect flex justify-between">
                <p class="font-light">{{ article.articleDate }}</p>
                <div class="flex items-center gap-1">
                  <Icon name="mdi:bookmark" size="24" class="text-secondary" />
                  <span class="font-light text-secondary">收藏</span>
                </div>
              </div>
              <div class="phoneCollect flex items-center justify-between">
                <div class="flex gap-[5px]">
                  <div class="flex items-center gap-1">
                    <div class="h-6 w-6 rounded-full bg-primary">
                      <img src="" alt="" />
                    </div>
                    <span class="text-sm font-light">{{ article.role }}</span>
                  </div>
                  <p class="font-light">·{{ article.articleDate }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="mdi:bookmark" size="24" class="text-secondary" />
                  <span class="font-light text-secondary">收藏</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mb-6 mt-[21px] w-full border-[0.5px] border-primary border-opacity-30 sm:my-6"
          ></div>
        </li>
      </ul>
      <span v-else>Loading...</span>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .articleRole {
    display: none;
  }
  .tableCollect {
    display: none;
  }
}
@media (min-width: 640px) {
  .phoneCollect {
    display: none;
  }
}
</style>
