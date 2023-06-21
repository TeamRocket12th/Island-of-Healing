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
  <div>
    <ul v-if="collectedArticles.length > 0">
      <li v-for="article in collectedArticles" :key="article.id" class="pt-3">
        <div class="mb-3 flex items-center gap-1 px-6">
          <div class="h-4 w-4 rounded-full bg-[#D9D9D9]"></div>
          <span class="text-sm">{{ article.role }}</span>
        </div>
        <div class="flex gap-3 px-6">
          <div>
            <div class="w-4/5">
              <h3 class="mb-2 font-bold">{{ article.articleTitle }}</h3>
              <p class="mb-2 text-[#828282]">{{ article.articleSummary }}</p>
            </div>
            <div class="flex justify-between">
              <p>{{ article.articleDate }}</p>
              <div class="flex items-center gap-1">
                <Icon name="material-symbols:bookmark-outline-rounded" size="16" />
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="w-1/5">
            <img :src="article.coverUrl" alt="cover" />
          </div>
        </div>
        <div class="my-7 w-full border"></div>
      </li>
    </ul>
    <span v-else>Loading...</span>
  </div>
</template>

<style scoped></style>
