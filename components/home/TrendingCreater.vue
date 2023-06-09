<script setup>
const data = [
  { photo: '', name: '001' },
  { photo: '', name: '002' },
  { photo: '', name: '003' },
  { photo: '', name: '004' },
  { photo: '', name: '005' },
  { photo: '', name: '006' }
]
</script>

<template>
  <div class="container mb-6 3xl:pl-[300px] 3xl:pr-[300px]">
    <h2 class="py-4 pl-4">熱門創作者</h2>
    <ul class="flex h-[250px] items-center gap-4">
      <li v-for="(item, index) in data" :key="index" class="grow">
        <div class="m-auto mb-4 h-[95px] w-[95px] rounded-full bg-[#D9D9D9]"></div>
        <p class="mb-1 text-center">{{ item.name }}</p>
        <p class="mb-4 text-center">心理諮商師</p>
        <button class="m-auto block rounded border border-[#D9D9D9] px-6 py-[7px]">
          <span>追蹤</span>
        </button>
      </li>
    </ul>
  </div>
  <div></div>
</template>
