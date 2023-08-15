<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToast } from '~/stores/toast'
import { useLoading } from '~/stores/loading'

const { showToast } = storeToRefs(useToast())
const { isLoading } = storeToRefs(useLoading())
const { searchTopic } = useSearch()

definePageMeta({
  layout: 'userlayout',
  requiredAuth: true
})
useSeoMeta({ title: '我的話題' })
</script>

<template>
  <div class="mb-40 border-primary bg-sand-100 px-10 pb-20 pt-10 lg:border">
    <div class="fixed right-10 top-36 z-20 3xl:right-80">
      <ToastMsg v-if="showToast" />
    </div>
    <div class="mb-6 items-center justify-between md:flex">
      <h2 class="mb-16 font-serif-tc text-2xl font-bold text-primary">我的話題</h2>
      <div class="flex items-center">
        <NuxtLink
          to="/newtopic"
          class="mr-4 rounded-[4px] bg-secondary px-3 py-2 text-white hover:bg-btn-hover active:bg-btn-active disabled:bg-btn-disabled disabled:text-white"
        >
          <div class="flex items-center whitespace-nowrap">
            <Icon name="ic:outline-plus" size="20" />新增話題
          </div>
        </NuxtLink>
        <SearchInput :search-fn="searchTopic" search-place-holder="搜尋話題" />
      </div>
    </div>
    <div>
      <MyTopicTable />
      <!--刪除確認Modal-->
      <div class="mt-10">
        <LoadingItem v-if="isLoading" />
      </div>
    </div>
  </div>
</template>

<style scoped>
table tr:nth-child(even) {
  background-color: #eeeae1;
}
</style>
