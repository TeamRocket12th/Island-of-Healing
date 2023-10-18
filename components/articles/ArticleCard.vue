<script setup lang="ts">
defineProps({
  article: {
    type: Object as () => ArticleCard,
    required: true,
    default: () => {}
  }
})

const { formatDate } = useDateFormat()
const formatTitle = (title: string) => {
  if (title.length > 18) {
    return title.substring(0, 18) + '...'
  }
  return title
}
</script>

<template>
  <div>
    <NuxtLink :to="`/article/${article.Id}`">
      <div class="h-[157px] overflow-hidden">
        <NuxtImg
          :src="article.ArticleImgUrl ? article.ArticleImgUrl : '/default-article-cover.jpg'"
          alt="cover-photo"
          class="h-full w-full object-cover duration-500 hover:scale-110"
        />
      </div>
      <div class="flex h-[126px] flex-col justify-between bg-white pb-3 pl-3 pr-[14px] pt-2">
        <div class="mb-3">
          <p class="font-serif-tc text-xl font-bold leading-normal text-primary">
            {{ formatTitle(article.Title) }}
          </p>
        </div>
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-light text-primary-dark">
              {{ article.WriterNickName }}
            </p>
            <p class="text-sm font-light text-primary-dark">
              {{ formatDate(article.Initdate) }}
            </p>
          </div>
          <div class="flex items-end justify-end gap-2">
            <span v-if="!article.UserCollect" class="cursor-pointer text-sand-300"
              ><Icon name="material-symbols:bookmark-outline-rounded" size="16"
            /></span>
            <span v-else class="cursor-pointer text-secondary">
              <Icon name="material-symbols:bookmark" size="16" />
            </span>
            <span v-if="!article.UserLike" class="cursor-pointer text-sand-300"
              ><Icon name="material-symbols:favorite-outline-rounded" size="16"
            /></span>
            <span v-else class="cursor-pointer text-secondary">
              <Icon name="material-symbols:favorite-rounded" size="16" />
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
