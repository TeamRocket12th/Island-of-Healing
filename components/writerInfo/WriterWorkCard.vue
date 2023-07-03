<script setup lang="ts">
defineProps({
  writerWork: {
    type: Array as () => Work[],
    default: () => [],
    required: true
  }
})

const shortenSummary = (summary: string) => {
  let shortSummary = summary
  if (summary && summary.length > 50) {
    shortSummary = summary.substring(0, 50) + '...'
  }
  return shortSummary
}
</script>

<template>
  <div>
    <ul>
      <li
        v-for="work in writerWork"
        :key="work.id"
        class="border-light mb-6 pb-5 md:mb-0 md:px-6 md:pb-9 md:pt-6"
      >
        <div class="flex flex-col items-center gap-6 md:flex-row">
          <div class="h-[186px] w-full md:h-[168px] md:w-[30%]">
            <img :src="work.coverUrl" alt="cover" class="h-full w-full" />
          </div>
          <div class="md:w-[70%]">
            <h3 class="mb-3 font-serif-tc font-bold text-primary">
              <NuxtLink :to="`/article/${work.id}`">{{ work.title }}</NuxtLink>
            </h3>
            <p class="mb-[30px] text-[#828282]">{{ shortenSummary(work.summary) }}</p>
            <div class="flex justify-between">
              <p class="text-sm font-light text-primary-dark">{{ work.createdDate }}</p>
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
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.border-light {
  border-bottom: 0.5px solid rgba(78, 42, 9, 0.3);
}
</style>
