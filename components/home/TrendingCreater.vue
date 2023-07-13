<script setup>
const creaters = [
  { id: 1, photo: 'https://picsum.photos/95', name: '章家齊', jobTitle: '心理諮商師' },
  { id: 2, photo: 'https://picsum.photos/95', name: '艾蜜莉', jobTitle: '學術工作者' },
  { id: 3, photo: 'https://picsum.photos/95', name: '莉莉安', jobTitle: '心理諮商師' },
  { id: 4, photo: 'https://picsum.photos/95', name: '奧斯汀', jobTitle: '社會評論者' },
  { id: 5, photo: 'https://picsum.photos/95', name: '艾蜜莉', jobTitle: '文字工作者' },
  { id: 6, photo: 'https://picsum.photos/95', name: '卡夫卡', jobTitle: '文字工作者' }
]
</script>

<template>
  <section class="container mb-6 py-[84px]">
    <div class="mb-6 flex items-center gap-2 sm:px-4">
      <h2 class="font-serif-tc text-4xl font-bold text-primary">熱門創作者</h2>
      <div class="h-[0.5px] bg-primary"></div>
    </div>
    <ul
      class="flex h-[250px] items-center gap-6 overflow-x-scroll sm:grid sm:grid-cols-12 sm:overflow-auto"
    >
      <li
        v-for="creater in creaters"
        :key="creater.id"
        class="w-[151px] px-6 pb-3 pt-4 sm:col-span-2 sm:w-auto sm:p-0"
      >
        <div class="m-auto mb-4 h-[95px] w-[95px]">
          <img :src="creater.photo" alt="avatar" class="rounded-full" />
        </div>
        <p class="mb-1 text-center font-serif-tc font-bold text-primary">{{ creater.name }}</p>
        <p class="mb-4 text-center text-sm font-light text-primary">{{ creater.jobTitle }}</p>
        <button
          class="m-auto flex items-center rounded bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
        >
          <Icon name="ic:outline-plus" size="16" />
          <span class="text-sm leading-normal">追蹤</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
