<script setup lang="ts">
defineProps({
  writerInfo: {
    type: Object as () => WriterInfo,
    default: () => {},
    required: true
  }
})
</script>
<template>
  <div class="mb-10 h-[511px] bg-white px-[68px] py-[58px] shadow-sm md:mb-0">
    <div class="mx-auto mb-6 h-[95px] w-[95px]">
      <img :src="writerInfo.imgUrl" alt="avatar" class="h-full w-full rounded-full" />
    </div>
    <h2 class="text-center font-serif-tc text-2xl font-bold text-primary">{{ writerInfo.name }}</h2>
    <p class="mb-6 text-center text-primary">{{ writerInfo.jobTitle }}</p>
    <p class="my-6 text-center font-light text-primary-dark">{{ writerInfo.bio }}</p>
    <div class="mb-6 border-y-[0.5px] border-secondary">
      <ul class="flex justify-center gap-[72px] py-2">
        <li class="flex flex-col items-center">
          <span class="text-2xl font-medium leading-normal">{{ writerInfo.work.length }}</span>
          <p class="whitespace-nowrap">篇文章</p>
        </li>
        <li class="flex flex-col items-center">
          <span class="text-2xl font-medium leading-normal">{{ writerInfo.followerNum }}</span>
          <p class="whitespace-nowrap">追蹤者</p>
        </li>
        <li class="flex flex-col items-center">
          <span class="text-2xl font-medium leading-normal">{{ writerInfo.followingNum }}</span>
          <p class="whitespace-nowrap">追蹤中</p>
        </li>
      </ul>
    </div>
    <button
      class="mb-16 flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-3 py-2 text-white"
    >
      <Icon name="ic:round-plus" size="24" />
      <span>追蹤</span>
    </button>
  </div>
</template>

<style scoped></style>
