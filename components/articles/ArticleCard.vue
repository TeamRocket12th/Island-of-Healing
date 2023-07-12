<script setup lang="ts">
defineProps({
  articles: {
    type: Array as () => ArticleCard[],
    required: true
  }
})

const { formatDate } = useDateFormat()
</script>

<template>
  <div>
    <div>
      <ul class="grid grid-cols-3 gap-6">
        <li v-for="item in articles" :key="item.Id" class="col-span-1 border">
          <NuxtLink :to="`/article/${item.Id}`">
            <div class="h-[157px] overflow-hidden">
              <img :src="item.ArticleImgUrl" alt="cover-photo" class="h-full w-full object-cover" />
            </div>
            <div class="flex h-[126px] flex-col justify-between bg-white pb-3 pl-3 pr-[14px] pt-2">
              <div class="mb-3">
                <p class="font-serif-tc text-xl font-bold leading-normal text-primary">
                  {{ item.Title }}
                </p>
              </div>
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-light text-primary-dark">
                    {{ item.WriterNickName }}
                  </p>
                  <p class="text-sm font-light text-primary-dark">
                    {{ formatDate(item.Initdate) }}
                  </p>
                </div>
                <div class="flex items-end justify-end gap-2">
                  <span v-if="!item.UserCollect" class="cursor-pointer text-sand-300"
                    ><Icon name="material-symbols:bookmark-outline-rounded" size="16"
                  /></span>
                  <span v-else class="cursor-pointer text-secondary">
                    <Icon name="material-symbols:bookmark" size="16" />
                  </span>
                  <span v-if="!item.UserLike" class="cursor-pointer text-sand-300"
                    ><Icon name="material-symbols:favorite-outline-rounded" size="16"
                  /></span>
                  <span v-else class="cursor-pointer text-secondary">
                    <Icon name="material-symbols:favorite-rounded" size="16" />
                  </span>
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
