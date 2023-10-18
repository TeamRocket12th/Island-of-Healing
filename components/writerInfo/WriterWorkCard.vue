<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoading } from '~/stores/loading'

const { isLoading } = storeToRefs(useLoading())

defineProps({
  writerWorks: {
    type: Array as () => WriterWork[],
    required: true
  }
})

const { formatDate } = useDateFormat()
</script>

<template>
  <div>
    <p
      v-if="writerWorks.length === 0 && !isLoading"
      class="mt-10 text-center text-2xl text-primary"
    >
      目前還沒有文章
    </p>
    <ul v-else>
      <li
        v-for="work in writerWorks"
        :key="work.Id"
        class="border-light mb-6 pb-5 md:mb-0 md:px-6 md:pb-9 md:pt-6"
      >
        <NuxtLink :to="`/article/${work.Id}`">
          <div class="flex flex-col items-center gap-6 md:flex-row">
            <div class="h-[186px] w-full md:h-[168px] md:w-[30%]">
              <NuxtImg
                :src="work.ImgUrl ? work.ImgUrl : '/default-article-cover.jpg'"
                alt="cover"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex h-auto w-full flex-col justify-between md:h-[168px] md:w-[70%]">
              <h3 class="mb-3 font-serif-tc text-xl font-bold text-primary">
                {{ work.Title }}
              </h3>
              <p v-if="work.Summary" class="mb-[30px] text-primary-dark">
                {{ work.Summary }}
              </p>
              <div class="flex justify-between">
                <p class="text-sm font-light text-primary-dark">{{ formatDate(work.InitDate) }}</p>
                <div class="flex items-end justify-end gap-2">
                  <span v-if="!work.Collect" class="cursor-pointer"
                    ><Icon
                      name="material-symbols:bookmark-outline-rounded"
                      size="16"
                      class="text-sand-300"
                  /></span>
                  <span v-else class="cursor-pointer text-secondary">
                    <Icon name="material-symbols:bookmark" size="16" />
                  </span>
                  <span v-if="!work.Like" class="cursor-pointer"
                    ><Icon
                      name="material-symbols:favorite-outline-rounded"
                      size="16"
                      class="text-sand-300"
                  /></span>
                  <span v-else class="cursor-pointer text-secondary">
                    <Icon name="material-symbols:favorite-rounded" size="16" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.border-light {
  border-bottom: 0.5px solid rgba(78, 42, 9, 0.3);
}
li:first-child {
  padding-top: 0;
}
</style>
