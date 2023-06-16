<script setup lang="ts">
import isWriter from '~/middleware /isWriter'
import MyWorkList from '~/containers/MyWorkList.vue'

definePageMeta({
  middleware: [isWriter],
  layout: 'userlayout'
})
</script>
<template>
  <div class="bg-white px-10 pb-20 pt-20">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">文章列表</h2>
      <div class="flex items-center">
        <NuxtLink to="/" class="mr-4 rounded-[4px] bg-[#9F9F9F] px-4 py-2 text-white">
          <div class="flex items-center"><Icon name="ic:outline-plus" size="20" /> 新增文章</div>
        </NuxtLink>
        <SearchInput />
      </div>
    </div>
    <MyWorkList />
  </div>
</template>

<style scoped></style>
