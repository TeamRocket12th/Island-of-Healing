<script setup lang="ts">
defineProps({
  writerInfo: {
    type: Array as () => Writer[],
    required: true,
    default: () => []
  }
})

const shortenBio = (bio: string) => {
  let shortBio = bio
  if (bio && bio.length > 13) {
    shortBio = bio.substring(0, 13) + '...'
  }
  return shortBio
}
</script>

<template>
  <div>
    <ul v-if="writerInfo.length > 0" class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:px-28">
      <li
        v-for="writer in writerInfo"
        :key="writer.id"
        class="mb-6 flex items-center justify-between border bg-white p-6 shadow-sm"
      >
        <span class="flex items-center gap-2">
          <div class="h-[60px] w-[60px] overflow-hidden rounded-full">
            <img :src="writer.imgUrl" alt="writer" />
          </div>
          <div>
            <NuxtLink :to="`/writer/${writer.id}`"
              ><p class="font-medium text-primary">{{ writer.name }}</p></NuxtLink
            >

            <p class="text-sm text-primary-dark">
              {{ writer.jobTitle }}。{{ shortenBio(writer.bio) }}
            </p>
          </div>
        </span>
        <button
          v-if="writer.isFollowing"
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
        >
          <Icon name="material-symbols:fitbit-check-small" size="20" />追蹤中
        </button>
        <button
          v-else
          class="flex items-center whitespace-nowrap rounded border bg-secondary px-2 py-1 text-sm text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
        >
          <Icon name="ic:baseline-plus" size="20" />追蹤
        </button>
      </li>
    </ul>
    <span v-else>Loading...</span>
  </div>
</template>
<style scoped></style>
