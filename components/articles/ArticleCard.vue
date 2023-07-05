<script setup lang="ts">
defineProps({
  articles: {
    type: Array as () => ArticleCard[],
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div>
    <div>
      <ul class="grid grid-cols-3 gap-6">
        <li v-for="item in articles" :key="item.id" class="col-span-1 border">
          <NuxtLink :to="`/article/${item.id}`">
            <div class="h-[157px] overflow-hidden">
              <img :src="item.imgUrl" alt="cover-photo" class="h-full w-full object-cover" />
            </div>
            <div class="flex h-[126px] flex-col justify-between bg-white pb-3 pl-3 pr-[14px] pt-2">
              <div class="mb-3">
                <p class="font-serif-tc text-xl font-bold leading-normal text-primary">
                  {{ item.title }}
                </p>
              </div>
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-light text-primary-dark">
                    {{ item.writer }}
                  </p>
                  <p class="text-sm font-light text-primary-dark">
                    {{ item.date }}
                  </p>
                </div>
                <div class="flex items-end justify-end gap-2">
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
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
